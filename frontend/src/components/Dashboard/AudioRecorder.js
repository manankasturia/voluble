import React, { use, useEffect, useRef, useState } from "react";
import { createRecorder } from "../AudioAnalyzer/recordAudioAnalyzer";

const AudioRecorder = ({ onRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  function startTimer() {
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  async function handleStart() {
    setError("");
    try {
      recorderRef.current = createRecorder({
        timeslice: 250,
        onStop: (blob) => {
          stopTimer();
          setRecording(false);
          try {
            onRecorded && onRecorded(blob);
          } catch (e) {
            console.error(e);
          }
        },
      });
      await recorderRef.current.start();
      setRecording(true);
      startTimer();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to start recording.");
      stopTimer();
      setRecording(false);
    }
  }

  function handleStop() {
    try {
      recorderRef.current?.stop();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    return () => {
      stopTimer();
      try {
        recorderRef.current?.stop();
      } catch {}
    };
  }, []);

  return (
    <div className="flex flex-col items-center my-12">
      {!recording ? (
        <button
          onClick={handleStart}
          className="inline-block cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-lg font-medium shadow-lg"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="inline-block cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg hover:from-red-600 hover:to-red-700 transition text-lg font-medium shadow-lg"
        >
          Stop Recording
        </button>
      )}
      <div className="text-lg">
        {recording ? `Recording... ${elapsed}s` : ""}
      </div>
      {error && <div className="text-red-600 font-medium">{error}</div>}
    </div>
  );
};

export default AudioRecorder;
