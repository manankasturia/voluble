/**
 * Same prop contract: transcript, aiReview (strings from analysisResult).
 */
export default function TranscriptTab({ transcript, aiReview }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card eyebrow="Word for word" title="Transcript">
        {transcript ? (
          <p className="text-white/70 text-[15px] leading-relaxed">"{transcript}"</p>
        ) : (
          <EmptyState text="Transcript will appear here once analysis completes." />
        )}
      </Card>

      <Card eyebrow="From Gemini" title="AI coach review">
        {aiReview ? (
          <p className="text-white/70 text-[15px] leading-relaxed">{aiReview}</p>
        ) : (
          <EmptyState text="Your personalised coaching summary will appear here." />
        )}
      </Card>
    </div>
  );
}

function Card({ eyebrow, title, children }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 md:p-8">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 mb-2 block">
        {eyebrow}
      </span>
      <h2 className="text-xl font-semibold text-white mb-5">{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({ text }) {
  return <p className="text-white/30 text-sm italic">{text}</p>;
}