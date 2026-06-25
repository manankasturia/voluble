/**
 * Past-analyses list. NEW component — there was no equivalent in the old
 * dashboard, so there's no existing backend contract to preserve here.
 *
 * Expects `items` shaped like:
 *   { id, fileName, createdAt (ISO string), durationSec, words_per_minute,
 *     confidence_score, filler_word_count }
 *
 * Wire this to a real endpoint by replacing the `items` prop in Dashboard
 * with e.g. a fetch to `${API_BASE}/history?uid=...` that returns saved
 * analysisResult rows (you're already producing this exact shape per
 * analysis — just persist it server-side keyed by user).
 */
export default function HistoryList({ items = [], onSelect, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-xl" style={shimmerStyle(i)} />
          ))}
        </div>
        <style>{shimmerKeyframes}</style>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
        <p className="text-white/30 text-sm">
          No analyses yet — upload or record your first clip above.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden divide-y divide-white/[0.06]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect?.(item)}
          className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/[0.03] transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
            <ClipIcon />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white/85 text-sm font-medium truncate">{item.fileName || "Untitled recording"}</p>
            <p className="text-white/30 text-xs mt-0.5">{formatRelativeDate(item.createdAt)}</p>
          </div>

          <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
            <Stat label="WPM" value={item.words_per_minute} />
            <Stat label="Confidence" value={item.confidence_score != null ? `${item.confidence_score}%` : "—"} />
            <Stat label="Fillers" value={item.filler_word_count} />
          </div>

          <ChevronIcon />
        </button>
      ))}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-right">
      <p className="text-white/75 text-sm font-medium tabular-nums">{value ?? "—"}</p>
      <p className="text-white/25 text-[11px] uppercase tracking-wide">{label}</p>
    </div>
  );
}

function formatRelativeDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffH = diffMs / 36e5;
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${Math.floor(diffH)}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function shimmerStyle(i) {
  return {
    background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",
    backgroundSize: "200% 100%",
    animation: "hist-shimmer 1.6s linear infinite",
    animationDelay: `${i * 0.1}s`,
  };
}
const shimmerKeyframes = `
  @keyframes hist-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

function ClipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1 8h2M3 8V5.5M3 5.5V10.5M5 8v-3M5 5v6M7 8V3M7 3v10M9 8V5M9 5v6M11 8V6M11 6v4M13 8v-1.5M13 6.5v3M15 8h-2" stroke="#60a5fa" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <path d="M6 4l4 4-4 4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}