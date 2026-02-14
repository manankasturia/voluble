import express from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import volumeParams from "./Routes/volumeParams.js";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const ASSEMBLYAI_API_KEY = process.env.assembly_apikey;
const ASSEMBLYAI_UPLOAD_URL = "https://api.assemblyai.com/v2/upload";
const BACKEND_URL =
  process.env.REACT_APP_API_BASE || `http://localhost:${port}`;

app.use(`${BACKEND_URL}/frontend`, volumeParams);

app.post(`${BACKEND_URL}/upload`, upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const uploadResponse = await axios.post(
      ASSEMBLYAI_UPLOAD_URL,
      req.file.buffer,
      { headers: { Authorization: ASSEMBLYAI_API_KEY } },
    );

    res.json({ fileUrl: uploadResponse.data.upload_url });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
