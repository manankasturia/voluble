import React, { useState } from "react";

const MetricsTab = ({ analysisResult }) => {
  const [metricsSubTab, setMetricsSubTab] = useState("fillerWords");

  // Calculate average volume in dB
  const getAverageVolume = () => {
    if (!analysisResult?.energiesDb) return 0;
    const validEnergies = analysisResult.energiesDb.filter(
      (e) => Number.isFinite(e) && e > -Infinity
    );
    if (validEnergies.length === 0) return 0;
    const sum = validEnergies.reduce((a, b) => a + b, 0);
    const avgDb = sum / validEnergies.length;

    // Normalize dB (-60 to 0) to percentage (0 to 100)
    const normalized = Math.max(0, Math.min(100, ((avgDb + 60) / 60) * 100));
    return { value: avgDb.toFixed(1), percentage: normalized };
  };

  const volumeData = getAverageVolume();

  return (
    <div>
      {/* Three Circular Meters */}
      <div className="flex justify-evenly items-center gap-16 mb-12">
        {/* Volume Meter */}
        <MetricMeter
          value={Math.round(volumeData.percentage)}
          percentage={volumeData.percentage}
          unit="%"
          label="Volume"
          color="#3b82f6"
        />

        {/* WPM Meter (placeholder) */}
        <MetricMeter
          value="—"
          percentage={0}
          unit="WPM"
          label="WPM"
          color="#8b5cf6"
        />

        {/* Confidence Meter (placeholder) */}
        <MetricMeter
          value="—"
          percentage={0}
          unit="%"
          label="Confidence meter"
          color="#10b981"
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
        {metricsSubTab === "fillerWords" && <FillerWordsContent />}
        {metricsSubTab === "weakWords" && <WeakWordsContent />}
        {metricsSubTab === "clarity" && <ClarityContent />}
        {metricsSubTab === "repetitiveWords" && <RepetitiveWordsContent />}
        {metricsSubTab === "pauses" && (
          <PausesContent pauses={analysisResult.pauses} />
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

  // Calculate needle angle (-90deg to +90deg based on percentage)
  const needleAngle = -90 + (percentage / 100) * 180;

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
const FillerWordsContent = () => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Filler Words</h3>
    <p className="text-gray-600">Analysis of filler words will appear here.</p>
  </div>
);

const WeakWordsContent = () => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Weak Words</h3>
    <p className="text-gray-600">
      Detection of weak/uncertain words will appear here.
    </p>
  </div>
);

const ClarityContent = () => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Clarity</h3>
    <p className="text-gray-600">Speech clarity metrics will appear here.</p>
  </div>
);

const RepetitiveWordsContent = () => (
  <div>
    <h3 className="text-2xl font-bold mb-4">Repetitive Words</h3>
    <p className="text-gray-600">
      Repeated words and phrases will be listed here.
    </p>
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
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <span className="text-base font-semibold text-gray-700 min-w-12">
              #{i + 1}
            </span>
            <div className="flex-1">
              <span className="text-sm text-gray-600">
                {(pause.startMs / 1000).toFixed(2)}s -{" "}
                {(pause.endMs / 1000).toFixed(2)}s
              </span>
            </div>
            <span className="text-base font-bold text-purple-600">
              {pause.durationMs.toFixed(0)}ms
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic">No pauses detected</p>
    )}
  </div>
);

export default MetricsTab;
