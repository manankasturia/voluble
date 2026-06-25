import { useState } from "react";

/**
 * Same prop contract and field names as before: analysisResult.{words_per_minute,
 * confidence_score, filler_word_count, weak_word_count, clarity, repetitive_words,
 * pause_analysis}, plus energies[] for the volume meter. Only the visuals changed.
 */
export default function MetricsTab({ analysisResult, energies }) {
  const [sub, setSub] = useState("fillerWords");

  const getAverageVolume = () => {
    if (!energies) return { value: 0, percentage: 0 };
    const valid = energies.filter((e) => Number.isFinite(e) && e > -Infinity);
    if (valid.length === 0) return { value: 0, percentage: 0 };
    const avgDb = valid.reduce((a, b) => a + b, 0) / valid.length;
    const normalized = Math.max(0, Math.min(100, ((avgDb + 60) / 60) * 100));
    return { value: avgDb.toFixed(1), percentage: normalized };
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return "#34d399";
    if (score >= 60) return "#f59e0b";
    return "#f87171";
  };

  const volumeData = getAverageVolume();

  const TABS = [
    { key: "fillerWords", label: "Filler words" },
    { key: "weakWords", label: "Weak words" },
    { key: "clarity", label: "Clarity" },
    { key: "repetitiveWords", label: "Repetitive words" },
    { key: "pauses", label: "Pauses" },
  ];

  return (
    <div>
      {/* Three circular meters */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 mb-5">
        <div className="flex flex-wrap justify-center sm:justify-evenly items-center gap-10">
          <MetricMeter
            value={Math.round(volumeData.percentage) || "—"}
            percentage={volumeData.percentage}
            unit="%"
            label="Volume"
            color="#60a5fa"
          />
          <MetricMeter
            value={Math.round(analysisResult.words_per_minute) || "—"}
            percentage={(analysisResult.words_per_minute / 250) * 100}
            unit="WPM"
            label="Speech speed"
            color="#a78bfa"
          />
          <MetricMeter
            value={analysisResult.confidence_score ?? "—"}
            percentage={analysisResult.confidence_score}
            unit="%"
            label="Confidence"
            color={getConfidenceColor(analysisResult.confidence_score)}
          />
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-5 -mx-1 px-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setSub(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${sub === t.key
                ? "bg-blue-600 text-white"
                : "text-white/45 hover:text-white hover:bg-white/[0.05]"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 min-h-[22rem]">
        {sub === "fillerWords" && <FillerWordsContent count={analysisResult?.filler_word_count} />}
        {sub === "weakWords" && <WeakWordsContent count={analysisResult?.weak_word_count} />}
        {sub === "clarity" && <ClarityContent clarity={analysisResult?.clarity} />}
        {sub === "repetitiveWords" && <RepetitiveWordsContent words={analysisResult?.repetitive_words} />}
        {sub === "pauses" && <PausesContent pauses={analysisResult?.pause_analysis} />}
      </div>
    </div>
  );
}

function MetricMeter({ value, percentage, unit, label, color }) {
  const size = 152;
  const strokeWidth = 11;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const pct = Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : 0;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.62 }}>
        <svg width={size} height={size * 0.62}>
          <path
            d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-[11px] text-white/35">{unit}</div>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-white/55">{label}</p>
    </div>
  );
}

function FillerWordsContent({ count }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Filler words</h3>
      <div className="text-3xl font-bold text-amber-400 mb-4">{count || 0}</div>
      <p className="text-white/45 text-sm leading-relaxed">
        {count === 0
          ? "Great job — no filler words detected."
          : `You used ${count} filler word${count > 1 ? "s" : ""} like "uh", "um", "like", or "you know". Try to minimise these for clearer delivery.`}
      </p>
    </div>
  );
}

function WeakWordsContent({ count }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Weak words</h3>
      <div className="text-3xl font-bold text-purple-400 mb-4">{count || 0}</div>
      <p className="text-white/45 text-sm leading-relaxed">
        {count === 0
          ? "Excellent — no weak or uncertain language detected."
          : `${count} weak word${count > 1 ? "s" : ""} detected. Consider using more confident, direct phrasing.`}
      </p>
    </div>
  );
}

function ClarityContent({ clarity }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Clarity</h3>
      {clarity ? (
        <p className="text-white/60 text-[15px] leading-relaxed">{clarity}</p>
      ) : (
        <p className="text-white/30 text-sm italic">Speech clarity metrics will appear here.</p>
      )}
    </div>
  );
}

function RepetitiveWordsContent({ words }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Repetitive words</h3>
      {words && Object.keys(words).length > 0 ? (
        <div className="flex flex-col gap-3">
          {Object.entries(words).map(([word, suggestion]) => (
            <div key={word} className="rounded-xl border-l-2 border-blue-400/60 bg-blue-500/[0.06] p-4">
              <span className="inline-block bg-white/[0.08] px-3 py-1 rounded-md font-mono text-sm text-white/85 mb-2">
                "{word}"
              </span>
              <p className="text-white/50 text-sm leading-relaxed">
                <span className="text-white/70 font-medium">Suggestion: </span>
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/30 text-sm italic">Repeated words and phrases will be listed here.</p>
      )}
    </div>
  );
}

function PausesContent({ pauses }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Detected pauses</h3>
      {pauses && pauses.length > 0 ? (
        <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-1">
          {pauses.map((pause, i) => (
            <div
              key={i}
              className={`rounded-xl border-l-2 p-4 transition-colors ${pause.is_awkward
                  ? "border-red-400/60 bg-red-500/[0.05] hover:bg-red-500/[0.08]"
                  : "border-emerald-400/60 bg-emerald-500/[0.05] hover:bg-emerald-500/[0.08]"
                }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/75 text-sm font-medium">
                  Pause #{i + 1} at {(pause.start_ms / 1000).toFixed(2)}s
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${pause.is_awkward ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"
                    }`}
                >
                  {pause.is_awkward ? "Awkward" : "Natural"}
                </span>
              </div>
              <div className="text-white/35 text-xs mb-1.5">
                Duration: <span className="text-white/55 font-medium">{pause.duration_ms}ms</span>
                <span className="mx-2">·</span>
                {(pause.duration_ms / 1000).toFixed(2)}s
              </div>
              <p className="text-white/45 text-sm italic">{pause.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/30 text-sm italic">No pauses detected.</p>
      )}
    </div>
  );
}