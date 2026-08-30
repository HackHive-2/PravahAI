import { prototypeEmergencyLocations } from "../backend/data/emergencyLocationsData.js";

export default function handler(req, res) {
  res.status(200).json({
    source: "prototype_demo_data",
    count: prototypeEmergencyLocations.length,
    locations: prototypeEmergencyLocations
  });
}