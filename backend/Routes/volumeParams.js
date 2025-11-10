import express from "express";
const router = express.Router();
import {
  getdata,
  getTranscription,
} from "../controllers/assemblyAIController.js";
import { combineData } from "../controllers/dataCombiner.js";
import { getGeminiAnalysis } from "../controllers/geminiService.js";
router.post("/getVolumeParams", async (req, res) => {
  try {
    const { pitchHz, volume, amplitudes, pauses, metrics, audioUrl, audioURL } =
      req.body;
    const audio = audioUrl || audioURL;
    if (!audio) {
      return res
        .status(400)
        .json({ success: false, message: "Audio URL is required." });
    }
    const transcriptId = await getTranscription(audio);
    const volumeData = { pitchHz, volume, amplitudes, pauses, metrics };
    console.log("Received volume data from client.");
    const assemblyData = await getdata(transcriptId);
    console.log("AssemblyAI data received.");

    const userAudioData = combineData(assemblyData, volumeData);
    const geminiAnalysis = await getGeminiAnalysis(userAudioData);
    console.log("Gemini analysis received.");
    res.json({ success: true, analysis: geminiAnalysis });
  } catch (error) {
    console.error("Internal Server Error in /getVolumeParams:", error.message);

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server.",
    });
  }
});

export default router;
