import React, { useEffect, useState } from 'react';
import {
  Hospital,
  Building2,
  ShieldCheck,
  Phone,
  Search,
  Flame,
  Shield,
  ArrowRight,
  Navigation
} from 'lucide-react';

import { EmergencyFacility } from '../types';
import { getEmergencyLocationsFromBackend } from '../services/emergencyApi';

interface EmergencyLocationsViewProps {
  onNavigateToRouteWithDest?: (facilityName: string) => void;
}

export const EmergencyLocationsView: React.FC<
  EmergencyLocationsViewProps
> = ({ onNavigateToRouteWithDest }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('ALL');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [facilities, setFacilities] =
    useState<EmergencyFacility[]>([]);

  const [selectedFacility, setSelectedFacility] =
    useState<EmergencyFacility | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // Load emergency facilities from PravahAI backend
  useEffect(() => {
    const loadEmergencyLocations = async () => {
      try {
        setLoading(true);
        setError(null);

        const backendFacilities =
          await getEmergencyLocationsFromBackend();

        setFacilities(backendFacilities);

        if (backendFacilities.length > 0) {
          setSelectedFacility(backendFacilities[0]);
        }
      } catch (err) {
        console.error(
          'Failed to load emergency locations:',
          err
        );

        setError(
          'Could not connect to the PravahAI backend emergency locations service.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmergencyLocations();
  }, []);

  const categories = [
    {
      id: 'ALL',
      label: 'All Verified Facilities',
      count: facilities.length
    },
    {
      id: 'RELIEF_CENTRE',
      label: 'Relief Centres',
      count: facilities.filter(
        (f) => f.category === 'RELIEF_CENTRE'
      ).length
    },
    {
      id: 'HOSPITAL',
      label: 'Hospitals & Medical',
      count: facilities.filter(
        (f) => f.category === 'HOSPITAL'
      ).length
    },
    {
      id: 'SHELTER',
      label: 'Community Shelters',
      count: facilities.filter(
        (f) => f.category === 'SHELTER'
      ).length
    },
    {
      id: 'EMERGENCY_SERVICE',
      label: 'Fire & Rescue',
      count: facilities.filter(
        (f) => f.category === 'EMERGENCY_SERVICE'
      ).length
    }
  ];

  const filteredFacilities = facilities.filter((f) => {
    const matchesCat =
      selectedCategory === 'ALL' ||
      f.category === selectedCategory;

    const matchesSearch =
      f.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      f.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const getStatusBadge = (
    status: EmergencyFacility['status']
  ) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30">
            OPEN &bull; ACCEPTING
          </span>
        );

      case 'READY':
        return (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider bg-[#8B5E3C]/10 text-[#8B5E3C] border border-[#8B5E3C]/30">
            STANDBY READY
          </span>
        );

      case 'HIGH_CAPACITY':
        return (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-sans font-bold uppercase tracking-wider bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30">
            NEAR CAPACITY
          </span>
        );
    }
  };

  const getCategoryIcon = (
    category: EmergencyFacility['category']
  ) => {
    switch (category) {
      case 'RELIEF_CENTRE':
        return (
          <Building2 className="w-4 h-4 text-[#2D5A43]" />
        );

      case 'HOSPITAL':
        return (
          <Hospital className="w-4 h-4 text-[#8B5E3C]" />
        );

      case 'SHELTER':
        return (
          <Shield className="w-4 h-4 text-[#A67C52]" />
        );

      case 'EMERGENCY_SERVICE':
        return (
          <Flame className="w-4 h-4 text-[#9E2A2B]" />
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-1">
              DISPATCH V &bull; CRITICAL INFRASTRUCTURE
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <Hospital className="w-6 h-6 text-[#A67C52]" />
              <span>
                Verified Municipal Relief Hubs & Shelters
              </span>
            </h1>

            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-2xl font-sans leading-relaxed">
              Emergency locations loaded through the PravahAI backend API.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] space-y-1 rounded-xl max-w-xs">
            <div className="text-[9px] font-sans uppercase font-bold text-[#8B5E3C] tracking-wider">
              Emergency Helplines
            </div>

            <div className="text-xs font-serif font-bold text-[#1A1A1A]">
              GCC: 1913 &bull; TN SDMA: 1070
            </div>
          </div>

        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#1A1A1A]/15 p-4 shadow-sm rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.id)
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#1A1A1A] text-[#F4F1EE]'
                  : 'bg-[#FAF8F5] text-[#1A1A1A]/70 hover:bg-[#EAE6E1] border border-[#1A1A1A]/15'
              }`}
            >
              <span>{category.label}</span>

              <span className="ml-1.5 text-[9px] opacity-75 font-mono">
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute left-3 top-2.5" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search facility name / ward..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#1A1A1A]/20 text-xs font-sans text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#A67C52] rounded-xl"
          />
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white border border-[#1A1A1A]/15 p-8 text-center shadow-sm rounded-xl">
          <p className="text-sm font-serif font-bold text-[#1A1A1A]">
            Loading emergency locations from PravahAI backend...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-white border border-red-500/30 p-6 text-center shadow-sm rounded-xl">
          <p className="text-sm font-serif font-bold text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Facility List */}
          <div className="lg:col-span-7 space-y-3">

            {filteredFacilities.length === 0 && (
              <div className="bg-white border border-[#1A1A1A]/15 p-8 text-center rounded-xl">
                No emergency facilities found.
              </div>
            )}

            {filteredFacilities.map(
              (facility, index) => {
                const isSelected =
                  selectedFacility?.id === facility.id;

                return (
                  <div
                    key={facility.id}
                    onClick={() =>
                      setSelectedFacility(facility)
                    }
                    className={`cursor-pointer bg-white p-5 transition-all border shadow-sm rounded-xl flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#A67C52] ring-1 ring-[#A67C52]'
                        : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                    }`}
                  >

                    <div>

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-start gap-3">

                          <div className="p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-lg shrink-0">
                            {getCategoryIcon(
                              facility.category
                            )}
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-2 mb-1">

                              <span className="text-[9px] font-mono text-[#A67C52] font-bold">
                                RANK #{index + 1}
                              </span>

                              {getStatusBadge(
                                facility.status
                              )}

                              {facility.verified && (
                                <span className="flex items-center gap-1 text-[9px] font-sans font-bold uppercase tracking-wider text-[#2D5A43]">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>
                                    BACKEND DATA
                                  </span>
                                </span>
                              )}

                            </div>

                            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                              {facility.name}
                            </h3>

                            <p className="text-xs text-[#1A1A1A]/65 mt-0.5 font-sans">
                              {facility.address}
                            </p>

                          </div>

                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xl font-serif font-bold text-[#1A1A1A]">
                            {facility.capacity.total}
                          </div>

                          <div className="text-[9px] text-[#1A1A1A]/50 font-sans">
                            capacity
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-lg text-xs">

                        <div>
                          <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">
                            Risk
                          </span>

                          <span className="text-[11px] font-serif font-bold text-[#8B5E3C]">
                            {facility.surroundingRiskLevel}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">
                            Capacity
                          </span>

                          <span className="text-[11px] font-serif font-semibold text-[#1A1A1A]">
                            {facility.capacity.current} /{' '}
                            {facility.capacity.total}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">
                            Access
                          </span>

                          <span className="text-[11px] font-serif font-bold text-[#2D5A43]">
                            {facility.accessibilityScore}%
                          </span>
                        </div>

                      </div>

                    </div>

                    <div className="pt-2.5 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">

                      <div className="flex items-center gap-1.5 text-[#1A1A1A]/70 font-mono text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-[#A67C52]" />
                        <span>{facility.contact}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (
                            onNavigateToRouteWithDest
                          ) {
                            onNavigateToRouteWithDest(
                              facility.name
                            );
                          }
                        }}
                        className="flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-[#A67C52] hover:text-[#8B5E3C] transition-colors"
                      >
                        <span>Plan Route Here</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

          {/* Selected Facility */}
          <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-xl flex flex-col justify-between space-y-4">

            {selectedFacility ? (
              <>
                <div>

                  <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">

                    <Hospital className="w-5 h-5 text-[#A67C52]" />

                    <div>
                      <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                        Facility Emergency Dossier
                      </h3>

                      <span className="text-[11px] text-[#1A1A1A]/60 font-sans">
                        Loaded from PravahAI Backend
                      </span>
                    </div>

                  </div>

                  <div className="my-4 space-y-3.5">

                    <div>
                      <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
                        {selectedFacility.name}
                      </h2>

                      <p className="text-xs text-[#1A1A1A]/70 mt-1 font-sans">
                        {selectedFacility.address}
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-lg space-y-2 text-xs">

                      <div className="flex items-center justify-between font-sans">
                        <span className="text-[#1A1A1A]/60">
                          Data Source:
                        </span>

                        <strong className="text-[#2D5A43] font-serif font-bold">
                          PravahAI Backend API
                        </strong>
                      </div>

                      <div className="flex items-center justify-between font-sans">
                        <span className="text-[#1A1A1A]/60">
                          Operational Status:
                        </span>

                        <span className="font-serif font-bold text-[#1A1A1A]">
                          {selectedFacility.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-sans">
                        <span className="text-[#1A1A1A]/60">
                          Capacity:
                        </span>

                        <span className="font-mono text-[#A67C52] font-bold">
                          {selectedFacility.capacity.current} /{' '}
                          {selectedFacility.capacity.total}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                <div className="pt-3 border-t border-[#1A1A1A]/10 space-y-2">

                  <button
                    onClick={() => {
                      if (
                        onNavigateToRouteWithDest
                      ) {
                        onNavigateToRouteWithDest(
                          selectedFacility.name
                        );
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#F4F1EE] text-xs font-sans font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all"
                  >
                    <Navigation className="w-4 h-4 text-[#A67C52]" />

                    <span>
                      Route to this Location
                    </span>
                  </button>

                  <div className="text-center text-[10px] text-[#1A1A1A]/50 italic font-serif">
                    Emergency facility information is
                    served through the PravahAI backend
                    prototype API.
                  </div>

                </div>
              </>
            ) : (
              <div className="text-center text-sm text-[#1A1A1A]/60">
                Select an emergency facility.
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};