import React, { useState } from 'react';
import {
  Navigation,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowUpDown,
  Layers,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  TrendingDown,
  Info,
  Car,
  Eye
} from 'lucide-react';
import { RouteOption, RoadSegment } from '../types';
import { VELACHERY_TO_ADYAR_ROUTES, CHENNAI_ROAD_SEGMENTS } from '../data/chennaiData';

interface RoutePlannerViewProps {
  onInspectRouteOnMap: (routeId: 'FASTEST' | 'LOWER_RISK') => void;
}

export const RoutePlannerView: React.FC<RoutePlannerViewProps> = ({
  onInspectRouteOnMap
}) => {
  const [origin, setOrigin] = useState('Velachery');
  const [destination, setDestination] = useState('Adyar');
  const [selectedRouteId, setSelectedRouteId] = useState<'LOWER_RISK' | 'FASTEST'>('LOWER_RISK');
  const [methodologyExpanded, setMethodologyExpanded] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const routes = VELACHERY_TO_ADYAR_ROUTES;
  const fastestRoute = routes.find((r) => r.id === 'FASTEST')!;
  const lowerRiskRoute = routes.find((r) => r.id === 'LOWER_RISK')!;

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#087F8C] mb-1">
              DISPATCH III &bull; ROUTING OPTIMIZATION
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <Navigation className="w-6 h-6 text-[#087F8C]" />
              <span>Risk-Aware Transit & Corridor Planner</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-2xl font-sans leading-relaxed">
              Candidate routes are intersected with the modeled 100m grid to evaluate surface-water exposure. Recommends lower-risk alternatives over high-exposure depressions.
            </p>
          </div>

          <div className="p-3.5 bg-[#EAF4F7] border border-[#C97A2C]/30 text-[#52606D] text-xs flex items-start gap-2.5 max-w-sm rounded-xl">
            <AlertTriangle className="w-4 h-4 text-[#087F8C] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed font-sans text-[#1A1A1A]/80">
              <strong className="text-[#52606D]">Field Advisory:</strong> Flash ponding dynamics evolve rapidly. Models provide probabilistic guidance alongside ground truth.
            </span>
          </div>
        </div>
      </div>

      {/* Origin / Destination Search & Inputs */}
      <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Departure Point (Chennai Ward)</span>
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#EAF4F7] border border-[#1A1A1A]/20 text-xs font-serif font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#087F8C] rounded-lg"
            >
              <option value="Velachery">Velachery (High Flood Risk 72/100)</option>
              <option value="Anna Nagar">Anna Nagar (Critical Risk 78/100)</option>
              <option value="Tambaram">Tambaram (Moderate Risk 31/100)</option>
              <option value="Guindy">Guindy (Moderate Risk 42/100)</option>
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center pt-2 md:pt-4">
            <button
              onClick={handleSwap}
              className="p-2 bg-[#EAF4F7] hover:bg-[#DCEEF3] text-[#1A1A1A] border border-[#1A1A1A]/20 rounded-lg transition-colors shadow-sm"
              title="Swap Origin & Destination"
            >
              <ArrowUpDown className="w-4 h-4 text-[#087F8C]" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 space-y-1">
            <label className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>Arrival Terminal (Chennai Ward)</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#EAF4F7] border border-[#1A1A1A]/20 text-xs font-serif font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#087F8C] rounded-lg"
            >
              <option value="Adyar">Adyar (High Risk 64/100 - Estuary Zone)</option>
              <option value="T. Nagar">T. Nagar (Moderate 48/100)</option>
              <option value="Guindy">Guindy (Relief Hub 42/100)</option>
              <option value="Mylapore">Mylapore (Coastal Ridge)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#1A1A1A]/70 font-sans flex items-center gap-2">
            <span>Evaluating corridor:</span>
            <strong className="text-[#1A1A1A] font-serif">{origin}</strong>
            <span className="text-[#087F8C]">&rarr;</span>
            <strong className="text-[#1A1A1A] font-serif">{destination}</strong>
          </div>

          <button
            onClick={handleRecalculate}
            disabled={isCalculating}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-xs font-sans font-bold uppercase tracking-wider text-[#F4F1EE] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Navigation className={`w-3.5 h-3.5 text-[#087F8C] ${isCalculating ? 'animate-spin' : ''}`} />
            <span>{isCalculating ? 'Intersecting Risk Grid...' : 'Calculate Safe Corridors'}</span>
          </button>
        </div>
      </div>

      {/* Top Recommendation Banner */}
      <div className="bg-white border-l-4 border-[#2D5A43] border-y border-r border-[#1A1A1A]/15 p-5 lg:p-6 shadow-sm rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30 shrink-0 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#2D5A43]">
              MODEL RECOMMENDATION
            </div>
            <div className="text-lg font-serif font-bold text-[#1A1A1A] mt-0.5">
              PREFER LOWER-RISK RIDGE CORRIDOR (ROUTE B)
            </div>
            <p className="text-xs text-[#1A1A1A]/80 mt-0.5 leading-relaxed font-sans">
              Adds approximately 5 minutes (+1.7 km) via Guindy ridge arterial, but completely bypasses 3 severely exposed low-lying flood cells.
            </p>
          </div>
        </div>

        <button
          onClick={() => onInspectRouteOnMap('LOWER_RISK')}
          className="px-4 py-2 bg-[#2D5A43] hover:bg-[#1E3E2E] text-xs font-sans font-bold uppercase tracking-wider text-white rounded-lg shadow-sm transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>View on Risk Map</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Side-by-Side Dual Route Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ROUTE A: FASTEST ROUTE (HIGH RISK) */}
        <div
          onClick={() => setSelectedRouteId('FASTEST')}
          className={`cursor-pointer bg-white p-6 transition-all border shadow-sm rounded-xl flex flex-col justify-between ${
            selectedRouteId === 'FASTEST'
              ? 'border-[#9E2A2B] ring-1 ring-[#9E2A2B]'
              : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#EAF4F7] text-[#1A1A1A] border border-[#1A1A1A]/20">
                ROUTE A &bull; FASTEST
              </span>
              <span className="px-2 py-0.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30">
                HIGH MODELED EXPOSURE
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">{fastestRoute.name}</h3>

            <div className="grid grid-cols-3 gap-2 my-4 p-3.5 bg-[#EAF4F7] border border-[#1A1A1A]/10 rounded-lg">
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Duration</div>
                <div className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
                  <span>{fastestRoute.durationMin}</span>
                  <span className="text-xs text-[#1A1A1A]/50 font-normal font-sans">min</span>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Distance</div>
                <div className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
                  <span>{fastestRoute.distanceKm}</span>
                  <span className="text-xs text-[#1A1A1A]/50 font-normal font-sans">km</span>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Risk Index</div>
                <div className="text-xl font-serif font-bold text-[#9E2A2B] mt-0.5">
                  {fastestRoute.riskScore}
                  <span className="text-xs text-[#1A1A1A]/40 font-normal font-sans">/100</span>
                </div>
              </div>
            </div>

            {/* Exposed Segments Callout */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#9E2A2B] font-serif font-bold">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>3 Inundation-Prone Road Segments</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {fastestRoute.exposedRoads.map((rd, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-[#9E2A2B]/5 border border-[#9E2A2B]/20 text-[11px] text-[#9E2A2B] flex items-center gap-2 rounded-lg font-sans"
                  >
                    <div className="w-1.5 h-1.5 bg-[#9E2A2B]"></div>
                    <span>{rd}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#1A1A1A]/70 mt-4 leading-relaxed font-sans">
              {fastestRoute.notes}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
            <span className="text-[11px] text-[#9E2A2B] font-sans">Caution advised during peak squalls</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspectRouteOnMap('FASTEST');
              }}
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#52606D] flex items-center gap-1"
            >
              <span>Inspect Path</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#087F8C]" />
            </button>
          </div>
        </div>

        {/* ROUTE B: LOWER-RISK ROUTE (LOW RISK - RECOMMENDED) */}
        <div
          onClick={() => setSelectedRouteId('LOWER_RISK')}
          className={`cursor-pointer bg-white p-6 transition-all border shadow-sm rounded-xl flex flex-col justify-between ${
            selectedRouteId === 'LOWER_RISK'
              ? 'border-[#2D5A43] ring-1 ring-[#2D5A43]'
              : 'border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30">
                ROUTE B &bull; LOWER-RISK ROUTE
              </span>
              <span className="px-2 py-0.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-wider bg-[#2D5A43] text-white">
                RECOMMENDED
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">{lowerRiskRoute.name}</h3>

            <div className="grid grid-cols-3 gap-2 my-4 p-3.5 bg-[#EAF4F7] border border-[#1A1A1A]/10 rounded-lg">
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Duration</div>
                <div className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
                  <span>{lowerRiskRoute.durationMin}</span>
                  <span className="text-xs text-[#1A1A1A]/50 font-normal font-sans">min (+5m)</span>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Distance</div>
                <div className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-1 mt-0.5">
                  <span>{lowerRiskRoute.distanceKm}</span>
                  <span className="text-xs text-[#1A1A1A]/50 font-normal font-sans">km</span>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50">Risk Index</div>
                <div className="text-xl font-serif font-bold text-[#2D5A43] mt-0.5">
                  {lowerRiskRoute.riskScore}
                  <span className="text-xs text-[#1A1A1A]/40 font-normal font-sans">/100</span>
                </div>
              </div>
            </div>

            {/* Exposed Segments Callout */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#2D5A43] font-serif font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>0 High-Risk Segments (Elevated Arterial)</span>
                </span>
              </div>
              <div className="p-3 bg-[#2D5A43]/5 border border-[#2D5A43]/20 text-[11px] text-[#2D5A43] font-sans leading-relaxed rounded-lg">
                Traverses Guindy Race Course ridge embankment (12m DEM) and IIT Madras arterial corridor with nominal modeled surface water.
              </div>
            </div>

            <p className="text-xs text-[#1A1A1A]/70 mt-4 leading-relaxed font-sans">
              {lowerRiskRoute.notes}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
            <span className="text-[11px] text-[#2D5A43] font-serif font-semibold">Advised for passenger transit</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspectRouteOnMap('LOWER_RISK');
              }}
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D5A43] hover:text-[#1E3E2E] flex items-center gap-1"
            >
              <span>Inspect Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Exposed Roads Corridor Table */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/10 pb-3">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#087F8C] mb-0.5">
              INVENTORY &bull; CORRIDOR EXPOSURE
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#087F8C]" />
              <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                Chennai Arterial Segment Exposure Registry
              </h3>
            </div>
          </div>
          <span className="text-xs text-[#1A1A1A]/60 font-sans">Derived from 100m risk cell intersection</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EAF4F7] text-[#1A1A1A]/70 uppercase font-sans text-[9px] tracking-wider border-b border-[#1A1A1A]/15">
              <tr>
                <th className="p-3">Road Corridor</th>
                <th className="p-3">Sector</th>
                <th className="p-3">Modeled Risk</th>
                <th className="p-3">Hydrological Status</th>
                <th className="p-3">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10">
              {CHENNAI_ROAD_SEGMENTS.map((seg) => (
                <tr key={seg.id} className="hover:bg-[#EAF4F7] transition-colors">
                  <td className="p-3 font-serif font-bold text-[#1A1A1A]">{seg.name}</td>
                  <td className="p-3 text-[#1A1A1A]/70 font-sans">{seg.area}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[9px] font-sans font-bold uppercase tracking-wider ${
                        seg.exposureLevel === 'CRITICAL'
                          ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30'
                          : seg.exposureLevel === 'HIGH'
                          ? 'bg-[#C05621]/10 text-[#C05621] border border-[#C05621]/30'
                          : 'bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30'
                      }`}
                    >
                      {seg.modeledRisk}/100 ({seg.exposureLevel})
                    </span>
                  </td>
                  <td className="p-3 text-[#1A1A1A]/80 font-sans text-[11px]">
                    {seg.status === 'MODELED_HIGH_RISK' && (
                      <span className="text-[#C05621] font-semibold">Modeled High-Risk Road</span>
                    )}
                    {seg.status === 'CITIZEN_REPORTED_OBSTRUCTION' && (
                      <span className="text-[#9E2A2B] font-serif font-bold">Citizen-Reported Obstruction</span>
                    )}
                    {seg.status === 'PASSABLE' && (
                      <span className="text-[#2D5A43] font-semibold">Passable Arterial</span>
                    )}
                  </td>
                  <td className="p-3 text-[#1A1A1A]/60 font-mono">{seg.lengthKm} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Route Scoring Mathematical Formulation Drawer */}
      <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-xl">
        <button
          onClick={() => setMethodologyExpanded(!methodologyExpanded)}
          className="w-full flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#087F8C]/15 text-[#087F8C] rounded-lg">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#1A1A1A]">
                How Corridor Optimization Works (Spatial Intersection Engine)
              </h4>
              <p className="text-xs font-sans text-[#1A1A1A]/60">
                Mathematical optimization balancing transit duration against modeled flood hazard.
              </p>
            </div>
          </div>
          {methodologyExpanded ? <ChevronUp className="w-4 h-4 text-[#52606D]" /> : <ChevronDown className="w-4 h-4 text-[#52606D]" />}
        </button>

        {methodologyExpanded && (
          <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 space-y-3 text-xs text-[#1A1A1A]/80 font-sans animate-in fade-in">
            <div className="p-4 bg-[#EAF4F7] border border-[#1A1A1A]/15 font-mono text-xs text-[#1A1A1A] rounded-lg">
              Route Score = &alpha; &bull; Travel_Time_Norm + &beta; &bull; &sum;(Segment_Length_i &bull; Modeled_Risk_Cell_i)
            </div>
            <p className="leading-relaxed text-[#1A1A1A]/70 text-xs">
              Candidate corridors are extracted using OpenStreetMap road topology and partitioned into 50-meter line segments. Each segment is intersected with the AegisLocal 100m &times; 100m grid to calculate cumulative flood exposure.
            </p>
            <div className="p-3 bg-[#EAF4F7] border border-[#087F8C]/30 text-[#52606D] text-xs rounded-lg">
              <strong>Official Notice:</strong> Modeled high-risk roads indicate GIS surface susceptibility and citizen evidence; official closures are only presented when verified by Greater Chennai Traffic Police (GCTP) or GCC.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
