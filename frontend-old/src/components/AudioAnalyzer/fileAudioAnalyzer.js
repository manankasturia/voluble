import { YIN } from "pitchfinder";

const defaultOpts = {
  frameSize: 2048,
  hopSize: 512,
  energyThresholdDb: -50,
  minPauseMs: 1000,
  pitchThreshold: 0.1,
};

function rms(frame) {
  let sum = 0;
  for (let i = 0; i < frame.length; i++) sum += frame[i] * frame[i];
  return Math.sqrt(sum / frame.length);
}

function toDbFS(rms) {
  const ref = 1.0;
  return 20 * Math.log10(Math.max(1e-8, rms / ref));
}

function stddev(arr) {
  if (!arr.length) return 0;
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  return Math.sqrt(variance);
}

function downsampleData(dataArray, hopSeconds, bucketMs = 250) {
  const bucketSizeInSeconds = bucketMs / 1000;
  const framesPerBucket = Math.round(bucketSizeInSeconds / hopSeconds);

  const downsampledArray = [];

  for (let i = 0; i < dataArray.length; i += framesPerBucket) {
    const chunk = dataArray.slice(i, i + framesPerBucket);

    // Filter out nulls (for pitch) and invalid numbers
    const validData = chunk.filter((val) => val !== null && !isNaN(val));

    if (validData.length === 0) {
      downsampledArray.push(null); // or 0 for volume
    } else {
      // Calculate the average for this bucket
      const sum = validData.reduce((a, b) => a + b, 0);
      downsampledArray.push(sum / validData.length);
    }
  }

  return downsampledArray;
}

async function sendData(
  audioURL,
  pitches,
  energies,
  pauses,
  amplitudes,
  metrics,
  hopSeconds,
) {
  const data = {
    audioURL: audioURL,
    pitchHz: downsampleData(pitches, hopSeconds, 250),
    volume: downsampleData(energies, hopSeconds, 250),
    amplitudes: downsampleData(amplitudes, hopSeconds, 250),
    pauses: pauses,
    metrics: metrics,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE || "http://localhost:8080"}/frontend/getVolumeParams`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    console.log("Data sent successfully: ", result);
    return result;
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function analyzeArrayBuffer(arrayBuffer, opts = {}, audioURL) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return analyzeAudioBuffer(audioBuffer, opts, audioURL);
}

export async function analyzeAudioBuffer(audioBuffer, opts = {}, audioURL) {
  const options = { ...defaultOpts, ...opts };
  const sampleRate = audioBuffer.sampleRate;
  const detectPitch = YIN({
    sampleRate,
    threshold: options.pitchThreshold,
    bufferSize: options.frameSize,
  });

  const x = audioBuffer.getChannelData(0);
  const energies = [];
  const pitches = [];
  const amplitudes = [];
  const len = x.length;

  for (
    let start = 0;
    start + options.frameSize <= len;
    start += options.hopSize
  ) {
    const frame = x.subarray(start, start + options.frameSize);
    const amplitude = rms(frame);
    const energyDb = toDbFS(amplitude);
    energies.push(energyDb);

    let peak = 0;
    for (let i = 0; i < frame.length; i++) {
      const absVal = Math.abs(frame[i]);
      if (absVal > peak) peak = absVal;
    }
    amplitudes.push(peak);

    const f0 = detectPitch(frame);
    pitches.push(f0 || null);
  }
  // pause detection (contiguous frames with energy below threshold)
  const pauses = [];
  let currentStart = null;
  const hopSeconds = options.hopSize / sampleRate;
  const minPauseFrames = Math.ceil(options.minPauseMs / 1000 / hopSeconds);

  for (let i = 0; i < energies.length; i++) {
    if (energies[i] < options.energyThresholdDb) {
      if (currentStart === null) currentStart = i;
    } else if (currentStart !== null) {
      const span = i - currentStart;
      if (span >= minPauseFrames) {
        const startMs = currentStart * hopSeconds * 1000;
        const endMs = (i - 1) * hopSeconds * 1000;
        const durationMs = span * hopSeconds * 1000;
        pauses.push({ startMs, endMs, durationMs });
      }
      currentStart = null;
    }
  }
  // tail end
  if (currentStart !== null) {
    const span = energies.length - currentStart;
    if (span >= minPauseFrames) {
      const startMs = currentStart * hopSeconds * 1000;
      const endMs = (energies.length - 1) * hopSeconds * 1000;
      const durationMs = span * hopSeconds * 1000;
      pauses.push({ startMs, endMs, durationMs });
    }
  }

  // summary metrics
  const durationSec = len / sampleRate;
  const voiced = pitches.filter(Boolean);
  const meanPitch = voiced.length
    ? voiced.reduce((a, b) => a + b, 0) / voiced.length
    : 0;
  const pitchStd = stddev(voiced);
  let jitter = 0;
  if (voiced.length > 1 && meanPitch > 0) {
    let sum = 0;
    for (let i = 0; i < voiced.length - 1; i++) {
      sum += Math.abs(voiced[i + 1] - voiced[i]);
    }
    jitter = sum / (voiced.length - 1) / meanPitch;
  }

  const metrics = {
    pausesCount: pauses.length,
    avgPauseMs: pauses.length
      ? pauses.reduce((s, p) => s + p.durationMs, 0) / pauses.length
      : 0,
    meanPitch,
    pitchStd,
    jitter,
  };

  console.log("pauses: ", pauses);
  console.log("pitches: ", downsampleData(pitches, hopSeconds));
  console.log("amplitudes: ", downsampleData(amplitudes, hopSeconds));
  console.log("energies: ", downsampleData(energies, hopSeconds));
  console.log("metrics: ", metrics);

  const geminiAnalysis = await sendData(
    audioURL,
    pitches,
    energies,
    pauses,
    amplitudes,
    metrics,
    hopSeconds,
  );

  return { geminiAnalysis, energies };
}
