import React from "react";

const FileUploader = ({ onFileChange }) => {
  return (
    <div className="mt-12 text-center">
      <label className="inline-block cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-lg font-medium shadow-lg">
        Upload Audio File
        <input
          type="file"
          accept="audio/wav,audio/mpeg,audio/mp3,audio/mp4,audio/x-m4a,audio/ogg"
          onChange={onFileChange}
          className="hidden"
        />
      </label>
      <p className="text-sm text-gray-600 mt-4">
        Supported formats: WAV, MP3, M4A, OGG
      </p>
    </div>
  );
};

export default FileUploader;
