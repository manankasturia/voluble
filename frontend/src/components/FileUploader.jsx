import { useRef, useState } from "react";

// click to upload / drag-drop / "or" / record
//  onFileChange receives a native change-event-shaped object so Dashboard's
//  existing handler (e.target.files[0]) keeps working unmodified.
export default function FileUploader({ onFileChange, disabled }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const ACCEPT = "audio/wav,audio/mpeg,audio/mp3,audio/mp4,audio/x-m4a,audio/ogg,audio/webm";

  function triggerPick() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFileChange({ target: { files: [file] } });
  }

  return (
    <div
      onClick={triggerPick}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer px-8 py-14 flex flex-col items-center text-center
        ${dragOver ? "border-blue-400/60 bg-blue-500/[0.06]" : "border-white/[0.12] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.18]"}
        ${disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={onFileChange}
        className="hidden"
        disabled={disabled}
      />

      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5">
        <FileIcon />
      </div>

      <p className="text-white font-medium text-base mb-1">
        Click to upload, or drag and drop
      </p>
      <p className="text-white/35 text-sm">
        MP3, WAV, M4A or OGG — up to 50MB
      </p>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M11.5 2.5H5.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7L11.5 2.5Z"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M11.3 2.5V7h4.2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 10v5M7.7 12.3H12.3" stroke="#60a5fa" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}