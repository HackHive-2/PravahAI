import React from 'react';
import {
  FileCode2,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  Radio,
  Server,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Cpu,
  Compass,
  Building2
} from 'lucide-react';

export const DataMethodologyView: React.FC = () => {
  const dataSources = [
    {
      need: 'Forecast / Weather',
      source: 'Open-Meteo / IMD Chennai',
      usage: 'Forecast & recent rainfall accumulation for risk escalation windows',
      provenance: 'OPEN_DATA / OFFICIAL',
      status: 'CACHED DEMO SNAPSHOT',
      priority: 'Primary / Fallback'
    },
    {
      need: 'Elevation / DEM',
      source: 'Copernicus DEM GLO-30 / Bhuvan CartoDEM',
      usage: '30m elevation model for slope, flow accumulation & bowl depression analysis',
      provenance: 'OPEN_DATA',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Historical Inundation',
      source: 'Bhuvan / NRSC Disaster Portal',
      usage: '2015 & 2023 Chennai inundation footprints for exposure baseline',
      provenance: 'OFFICIAL',
      status: 'HISTORICAL',
      priority: 'Primary'
    },
    {
      need: 'Local Chennai Context',
      source: 'Chennai Flood Monitoring (CFM-DSS) & TNGIS',
      usage: 'Reservoir discharge status, lake embankments, and ward boundaries',
      provenance: 'OFFICIAL',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Road Network & POIs',
      source: 'OpenStreetMap / Geofabrik',
      usage: 'OSM road segments, OSRM routing engine inputs, and POI mapping',
      provenance: 'OPEN_DATA',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Flood Image CV',
      source: 'FloodNet Supervised v1.0',
      usage: '2,343 post-flood aerial & street images for lightweight binary classifier',
      provenance: 'OPEN_DATA',
      status: 'PRE-TRAINED AID',
      priority: 'Primary'
    },
    {
      need: 'Live Citizen Evidence',
      source: 'AegisLocal App Submissions',
      usage: 'Geo-tagged field photos, timestamps, and localized observations',
      provenance: 'CITIZEN',
      status: 'LIVE EVIDENCE',
      priority: 'Primary'
    },
    {
      need: 'Authoritative Alerts',
      source: 'TNSDMA / GCC Control Center',
      usage: 'Official disaster alerts and relief centre operations',
      provenance: 'OFFICIAL',
      status: 'LIVE',
      priority: 'Primary'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-1">
              DISPATCH VIII &bull; SYSTEM ARCHITECTURE & METHODOLOGY
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <FileCode2 className="w-6 h-6 text-[#A67C52]" />
              <span>Data, GIS Architecture & Methodology</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-3xl font-sans leading-relaxed">
              A transparent, open-source, and zero-cost disaster intelligence pipeline designed to transform broad regional alerts and spatial observations into explainable decisions.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] rounded-sm font-sans">
            <span className="text-[#1A1A1A]/60">Target Resolution:</span>{' '}
            <strong className="text-[#8B5E3C] font-mono">100m &times; 100m Grid</strong>
          </div>
        </div>
      </div>

      {/* 1. Core End-to-End Architecture Pipeline */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <h2 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#A67C52]" />
            <span>Deterministic 5-Stage Architecture Pipeline</span>
          </h2>
          <span className="text-[10px] text-[#1A1A1A]/50 font-sans uppercase tracking-wider">Multi-Source GIS Fusion</span>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 font-sans">
          <div className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 space-y-1.5 rounded-sm">
            <div className="text-[9px] font-mono font-bold text-[#A67C52]">STAGE 1</div>
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Data Ingestion</div>
            <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
              IMD, Open-Meteo, Copernicus DEM, Bhuvan, OSM, TNGIS, Citizen uploads.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 space-y-1.5 rounded-sm">
            <div className="text-[9px] font-mono font-bold text-[#8B5E3C]">STAGE 2</div>
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Geospatial Processing</div>
            <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
              Elevation, slope, flow accumulation, water proximity & road segmentation.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 space-y-1.5 rounded-sm">
            <div className="text-[9px] font-mono font-bold text-[#2D5A43]">STAGE 3</div>
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Hyperlocal Risk Engine</div>
            <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
              100m grid scoring, multi-source evidence weighting, FloodNet CV validation.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 space-y-1.5 rounded-sm">
            <div className="text-[9px] font-mono font-bold text-[#C97A2C]">STAGE 4</div>
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Decision Engine</div>
            <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
              Risk-aware routing, road exposure transfer, safe facility ranking, risk windows.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#A67C52]/50 space-y-1.5 rounded-sm">
            <div className="text-[9px] font-mono font-bold text-[#A67C52]">STAGE 5</div>
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">Citizen & Admin Action</div>
            <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed font-sans">
              Interactive Leaflet maps, route navigation, field reporting & verification.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Finalized Source Register Table */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#A67C52]" />
            <span>Finalized Data Source Registry (Chennai MVP)</span>
          </h3>
          <span className="text-xs text-[#1A1A1A]/50 font-sans uppercase tracking-wider">Open-Data Specifications</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF8F5] text-[#1A1A1A]/60 uppercase font-sans text-[9px] tracking-wider border-b border-[#1A1A1A]/10">
              <tr>
                <th className="p-3">Data Need</th>
                <th className="p-3">Source Provider</th>
                <th className="p-3">Exact AegisLocal Usage</th>
                <th className="p-3">Category</th>
                <th className="p-3">Data Status</th>
                <th className="p-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10">
              {dataSources.map((ds, i) => (
                <tr key={i} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="p-3 font-serif font-bold text-[#1A1A1A]">{ds.need}</td>
                  <td className="p-3 text-[#8B5E3C] font-mono text-[11px] font-bold">{ds.source}</td>
                  <td className="p-3 text-[#1A1A1A]/75">{ds.usage}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-sm text-[9px] font-sans font-bold bg-[#FAF8F5] text-[#1A1A1A]/70 border border-[#1A1A1A]/15 uppercase tracking-wider">
                      {ds.provenance}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[9px] font-sans font-bold uppercase tracking-wider ${
                        ds.status.includes('LIVE')
                          ? 'bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30'
                          : ds.status.includes('HISTORICAL')
                          ? 'bg-[#8B5E3C]/10 text-[#8B5E3C] border border-[#8B5E3C]/30'
                          : 'bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30'
                      }`}
                    >
                      {ds.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#1A1A1A]/60 font-sans text-[11px]">{ds.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Mathematical Risk Formulation & Zero-Cost Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transparent Formula */}
        <div className="p-6 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase text-[#1A1A1A] tracking-wider border-b border-[#1A1A1A]/10 pb-2">
            <Cpu className="w-4 h-4 text-[#A67C52]" />
            <span>Explainable Risk Formula (MVP Calibration)</span>
          </div>
          <div className="p-3.5 bg-[#FAF8F5] font-mono text-xs text-[#1A1A1A] border border-[#1A1A1A]/15 rounded-sm leading-relaxed">
            R = 100 &times; (
            <br />&nbsp;&nbsp;0.25 &bull; Rainfall + 0.15 &bull; Recent_Accum +
            <br />&nbsp;&nbsp;0.15 &bull; Terrain_DEM + 0.10 &bull; Flow_Accum +
            <br />&nbsp;&nbsp;0.10 &bull; Historical_Inundation + 0.10 &bull; Water_Proximity +
            <br />&nbsp;&nbsp;0.10 &bull; Citizen_Evidence + 0.05 &bull; Official_Alerts
            <br />)
          </div>
          <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
            <strong>Missing-Data Principle:</strong> AegisLocal never silently treats missing data as zero risk. Missing variables dynamically lower evidence confidence scores.
          </p>
        </div>

        {/* Zero-Cost & Demo Resilience */}
        <div className="p-6 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase text-[#1A1A1A] tracking-wider border-b border-[#1A1A1A]/10 pb-2">
            <Server className="w-4 h-4 text-[#2D5A43]" />
            <span>Zero-Cost & Offline-Resilient Architecture</span>
          </div>
          <ul className="text-xs text-[#1A1A1A]/75 space-y-2 list-disc list-inside leading-relaxed font-sans">
            <li>
              <strong>Open-Source Core:</strong> Python, PostGIS, FastAPI, React, Leaflet, OpenStreetMap, OSRM, PyTorch.
            </li>
            <li>
              <strong>No Paid APIs:</strong> Zero dependency on proprietary map licensing or paid inference cloud tiers.
            </li>
            <li>
              <strong>Offline Resilience:</strong> Preprocessed local demo cache ensures the SIH demonstration does not collapse if venue connectivity falters.
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Mandatory Safety & Scientific Disclaimers */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-3 text-xs text-[#1A1A1A]/75">
        <div className="flex items-center gap-2 text-[#9E2A2B] font-serif font-bold uppercase tracking-wider text-xs border-b border-[#1A1A1A]/10 pb-2">
          <AlertTriangle className="w-4 h-4 text-[#9E2A2B]" />
          <span>Mandatory Safety, Ethical & Scientific Disclaimers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed font-sans">
          <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
            <strong className="text-[#1A1A1A] font-serif font-bold block mb-1">Spatial Resolution Limitation:</strong>
            AegisLocal provides modeled neighbourhood/grid-level flood-risk intelligence (100m &times; 100m). It does not guarantee street-level flood depth, exact inundation timing, or safe travel.
          </div>
          <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
            <strong className="text-[#1A1A1A] font-serif font-bold block mb-1">Precedence of Official Warnings:</strong>
            Official instructions from Greater Chennai Corporation, TNSDMA, and Disaster Management Authorities take absolute precedence over model-derived recommendations.
          </div>
          <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
            <strong className="text-[#1A1A1A] font-serif font-bold block mb-1">Citizen Evidence Integrity:</strong>
            Citizen reports are treated as observational evidence signals and not ground truth until corroborated by spatial proximity, timestamps, and responder verification.
          </div>
          <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
            <strong className="text-[#1A1A1A] font-serif font-bold block mb-1">Route Terminology Standard:</strong>
            AegisLocal strictly uses the term "lower-risk route" or "risk-aware route" and never guarantees absolute route safety during severe weather events.
          </div>
        </div>
      </div>
    </div>
  );
};
