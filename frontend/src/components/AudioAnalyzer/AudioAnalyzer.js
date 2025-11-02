import React, { useEffect, useRef, useState } from "react";
import Pitchfinder from "pitchfinder";

const AudioAnalyzer = () => {
  const [volume, setVolume] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [monotoneScore, setMonotoneScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArraysRef = useRef({});
  const pitchHistoryRef = useRef([]);
  const animationFrameRef = useRef(null);
  const pitchIntervalRef = useRef(null);

  // Pause detection state
  const pauseStateRef = useRef({
    isSilent: false,
    silenceStartTime: 0,
    pauseCount: 0,
  });

  const SILENCE_THRESHOLD = 20;
  const MIN_PAUSE_DURATION = 1000;

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopAnalysis();
    };
  }, []);

  const setupAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Create the AudioContext
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      // 2. Create the AnalyserNode
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      // 3. Create the data arrays
      dataArraysRef.current.frequencyData = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
      dataArraysRef.current.timeDomainData = new Float32Array(
        analyserRef.current.fftSize
      );

      // 4. Connect the mic stream
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      // 5. Start analysis loops
      startVolumeCheck();
      startPitchCheck();

      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please grant permission.");
    }
  };

  const stopAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (pitchIntervalRef.current) {
      clearInterval(pitchIntervalRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
  };

  const startVolumeCheck = () => {
    const checkVolume = () => {
      if (!analyserRef.current) return;

      // 1. Get frequency data
      analyserRef.current.getByteFrequencyData(
        dataArraysRef.current.frequencyData
      );

      // 2. Calculate average volume
      let sum = 0;
      for (const amplitude of dataArraysRef.current.frequencyData) {
        sum += amplitude;
      }
      const averageVolume = sum / dataArraysRef.current.frequencyData.length;

      // 3. Update volume state
      setVolume(averageVolume);

      // 4. Pause detection logic
      const now = performance.now();
      const state = pauseStateRef.current;

      if (averageVolume < SILENCE_THRESHOLD) {
        if (!state.isSilent) {
          state.isSilent = true;
          state.silenceStartTime = now;
        }
      } else {
        if (state.isSilent) {
          state.isSilent = false;
          const silenceDuration = now - state.silenceStartTime;

          if (silenceDuration > MIN_PAUSE_DURATION) {
            state.pauseCount++;
            setPauseCount(state.pauseCount);
          }
        }
      }

      // 5. Keep loop running
      animationFrameRef.current = requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  const startPitchCheck = () => {
    const detectPitch = Pitchfinder.YIN({
      sampleRate: audioContextRef.current.sampleRate,
    });

    pitchIntervalRef.current = setInterval(() => {
      if (!analyserRef.current) return;

      // 1. Get time-domain data
      analyserRef.current.getFloatTimeDomainData(
        dataArraysRef.current.timeDomainData
      );

      // 2. Detect pitch
      const pitch = detectPitch(dataArraysRef.current.timeDomainData);

      if (pitch !== null) {
        pitchHistoryRef.current.push(pitch);
      }

      // 3. Calculate monotone score every 20 samples
      if (pitchHistoryRef.current.length >= 20) {
        const stdDev = getStandardDeviation(pitchHistoryRef.current);
        setMonotoneScore(stdDev);
        pitchHistoryRef.current = [];
      }
    }, 250);
  };

  const getStandardDeviation = (array) => {
    if (!array.length) return 0;
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    const variance = array.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1);
    return Math.sqrt(variance);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Audio Analyzer</h1>

        <div className="space-y-4 mb-6">
          {/* Volume Meter */}
          <div>
            <label className="block text-sm font-medium mb-2">Volume</label>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-100"
                style={{ width: `${(volume / 255) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {volume.toFixed(1)} / 255
            </p>
          </div>

          {/* Pause Counter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Pauses Detected
            </label>
            <div className="text-3xl font-bold text-purple-600">
              {pauseCount}
            </div>
          </div>

          {/* Monotone Score */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Pitch Variation (Monotone Score)
            </label>
            <div className="text-2xl font-bold text-indigo-600">
              {monotoneScore.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {monotoneScore < 10
                ? "Very monotone"
                : monotoneScore > 30
                ? "Very dynamic"
                : "Moderate"}
            </p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          {!isRecording ? (
            <button
              onClick={setupAudio}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Start Analysis
            </button>
          ) : (
            <button
              onClick={stopAnalysis}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
            >
              Stop Analysis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioAnalyzer;
