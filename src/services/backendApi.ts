const BACKEND_URL = "http://localhost:5000";

export interface BackendReportRequest {
  location: string;
  description: string;
  severity: string;
}

export interface BackendReportResponse {
  message: string;
  report: {
    id: string;
    location: string;
    description: string;
    severity: string;
    submitted_at: string;
  };
}

export async function submitReportToBackend(
  report: BackendReportRequest
): Promise<BackendReportResponse> {
  const response = await fetch(`${BACKEND_URL}/api/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(report)
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.error || "Failed to submit flood report"
    );
  }

  return response.json();
}