import FileUploader from "./FileUploader";
import AudioRecorder from "./AudioRecorder";


// combines FileUploader + "or" divider + AudioRecorder into one card

export default function UploadCard({ onFileChange, onRecorded, disabled }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
      <FileUploader onFileChange={onFileChange} disabled={disabled} />

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-white/30 text-xs font-medium uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      <AudioRecorder onRecorded={onRecorded} disabled={disabled} />
    </div>
  );
}