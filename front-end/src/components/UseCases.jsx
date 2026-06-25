const USE_CASES = [
  {
    role: "Public speakers",
    headline: "Know exactly what's holding your delivery back.",
    body: "Upload your rehearsal recordings and get a granular breakdown before you step on stage. Track progress session by session.",
    tag: "Practice",
  },
  {
    role: "Job seekers",
    headline: "Nail your interview before it happens.",
    body: "Record mock answers, analyse your filler words and pace, and walk in confident. Works with any voice memo app.",
    tag: "Coaching",
  },
  {
    role: "Podcasters",
    headline: "Cut editing time with a full stammer map.",
    body: "See every stumble, repetition, and filler before you open your DAW. Volube marks the timestamps so you don't have to.",
    tag: "Production",
  },
  {
    role: "Language learners",
    headline: "Fluency isn't just vocabulary — it's rhythm.",
    body: "Measure your speaking speed and confidence scores in a new language. Compare against native baselines and watch the gap close.",
    tag: "Learning",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
          Use cases
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Built for every voice.
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {USE_CASES.map((u) => (
          <div key={u.role} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
            <div className="flex-shrink-0 w-24">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/65">{u.tag}</span>
            </div>
            <div className="flex-shrink-0 w-44">
              <span className="text-white font-semibold text-base">{u.role}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/78 font-medium text-sm mb-1">{u.headline}</p>
              <p className="text-white/38 text-sm leading-relaxed">{u.body}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 text-sm text-blue-400 group-hover:gap-2 transition-all">
                Learn more
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M8 4l2.5 2.5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
