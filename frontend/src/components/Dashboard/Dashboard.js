import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { analyzeArrayBuffer } from "../AudioAnalyzer/fileAudioAnalyzer";
import AudioPlayer from "./AudioPlayer";
import FileUploader from "./FileUploader";
import TranscriptTab from "./TranscriptTab";
import MetricsTab from "./MetricsTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transcript");
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiReview, setAiReview] = useState("");

  const { user } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAudioFile(file);
    setIsAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await analyzeArrayBuffer(arrayBuffer, {
        energyThresholdDb: -50,
        minPauseMs: 1000,
        frameSize: 2048,
        hopSize: 512,
      });
      setAnalysisResult(result);
      setTranscript("Transcription would be generated here.");
      setAiReview("AI review would be generated here.");
    } catch (error) {
      console.error("Error analyzing audio file:", error);
      alert(error?.message || "Could not analyze this file.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-indigo-600 font-bold mb-6">Dashboard</h1>
          <p className="mb-4 text-xl">Welcome, {user?.email}</p>

          {isAnalyzing && (
            <div className="text-blue-600 font-medium mb-4 text-lg">
              Analyzing audio...
            </div>
          )}

          <AudioPlayer audioFile={audioFile} isAnalyzing={isAnalyzing} />
        </div>

        {/* Tab Navigation */}
        {analysisResult && (
          <>
            <div className="border-b border-gray-300 mb-6">
              <div className="flex justify-evenly space-x-8">
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`px-8 py-4 text-lg font-medium border-b-2 transition ${
                    activeTab === "transcript"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Transcript
                </button>
                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`px-8 py-4 text-lg font-medium border-b-2 transition ${
                    activeTab === "metrics"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Metrics
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "transcript" ? (
              <TranscriptTab transcript={transcript} aiReview={aiReview} />
            ) : (
              <MetricsTab analysisResult={analysisResult} />
            )}
          </>
        )}

        {/* Upload Section */}
        {!audioFile && !isAnalyzing && (
          <FileUploader onFileChange={handleFileChange} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
