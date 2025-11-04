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

export async function analyzeArrayBuffer(arrayBuffer, opts = {}) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return analyzeAudioBuffer(audioBuffer, opts);
}

export function analyzeAudioBuffer(audioBuffer, opts = {}) {
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
        const durationMs = span * hopSeconds * 1000;
        pauses.push({ startFrame: currentStart, endFrame: i - 1, durationMs });
      }
      currentStart = null;
    }
  }
  // tail end
  if (currentStart !== null) {
    const span = energies.length - currentStart;
    if (span >= minPauseFrames) {
      pauses.push({
        startFrame: currentStart,
        endFrame: energies.length - 1,
        durationMs: span * hopSeconds * 1000,
      });
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

  console.log("pauses: ", pauses);
  console.log("pitches: ", pitches);
  console.log("amplitudes: ", amplitudes);
  console.log("energies: ", energies);

  sendData(pitches, energies, pauses);

  return {
    sampleRate,
    frameSize: options.frameSize,
    hopSize: options.hopSize,
    durationSec,
    energiesDb: energies,
    pitchesHz: pitches,
    pauses,
    metrics: {
      pausesCount: pauses.length,
      avgPauseMs: pauses.length
        ? pauses.reduce((s, p) => s + p.durationMs, 0) / pauses.length
        : 0,
      meanPitch,
      pitchStd,
      jitter,
    },
  };
}

async function sendData(pitches, energiesDb, pauses) {
  const data = {
    pitchHz: pitches,
    volume: energiesDb,
    pauses: pauses,
  };

  try {
    const response = await fetch("http://localhost:8080/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Data sent successfully: ", result);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}
