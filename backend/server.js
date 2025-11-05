import express from "express";
import cors from "cors";
import volumeParams from './Routes/frontendRoutes/volumeParams.js';
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/frontend',volumeParams);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
