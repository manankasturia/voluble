import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;
    let tick = 0;

    const resize = () => {
      const rect = scene.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H;
      const rOuter = W * (395 / 900);
      const N = 140;
      const GAP = 0.045;

      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const angle = Math.PI + Math.PI * t;
        const wave =
          Math.sin(i * 0.2 + tick * 0.042) * 0.42 +
          Math.sin(i * 0.075 - tick * 0.028) * 0.33 +
          Math.sin(i * 0.44 + tick * 0.065) * 0.25;
        const barH = 4 + Math.abs(wave) * 32;
        const r = rOuter + 15;
        const bx = cx + Math.cos(angle) * r;
        const by = cy + Math.sin(angle) * r;
        const edge = Math.min(t / GAP, (1 - t) / GAP, 1);
        const alpha = 0.15 + edge * 0.7;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = `rgba(180,215,255,${alpha})`;
        ctx.beginPath();
        ctx.rect(-1, -barH / 2, 2, barH);
        ctx.fill();
        ctx.restore();
      }

      tick++;
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Processing: ${file.name}\nIn production this triggers the speech analysis pipeline.`);
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#07090f]">

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(96,165,250,0.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(96,165,250,0.06) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />


      <div
        ref={sceneRef}
        className="relative w-full max-w-[900px] mx-auto"
        style={{ aspectRatio: "900/620" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="rg-ambient" cx="50%" cy="88%" r="55%">
              <stop offset="0%"   stopColor="#1e40af" stopOpacity="0.5" />
              <stop offset="55%"  stopColor="#1e3a8a" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#07090f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lg-arcface" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#1d4ed8" stopOpacity="0.45" />
              <stop offset="22%"  stopColor="#3b82f6" stopOpacity="0.88" />
              <stop offset="50%"  stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="78%"  stopColor="#3b82f6" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id="rg-innercap" cx="50%" cy="100%" r="60%">
              <stop offset="0%"   stopColor="#0d1829" stopOpacity="1" />
              <stop offset="100%" stopColor="#07090f" stopOpacity="1" />
            </radialGradient>
          </defs>

          <ellipse cx="450" cy="620" rx="360" ry="230" fill="url(#rg-ambient)" />
          <path d="M55 620 A395 395 0 0 1 845 620 L748 620 A298 298 0 0 0 152 620 Z" fill="url(#lg-arcface)" opacity="0.96" />
          <path d="M152 620 A298 298 0 0 1 748 620 L670 620 A220 220 0 0 0 230 620 Z" fill="url(#rg-innercap)" />
          <path d="M230 620 A220 220 0 0 1 670 620 L602 620 A152 152 0 0 0 298 620 Z" fill="#0a1422" />
          <path d="M298 620 A152 152 0 0 1 602 620 Z" fill="#07090f" />
          <path d="M55 620 A395 395 0 0 1 845 620" stroke="rgba(147,197,253,0.18)" strokeWidth="1.2" />
        </svg>


        <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-[15%] text-center px-4 pointer-events-none">
          <h1 className="text-[clamp(32px,5.8vw,68px)] font-bold text-white leading-none tracking-[-0.03em] mb-3">
            Your Voice,{" "}
            <span className="text-blue-400/90">Decoded.</span>
          </h1>
          <p className="text-white/42 text-[clamp(12px,1.3vw,15px)] leading-relaxed mb-6">
            Upload any MP3 and get an instant transcript with<br />
            speed, confidence, filler words &amp; stammer analysis.
          </p>
          <div className="pointer-events-auto flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium text-sm cursor-pointer transition-all shadow-[0_8px_32px_rgba(37,99,235,0.32)] hover:scale-[1.03]">
              <UploadIcon />
              Upload MP3
              <input type="file" accept=".mp3,audio/*" className="hidden" onChange={handleFileChange} />
            </label>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 text-white/75 hover:text-white text-sm transition-all">
              <PlayIcon />
              See a demo
            </button>
          </div>
        </div>


        <div className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-none">
          {[
            { color: "#60a5fa", label: "Speed", value: "142 wpm" },
            { color: "#34d399", label: "Confidence", value: "87%" },
            { color: "#f59e0b", label: "Filler words", value: "14" },
            { color: "#f87171", label: "Stammers", value: "3" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
              <span className="text-[11px] text-white/45">{m.label}</span>
              <span className="text-[11px] text-white/80 font-medium">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 4l3-3 3 3M2 10.5h10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" />
      <path d="M5 4.5l4 2-4 2V4.5z" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}
