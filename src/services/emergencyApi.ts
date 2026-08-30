import { EmergencyFacility } from '../types';

const BACKEND_URL = 'http://localhost:5000';

interface BackendEmergencyLocation {
  id: string;
  name: string;
  type: 'RELIEF_SHELTER' | 'HOSPITAL' | 'RESPONSE_CENTRE';
  location: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_status: 'AVAILABLE' | 'OPERATIONAL';
}

interface BackendEmergencyResponse {
  source: string;
  count: number;
  locations: BackendEmergencyLocation[];
}

function mapBackendFacility(
  facility: BackendEmergencyLocation
): EmergencyFacility {
  const categoryMap: Record<
    BackendEmergencyLocation['type'],
    EmergencyFacility['category']
  > = {
    RELIEF_SHELTER: 'SHELTER',
    HOSPITAL: 'HOSPITAL',
    RESPONSE_CENTRE: 'RELIEF_CENTRE'
  };

  return {
    id: facility.id,
    name: facility.name,
    category: categoryMap[facility.type],

    location: {
      lat: facility.latitude,
      lng: facility.longitude
    },

    address: facility.location,

    // Prototype values used by the existing UI.
    distanceKm: 0,

    verified: true,

    status:
      facility.current_status === 'AVAILABLE'
        ? 'OPEN'
        : 'READY',

    capacity: {
      current: 0,
      total: facility.capacity
    },

    contact: 'Emergency Control Centre',

    surroundingRiskLevel: 'MODERATE',

    accessibilityScore: 85,

    verifiedBy: 'PravahAI Prototype Emergency Data',

    updatedAt: new Date().toISOString()
  };
}

export async function getEmergencyLocationsFromBackend(): Promise<
  EmergencyFacility[]
> {
  const response = await fetch(
    `${BACKEND_URL}/api/emergency-locations`
  );

  if (!response.ok) {
    throw new Error('Failed to load emergency locations');
  }

  const data: BackendEmergencyResponse =
    await response.json();

  return data.locations.map(mapBackendFacility);
}