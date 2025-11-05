import express from 'express';
const router = express.Router();
import { getdata ,getTranscription} from '../../Controllers/assemblyAIController.js';
import { combineData } from '../../Controllers/dataCombiner.js';
router.post('/getVolumeParams', async (req, res) => {
  try {
    const { pitchHz, volume, amplitudes, pauses, metrics } = req.body;
    const transcriptId = await getTranscription(req.body.audioUrl);
   const volumeData = { pitchHz, volume, amplitudes, pauses, metrics };
    console.log("Received volume data from client.");
    const assemblyData = await getdata(transcriptId);
    console.log("AssemblyAI data received.");


    const userAudioData = combineData(assemblyData, volumeData);


    res.json({ success: true, data: userAudioData });
  } catch (error) {
    console.error("Internal Server Error in /getVolumeParams:", error.message);
    
    res.status(500).json({ 
      success: false, 
      message: "An unexpected error occurred on the server." 
    });
  }
});

export default router;