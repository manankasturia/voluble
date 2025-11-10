import React, { useState } from "react";

const MetricsTab = ({ analysisResult, energies }) => {
  const [metricsSubTab, setMetricsSubTab] = useState("fillerWords");

  // Calculate average volume in dB
  const getAverageVolume = () => {
    if (!energies) return 0;
    const validEnergies = energies.filter(
      (e) => Number.isFinite(e) && e > -Infinity
    );
    if (validEnergies.length === 0) return 0;
    const sum = validEnergies.reduce((a, b) => a + b, 0);
    const avgDb = sum / validEnergies.length;

    // Normalize dB (-60 to 0) to percentage (0 to 100)
    const normalized = Math.max(0, Math.min(100, ((avgDb + 60) / 60) * 100));
    return { value: avgDb.toFixed(1), percentage: normalized };
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#dc2626";
  };

  const volumeData = getAverageVolume();

  return (
    <div>
      {/* Three Circular Meters */}
      <div className="flex justify-evenly items-center gap-16 mb-12">
        {/* Volume Meter */}
        <MetricMeter
          value={Math.round(volumeData.percentage) || "-"}
          percentage={volumeData.percentage}
          unit="%"
          label="Volume"
          color="#3b82f6"
        />

        {/* WPM Meter (placeholder) */}
        <MetricMeter
          value={analysisResult.words_per_minute || "-"}
          percentage={(analysisResult.words_per_minute / 250) * 100} //Assuming max wpm as 250
          unit="WPM"
          label="WPM"
          color="#8b5cf6"
        />

        {/* Confidence Meter (placeholder) */}
        <MetricMeter
          value={analysisResult.confidence_score || "—"}
          percentage={analysisResult.confidence_score}
          unit="%"
          label="Confidence meter"
          color={getConfidenceColor(analysisResult.confidence_score)}
        />
      </div>

      {/* Sub-tabs for detailed metrics */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-evenly gap-1 overflow-x-auto">
          {[
            { key: "fillerWords", label: "Filler Words" },
            { key: "weakWords", label: "Weak Words" },
            { key: "clarity", label: "Clarity" },
            { key: "repetitiveWords", label: "Repetitive Words" },
            { key: "pauses", label: "Pauses" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMetricsSubTab(tab.key)}
              className={`px-6 py-3 text-base font-medium border-b-2 transition whitespace-nowrap ${
                metricsSubTab === tab.key
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab Content */}
      <div className="bg-white rounded-lg shadow-md p-8 min-h-96">
        {metricsSubTab === "fillerWords" && (
          <FillerWordsContent count={analysisResult?.filler_word_count} />
        )}
        {metricsSubTab === "weakWords" && (
          <WeakWordsContent count={analysisResult?.weak_word_count} />
        )}
        {metricsSubTab === "clarity" && (
          <ClarityContent clarity={analysisResult?.clarity} />
        )}
        {metricsSubTab === "repetitiveWords" && (
          <RepetitiveWordsContent words={analysisResult?.repetitive_words} />
        )}
        {metricsSubTab === "pauses" && (
          <PausesContent pauses={analysisResult?.pause_analysis} />
        )}
      </div>
    </div>
  );
};

// Metric Meter Component
const MetricMeter = ({ value, percentage, unit, label, color }) => {
  // SVG arc parameters
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle

  // Calculate dash offset based on percentage (0-100)
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.65 }}>
        <svg width={size} height={size * 0.65} className="transform -rotate-0">
          {/* Background arc */}
          <path
            d={`M ${strokeWidth / 2} ${center}
                A ${radius} ${radius} 0 0 1 ${
              size - strokeWidth / 2
            } ${center}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Colored progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${center}
                A ${radius} ${radius} 0 0 1 ${
              size - strokeWidth / 2
            } ${center}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>

        {/* Value display */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-xs text-gray-600">{unit}</div>
        </div>
      </div>

      <p className="mt-2 text-lg font-medium text-gray-700">{label}</p>
    </div>
  );
};

// Placeholder content components
const FillerWordsContent = ({ count }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Filler Words</h3>
    <div className="text-3xl font-bold text-orange-600 mb-4">{count || 0}</div>
    <p className="text-gray-600">
      {count === 0
        ? "Great Job! No filler words detected."
        : `You used ${count} filler word${
            count > 1 ? "s" : ""
          } like "uh", "um", "like", etc. Try to minimize these for clearer communication.`}
    </p>
  </div>
);

const WeakWordsContent = ({ count }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Weak Words</h3>
    <div className="text-3xl font-bold text-purple-600 mb-4">{count || 0}</div>
    <p className="text-gray-600">
      {count === 0
        ? "Excellent! No weak or uncertain words detected."
        : `${count} weak word${
            count > 1 ? "s" : ""
          } detected. Consider using stronger, more confident language.`}
    </p>
  </div>
);

const ClarityContent = ({ clarity }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Clarity</h3>
    {clarity ? (
      <p className="text-gray-700 leading-relaxed">{clarity}</p>
    ) : (
      <p className="text-gray-600">Speech clarity metrics will appear here.</p>
    )}
  </div>
);

const RepetitiveWordsContent = ({ words }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Repetitive Words</h3>
    {words && Object.keys(words).length > 0 ? (
      <div className="space-y-4">
        {Object.entries(words).map(([word, suggestion]) => (
          <div
            key={word}
            className="bg-blue-50 p-4 rounded-lg border-l-4 border-indigo-400"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-indigo-200 px-4 py-2 rounded font-mono text-lg font-bold">
                "{word}"
              </span>
              <span className="text-2xl">→</span>
            </div>
            <p className="text-gray-700 ml-2">
              <strong>Suggestion:</strong> {suggestion}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">
        Repeated words and phrases will be listed here.
      </p>
    )}
  </div>
);

const PausesContent = ({ pauses }) => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Detected Pauses</h3>
    {pauses && pauses.length > 0 ? (
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {pauses.map((pause, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border-l-4 ${
              pause.is_awkward
                ? "bg-red-50 border-red-500 hover:bg-red-100 transition duration-200"
                : "bg-green-50 border-green-500 hover:bg-green-100 transition duration-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">
                Pause #{i + 1} at {(pause.start_ms / 1000).toFixed(2)}s
              </span>
              <span
                className={`px-3 py-1 rounded text-sm font-bold ${
                  pause.is_awkward
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {pause.is_awkward ? "⚠ Awkward" : "✓ Natural"}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Duration: <strong>{pause.duration_ms}ms</strong>
              <span className="mx-2">•</span>
              {(pause.duration_ms / 1000).toFixed(2)}s
            </div>
            <p className="text-gray-700 italic">{pause.reason}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic">No pauses detected</p>
    )}
  </div>
);

export default MetricsTab;
