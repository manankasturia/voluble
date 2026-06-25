import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { analyzeArrayBuffer } from "./AudioAnalyzer/fileAudioAnalyzer";
import AudioPlayer from "./AudioPlayer";
import UploadCard from "./UploadCard";
import AnalysisProgress from "./AnalysisProgress";
import TranscriptTab from "./TranscriptTab";
import MetricsTab from "./MetricsTab";
import HistoryList from "./HistoryList";

/**
 * BACKEND CONTRACT — UNCHANGED FROM OLD DASHBOARD:
 *   1. POST {API_BASE}/upload  (FormData "audio")  -> { fileUrl }
 *   2. analyzeArrayBuffer(arrayBuffer, opts, audioURL)
 *        -> decodes audio, runs YIN pitch + pause detection client-side,
 *           POSTs to /frontend/getVolumeParams, returns:
 *           { geminiAnalysis: { analysis: {...} }, energies }
 *   3. analysisResult fields read: words_per_minute, confidence_score,
 *      filler_word_count, weak_word_count, clarity, repetitive_words,
 *      pause_analysis, transcript, summary_review
 *
 * Only new things: `phase` state drives AnalysisProgress (was a single
 * "Analyzing audio..." string before), and a `history` list + HistoryList
 * component for past analyses (no prior backend endpoint existed for this —
 * see HistoryList.jsx for the expected shape to wire up).
 */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transcript");
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [energies, setEnergies] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phase, setPhase] = useState(null); // "uploading" | "measuring" | "thinking" | null
  const [transcript, setTranscript] = useState("");
  const [aiReview, setAiReview] = useState("");
  const [history, setHistory] = useState([]); // TODO: hydrate from a real /history endpoint

  const { user } = useAuth();
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

  const runPipeline = async (file, arrayBufferSource) => {
    setPhase("uploading");
    const formData = new FormData();
    formData.append("audio", file);

    const uploadResponse = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok) {
      throw new Error(uploadData.message || "Upload failed");
    }
    const audioURL = uploadData.fileUrl;

    setPhase("measuring");
    const arrayBuffer = await arrayBufferSource();

    // analyzeArrayBuffer internally also calls Gemini (getVolumeParams) — we
    // flip to "thinking" just before that network round trip starts so the
    // stepper reflects reality as closely as the current API shape allows.
    setPhase("thinking");
    const finalResult = await analyzeArrayBuffer(
      arrayBuffer,
      { energyThresholdDb: -50, minPauseMs: 1000, frameSize: 2048, hopSize: 512 },
      audioURL,
    );

    const analysis = finalResult.geminiAnalysis.analysis;
    setAnalysisResult(analysis);
    setEnergies(finalResult.energies);
    setTranscript(analysis.transcript);
    setAiReview(analysis.summary_review);
    setActiveTab("transcript");

    // Append to local history (swap for a server round-trip once a save
    // endpoint exists — see HistoryList.jsx header comment)
    setHistory((h) => [
      {
        id: `${Date.now()}`,
        fileName: file.name,
        createdAt: new Date().toISOString(),
        words_per_minute: analysis.words_per_minute,
        confidence_score: analysis.confidence_score,
        filler_word_count: analysis.filler_word_count,
      },
      ...h,
    ]);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("File not uploaded.");
      return;
    }

    setAudioFile(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      await runPipeline(file, () => file.arrayBuffer());
    } catch (error) {
      console.error("Error analyzing audio file:", error);
      alert(error?.message || "Could not analyze this file.");
    } finally {
      setIsAnalyzing(false);
      setPhase(null);
    }
  };

  const handleRecording = async (blob) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const filename = `recording.${
        blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm"
      }`;
      const file = new File([blob], filename, { type: blob.type });
      setAudioFile(file);

      await runPipeline(file, () => blob.arrayBuffer());
    } catch (error) {
      console.error("Error analyzing audio file:", error);
      alert(error?.message || "Could not analyze this file.");
    } finally {
      setIsAnalyzing(false);
      setPhase(null);
    }
  };

  const startNewAnalysis = () => {
    setAudioFile(null);
    setAnalysisResult(null);
    setEnergies(null);
    setTranscript("");
    setAiReview("");
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white">
      <Navbar />

      {/* Grid bg, matches Hero / Howitworks */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(96,165,250,0.05) 1px,transparent 1px),
                            linear-gradient(to bottom,rgba(96,165,250,0.05) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-3 block">
            Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}.
          </h1>
          <p className="text-white/38 text-sm">
            Upload a recording or record one now to get your speech breakdown.
          </p>
        </div>

        {/* Upload / record entry point */}
        {!audioFile && !isAnalyzing && (
          <UploadCard onFileChange={handleFileChange} onRecorded={handleRecording} />
        )}

        {/* In-flight analysis */}
        {isAnalyzing && <AnalysisProgress phase={phase} fileName={audioFile?.name} />}

        {/* Result state */}
        {audioFile && !isAnalyzing && (
          <div className="flex flex-col gap-6">
            <AudioPlayer audioFile={audioFile} isAnalyzing={isAnalyzing} />

            {analysisResult && (
              <>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
                    {[
                      { key: "transcript", label: "Transcript" },
                      { key: "metrics", label: "Metrics" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeTab === t.key
                            ? "bg-blue-600 text-white"
                            : "text-white/45 hover:text-white"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={startNewAnalysis}
                    className="text-white/45 hover:text-white text-sm transition-colors"
                  >
                    New analysis
                  </button>
                </div>

                {activeTab === "transcript" ? (
                  <TranscriptTab transcript={transcript} aiReview={aiReview} />
                ) : (
                  <MetricsTab analysisResult={analysisResult} energies={energies} />
                )}
              </>
            )}
          </div>
        )}

        {/* History */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Past analyses</h2>
          </div>
          <HistoryList
            items={history}
            onSelect={(item) => {
              // Local-history click is a no-op for now since full results
              // aren't persisted yet — wire this to re-fetch a saved
              // analysisResult by item.id once a /history/:id endpoint exists.
              console.log("Selected history item:", item);
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;