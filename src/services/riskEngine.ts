// AegisLocal Decision Engine & API Emulation Service
// Implements deterministic risk formula, spatial route scoring & citizen feedback loop

import {
  RiskCell,
  RiskLevel,
  ConfidenceLevel,
  RiskFactorItem,
  RouteOption,
  EmergencyFacility,
  CitizenReport,
  OfficialAlert
} from '../types';
import {
  INITIAL_RISK_CELLS,
  CHENNAI_ROAD_SEGMENTS,
  EMERGENCY_FACILITIES,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_OFFICIAL_ALERTS,
  VELACHERY_TO_ADYAR_ROUTES,
  CHENNAI_NEIGHBOURHOODS
} from '../data/chennaiData';

export interface CalculatedRiskFactors {
  rainfall: RiskFactorItem;
  recentAccumulation: RiskFactorItem;
  terrain: RiskFactorItem;
  flowAccumulation: RiskFactorItem;
  historicalFlooding: RiskFactorItem;
  waterProximity: RiskFactorItem;
  citizenEvidence: RiskFactorItem;
  officialInformation: RiskFactorItem;
}

export function computeRiskScore(factors: {
  rainfall: number;
  recentAccumulation: number;
  terrain: number;
  flowAccumulation: number;
  historicalFlooding: number;
  waterProximity: number;
  citizenEvidence: number;
  officialInformation: number;
}): { score: number; level: RiskLevel; confidence: ConfidenceLevel } {
  // Transparent expert-defined starting weights for MVP (v1.2 Blueprint Section 5)
  const score = Math.round(
    100 * (
      0.25 * (factors.rainfall / 100) +
      0.15 * (factors.recentAccumulation / 100) +
      0.15 * (factors.terrain / 100) +
      0.10 * (factors.flowAccumulation / 100) +
      0.10 * (factors.historicalFlooding / 100) +
      0.10 * (factors.waterProximity / 100) +
      0.10 * (factors.citizenEvidence / 100) +
      0.05 * (factors.officialInformation / 100)
    )
  );

  let level: RiskLevel = 'LOW';
  if (score >= 75) level = 'CRITICAL';
  else if (score >= 50) level = 'HIGH';
  else if (score >= 25) level = 'MODERATE';

  // Confidence calculation based on availability of signals
  let confidence: ConfidenceLevel = 'HIGH';
  if (factors.citizenEvidence === 0 || factors.historicalFlooding === 0) {
    confidence = 'MODERATE';
  }

  return { score, level, confidence };
}

export function getFactorBreakdown(cell: RiskCell): RiskFactorItem[] {
  return [
    {
      id: 'rainfall',
      name: 'Rainfall Pressure',
      weight: 0.25,
      score: cell.rainfallScore,
      description: 'Forecast precipitation accumulation rate over 3-6 hr interval (Open-Meteo & IMD radar inputs).',
      source: 'Open-Meteo & IMD Chennai',
      sourceCategory: 'OPEN_DATA',
      dataStatus: 'CACHED',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'recentAccumulation',
      name: 'Recent Accumulation',
      weight: 0.15,
      score: cell.recentAccumulationScore,
      description: 'Antecedent precipitation loading over the previous 12 hours saturating local soil.',
      source: 'Chennai Flood Monitoring (CFM-DSS)',
      sourceCategory: 'OFFICIAL',
      dataStatus: 'CACHED',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'terrain',
      name: 'Terrain Susceptibility',
      weight: 0.15,
      score: cell.terrainScore,
      description: 'Copernicus DEM 30m derived elevation and slope gradient indicating natural bowl depression.',
      source: 'Copernicus DEM GLO-30',
      sourceCategory: 'OPEN_DATA',
      dataStatus: 'CACHED',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'flowAccumulation',
      name: 'Flow Accumulation',
      weight: 0.10,
      score: cell.flowAccumulationScore,
      description: 'Calculated surface hydrologic upstream catchment convergence toward micro-drains.',
      source: 'Terrain Hydro Processing',
      sourceCategory: 'OPEN_DATA',
      dataStatus: 'CACHED',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'historicalFlooding',
      name: 'Historical Flooding',
      weight: 0.10,
      score: cell.historyScore,
      description: 'Bhuvan / NRSC satellite inundation footprints from 2015 and 2023 flood events.',
      source: 'Bhuvan / NRSC Disaster Portal',
      sourceCategory: 'OFFICIAL',
      dataStatus: 'HISTORICAL',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'waterProximity',
      name: 'Water Body Proximity',
      weight: 0.10,
      score: cell.waterScore,
      description: 'Distance to mapped lake embankments, river banks, and overflow drainage paths.',
      source: 'TNGIS & GCC Public GIS',
      sourceCategory: 'OFFICIAL',
      dataStatus: 'CACHED',
      evidenceConfidence: 'HIGH'
    },
    {
      id: 'citizenEvidence',
      name: 'Citizen Observations',
      weight: 0.10,
      score: cell.citizenScore,
      description: 'Validated community reports with geo-tagged images, timestamps, and nearby corroborations.',
      source: 'AegisLocal Verified Reports',
      sourceCategory: 'CITIZEN',
      dataStatus: 'LIVE',
      evidenceConfidence: cell.citizenScore > 60 ? 'HIGH' : 'MODERATE'
    },
    {
      id: 'officialInformation',
      name: 'Official Information',
      weight: 0.05,
      score: cell.officialScore,
      description: 'Active municipal alerts, reservoir controlled discharge advisories, and GCC warnings.',
      source: 'TNSDMA & GCC Control Center',
      sourceCategory: 'OFFICIAL',
      dataStatus: 'LIVE',
      evidenceConfidence: 'HIGH'
    }
  ];
}

// Emulated Backend API endpoints to maintain alignment with the future FastAPI backend
export class AegisLocalApiService {
  private riskCells: RiskCell[] = [...INITIAL_RISK_CELLS];
  private citizenReports: CitizenReport[] = [...INITIAL_CITIZEN_REPORTS];
  private officialAlerts: OfficialAlert[] = [...INITIAL_OFFICIAL_ALERTS];
  private emergencyFacilities: EmergencyFacility[] = [...EMERGENCY_FACILITIES];

  // GET /risk/{lat}/{lon}
  async getRiskAtLocation(lat: number, lng: number): Promise<RiskCell | null> {
    // Find closest cell
    let closestCell = this.riskCells[0];
    let minDistance = Number.MAX_VALUE;

    for (const cell of this.riskCells) {
      const d = Math.hypot(cell.center.lat - lat, cell.center.lng - lng);
      if (d < minDistance) {
        minDistance = d;
        closestCell = cell;
      }
    }
    return closestCell;
  }

  // GET /risk/grid?bbox=...
  async getRiskGrid(): Promise<RiskCell[]> {
    return this.riskCells;
  }

  // GET /risk/{cell_id}/explanation
  async getCellExplanation(cellId: string): Promise<RiskFactorItem[]> {
    const cell = this.riskCells.find((c) => c.cellId === cellId) || this.riskCells[0];
    return getFactorBreakdown(cell);
  }

  // GET /reports
  async getCitizenReports(): Promise<CitizenReport[]> {
    return this.citizenReports;
  }

  // POST /reports
  async submitCitizenReport(reportData: Omit<CitizenReport, 'id' | 'timestamp' | 'evidenceConfidence' | 'citizenEvidenceScore' | 'verificationStatus'>): Promise<CitizenReport> {
    // Simulate AI pipeline validation
    const id = `REP-CHN-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} IST (Just now)`;

    const newReport: CitizenReport = {
      ...reportData,
      id,
      timestamp: timeStr,
      evidenceConfidence: reportData.aiFloodConfidence >= 80 ? 'HIGH' : 'MODERATE',
      citizenEvidenceScore: Math.round(reportData.aiFloodConfidence * 0.9),
      verificationStatus: 'PENDING',
      isIllustrativeDemo: true
    };

    this.citizenReports.unshift(newReport);

    // Update local risk cell citizenScore slightly without blindly turning entire area critical
    const targetCell = this.riskCells.find((c) => c.areaName.toLowerCase().includes(reportData.areaName.toLowerCase())) || this.riskCells[0];
    if (targetCell) {
      targetCell.citizenScore = Math.min(100, targetCell.citizenScore + 8);
      const updated = computeRiskScore({
        rainfall: targetCell.rainfallScore,
        recentAccumulation: targetCell.recentAccumulationScore,
        terrain: targetCell.terrainScore,
        flowAccumulation: targetCell.flowAccumulationScore,
        historicalFlooding: targetCell.historyScore,
        waterProximity: targetCell.waterScore,
        citizenEvidence: targetCell.citizenScore,
        officialInformation: targetCell.officialScore
      });
      targetCell.riskScore = updated.score;
      targetCell.riskLevel = updated.level;
      targetCell.evidenceConfidence = updated.confidence;
    }

    return newReport;
  }

  // POST /reports/{id}/verify
  async verifyReport(id: string, status: 'VERIFIED' | 'REJECTED'): Promise<CitizenReport | null> {
    const report = this.citizenReports.find((r) => r.id === id);
    if (!report) return null;

    report.verificationStatus = status;
    if (status === 'VERIFIED') {
      report.evidenceConfidence = 'HIGH';
      report.citizenEvidenceScore = Math.min(100, report.citizenEvidenceScore + 10);
    } else {
      report.evidenceConfidence = 'LOW';
    }

    return report;
  }

  // POST /route
  async calculateRoutes(origin: string, destination: string): Promise<RouteOption[]> {
    // Return the dual-route comparison for Chennai MVP (Fastest vs Lower-Risk)
    return VELACHERY_TO_ADYAR_ROUTES;
  }

  // GET /safe-locations
  async getSafeLocations(areaName?: string): Promise<EmergencyFacility[]> {
    return this.emergencyFacilities;
  }

  // GET /alerts
  async getAlerts(): Promise<OfficialAlert[]> {
    return this.officialAlerts;
  }

  // GET /dashboard/summary
  async getDashboardSummary() {
    const criticalCount = this.riskCells.filter((c) => c.riskLevel === 'CRITICAL').length + 6; // contextual demo count
    const highCount = this.riskCells.filter((c) => c.riskLevel === 'HIGH').length + 14;
    const totalReports = this.citizenReports.length + 38;
    const pendingVerification = this.citizenReports.filter((r) => r.verificationStatus === 'PENDING').length + 5;
    const affectedRoads = CHENNAI_ROAD_SEGMENTS.filter((r) => r.exposureLevel === 'HIGH' || r.exposureLevel === 'CRITICAL').length + 8;

    return {
      criticalZones: criticalCount,
      highRiskZones: highCount,
      citizenReports: totalReports,
      affectedRoads: affectedRoads,
      pendingVerification: pendingVerification,
      systemStatus: 'ACTIVE_MONITORING',
      lastUpdate: '18:42 IST'
    };
  }
}

export const apiService = new AegisLocalApiService();
