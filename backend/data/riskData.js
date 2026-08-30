export function getPrototypeRisk(location = "Chennai") {
  return {
    source: "prototype_demo_data",
    location,
    risk_score: 78,
    risk_level: "HIGH",
    confidence: 0.82,
    risk_factors: [
      {
        factor: "Heavy rainfall",
        contribution: "High"
      },
      {
        factor: "Low-lying terrain",
        contribution: "Moderate"
      },
      {
        factor: "Historical flood susceptibility",
        contribution: "High"
      }
    ],
    risk_window: "Next 6–12 hours",
    advisory:
      "Avoid low-lying routes where possible and monitor official weather and emergency advisories.",
    generated_at: new Date().toISOString()
  };
}