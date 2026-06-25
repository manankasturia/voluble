import { useRef, useState, useEffect } from "react";

const STEPS = [
  {
    num: "01",
    label: "Record or upload",
    tech: "Web Audio API",
    techColor: "#60a5fa",
    icon: <MicIcon />,
    headline: "Capture your voice",
    body: "Record directly in-browser or drop an MP3. The Web Audio API reads the raw waveform in real time — no plugins, no waiting.",
    metrics: ["Sample rate", "Bit depth", "Waveform amplitude"],
  },
  {
    num: "02",
    label: "Transcribe & score",
    tech: "AssemblyAI",
    techColor: "#a78bfa",
    icon: <WaveformIcon />,
    headline: "Word-level analysis",
    body: "AssemblyAI transcribes every word with millisecond timestamps. Filler words, stammers, and confidence scores come back in the same pass.",
    metrics: ["Transcript", "Confidence score", "Filler word map"],
  },
  {
    num: "03",
    label: "Measure delivery",
    tech: "Web Audio API",
    techColor: "#60a5fa",
    icon: <SpeedIcon />,
    headline: "Pace & prosody",
    body: "Words-per-minute, pause duration, and speech-to-silence ratio are computed from the audio buffer — separate from the transcript pipeline.",
    metrics: ["WPM", "Pause frequency", "Stammer index"],
  },
  {
    num: "04",
    label: "Generate insights",
    tech: "Gemini",
    techColor: "#34d399",
    icon: <SparkIcon />,
    headline: "Your personalised coaching",
    body: "All signals feed Gemini, which writes a plain-English summary of your biggest patterns and the one thing to practise before your next talk.",
    metrics: ["Key patterns", "Priority focus", "Progress delta"],
  },
];

const PIPELINE = [
  { label: "Audio input", color: "#1e3a5f", text: "#60a5fa" },
  { label: "Web Audio API", color: "#1e2d4a", text: "#93c5fd" },
  { label: "AssemblyAI", color: "#2d1f4e", text: "#a78bfa" },
  { label: "Gemini", color: "#0f3326", text: "#34d399" },
  { label: "Your report", color: "#1a2035", text: "#e2e8f0" },
];

export default function Howitworks() {
  const [active, setActive] = useState(null);
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(null);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tickRef = useRef(0);

  // Mini waveform animation for the demo
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
      const N = 48;
      const barW = 2;
      const gap = (W - N * barW) / (N + 1);
      for (let i = 0; i < N; i++) {
        const active = recording;
        const wave = active
          ? Math.abs(
              Math.sin(i * 0.28 + tickRef.current * 0.07) * 0.55 +
              Math.sin(i * 0.11 - tickRef.current * 0.05) * 0.35 +
              Math.sin(i * 0.6 + tickRef.current * 0.09) * 0.1
            )
          : 0.08;
        const barH = Math.max(3, wave * H * 0.82);
        const x = gap + i * (barW + gap);
        const y = (H - barH) / 2;
        const alpha = active ? 0.45 + wave * 0.55 : 0.18;
        ctx.fillStyle = `rgba(96,165,250,${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 1);
        ctx.fill();
      }
      tickRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [recording]);

  const runDemo = () => {
    if (recording) return;
    setRecording(true);
    setProgress(0);
    setPhase("recording");

    const phases = [
      { label: "recording", duration: 1800 },
      { label: "transcribing", duration: 1600 },
      { label: "measuring", duration: 1200 },
      { label: "summarising", duration: 1400 },
      { label: "done", duration: 0 },
    ];

    let i = 0;
    const totalMs = phases.reduce((s, p) => s + p.duration, 0);
    let elapsed = 0;

    const step = () => {
      if (i >= phases.length - 1) {
        setPhase("done");
        setProgress(100);
        setRecording(false);
        return;
      }
      setPhase(phases[i].label);
      const phaseDur = phases[i].duration;
      const phaseStart = elapsed;
      const phaseEnd = elapsed + phaseDur;
      const tick = 40;
      let t = 0;
      const inner = setInterval(() => {
        t += tick;
        const pct = ((phaseStart + Math.min(t, phaseDur)) / totalMs) * 100;
        setProgress(Math.round(pct));
        if (t >= phaseDur) {
          clearInterval(inner);
          elapsed = phaseEnd;
          i++;
          timerRef.current = setTimeout(step, 80);
        }
      }, tick);
    };
    step();
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setRecording(false);
    setProgress(0);
    setPhase(null);
  };

  const phaseLabels = {
    recording: "Capturing audio…",
    transcribing: "AssemblyAI transcribing…",
    measuring: "Web Audio measuring pace…",
    summarising: "Gemini generating insights…",
    done: "Analysis complete",
  };

  return (
    <section className="min-h-screen bg-[#07090f] text-white">

      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(96,165,250,0.05) 1px,transparent 1px),
                            linear-gradient(to bottom,rgba(96,165,250,0.05) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-28">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
            Under the hood
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Three APIs.
            <br />
            <span className="text-white/35">One coherent picture of your voice.</span>
          </h1>
          <p className="text-white/40 mt-5 max-w-md mx-auto text-sm leading-relaxed">
            Every analysis runs a coordinated pipeline — audio primitives, AI transcription, and a language model that ties it all together.
          </p>
        </div>

        {/* Pipeline bar */}
        <div className="flex items-center justify-center gap-0 mb-20 overflow-x-auto pb-2">
          {PIPELINE.map((p, i) => (
            <div key={p.label} className="flex items-center">
              <div
                className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{ background: p.color, color: p.text, border: `1px solid ${p.text}22` }}
              >
                {p.label}
              </div>
              {i < PIPELINE.length - 1 && (
                <div className="flex items-center mx-1">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M0 6h16M12 2l4 4-4 4" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06] mb-20">
          {STEPS.map((s) => {
            const isOpen = active === s.num;
            return (
              <div
                key={s.num}
                className="bg-[#07090f] hover:bg-[#0c1220] transition-colors cursor-pointer select-none"
                onClick={() => setActive(isOpen ? null : s.num)}
              >
                {/* Row */}
                <div className="flex items-center gap-6 p-7">
                  <span className="text-white/18 font-bold text-sm tracking-widest w-8 flex-shrink-0">
                    {s.num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-base">{s.label}</p>
                    <p className="text-white/35 text-sm">{s.headline}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: s.techColor }}
                    />
                    <span className="text-xs font-medium" style={{ color: s.techColor }}>
                      {s.tech}
                    </span>
                  </div>
                  <ChevronIcon open={isOpen} />
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div className="px-7 pb-7 pt-1 border-t border-white/[0.06]">
                    <div className="flex flex-col md:flex-row gap-8 ml-14">
                      <p className="flex-1 text-white/55 text-sm leading-relaxed">{s.body}</p>
                      <div className="flex-shrink-0">
                        <p className="text-white/28 text-xs uppercase tracking-widest mb-3 font-semibold">
                          Outputs
                        </p>
                        <ul className="flex flex-col gap-2">
                          {s.metrics.map((m) => (
                            <li key={m} className="flex items-center gap-2 text-sm">
                              <span
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: s.techColor }}
                              />
                              <span className="text-white/60">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live demo widget */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: waveform + controls */}
            <div className="flex-1 min-w-0">
              <p className="text-white/28 text-xs uppercase tracking-widest font-semibold mb-5">
                See the pipeline run
              </p>
              <canvas
                ref={canvasRef}
                className="w-full rounded-xl mb-5"
                style={{ height: 64, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              />

              {/* Progress bar */}
              <div className="h-0.5 w-full bg-white/[0.07] rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-white/38 text-xs">
                  {phase ? phaseLabels[phase] : "Ready"}
                </span>
                <div className="flex items-center gap-3">
                  {phase === "done" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="px-4 py-2 rounded-full border border-white/15 text-white/55 hover:text-white text-xs transition-colors"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); runDemo(); }}
                    disabled={recording}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      background: recording ? "rgba(37,99,235,0.4)" : "#2563eb",
                      color: "white",
                      cursor: recording ? "not-allowed" : "pointer",
                    }}
                  >
                    {recording ? (
                      <>
                        <PulseIcon /> Running…
                      </>
                    ) : (
                      <>
                        <PlayIcon /> Run demo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: phase status */}
            <div className="flex-shrink-0 w-full md:w-56">
              <p className="text-white/28 text-xs uppercase tracking-widest font-semibold mb-5">
                Pipeline status
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { id: "recording", label: "Web Audio capture", color: "#60a5fa" },
                  { id: "transcribing", label: "AssemblyAI transcript", color: "#a78bfa" },
                  { id: "measuring", label: "Pace & prosody", color: "#60a5fa" },
                  { id: "summarising", label: "Gemini summary", color: "#34d399" },
                ].map((p) => {
                  const phaseOrder = ["recording", "transcribing", "measuring", "summarising", "done"];
                  const currentIdx = phaseOrder.indexOf(phase);
                  const thisIdx = phaseOrder.indexOf(p.id);
                  const done = currentIdx > thisIdx;
                  const running = currentIdx === thisIdx;
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: done || running ? `${p.color}22` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${done || running ? p.color : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {done ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke={p.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : running ? (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: p.color, animation: "pulse-dot 0.9s ease-in-out infinite alternate" }}
                          />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        )}
                      </div>
                      <span
                        className="text-xs transition-colors"
                        style={{ color: done || running ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)" }}
                      >
                        {p.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-white/30 text-sm mb-6">
            The full pipeline runs on every upload — free to try, no account needed.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium text-sm transition-all shadow-[0_8px_32px_rgba(37,99,235,0.28)] hover:scale-[1.03]"
          >
            <UploadIcon /> Try it with your voice
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          from { opacity: 0.4; transform: scale(0.7); }
          to   { opacity: 1;   transform: scale(1);   }
        }
      `}</style>
    </section>
  );
}

/* ── Icons ── */
function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="1.5" width="5" height="7" rx="2.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <path d="M3 7.5a5 5 0 0 0 10 0" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="14.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h2M3 8V5.5M3 5.5V10.5M5 8v-3M5 5v6M7 8V3M7 3v10M9 8V5M9 5v6M11 8V6M11 6v4M13 8v-1.5M13 6.5v3M15 8h-2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="9" r="5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <path d="M8 9L5.5 5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="9" r="1" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="8" r="2.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="flex-shrink-0 transition-transform"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 2l7 4-7 4V2z" fill="white" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <span
      className="w-2 h-2 rounded-full bg-blue-300 flex-shrink-0"
      style={{ animation: "pulse-dot 0.8s ease-in-out infinite alternate" }}
    />
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 4l3-3 3 3M2 10.5h10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}