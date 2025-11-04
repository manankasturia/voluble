import express from "express";
import cors from "cors";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/transcript", (req, res) => {
  const { pitchHz, volume, pauses } = req.body;
  console.log("Received data: ", { pitchHz, volume, pauses });
  res.json({ success: true, message: "Data received successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
