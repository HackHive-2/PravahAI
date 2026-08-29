import { prototypeReports } from "./data/reportsData.js";
import { prototypeLocations } from "./data/locationsData.js";
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

app.get("/api/locations", (req, res) => {
  res.json({
    source: "prototype_demo_data",
    count: prototypeLocations.length,
    locations: prototypeLocations
  });
});

app.get("/api/reports", (req, res) => {
  res.json({
    source: "prototype_in_memory_data",
    count: prototypeReports.length,
    reports: prototypeReports
  });
});

app.post("/api/reports", (req, res) => {
  const { location, description, severity } = req.body;

  if (!location || !description) {
    return res.status(400).json({
      error: "location and description are required"
    });
  }

  const report = {
    id: `report-${Date.now()}`,
    location,
    description,
    severity: severity || "UNKNOWN",
    submitted_at: new Date().toISOString()
  };

  prototypeReports.push(report);

  res.status(201).json({
    message: "Prototype flood report submitted successfully",
    report
  });
});

app.listen(PORT, () => {
  console.log(`PravahAI backend running at http://localhost:${PORT}`);
});