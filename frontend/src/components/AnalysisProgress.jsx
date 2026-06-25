import { useEffect, useRef, useState } from "react";

/**
 * Visual progress while the real pipeline runs:
 *   /upload  ->  decode + YIN pitch/pause extraction (client-side)  ->  /frontend/getVolumeParams (Gemini)
 *
 * This component is purely presentational — Dashboard drives `phase` based on
 * where it actually is in handleFileChange / handleRecording. No timing here
 * is faked; it just reflects real async state with a calmer UI than an alert.
 *
 * phase: "uploading" | "measuring" | "thinking" | null
 */
const PHASES = [
  { id: "uploading", label: "Uploading audio", sub: "Sending your recording to Volube", color: "#60a5fa" },
  { id: "measuring", label: "Measuring pace & pitch", sub: "Reading pauses, speed, and tone from the waveform", color: "#93c5fd" },
  { id: "thinking", label: "Generating feedback", sub: "AssemblyAI transcript + Gemini coaching review", color: "#34d399" },
];

export default function AnalysisProgress({ phase, fileName }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tickRef = useRef(0);

  // Idle ambient waveform so the panel doesn't feel static while we wait
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const N = 56;
      const barW = 2;
      const gap = (W - N * barW) / (N + 1);
      for (let i = 0; i < N; i++) {
        const wave = Math.abs(
          Math.sin(i * 0.22 + tickRef.current * 0.05) * 0.5 +
          Math.sin(i * 0.09 - tickRef.current * 0.035) * 0.3
        );
        const barH = Math.max(3, wave * H * 0.75);
        const x = gap + i * (barW + gap);
        const y = (H - barH) / 2;
        ctx.fillStyle = `rgba(96,165,250,${0.2 + wave * 0.45})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 1);
        ctx.fill();
      }
      tickRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const currentIdx = PHASES.findIndex((p) => p.id === phase);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: waveform + current phase */}
        <div className="flex-1 min-w-0 w-full">
          <p className="text-white/28 text-xs uppercase tracking-widest font-semibold mb-1">
            Analyzing
          </p>
          <p className="text-white text-sm font-medium mb-5 truncate">{fileName || "Your recording"}</p>

          <canvas
            ref={canvasRef}
            className="w-full rounded-xl mb-5"
            style={{ height: 56, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          />

          <div className="h-0.5 w-full bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / PHASES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: phase stepper */}
        <div className="flex-shrink-0 w-full md:w-72">
          <p className="text-white/28 text-xs uppercase tracking-widest font-semibold mb-5">
            Pipeline status
          </p>
          <div className="flex flex-col gap-4">
            {PHASES.map((p, i) => {
              const done = currentIdx > i;
              const running = currentIdx === i;
              return (
                <div key={p.id} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                    style={{
                      background: done || running ? `${p.color}22` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${done || running ? p.color : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {done ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke={p.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : running ? (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: p.color, animation: "ap-pulse 0.9s ease-in-out infinite alternate" }}
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    )}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium transition-colors"
                      style={{ color: done || running ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.3)" }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="text-xs mt-0.5 transition-colors"
                      style={{ color: done || running ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)" }}
                    >
                      {p.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skeleton preview of the result layout, so the panel telegraphs what's coming */}
      <div className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonBlock lines={4} />
        <SkeletonBlock lines={4} />
      </div>

      <style>{`
        @keyframes ap-pulse {
          from { opacity: 0.4; transform: scale(0.7); }
          to   { opacity: 1;   transform: scale(1);   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

function SkeletonBlock({ lines = 3 }) {
  const widths = ["92%", "78%", "85%", "60%"];
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6">
      <div
        className="h-3 w-24 rounded mb-5"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.6s linear infinite",
        }}
      />
      <div className="flex flex-col gap-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded"
            style={{
              width: widths[i % widths.length],
              background: "linear-gradient(90deg, rgba(255,255,255,0.045) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.045) 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s linear infinite",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}