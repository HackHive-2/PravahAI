// AEGISLOCAL TypeScript Definitions
// Aligned with Master Project Blueprint v1.2 & SIH 2026 Disaster Management Specifications

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type ConfidenceLevel = 'LOW' | 'MODERATE' | 'HIGH';
export type VerificationStatus = 'PENDING' | 'AI_SUPPORTED' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type SourceCategory = 'OFFICIAL' | 'OPEN_DATA' | 'CITIZEN';
export type DataStatus = 'LIVE' | 'CACHED' | 'HISTORICAL' | 'ILLUSTRATIVE';
export type SeverityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface RiskFactorItem {
  id: string;
  name: string;
  weight: number; // e.g. 0.25
  score: number; // 0-100
  description: string;
  source: string;
  sourceCategory: SourceCategory;
  dataStatus: DataStatus;
  evidenceConfidence: ConfidenceLevel;
}

export interface RiskCell {
  cellId: string;
  areaName: string;
  bounds: [[number, number], [number, number]]; // Leaflet LatLngBoundsExpression
  center: GeoPoint;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  evidenceConfidence: ConfidenceLevel;
  rainfallScore: number;
  recentAccumulationScore: number;
  terrainScore: number;
  flowAccumulationScore: number;
  historyScore: number;
  waterScore: number;
  citizenScore: number;
  officialScore: number;
  riskWindow: {
    start: string;
    end: string;
    confidence: ConfidenceLevel;
    primaryDriver: string;
  };
  keyContributors: string[];
  updatedAt: string;
  exposedRoadCount: number;
}

export interface RoadSegment {
  id: string;
  name: string;
  area: string;
  coordinates: [number, number][];
  exposureLevel: RiskLevel;
  modeledRisk: number; // 0-100
  status: 'MODELED_HIGH_RISK' | 'OFFICIALLY_CLOSED' | 'CITIZEN_REPORTED_OBSTRUCTION' | 'PASSABLE';
  lengthKm: number;
  description: string;
  nearCellId: string;
}

export interface WaterBody {
  id: string;
  name: string;
  type: 'RIVER' | 'LAKE' | 'CANAL' | 'MARSHLAND';
  coordinates: [number, number][];
  waterLevelStatus: 'NORMAL' | 'ELEVATED' | 'OVERFLOW_WARNING';
  source: string;
}

export interface HistoricalFloodPolygon {
  id: string;
  eventName: string; // e.g. "Chennai 2015 Historic Inundation Footprint"
  year: number;
  coordinates: [number, number][];
  severity: string;
  source: 'Bhuvan / NRSC' | 'TNGIS';
}

export interface EmergencyFacility {
  id: string;
  name: string;
  category: 'RELIEF_CENTRE' | 'HOSPITAL' | 'SHELTER' | 'EMERGENCY_SERVICE';
  location: GeoPoint;
  address: string;
  distanceKm: number;
  verified: boolean;
  status: 'OPEN' | 'HIGH_CAPACITY' | 'READY';
  capacity: {
    current: number;
    total: number;
  };
  contact: string;
  surroundingRiskLevel: RiskLevel;
  accessibilityScore: number; // 0-100
  verifiedBy: string;
  updatedAt: string;
}

export interface CitizenReport {
  id: string;
  areaName: string;
  location: GeoPoint;
  timestamp: string;
  imageUrl: string;
  imageThumbnail?: string;
  description: string;
  reportedSeverity: SeverityLevel;
  aiClassification: 'FLOOD / WATER ACCUMULATION' | 'NON-FLOOD / DRY';
  aiFloodConfidence: number; // 0-100 (e.g. 87)
  imageQuality: 'GOOD' | 'FAIR' | 'POOR';
  locationConfidence: ConfidenceLevel;
  timestampFreshness: ConfidenceLevel;
  nearbyCorroborations: number;
  evidenceConfidence: ConfidenceLevel;
  citizenEvidenceScore: number; // 0-100
  verificationStatus: VerificationStatus;
  isIllustrativeDemo?: boolean;
}

export interface OfficialAlert {
  id: string;
  title: string;
  category: SourceCategory; // OFFICIAL, OPEN_DATA, CITIZEN
  sourceName: string;
  location: string;
  severity: SeverityLevel;
  headline: string;
  details: string;
  advisoryActions: string[];
  timestamp: string;
  validUntil: string;
  status: 'ACTIVE' | 'MONITORING' | 'RESOLVED';
}

export interface RouteOption {
  id: 'FASTEST' | 'LOWER_RISK';
  name: string;
  routeTypeBadge: 'FASTEST ROUTE' | 'LOWER-RISK ROUTE';
  durationMin: number;
  distanceKm: number;
  modeledRisk: RiskLevel;
  riskScore: number;
  exposedSegmentsCount: number;
  exposedRoads: string[];
  coordinates: [number, number][];
  recommendation: boolean;
  notes: string;
  evidenceConfidence: ConfidenceLevel;
}

export interface WeatherDataPoint {
  time: string;
  rainfallMm: number;
  accumulatedMm: number;
  trend: 'RISING' | 'STABLE' | 'FALLING';
}

export interface ChennaiNeighbourhood {
  id: string;
  name: string;
  center: GeoPoint;
  baseRisk: RiskLevel;
  score: number;
  description: string;
  populationDensity: string;
  elevationMeters: number;
}

export interface SIHTourStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  targetView: 'overview' | 'map' | 'route' | 'report' | 'emergency' | 'alerts' | 'dashboard' | 'methodology';
  explanation: string;
  suggestedAction: string;
}
