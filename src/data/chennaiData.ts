// Comprehensive Chennai Geospatial, Risk Grid, Routes, and Emergency Data
// Master Project Blueprint v1.2 Specifications for AegisLocal (SIH 2026)

import {
  ChennaiNeighbourhood,
  RiskCell,
  RoadSegment,
  WaterBody,
  HistoricalFloodPolygon,
  EmergencyFacility,
  CitizenReport,
  OfficialAlert,
  RouteOption,
  WeatherDataPoint,
  SIHTourStep
} from '../types';

export const CHENNAI_NEIGHBOURHOODS: ChennaiNeighbourhood[] = [
  {
    id: 'velachery',
    name: 'Velachery',
    center: { lat: 12.9815, lng: 80.2180 },
    baseRisk: 'HIGH',
    score: 72,
    description: 'Low-lying depression adjacent to Pallikaranai marshland with heavy urban runoff accumulation.',
    populationDensity: 'High (18,400/km²)',
    elevationMeters: 4.8
  },
  {
    id: 'anna_nagar',
    name: 'Anna Nagar',
    center: { lat: 13.0878, lng: 80.2184 },
    baseRisk: 'CRITICAL',
    score: 78,
    description: 'Otteri Nullah catchment confluence experiencing intense localized inundation and blocked micro-drains.',
    populationDensity: 'High (21,200/km²)',
    elevationMeters: 7.2
  },
  {
    id: 'adyar',
    name: 'Adyar',
    center: { lat: 13.0012, lng: 80.2565 },
    baseRisk: 'HIGH',
    score: 64,
    description: 'Adyar river downstream estuary zone vulnerable to high-tide river backflow and storm surge pressure.',
    populationDensity: 'Medium-High (14,100/km²)',
    elevationMeters: 3.5
  },
  {
    id: 't_nagar',
    name: 'T. Nagar',
    center: { lat: 13.0418, lng: 80.2341 },
    baseRisk: 'MODERATE',
    score: 48,
    description: 'Commercial core bordering Mambalam Canal; moderate surface runoff with localized waterlogging.',
    populationDensity: 'Very High (29,000/km²)',
    elevationMeters: 9.1
  },
  {
    id: 'tambaram',
    name: 'Tambaram',
    center: { lat: 12.9249, lng: 80.1275 },
    baseRisk: 'MODERATE',
    score: 31,
    description: 'Southern suburban highland corridor with moderate slope; low-lying culvert zones under watch.',
    populationDensity: 'Moderate (9,800/km²)',
    elevationMeters: 28.4
  },
  {
    id: 'madipakkam',
    name: 'Madipakkam',
    center: { lat: 12.9647, lng: 80.1961 },
    baseRisk: 'HIGH',
    score: 70,
    description: 'Southern suburban basin receiving overflow from Madipakkam Lake and surrounding road levels.',
    populationDensity: 'High (16,000/km²)',
    elevationMeters: 5.1
  },
  {
    id: 'guindy',
    name: 'Guindy',
    center: { lat: 13.0067, lng: 80.2026 },
    baseRisk: 'MODERATE',
    score: 42,
    description: 'Industrial and transit hub with mixed elevation profile; Kathipara junction elevated.',
    populationDensity: 'High (17,500/km²)',
    elevationMeters: 12.0
  }
];

// 100m x 100m Conceptual Risk Grid cells across Chennai hot spots
export const INITIAL_RISK_CELLS: RiskCell[] = [
  {
    cellId: 'CHN-VEL-0421',
    areaName: 'Velachery',
    center: { lat: 12.9815, lng: 80.2180 },
    bounds: [[12.9775, 80.2140], [12.9855, 80.2220]],
    riskScore: 72,
    riskLevel: 'HIGH',
    evidenceConfidence: 'HIGH',
    rainfallScore: 82,
    recentAccumulationScore: 70,
    terrainScore: 76,
    flowAccumulationScore: 73,
    historyScore: 68,
    waterScore: 61,
    citizenScore: 55,
    officialScore: 70,
    riskWindow: {
      start: '18:00',
      end: '23:00',
      confidence: 'MODERATE',
      primaryDriver: 'Forecast rainfall accumulation + terrain susceptibility'
    },
    keyContributors: [
      'Heavy rainfall (82/100)',
      'Low-lying terrain (76/100)',
      'High flow accumulation (73/100)',
      'Historical flood exposure (68/100)',
      'Recent citizen observations (55/100)'
    ],
    updatedAt: '18:42 IST',
    exposedRoadCount: 3
  },
  {
    cellId: 'CHN-VEL-0422',
    areaName: 'Velachery (Lake Bypass)',
    center: { lat: 12.9750, lng: 80.2230 },
    bounds: [[12.9710, 80.2190], [12.9790, 80.2270]],
    riskScore: 76,
    riskLevel: 'CRITICAL',
    evidenceConfidence: 'HIGH',
    rainfallScore: 85,
    recentAccumulationScore: 74,
    terrainScore: 82,
    flowAccumulationScore: 79,
    historyScore: 74,
    waterScore: 80,
    citizenScore: 62,
    officialScore: 72,
    riskWindow: {
      start: '17:30',
      end: '22:30',
      confidence: 'HIGH',
      primaryDriver: 'Lake bank overflow runoff + depression topography'
    },
    keyContributors: [
      'Water body proximity (80/100)',
      'Extreme terrain depression (82/100)',
      'Heavy forecast rain (85/100)'
    ],
    updatedAt: '18:40 IST',
    exposedRoadCount: 4
  },
  {
    cellId: 'CHN-PAL-0310',
    areaName: 'Pallikaranai Marsh Margin',
    center: { lat: 12.9420, lng: 80.2150 },
    bounds: [[12.9370, 80.2100], [12.9470, 80.2200]],
    riskScore: 81,
    riskLevel: 'CRITICAL',
    evidenceConfidence: 'HIGH',
    rainfallScore: 88,
    recentAccumulationScore: 78,
    terrainScore: 89,
    flowAccumulationScore: 85,
    historyScore: 80,
    waterScore: 92,
    citizenScore: 60,
    officialScore: 75,
    riskWindow: {
      start: '17:00',
      end: '00:00',
      confidence: 'HIGH',
      primaryDriver: 'Natural wetland buffer saturation & low elevation'
    },
    keyContributors: [
      'Wetland water saturation (92/100)',
      'Extreme flow accumulation (85/100)',
      'Historical 2015/2023 inundation footprint (80/100)'
    ],
    updatedAt: '18:45 IST',
    exposedRoadCount: 2
  },
  {
    cellId: 'CHN-ANN-0105',
    areaName: 'Anna Nagar (Otteri Basin)',
    center: { lat: 13.0878, lng: 80.2184 },
    bounds: [[13.0828, 80.2134], [13.0928, 80.2234]],
    riskScore: 78,
    riskLevel: 'CRITICAL',
    evidenceConfidence: 'HIGH',
    rainfallScore: 86,
    recentAccumulationScore: 79,
    terrainScore: 72,
    flowAccumulationScore: 80,
    historyScore: 75,
    waterScore: 70,
    citizenScore: 78,
    officialScore: 75,
    riskWindow: {
      start: '18:00',
      end: '23:30',
      confidence: 'HIGH',
      primaryDriver: 'Canal bank backpressure + intense urban runoff'
    },
    keyContributors: [
      'Corroborated citizen reports (78/100)',
      'High rainfall intensity (86/100)',
      'Drainage channel backflow'
    ],
    updatedAt: '18:44 IST',
    exposedRoadCount: 4
  },
  {
    cellId: 'CHN-ADY-0208',
    areaName: 'Adyar (River Bank Corridor)',
    center: { lat: 13.0012, lng: 80.2565 },
    bounds: [[12.9962, 80.2515], [13.0062, 80.2615]],
    riskScore: 64,
    riskLevel: 'HIGH',
    evidenceConfidence: 'HIGH',
    rainfallScore: 75,
    recentAccumulationScore: 62,
    terrainScore: 68,
    flowAccumulationScore: 70,
    historyScore: 72,
    waterScore: 84,
    citizenScore: 40,
    officialScore: 68,
    riskWindow: {
      start: '19:00',
      end: '01:00',
      confidence: 'MODERATE',
      primaryDriver: 'Adyar River tidal boundary + upstream catchment discharge'
    },
    keyContributors: [
      'Adyar river proximity (84/100)',
      'Historical flood footprint (72/100)',
      'Tidal backflow window'
    ],
    updatedAt: '18:38 IST',
    exposedRoadCount: 2
  },
  {
    cellId: 'CHN-TNG-0112',
    areaName: 'T. Nagar (Mambalam)',
    center: { lat: 13.0418, lng: 80.2341 },
    bounds: [[13.0368, 80.2291], [13.0468, 80.2391]],
    riskScore: 48,
    riskLevel: 'MODERATE',
    evidenceConfidence: 'MODERATE',
    rainfallScore: 62,
    recentAccumulationScore: 50,
    terrainScore: 45,
    flowAccumulationScore: 52,
    historyScore: 60,
    waterScore: 48,
    citizenScore: 35,
    officialScore: 55,
    riskWindow: {
      start: '19:30',
      end: '22:30',
      confidence: 'MODERATE',
      primaryDriver: 'Pavement runoff into Mambalam Canal'
    },
    keyContributors: [
      'High commercial impervious surface',
      'Mambalam canal water level',
      'Moderate terrain slope'
    ],
    updatedAt: '18:35 IST',
    exposedRoadCount: 1
  },
  {
    cellId: 'CHN-GUI-0301',
    areaName: 'Guindy (Race Course Perimeter)',
    center: { lat: 13.0067, lng: 80.2026 },
    bounds: [[13.0017, 80.1976], [13.0117, 80.2076]],
    riskScore: 42,
    riskLevel: 'MODERATE',
    evidenceConfidence: 'HIGH',
    rainfallScore: 58,
    recentAccumulationScore: 46,
    terrainScore: 38,
    flowAccumulationScore: 44,
    historyScore: 40,
    waterScore: 35,
    citizenScore: 30,
    officialScore: 50,
    riskWindow: {
      start: '20:00',
      end: '23:00',
      confidence: 'MODERATE',
      primaryDriver: 'Moderate storm drain capacity with minor low spots'
    },
    keyContributors: [
      'Moderate elevation buffer',
      'Industrial stormwater load'
    ],
    updatedAt: '18:30 IST',
    exposedRoadCount: 1
  },
  {
    cellId: 'CHN-TAM-0504',
    areaName: 'Tambaram (East Highway)',
    center: { lat: 12.9249, lng: 80.1275 },
    bounds: [[12.9199, 80.1225], [12.9299, 80.1325]],
    riskScore: 31,
    riskLevel: 'MODERATE',
    evidenceConfidence: 'HIGH',
    rainfallScore: 48,
    recentAccumulationScore: 38,
    terrainScore: 24,
    flowAccumulationScore: 28,
    historyScore: 30,
    waterScore: 25,
    citizenScore: 20,
    officialScore: 40,
    riskWindow: {
      start: '20:30',
      end: '23:00',
      confidence: 'MODERATE',
      primaryDriver: 'Higher baseline elevation with isolated culvert blockages'
    },
    keyContributors: [
      'Higher elevation (28.4m DEM)',
      'Adequate natural drainage slope'
    ],
    updatedAt: '18:25 IST',
    exposedRoadCount: 0
  },
  {
    cellId: 'CHN-MAD-0435',
    areaName: 'Madipakkam (Lake Shore)',
    center: { lat: 12.9647, lng: 80.1961 },
    bounds: [[12.9597, 80.1911], [12.9697, 80.2011]],
    riskScore: 70,
    riskLevel: 'HIGH',
    evidenceConfidence: 'HIGH',
    rainfallScore: 79,
    recentAccumulationScore: 68,
    terrainScore: 74,
    flowAccumulationScore: 71,
    historyScore: 65,
    waterScore: 78,
    citizenScore: 48,
    officialScore: 65,
    riskWindow: {
      start: '18:15',
      end: '23:15',
      confidence: 'MODERATE',
      primaryDriver: 'Madipakkam lake overflow risk + flat residential gradient'
    },
    keyContributors: [
      'Lake overflow boundary',
      'Low elevation gradient',
      'Recent precipitation intensity'
    ],
    updatedAt: '18:41 IST',
    exposedRoadCount: 2
  }
];

// Chennai Water Bodies (Hydrological Context)
export const CHENNAI_WATER_BODIES: WaterBody[] = [
  {
    id: 'adyar_river',
    name: 'Adyar River Channel',
    type: 'RIVER',
    coordinates: [
      [12.9860, 80.1700],
      [13.0030, 80.2100],
      [13.0080, 80.2350],
      [13.0012, 80.2565],
      [13.0130, 80.2780]
    ],
    waterLevelStatus: 'ELEVATED',
    source: 'TNGIS Water Bodies Layer'
  },
  {
    id: 'cooum_river',
    name: 'Cooum River Channel',
    type: 'RIVER',
    coordinates: [
      [13.0750, 80.1900],
      [13.0780, 80.2200],
      [13.0720, 80.2500],
      [13.0690, 80.2850]
    ],
    waterLevelStatus: 'ELEVATED',
    source: 'TNGIS Water Bodies Layer'
  },
  {
    id: 'buckingham_canal',
    name: 'Buckingham Canal',
    type: 'CANAL',
    coordinates: [
      [13.0800, 80.2800],
      [13.0300, 80.2650],
      [12.9800, 80.2550],
      [12.9300, 80.2450]
    ],
    waterLevelStatus: 'OVERFLOW_WARNING',
    source: 'GCC Municipal GIS'
  },
  {
    id: 'velachery_lake',
    name: 'Velachery Lake & Sump',
    type: 'LAKE',
    coordinates: [
      [12.9730, 80.2200],
      [12.9770, 80.2240],
      [12.9750, 80.2280],
      [12.9710, 80.2240],
      [12.9730, 80.2200]
    ],
    waterLevelStatus: 'OVERFLOW_WARNING',
    source: 'Chennai Flood Monitoring (CFM-DSS)'
  },
  {
    id: 'pallikaranai_marsh',
    name: 'Pallikaranai Wetland Reserve',
    type: 'MARSHLAND',
    coordinates: [
      [12.9300, 80.2050],
      [12.9550, 80.2100],
      [12.9500, 80.2300],
      [12.9250, 80.2250],
      [12.9300, 80.2050]
    ],
    waterLevelStatus: 'ELEVATED',
    source: 'TNGIS & Forest Dept GIS'
  }
];

// Historical Flood Layers (Bhuvan/NRSC 2015 & 2023 Flood Footprints)
export const HISTORICAL_FLOOD_LAYERS: HistoricalFloodPolygon[] = [
  {
    id: 'hist_velachery_2015',
    eventName: '2015 Chennai Inundation Footprint (Bhuvan/NRSC)',
    year: 2015,
    severity: 'Extensive Inundation',
    source: 'Bhuvan / NRSC',
    coordinates: [
      [12.9700, 80.2100],
      [12.9880, 80.2120],
      [12.9860, 80.2320],
      [12.9680, 80.2300],
      [12.9700, 80.2100]
    ]
  },
  {
    id: 'hist_adyar_corridor_2015',
    eventName: '2015 Adyar River Overflow Corridor (Bhuvan/NRSC)',
    year: 2015,
    severity: 'Riverine Inundation',
    source: 'Bhuvan / NRSC',
    coordinates: [
      [13.0000, 80.2400],
      [13.0150, 80.2550],
      [13.0100, 80.2750],
      [12.9950, 80.2600],
      [13.0000, 80.2400]
    ]
  },
  {
    id: 'hist_michaung_2023_pallikaranai',
    eventName: '2023 Cyclone Michaung Wetland Inundation Zone',
    year: 2023,
    severity: 'High Surface Saturation',
    source: 'Bhuvan / NRSC',
    coordinates: [
      [12.9350, 80.2050],
      [12.9600, 80.2080],
      [12.9550, 80.2280],
      [12.9300, 80.2220],
      [12.9350, 80.2050]
    ]
  }
];

// Exposed Road Segments with Modeled Risk Transfer
export const CHENNAI_ROAD_SEGMENTS: RoadSegment[] = [
  {
    id: 'rd-vel-main-1',
    name: 'Velachery Main Road (Near Lake Junction)',
    area: 'Velachery',
    exposureLevel: 'HIGH',
    modeledRisk: 78,
    status: 'MODELED_HIGH_RISK',
    lengthKm: 1.2,
    description: 'Low-elevation roadway crossing Velachery Lake discharge zone; 3 adjacent risk cells indicate high accumulation.',
    nearCellId: 'CHN-VEL-0421',
    coordinates: [
      [12.9790, 80.2160],
      [12.9815, 80.2180],
      [12.9840, 80.2210]
    ]
  },
  {
    id: 'rd-vel-100ft-2',
    name: 'Velachery 100 Feet Bypass Road',
    area: 'Velachery',
    exposureLevel: 'CRITICAL',
    modeledRisk: 82,
    status: 'CITIZEN_REPORTED_OBSTRUCTION',
    lengthKm: 1.8,
    description: 'Severe depression with corroborated citizen observations and lake overflow runoff.',
    nearCellId: 'CHN-VEL-0422',
    coordinates: [
      [12.9740, 80.2180],
      [12.9770, 80.2230],
      [12.9810, 80.2270]
    ]
  },
  {
    id: 'rd-gst-guindy-1',
    name: 'GST Road (Guindy - Kathipara Section)',
    area: 'Guindy',
    exposureLevel: 'LOW',
    modeledRisk: 22,
    status: 'PASSABLE',
    lengthKm: 2.4,
    description: 'Elevated highway embankment; high terrain drainage with nominal risk.',
    nearCellId: 'CHN-GUI-0301',
    coordinates: [
      [13.0030, 80.2000],
      [13.0070, 80.2030],
      [13.0120, 80.2080]
    ]
  },
  {
    id: 'rd-adyar-lb-1',
    name: 'Lattice Bridge Road (Adyar Bridge Approach)',
    area: 'Adyar',
    exposureLevel: 'HIGH',
    modeledRisk: 68,
    status: 'MODELED_HIGH_RISK',
    lengthKm: 1.1,
    description: 'Adyar river south bank embankment; exposed to high tide surge backpressure.',
    nearCellId: 'CHN-ADY-0208',
    coordinates: [
      [12.9980, 80.2540],
      [13.0012, 80.2565],
      [13.0050, 80.2590]
    ]
  },
  {
    id: 'rd-anna-2ndave',
    name: 'Anna Nagar 2nd Avenue (Otteri Nullah Span)',
    area: 'Anna Nagar',
    exposureLevel: 'CRITICAL',
    modeledRisk: 80,
    status: 'MODELED_HIGH_RISK',
    lengthKm: 1.5,
    description: 'Culvert drainage overflow causing localized water depth risk in depression.',
    nearCellId: 'CHN-ANN-0105',
    coordinates: [
      [13.0850, 80.2150],
      [13.0878, 80.2184],
      [13.0910, 80.2220]
    ]
  }
];

// Verified Safe Locations & Emergency Facilities (Ranked with surround risk metadata)
export const EMERGENCY_FACILITIES: EmergencyFacility[] = [
  {
    id: 'fac-gcc-vel-01',
    name: 'Government Higher Secondary School Relief Centre',
    category: 'RELIEF_CENTRE',
    location: { lat: 12.9890, lng: 80.2250 },
    address: 'Gandhi Road, Near Velachery Railway Station, Chennai 600042',
    distanceKm: 1.2,
    verified: true,
    status: 'OPEN',
    capacity: { current: 140, total: 400 },
    contact: '+91 44 2244 5566 (GCC Control: 1913)',
    surroundingRiskLevel: 'MODERATE',
    accessibilityScore: 88,
    verifiedBy: 'Greater Chennai Corporation (GCC Zone 13)',
    updatedAt: '18:15 IST'
  },
  {
    id: 'fac-hosp-vel-02',
    name: 'Velachery Urban Community Health Center',
    category: 'HOSPITAL',
    location: { lat: 12.9910, lng: 80.2120 },
    address: '100 Feet Taramani Link Rd, Velachery, Chennai 600042',
    distanceKm: 1.8,
    verified: true,
    status: 'OPEN',
    capacity: { current: 45, total: 100 },
    contact: '+91 44 2243 1122',
    surroundingRiskLevel: 'LOW',
    accessibilityScore: 92,
    verifiedBy: 'TN Health & Family Welfare Dept',
    updatedAt: '18:00 IST'
  },
  {
    id: 'fac-gcc-ady-03',
    name: 'Chennai Corporation Community Hall Shelter',
    category: 'SHELTER',
    location: { lat: 13.0040, lng: 80.2500 },
    address: 'Kasturba Nagar 3rd Cross St, Adyar, Chennai 600020',
    distanceKm: 3.4,
    verified: true,
    status: 'READY',
    capacity: { current: 30, total: 350 },
    contact: '+91 44 2441 8899',
    surroundingRiskLevel: 'LOW',
    accessibilityScore: 95,
    verifiedBy: 'GCC Disaster Relief Division',
    updatedAt: '18:30 IST'
  },
  {
    id: 'fac-fire-gui-04',
    name: 'Guindy Fire and Emergency Rescue Station',
    category: 'EMERGENCY_SERVICE',
    location: { lat: 13.0080, lng: 80.2100 },
    address: 'GST Road, Guindy Industrial Estate, Chennai 600032',
    distanceKm: 2.9,
    verified: true,
    status: 'READY',
    capacity: { current: 12, total: 50 },
    contact: '101 / +91 44 2250 0101',
    surroundingRiskLevel: 'LOW',
    accessibilityScore: 96,
    verifiedBy: 'Tamil Nadu Fire & Rescue Services',
    updatedAt: '17:45 IST'
  },
  {
    id: 'fac-hosp-fortis-05',
    name: 'Fortis Malar Emergency Hospital & Trauma Center',
    category: 'HOSPITAL',
    location: { lat: 13.0070, lng: 80.2600 },
    address: 'Gandhi Nagar, Adyar, Chennai 600020',
    distanceKm: 4.1,
    verified: true,
    status: 'HIGH_CAPACITY',
    capacity: { current: 180, total: 200 },
    contact: '+91 44 4289 2222',
    surroundingRiskLevel: 'LOW',
    accessibilityScore: 89,
    verifiedBy: 'Directorate of Medical Services',
    updatedAt: '18:20 IST'
  }
];

// Initial Citizen Reports with AI-assisted validation evidence
export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'REP-CHN-8821',
    areaName: 'Anna Nagar (Otteri Nullah Rd)',
    location: { lat: 13.0872, lng: 80.2190 },
    timestamp: '18:15 IST (28 min ago)',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    description: 'Otteri Nullah canal embankment overflowing onto 2nd Avenue carriageway. Water depth approx knee level near bus stop.',
    reportedSeverity: 'HIGH',
    aiClassification: 'FLOOD / WATER ACCUMULATION',
    aiFloodConfidence: 91,
    imageQuality: 'GOOD',
    locationConfidence: 'HIGH',
    timestampFreshness: 'HIGH',
    nearbyCorroborations: 3,
    evidenceConfidence: 'HIGH',
    citizenEvidenceScore: 86,
    verificationStatus: 'VERIFIED',
    isIllustrativeDemo: true
  },
  {
    id: 'REP-CHN-8822',
    areaName: 'Velachery (Lake Bypass Road)',
    location: { lat: 12.9765, lng: 80.2215 },
    timestamp: '18:32 IST (11 min ago)',
    imageUrl: 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=600&q=80',
    description: 'Severe water accumulation under the flyover junction. 2-wheelers cannot pass. Water entering roadside storefronts.',
    reportedSeverity: 'HIGH',
    aiClassification: 'FLOOD / WATER ACCUMULATION',
    aiFloodConfidence: 87,
    imageQuality: 'GOOD',
    locationConfidence: 'HIGH',
    timestampFreshness: 'HIGH',
    nearbyCorroborations: 2,
    evidenceConfidence: 'HIGH',
    citizenEvidenceScore: 78,
    verificationStatus: 'PENDING',
    isIllustrativeDemo: true
  },
  {
    id: 'REP-CHN-8823',
    areaName: 'Adyar (Kasturba Nagar Link)',
    location: { lat: 13.0035, lng: 80.2540 },
    timestamp: '17:48 IST (55 min ago)',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
    description: 'Moderate waterlogging near storm drain culvert after sudden cloudburst. Drain flow is sluggish.',
    reportedSeverity: 'MODERATE',
    aiClassification: 'FLOOD / WATER ACCUMULATION',
    aiFloodConfidence: 74,
    imageQuality: 'FAIR',
    locationConfidence: 'HIGH',
    timestampFreshness: 'MODERATE',
    nearbyCorroborations: 1,
    evidenceConfidence: 'MODERATE',
    citizenEvidenceScore: 62,
    verificationStatus: 'VERIFIED',
    isIllustrativeDemo: true
  },
  {
    id: 'REP-CHN-8824',
    areaName: 'T. Nagar (South Usman Rd Underpass)',
    location: { lat: 13.0390, lng: 80.2310 },
    timestamp: '18:40 IST (3 min ago)',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
    description: 'Underpass sump pumps operational but water rising on ingress ramps.',
    reportedSeverity: 'MODERATE',
    aiClassification: 'FLOOD / WATER ACCUMULATION',
    aiFloodConfidence: 82,
    imageQuality: 'GOOD',
    locationConfidence: 'HIGH',
    timestampFreshness: 'HIGH',
    nearbyCorroborations: 2,
    evidenceConfidence: 'HIGH',
    citizenEvidenceScore: 74,
    verificationStatus: 'PENDING',
    isIllustrativeDemo: true
  }
];

// Official Alerts (Separated into Official, AegisLocal Model, Citizen Evidence)
export const INITIAL_OFFICIAL_ALERTS: OfficialAlert[] = [
  {
    id: 'alt-imd-01',
    title: 'Orange Alert: Heavy to Very Heavy Rainfall in Chennai & Environs',
    category: 'OFFICIAL',
    sourceName: 'India Meteorological Department (IMD) / RMC Chennai',
    location: 'Greater Chennai Corporation & Kanchipuram District',
    severity: 'HIGH',
    headline: 'Isolated heavy downpours exceeding 120mm in 24 hours expected due to upper air cyclonic circulation.',
    details: 'Squally winds 40-50 km/h along Tamil Nadu coast. Public advised to avoid waterlogged underpasses and stay clear of power infrastructure.',
    advisoryActions: [
      'Avoid non-essential transit through identified low-lying basins',
      'Keep emergency kits and power banks charged',
      'Follow GCC disaster helpline 1913 for emergency evacuation'
    ],
    timestamp: '16:00 IST',
    validUntil: '23:59 IST Today',
    status: 'ACTIVE'
  },
  {
    id: 'alt-tndma-02',
    title: 'Chembarambakkam & Poondi Reservoir Controlled Discharge Advisory',
    category: 'OFFICIAL',
    sourceName: 'Tamil Nadu State Disaster Management Authority (TNSDMA) & WRD',
    location: 'Adyar River Basin & Cooum Catchments',
    severity: 'HIGH',
    headline: 'Controlled surplus outflow of 2,500 cusecs initiated into Adyar River.',
    details: 'Residents along low-lying embankments in Manapakkam, Jafferkhanpet, Kotturpuram and Saidapet alerted to rising water levels.',
    advisoryActions: [
      'Move livestock and valuable equipment to upper floors',
      'Identify nearest verified community relief centre'
    ],
    timestamp: '17:15 IST',
    validUntil: '06:00 IST Tomorrow',
    status: 'ACTIVE'
  },
  {
    id: 'alt-model-03',
    title: 'Model Signal: Velachery & Pallikaranai High Risk Escalation Window',
    category: 'OPEN_DATA',
    sourceName: 'AegisLocal Hyperlocal Decision Engine (Model v1.2)',
    location: 'Velachery (Grid CHN-VEL-0421 & CHN-VEL-0422)',
    severity: 'HIGH',
    headline: 'Terrain-derived drainage vulnerability + 45mm/hr forecast accumulation produces 72/100 composite risk.',
    details: 'Intersection with Copernicus DEM reveals significant surface convergence. 3 major road segments modeled at high exposure.',
    advisoryActions: [
      'Prefer alternate northern elevated arterials',
      'Refer to AegisLocal Risk-Aware Route Planner before departing'
    ],
    timestamp: '18:00 IST',
    validUntil: '23:00 IST Risk Window',
    status: 'ACTIVE'
  }
];

// Default Route Comparison for Velachery -> Adyar
export const VELACHERY_TO_ADYAR_ROUTES: RouteOption[] = [
  {
    id: 'FASTEST',
    name: 'Fastest Direct Route (via Velachery Bypass & 100ft Rd)',
    routeTypeBadge: 'FASTEST ROUTE',
    durationMin: 18,
    distanceKm: 5.4,
    modeledRisk: 'HIGH',
    riskScore: 74,
    exposedSegmentsCount: 3,
    exposedRoads: [
      'Velachery 100 Feet Bypass (Near Lake Sump)',
      'Velachery Main Road Junction',
      'Taramani Link Low-Lying Dip'
    ],
    coordinates: [
      [12.9815, 80.2180], // Velachery
      [12.9770, 80.2230], // Bypass dip
      [12.9830, 80.2310], // Taramani low area
      [12.9910, 80.2430], // SRP Tools junction
      [12.9980, 80.2520], // Adyar signal
      [13.0012, 80.2565]  // Adyar
    ],
    recommendation: false,
    notes: 'Shortest driving distance but traverses 3 high-exposure modeled flood cells in depression basins.',
    evidenceConfidence: 'HIGH'
  },
  {
    id: 'LOWER_RISK',
    name: 'Lower-Risk Route (via Guindy Elevated & Sardar Patel Rd)',
    routeTypeBadge: 'LOWER-RISK ROUTE',
    durationMin: 23,
    distanceKm: 7.1,
    modeledRisk: 'LOW',
    riskScore: 24,
    exposedSegmentsCount: 0,
    exposedRoads: [],
    coordinates: [
      [12.9815, 80.2180], // Velachery
      [12.9930, 80.2100], // Phoenix Marketcity elevated flyover
      [13.0030, 80.2050], // Guindy Race Course ridge
      [13.0090, 80.2180], // Raj Bhavan / Sardar Patel Rd
      [13.0070, 80.2400], // IIT Madras arterial ridge
      [13.0012, 80.2565]  // Adyar
    ],
    recommendation: true,
    notes: 'Adds approx 5 minutes (1.7 km extra), but avoids low-lying lake basins with zero high-risk segments.',
    evidenceConfidence: 'HIGH'
  }
];

// Rainfall & Weather Snapshot
export const HOURLY_RAINFALL_DATA: WeatherDataPoint[] = [
  { time: '14:00', rainfallMm: 8.5, accumulatedMm: 18.2, trend: 'RISING' },
  { time: '15:00', rainfallMm: 14.2, accumulatedMm: 32.4, trend: 'RISING' },
  { time: '16:00', rainfallMm: 22.0, accumulatedMm: 54.4, trend: 'RISING' },
  { time: '17:00', rainfallMm: 34.5, accumulatedMm: 88.9, trend: 'RISING' },
  { time: '18:00 (Now)', rainfallMm: 42.0, accumulatedMm: 130.9, trend: 'RISING' },
  { time: '19:00 (Fcst)', rainfallMm: 38.0, accumulatedMm: 168.9, trend: 'RISING' },
  { time: '20:00 (Fcst)', rainfallMm: 28.0, accumulatedMm: 196.9, trend: 'STABLE' },
  { time: '21:00 (Fcst)', rainfallMm: 19.5, accumulatedMm: 216.4, trend: 'FALLING' },
  { time: '22:00 (Fcst)', rainfallMm: 12.0, accumulatedMm: 228.4, trend: 'FALLING' },
  { time: '23:00 (Fcst)', rainfallMm: 6.5, accumulatedMm: 234.9, trend: 'FALLING' }
];

// SIH 2-3 minute presentation demo story sequence steps (Steps 1 to 14 from Blueprint)
export const SIH_DEMO_TOUR_STEPS: SIHTourStep[] = [
  {
    stepNumber: 1,
    title: 'Step 1: Broad Warning Received',
    subtitle: 'Official IMD Weather Alert',
    targetView: 'overview',
    explanation: 'See top advisory: "HEAVY RAINFALL EXPECTED - Elevated flood risk possible in vulnerable low-lying areas of Chennai". Notice source provenance: OFFICIAL INFORMATION.',
    suggestedAction: 'View the official emergency banner on the Overview page.'
  },
  {
    stepNumber: 2,
    title: 'Step 2: Select Chennai Area',
    subtitle: 'Location: Velachery',
    targetView: 'overview',
    explanation: 'Select "Velachery" from the neighbourhood picker. Notice how the entire application updates with localized geospatial intelligence.',
    suggestedAction: 'Click Velachery in the neighbourhood selector.'
  },
  {
    stepNumber: 3,
    title: 'Step 3: Hyperlocal Risk Score',
    subtitle: '72 / 100 — HIGH RISK',
    targetView: 'overview',
    explanation: 'AegisLocal converts the broad regional warning into a 72/100 HIGH flood risk score for Velachery with HIGH evidence confidence.',
    suggestedAction: 'Observe the circular risk gauge and confidence badge.'
  },
  {
    stepNumber: 4,
    title: 'Step 4: Explainable Risk Breakdown',
    subtitle: 'Why is this area at risk?',
    targetView: 'overview',
    explanation: 'Rather than a black-box AI number, AegisLocal exposes 8 transparent factors: Rainfall (82), Terrain (76), Flow (73), History (68), Water (61), Citizen (55), Official (70).',
    suggestedAction: 'Scroll down to the "Why is this area at risk?" factor cards.'
  },
  {
    stepNumber: 5,
    title: 'Step 5: Risk-Escalation Window',
    subtitle: 'Window: 18:00 – 23:00',
    targetView: 'overview',
    explanation: 'Shows an estimated risk-escalation window rather than claiming a false exact minute of flooding, backed by rainfall accumulation and DEM slope analysis.',
    suggestedAction: 'Check the Risk-Escalation Window card.'
  },
  {
    stepNumber: 6,
    title: 'Step 6: Interactive 100m Risk Grid',
    subtitle: 'GIS Map & Cell Inspection',
    targetView: 'map',
    explanation: 'Switch to the Risk Map to view the 100m × 100m risk cells across Chennai hot spots. Click any cell to inspect Cell ID (CHN-VEL-0421), contributors and road exposure.',
    suggestedAction: 'Navigate to Risk Map and click the red/orange Velachery grid cell.'
  },
  {
    stepNumber: 7,
    title: 'Step 7: Risk-Aware Route Planner',
    subtitle: 'Fastest vs Lower-Risk Route',
    targetView: 'route',
    explanation: 'Compare Route A (Fastest: 18 min, HIGH exposure with 3 flooded segments) vs Route B (Lower-Risk: 23 min, LOW exposure via higher elevation).',
    suggestedAction: 'Navigate to Route Planner and click "Compare Routes".'
  },
  {
    stepNumber: 8,
    title: 'Step 8: Exposed Road Segments',
    subtitle: 'Modeled Road Risk vs Closure',
    targetView: 'route',
    explanation: 'Inspect highlighted road segments (e.g. Velachery Main Rd, 100ft Bypass) intersecting high-risk cells without claiming official closure.',
    suggestedAction: 'Review the Exposed Road Segments comparison list.'
  },
  {
    stepNumber: 9,
    title: 'Step 9: Nearby Verified Locations',
    subtitle: 'Safe Location Ranking',
    targetView: 'emergency',
    explanation: 'Rank emergency relief centres and medical facilities by distance, official verification, and surrounding modeled flood exposure.',
    suggestedAction: 'Open Emergency Locations page to view verified facilities.'
  },
  {
    stepNumber: 10,
    title: 'Step 10: Citizen Photo Upload',
    subtitle: 'Submit Live Observation',
    targetView: 'report',
    explanation: 'Upload or pick a sample photo of Chennai street flooding with GPS coordinates and description to feed into the evidence loop.',
    suggestedAction: 'Open Report Flooding and select a photo.'
  },
  {
    stepNumber: 11,
    title: 'Step 11: AI-Assisted Validation',
    subtitle: 'FloodNet CV Pipeline',
    targetView: 'report',
    explanation: 'Watch the 7-step AI validation sequence: Image quality check -> Classification (87% confidence) -> Evidence score computation.',
    suggestedAction: 'Click "Submit Flood Report" and observe the AI evidence pipeline.'
  },
  {
    stepNumber: 12,
    title: 'Step 12: Citizen Evidence Feedback Loop',
    subtitle: 'Report reflected on Map & Evidence',
    targetView: 'report',
    explanation: 'The report updates local citizen evidence score (from 55 to 64) and adds a marker to the map without blindly turning the whole area critical.',
    suggestedAction: 'See the evidence score update and live feedback badge.'
  },
  {
    stepNumber: 13,
    title: 'Step 13: Emergency Command Dashboard',
    subtitle: 'Admin Decision Intelligence',
    targetView: 'dashboard',
    explanation: 'Command center displays top KPIs (8 Critical Zones, 17 High-Risk, 42 Reports, 12 Exposed Roads), Hotspot Map, and Priority Field Verification list.',
    suggestedAction: 'Navigate to Emergency Dashboard.'
  },
  {
    stepNumber: 14,
    title: 'Step 14: Verification Queue & Action',
    subtitle: 'Verify or Reject Reports',
    targetView: 'dashboard',
    explanation: 'Review the pending Velachery citizen report in the Verification Queue and click [VERIFY]. Watch state change to VERIFIED and live sync across the platform!',
    suggestedAction: 'Click [VERIFY] on the pending Velachery report in the queue.'
  }
];
