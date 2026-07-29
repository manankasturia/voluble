const FEATURES = [
  {
    icon: "📝",
    title: "Instant transcript",
    desc: "Full word-for-word transcript generated in seconds. Timestamped, searchable, and exportable as PDF or text.",
  },
  {
    icon: "⚡",
    title: "Speech speed",
    desc: "Words-per-minute tracked across the entire recording and broken down segment by segment.",
  },
  {
    icon: "💬",
    title: "Filler word detection",
    desc: 'Every "um", "uh", "like", and "you know" flagged, counted, and shown in context within the transcript.',
  },
  {
    icon: "🔁",
    title: "Stammer analysis",
    desc: "Detects repetitions and false starts. Gives you a stammer index so you can track improvement over time.",
  },
  {
    icon: "📊",
    title: "Confidence score",
    desc: "Prosody and pacing combined into a single confidence metric - benchmarked against fluent speaker baselines.",
  },
  {
    icon: "🎯",
    title: "Actionable insights",
    desc: "Personalised suggestions after every analysis. Know exactly what to practice before your next talk.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
          What we measure
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Every dimension of your speech.
          <br />
          <span className="text-white/38">Nothing left unheard.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-[#07090f] p-8 hover:bg-[#0d1626] transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-xl mb-5 group-hover:bg-blue-600/20 transition-colors">
              {f.icon}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-white/42 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
