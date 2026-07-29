import { useEffect, useRef, useState } from "react";
import { createRecorder } from "./AudioAnalyzer/recordAudioAnalyzer";


// Backend contract: onRecorded(blob) fires exactly like the old
// AudioRecorder.js, still backed by createRecorder() from recordAudioAnalyzer.js.

export default function AudioRecorder({ onRecorded, disabled }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);

  const recorderRef = useRef(null);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tickRef = useRef(0);

  // Live analyser, separate from createRecorder — purely for visual feedback
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const freqDataRef = useRef(null);
  const levelsRef = useRef(new Array(48).fill(0.06));

  function startTimer() {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }
  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  // Canvas draw loop — reacts to live mic level when recording, idle pulse otherwise
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 48;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const barW = 2.5;
      const gap = (W - N * barW) / (N + 1);

      // Pull live frequency data if we have an active analyser
      if (recording && analyserRef.current && freqDataRef.current) {
        analyserRef.current.getByteFrequencyData(freqDataRef.current);
        const bins = freqDataRef.current;
        const step = Math.floor(bins.length / N) || 1;
        const levels = levelsRef.current;
        for (let i = 0; i < N; i++) {
          let sum = 0;
          for (let j = 0; j < step; j++) sum += bins[i * step + j] || 0;
          const avg = sum / step / 255; // 0..1
          // smooth toward new value so bars don't jitter harshly
          levels[i] = levels[i] * 0.6 + avg * 0.4;
        }
      } else if (!recording) {
        // idle: gentle ambient pulse so the widget never looks dead
        const levels = levelsRef.current;
        for (let i = 0; i < N; i++) {
          levels[i] = 0.05 + Math.abs(Math.sin(i * 0.3 + tickRef.current * 0.02)) * 0.04;
        }
      }

      const levels = levelsRef.current;
      for (let i = 0; i < N; i++) {
        const wave = Math.max(0.04, levels[i]);
        const barH = Math.max(3, wave * H * 0.92);
        const x = gap + i * (barW + gap);
        const y = (H - barH) / 2;
        const alpha = recording ? 0.35 + wave * 0.65 : 0.16;
        ctx.fillStyle = `rgba(96,165,250,${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 1.2);
        ctx.fill();
      }

      tickRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [recording]);

  async function handleStart() {
    setError("");
    try {
      // Live analyser for waveform visuals only — independent of the recorder/upload path
      try {
        const liveStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtxRef.current.createMediaStreamSource(liveStream);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        freqDataRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
        source.connect(analyserRef.current);
        // stash so we can stop tracks on cleanup
        audioCtxRef.current._liveStream = liveStream;
      } catch {
        // if this fails, we just fall back to idle animation — recording itself still works
      }

      recorderRef.current = createRecorder({
        timeslice: 250,
        onStop: (blob) => {
          stopTimer();
          setRecording(false);
          cleanupLiveAnalyser();
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

  function cleanupLiveAnalyser() {
    try {
      audioCtxRef.current?._liveStream?.getTracks?.().forEach((t) => t.stop());
    } catch { }
    try {
      audioCtxRef.current?.close?.();
    } catch { }
    audioCtxRef.current = null;
    analyserRef.current = null;
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
      cleanupLiveAnalyser();
      try {
        recorderRef.current?.stop();
      } catch { }
    };
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl mb-4"
        style={{
          height: 56,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      <div className="flex items-center justify-between gap-4">
        <span className="text-white/38 text-xs tabular-nums">
          {recording ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-red-400"
                style={{ animation: "rec-pulse 1s ease-in-out infinite alternate" }}
              />
              Recording {mm}:{ss}
            </span>
          ) : (
            "Ready to record"
          )}
        </span>

        {!recording ? (
          <button
            onClick={handleStart}
            disabled={disabled}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563eb] hover:bg-[#3b82f6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-[0_8px_24px_rgba(37,99,235,0.28)]"
          >
            <MicIcon />
            Start recording
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/90 hover:bg-red-500 text-white text-sm font-medium transition-all shadow-[0_8px_24px_rgba(239,68,68,0.28)]"
          >
            <StopIcon />
            Stop
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

      <style>{`
        @keyframes rec-pulse {
          from { opacity: 0.35; transform: scale(0.85); }
          to   { opacity: 1;    transform: scale(1);    }
        }
      `}</style>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="1.5" width="5" height="7" rx="2.5" stroke="white" strokeWidth="1.3" />
      <path d="M3 7.5a5 5 0 0 0 10 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="14.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" fill="white" />
    </svg>
  );
}