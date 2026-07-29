
// renders nothing while analyzing or with no file
// uses the browser's native <audio> element (createObjectURL unchanged)
export default function AudioPlayer({ audioFile, isAnalyzing }) {
  if (!audioFile || isAnalyzing) return null;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-shrink-0 sm:w-56">
        <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
          <SoundIcon />
        </div>
        <span className="text-white/65 text-sm truncate">{audioFile.name}</span>
      </div>

      <audio
        controls
        src={URL.createObjectURL(audioFile)}
        className="w-full"
        style={{ filter: "invert(0.88) hue-rotate(180deg) contrast(0.9)" }}
      />
    </div>
  );
}

function SoundIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6v4h2.5l3.5 3V3l-3.5 3H2Z" fill="#60a5fa" />
      <path d="M11 5.5a3.5 3.5 0 0 1 0 5" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}