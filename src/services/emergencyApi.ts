import { EmergencyFacility } from '../types';

const BACKEND_URL = 'https://pravah-ai-tvoi.vercel.app';

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
  try {
    const apiUrl =
      `${BACKEND_URL}/api/emergency-locations`;

    console.log(
      'Fetching emergency locations from:',
      apiUrl
    );

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    console.log(
      'Emergency API response status:',
      response.status
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load emergency locations. Status: ${response.status}`
      );
    }

    const data: BackendEmergencyResponse =
      await response.json();

    console.log(
      'Emergency locations received:',
      data
    );

    if (!data.locations || !Array.isArray(data.locations)) {
      throw new Error(
        'Invalid emergency locations data received'
      );
    }

    return data.locations.map(mapBackendFacility);

  } catch (error) {
    console.error(
      'Emergency locations backend connection error:',
      error
    );

    throw error;
  }
}