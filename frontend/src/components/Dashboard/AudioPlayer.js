import React from "react";

const AudioPlayer = ({ audioFile, isAnalyzing }) => {
  if (!audioFile || isAnalyzing) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-6">
      <audio
        controls
        src={URL.createObjectURL(audioFile)}
        className="w-full max-w-2xl"
      />
      <span className="text-sm text-gray-600">{audioFile.name}</span>
    </div>
  );
};

export default AudioPlayer;
