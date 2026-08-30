import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  MapPin,
  Filter,
  Eye,
  EyeOff,
  Info,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Navigation,
  Camera,
  Hospital,
  Droplets,
  Maximize2,
  Crosshair,
  History
} from 'lucide-react';
import {
  RiskCell,
  RoadSegment,
  WaterBody,
  HistoricalFloodPolygon,
  EmergencyFacility,
  CitizenReport,
  RouteOption,
  RiskLevel
} from '../types';
import {
  INITIAL_RISK_CELLS,
  CHENNAI_ROAD_SEGMENTS,
  CHENNAI_WATER_BODIES,
  HISTORICAL_FLOOD_LAYERS,
  EMERGENCY_FACILITIES,
  VELACHERY_TO_ADYAR_ROUTES
} from '../data/chennaiData';

interface RiskMapViewProps {
  activeCell: RiskCell;
  onSelectCell: (cell: RiskCell) => void;
  citizenReports: CitizenReport[];
  onNavigateTab: (tab: 'overview' | 'route' | 'report' | 'emergency') => void;
  highlightRouteId?: 'FASTEST' | 'LOWER_RISK' | 'ALL';
}

export const RiskMapView: React.FC<RiskMapViewProps> = ({
  activeCell,
  onSelectCell,
  citizenReports,
  onNavigateTab,
  highlightRouteId
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{ [key: string]: L.LayerGroup }>({});

  // Layer Visibility States
  const [showRiskGrid, setShowRiskGrid] = useState(true);
  const [showWaterBodies, setShowWaterBodies] = useState(true);
  const [showExposedRoads, setShowExposedRoads] = useState(true);
  const [showHistoricalFlood, setShowHistoricalFlood] = useState(false);
  const [showCitizenReports, setShowCitizenReports] = useState(true);
  const [showEmergencyFacilities, setShowEmergencyFacilities] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  // Selected cell for detailed drawer
  const [selectedCell, setSelectedCell] = useState<RiskCell>(activeCell);

  const getRiskColorCode = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return { fill: '#B42318', stroke: '#8F1D15', text: 'text-[#B42318]', badge: 'bg-[#B42318]/10 text-[#B42318] border-[#B42318]/30' };
      case 'HIGH':
        return { fill: '#C05621', stroke: '#9A4317', text: 'text-[#C05621]', badge: 'bg-[#C05621]/10 text-[#C05621] border-[#C05621]/30' };
      case 'MODERATE':
        return { fill: '#A67C00', stroke: '#806000', text: 'text-[#8A6A00]', badge: 'bg-[#FFF8D9] text-[#8A6A00] border-[#E5CF78]' };
      default:
        return { fill: '#18794E', stroke: '#12613E', text: 'text-[#18794E]', badge: 'bg-[#E8F6EF] text-[#18794E] border-[#A7D8C0]' };
    }
  };

  // Sync internal selected cell with external prop
  useEffect(() => {
    if (activeCell) {
      setSelectedCell(activeCell);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([activeCell.center.lat, activeCell.center.lng], {
          animate: true,
          duration: 0.8
        });
      }
    }
  }, [activeCell]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Create Map instance centered on Velachery / Chennai
    const map = L.map(mapContainerRef.current, {
      center: [activeCell.center.lat || 12.9815, activeCell.center.lng || 80.2180],
      zoom: 13,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false
    });

    // Add Zoom Control to Top Right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add High Quality CartoDB Voyager / Editorial Base Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Initialize Layer Groups
    layersGroupRef.current.riskGrid = L.layerGroup().addTo(map);
    layersGroupRef.current.waterBodies = L.layerGroup().addTo(map);
    layersGroupRef.current.exposedRoads = L.layerGroup().addTo(map);
    layersGroupRef.current.historicalFlood = L.layerGroup().addTo(map);
    layersGroupRef.current.citizenReports = L.layerGroup().addTo(map);
    layersGroupRef.current.emergencyFacilities = L.layerGroup().addTo(map);
    layersGroupRef.current.routes = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Layers whenever state/data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. RISK GRID LAYER
    const gridGroup = layersGroupRef.current.riskGrid;
    gridGroup.clearLayers();
    if (showRiskGrid) {
      INITIAL_RISK_CELLS.forEach((cell) => {
        const isSelected = selectedCell?.cellId === cell.cellId;
        const color = getRiskColorCode(cell.riskLevel);

        const rect = L.rectangle(cell.bounds, {
          color: isSelected ? '#17212B' : color.stroke,
          weight: isSelected ? 3 : 1.5,
          fillColor: color.fill,
          fillOpacity: isSelected ? 0.65 : cell.riskLevel === 'CRITICAL' ? 0.5 : 0.35,
          dashArray: isSelected ? '4, 4' : undefined
        });

        rect.on('click', () => {
          setSelectedCell(cell);
          onSelectCell(cell);
        });

        rect.bindTooltip(
          `<div class="font-sans font-bold text-xs p-1 text-[#17212B]">
            <strong>${cell.areaName}</strong><br/>
            Risk: <span style="color:${color.stroke}">${cell.riskLevel} (${cell.riskScore}/100)</span><br/>
            <span class="text-[10px] text-[#17212B]/70 font-mono">Cell: ${cell.cellId}</span>
          </div>`,
          { sticky: true }
        );

        gridGroup.addLayer(rect);
      });
    }

    // 2. WATER BODIES LAYER
    const waterGroup = layersGroupRef.current.waterBodies;
    waterGroup.clearLayers();
    if (showWaterBodies) {
      CHENNAI_WATER_BODIES.forEach((wb) => {
        if (wb.type === 'LAKE' || wb.type === 'MARSHLAND') {
          const poly = L.polygon(wb.coordinates, {
            color: '#3B6E8C',
            weight: 2,
            fillColor: '#689DBE',
            fillOpacity: 0.4
          });
          poly.bindTooltip(`<strong>${wb.name}</strong><br/><span style="color:#3B6E8C">${wb.waterLevelStatus}</span>`);
          waterGroup.addLayer(poly);
        } else {
          const line = L.polyline(wb.coordinates, {
            color: '#3B6E8C',
            weight: 5,
            opacity: 0.85
          });
          line.bindTooltip(`<strong>${wb.name}</strong><br/><span style="color:#3B6E8C">${wb.waterLevelStatus}</span>`);
          waterGroup.addLayer(line);
        }
      });
    }

    // 3. EXPOSED ROAD SEGMENTS LAYER
    const roadGroup = layersGroupRef.current.exposedRoads;
    roadGroup.clearLayers();
    if (showExposedRoads) {
      CHENNAI_ROAD_SEGMENTS.forEach((road) => {
        const isHazard = road.exposureLevel === 'HIGH' || road.exposureLevel === 'CRITICAL';
        const line = L.polyline(road.coordinates, {
          color: isHazard ? '#B42318' : '#18794E',
          weight: isHazard ? 6 : 4,
          opacity: 0.9,
          dashArray: isHazard ? '6, 6' : undefined
        });

        line.bindPopup(
          `<div class="p-2 text-xs font-sans text-[#17212B] space-y-1">
            <strong class="text-sm font-serif font-bold">${road.name}</strong>
            <div class="text-xs font-semibold ${isHazard ? 'text-[#B42318]' : 'text-[#18794E]'}">
              ${road.status.replace(/_/g, ' ')} (${road.modeledRisk}/100 Risk)
            </div>
            <p class="text-[11px] text-[#17212B]/80">${road.description}</p>
          </div>`
        );

        roadGroup.addLayer(line);
      });
    }

    // 4. HISTORICAL FLOOD LAYER (BHUVAN / NRSC)
    const histGroup = layersGroupRef.current.historicalFlood;
    histGroup.clearLayers();
    if (showHistoricalFlood) {
      HISTORICAL_FLOOD_LAYERS.forEach((h) => {
        const poly = L.polygon(h.coordinates, {
          color: '#087F8C',
          weight: 2,
          fillColor: '#087F8C',
          fillOpacity: 0.35,
          dashArray: '5, 5'
        });

        poly.bindPopup(
          `<div class="p-2 text-xs font-sans text-[#17212B] space-y-1">
            <span class="px-1.5 py-0.5 rounded-xl bg-[#087F8C]/10 text-[#087F8C] text-[10px] font-bold">HISTORICAL RECORD</span>
            <div class="font-serif font-bold">${h.eventName}</div>
            <div class="text-[#17212B]/70 text-[11px]">Archive Source: ${h.source} (${h.year})</div>
            <p class="text-[10px] text-[#17212B]/60 italic">Historical layers demonstrate past geographic extent, not real-time inundation.</p>
          </div>`
        );

        histGroup.addLayer(poly);
      });
    }

    // 5. CITIZEN REPORTS MARKERS
    const reportGroup = layersGroupRef.current.citizenReports;
    reportGroup.clearLayers();
    if (showCitizenReports) {
      citizenReports.forEach((rep) => {
        const isVerified = rep.verificationStatus === 'VERIFIED';
        const customIcon = L.divIcon({
          className: 'custom-citizen-icon',
          html: `<div style="
            background: ${isVerified ? '#18794E' : '#C05621'};
            border: 2px solid white;
            border-radius: 4px;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.25);
            color: white;
            font-size: 12px;
            font-weight: bold;
          ">
            📷
          </div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker([rep.location.lat, rep.location.lng], { icon: customIcon });

        marker.bindPopup(
          `<div class="p-2.5 text-xs font-sans text-[#17212B] space-y-1.5 min-w-[210px]">
            <div class="flex items-center justify-between">
              <span class="px-1.5 py-0.5 rounded-xl ${isVerified ? 'bg-[#18794E]/10 text-[#18794E]' : 'bg-[#C05621]/10 text-[#C05621]'} text-[10px] font-bold uppercase">
                ${rep.verificationStatus}
              </span>
              <span class="text-[10px] text-[#17212B]/60 font-mono">${rep.id}</span>
            </div>
            <strong class="block font-serif font-bold text-sm text-[#17212B]">${rep.areaName}</strong>
            <img src="${rep.imageUrl}" alt="Report Photo" style="width: 100%; height: 90px; object-fit: cover; border-radius: 2px; border: 1px solid #17212B20;" />
            <p class="text-[11px] text-[#17212B]/80">${rep.description}</p>
            <div class="pt-1.5 text-[10px] text-[#17212B]/60 border-t border-[#17212B]/10 flex justify-between font-sans">
              <span>Confidence: <strong>${rep.aiFloodConfidence}%</strong></span>
              <span>Evidence: <strong>${rep.evidenceConfidence}</strong></span>
            </div>
          </div>`
        );

        reportGroup.addLayer(marker);
      });
    }

    // 6. EMERGENCY FACILITIES MARKERS
    const facGroup = layersGroupRef.current.emergencyFacilities;
    facGroup.clearLayers();
    if (showEmergencyFacilities) {
      EMERGENCY_FACILITIES.forEach((fac) => {
        const customIcon = L.divIcon({
          className: 'custom-fac-icon',
          html: `<div style="
            background: #087F8C;
            border: 2px solid white;
            border-radius: 4px;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.25);
            color: white;
            font-size: 13px;
          ">
            🏥
          </div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker([fac.location.lat, fac.location.lng], { icon: customIcon });

        marker.bindPopup(
          `<div class="p-2.5 text-xs font-sans text-[#17212B] space-y-1 min-w-[200px]">
            <div class="flex items-center justify-between">
              <span class="px-1.5 py-0.5 rounded-xl bg-[#087F8C]/10 text-[#087F8C] text-[10px] font-bold uppercase">
                ${fac.verified ? 'VERIFIED FACILITY' : 'PROVISIONAL'}
              </span>
              <span class="text-[10px] text-[#18794E] font-bold">${fac.status}</span>
            </div>
            <strong class="block font-serif font-bold text-sm">${fac.name}</strong>
            <p class="text-[11px] text-[#17212B]/70">${fac.address}</p>
            <div class="text-[10px] text-[#17212B]/60 pt-1 border-t border-[#17212B]/10 flex justify-between">
              <span>Capacity: ${fac.capacity.current}/${fac.capacity.total}</span>
              <span>Dist: ${fac.distanceKm} km</span>
            </div>
          </div>`
        );

        facGroup.addLayer(marker);
      });
    }

    // 7. ROUTE OVERLAYS (Fastest vs Lower-Risk)
    const routeGroup = layersGroupRef.current.routes;
    routeGroup.clearLayers();
    if (showRoutes) {
      VELACHERY_TO_ADYAR_ROUTES.forEach((r) => {
        const isLowerRisk = r.id === 'LOWER_RISK';
        const isHighlighted = highlightRouteId === 'ALL' || highlightRouteId === r.id || !highlightRouteId;

        if (isHighlighted) {
          const poly = L.polyline(r.coordinates, {
            color: isLowerRisk ? '#18794E' : '#B42318',
            weight: isLowerRisk ? 5 : 4,
            opacity: 0.85,
            dashArray: isLowerRisk ? undefined : '8, 8'
          });

          poly.bindTooltip(
            `<strong>${r.routeTypeBadge}</strong><br/>${r.durationMin} min &bull; ${r.modeledRisk} Modeled Risk`,
            { sticky: true }
          );

          routeGroup.addLayer(poly);
        }
      });
    }
  }, [
    showRiskGrid,
    showWaterBodies,
    showExposedRoads,
    showHistoricalFlood,
    showCitizenReports,
    showEmergencyFacilities,
    showRoutes,
    selectedCell,
    citizenReports,
    highlightRouteId
  ]);

  const handleCenterOnArea = (cell: RiskCell) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([cell.center.lat, cell.center.lng], 14, { animate: true });
    }
  };

  const selectedCellColor = getRiskColorCode(selectedCell.riskLevel);

  return (
    <div className="space-y-4">
      {/* Top Header & Layer Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-5 bg-white border border-[#C9D9E1] shadow-sm rounded-xl">
        <div>
          <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#087F8C] mb-0.5">
            PLATE II &bull; CARTOGRAPHIC ATLAS
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#087F8C]" />
            <h2 className="text-lg lg:text-xl font-serif font-bold text-[#17212B]">
              Greater Chennai 100m Hydro-Cartographic Grid
            </h2>
          </div>
          <p className="text-xs text-[#17212B]/60 font-sans mt-0.5">
            Interactive multi-layered spatial risk model. Click any polygon to inspect localized hydrological weights.
          </p>
        </div>

        {/* Quick Map Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleCenterOnArea(selectedCell)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#F8FCFD] text-xs font-sans font-bold uppercase tracking-wider text-[#17212B] border border-[#17212B]/20 rounded-xl transition-colors shadow-sm"
            title="Focus Monitored Catchment"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>Focus {selectedCell.areaName.split(' ')[0]}</span>
          </button>

          <button
            onClick={() => setShowHistoricalFlood(!showHistoricalFlood)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all border ${
              showHistoricalFlood
                ? 'bg-[#087F8C] text-white border-[#087F8C] shadow-sm'
                : 'bg-white hover:bg-[#F8FCFD] text-[#17212B] border-[#17212B]/20'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historical Flood Footprint {showHistoricalFlood ? '(Active)' : '(Inactive)'}</span>
          </button>
        </div>
      </div>

      {/* Main Map + Inspection Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map Container */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-[#17212B]/15 shadow-sm bg-[#E7F1F5] min-h-[520px] h-[580px]">
          {/* Leaflet Map Canvas */}
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Floating Layer Toggle Box */}
          <div className="absolute top-3 left-3 z-20 p-3.5 bg-[#F8FCFD]/95 backdrop-blur-md border border-[#C9D9E1] shadow-md rounded-xl space-y-1.5 text-xs">
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#087F8C] border-b border-[#17212B]/10 pb-1 mb-1.5">
              GIS Cartographic Overlays
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showRiskGrid}
                  onChange={(e) => setShowRiskGrid(e.target.checked)}
                  className="accent-[#087F8C] rounded-xl"
                />
                <span>100m Hydro Risk Grid</span>
              </label>
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showExposedRoads}
                  onChange={(e) => setShowExposedRoads(e.target.checked)}
                  className="accent-[#B42318] rounded-xl"
                />
                <span>Arterial Road Exposure</span>
              </label>
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showWaterBodies}
                  onChange={(e) => setShowWaterBodies(e.target.checked)}
                  className="accent-[#3B6E8C] rounded-xl"
                />
                <span>Water Bodies & Inundation Basins</span>
              </label>
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showCitizenReports}
                  onChange={(e) => setShowCitizenReports(e.target.checked)}
                  className="accent-[#18794E] rounded-xl"
                />
                <span>Ground Citizen Dispatches</span>
              </label>
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showEmergencyFacilities}
                  onChange={(e) => setShowEmergencyFacilities(e.target.checked)}
                  className="accent-[#087F8C] rounded-xl"
                />
                <span>Relief & Evacuation Shelters</span>
              </label>
              <label className="flex items-center gap-2 text-[#17212B] cursor-pointer hover:text-[#087F8C] font-sans">
                <input
                  type="checkbox"
                  checked={showRoutes}
                  onChange={(e) => setShowRoutes(e.target.checked)}
                  className="accent-[#087F8C] rounded-xl"
                />
                <span>Safe Transit Corridors</span>
              </label>
            </div>
          </div>

          {/* Floating Risk Legend Box */}
          <div className="absolute bottom-3 left-3 z-20 p-3 bg-[#F8FCFD]/95 backdrop-blur-md border border-[#C9D9E1] shadow-md rounded-xl text-xs space-y-1.5">
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#17212B]/70">
              Risk Calibration Index
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#18794E] border border-[#17212B]/20"></div>
                <span className="text-[10px] font-sans text-[#17212B]/80">0–24 Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#087F8C] border border-[#17212B]/20"></div>
                <span className="text-[10px] font-sans text-[#17212B]/80">25–49 Mod</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#C05621] border border-[#17212B]/20"></div>
                <span className="text-[10px] font-sans text-[#17212B]/80">50–74 High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#B42318] border border-[#17212B]/20"></div>
                <span className="text-[10px] font-sans text-[#17212B]/80">75+ Crit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Cell Detailed Intelligence Panel */}
        <div className="lg:col-span-4 bg-white border border-[#C9D9E1] p-5 shadow-sm rounded-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 border-b border-[#17212B]/10 pb-3">
              <div>
                <span className="text-[9px] font-sans uppercase font-bold text-[#087F8C] tracking-[0.25em]">
                  INSPECTED CATCHMENT
                </span>
                <h3 className="text-xl font-serif font-bold text-[#17212B] mt-0.5">{selectedCell.areaName}</h3>
              </div>
              <span className="font-mono text-xs font-bold text-[#087F8C] bg-white px-2.5 py-1 rounded-xl border border-[#17212B]/15">
                {selectedCell.cellId}
              </span>
            </div>

            {/* Score & Badge Banner */}
            <div className="my-3 p-4 bg-white border border-[#17212B]/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[9px] font-sans uppercase font-bold text-[#17212B]/50 tracking-wider">Composite Score</div>
                <div className="text-2xl font-serif font-bold text-[#17212B] flex items-center gap-2 mt-0.5">
                  <span>{selectedCell.riskScore}</span>
                  <span className="text-xs text-[#17212B]/40 font-sans font-normal">/ 100</span>
                  <span className={`text-[9px] font-sans px-2 py-0.5 rounded-xl border font-bold uppercase tracking-wider ${selectedCellColor.badge}`}>
                    {selectedCell.riskLevel}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-sans uppercase font-bold text-[#17212B]/50 tracking-wider">Confidence</div>
                <div className="text-xs font-serif font-bold text-[#18794E] flex items-center gap-1 mt-1 justify-end">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedCell.evidenceConfidence}</span>
                </div>
              </div>
            </div>

            {/* Contributing Factor Scores */}
            <div className="space-y-2 text-xs">
              <div className="text-[10px] font-sans font-bold text-[#17212B]/60 uppercase tracking-[0.2em]">
                Hydrological Factor Signatures
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#17212B]/10 rounded-xl">
                  <span className="text-xs font-sans text-[#17212B]/80">Rainfall Pressure (25%)</span>
                  <span className="font-mono font-bold text-[#087F8C]">{selectedCell.rainfallScore}/100</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#17212B]/10 rounded-xl">
                  <span className="text-xs font-sans text-[#17212B]/80">Terrain DEM Gradient (15%)</span>
                  <span className="font-mono font-bold text-[#087F8C]">{selectedCell.terrainScore}/100</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#17212B]/10 rounded-xl">
                  <span className="text-xs font-sans text-[#17212B]/80">Flow Accumulation (10%)</span>
                  <span className="font-mono font-bold text-[#087F8C]">{selectedCell.flowAccumulationScore}/100</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#17212B]/10 rounded-xl">
                  <span className="text-xs font-sans text-[#17212B]/80">Historical Inundation (10%)</span>
                  <span className="font-mono font-bold text-[#087F8C]">{selectedCell.historyScore}/100</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#17212B]/10 rounded-xl">
                  <span className="text-xs font-sans text-[#17212B]/80">Ground Citizen Evidence (10%)</span>
                  <span className="font-mono font-bold text-[#18794E]">{selectedCell.citizenScore}/100</span>
                </div>
              </div>
            </div>

            {/* Risk Escalation Window Box */}
            <div className="mt-3 p-3.5 bg-white border border-[#087F8C]/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-[9px] font-sans text-[#17212B]/50 font-bold uppercase tracking-wider">
                <span>Escalation Window</span>
                <span className="text-[#087F8C] font-serif font-bold">{selectedCell.riskWindow.confidence}</span>
              </div>
              <div className="text-base font-serif font-bold text-[#087F8C]">
                {selectedCell.riskWindow.start} &mdash; {selectedCell.riskWindow.end}
              </div>
              <p className="text-[11px] font-sans text-[#17212B]/70 leading-tight">
                {selectedCell.riskWindow.primaryDriver}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-[#17212B]/10">
            <button
              onClick={() => onNavigateTab('route')}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-[#F8FCFD] border border-[#17212B]/20 text-xs font-sans font-bold uppercase tracking-wider text-[#17212B] transition-all rounded-xl shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Plan Safe Route From Here</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('emergency')}
                className="flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-[#F8FCFD] text-[#17212B] text-xs font-sans font-bold uppercase tracking-wider border border-[#17212B]/15 rounded-xl transition-colors"
              >
                <Hospital className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Shelters</span>
              </button>
              <button
                onClick={() => onNavigateTab('report')}
                className="flex items-center justify-center gap-1.5 py-2 bg-[#B42318] hover:bg-[#8F1D15] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Report Flood</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
