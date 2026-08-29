import express from "express";
import cors from "cors";
import { getPrototypeRisk } from "./data/riskData.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PravahAI Backend Prototype is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "PravahAI Backend Prototype"
  });
});

app.get("/api/risk", (req, res) => {
  const location = req.query.location || "Chennai";
  const risk = getPrototypeRisk(location);
  res.json(risk);
});

app.listen(PORT, () => {
  console.log(`PravahAI backend running at http://localhost:${PORT}`);
});