import React from 'react';
import {
  FileCode2,
  Database,
  Layers,
  Cpu,
  Server,
  AlertTriangle
} from 'lucide-react';

export const DataMethodologyView: React.FC = () => {
  const dataSources = [
    {
      need: 'Forecast / Weather',
      source: 'Open-Meteo / IMD Chennai',
      usage:
        'Forecast & recent rainfall accumulation for risk escalation windows',
      provenance: 'OPEN_DATA / OFFICIAL',
      status: 'CACHED DEMO SNAPSHOT',
      priority: 'Primary / Fallback'
    },
    {
      need: 'Elevation / DEM',
      source: 'Copernicus DEM GLO-30 / Bhuvan CartoDEM',
      usage:
        '30m elevation model for slope, flow accumulation & bowl depression analysis',
      provenance: 'OPEN_DATA',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Historical Inundation',
      source: 'Bhuvan / NRSC Disaster Portal',
      usage:
        '2015 & 2023 Chennai inundation footprints for exposure baseline',
      provenance: 'OFFICIAL',
      status: 'HISTORICAL',
      priority: 'Primary'
    },
    {
      need: 'Local Chennai Context',
      source: 'Chennai Flood Monitoring (CFM-DSS) & TNGIS',
      usage:
        'Reservoir discharge status, lake embankments, and ward boundaries',
      provenance: 'OFFICIAL',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Road Network & POIs',
      source: 'OpenStreetMap / Geofabrik',
      usage:
        'OSM road segments, OSRM routing engine inputs, and POI mapping',
      provenance: 'OPEN_DATA',
      status: 'CACHED',
      priority: 'Primary'
    },
    {
      need: 'Flood Image CV',
      source: 'FloodNet Supervised v1.0',
      usage:
        '2,343 post-flood aerial & street images for lightweight binary classifier',
      provenance: 'OPEN_DATA',
      status: 'PRE-TRAINED AID',
      priority: 'Primary'
    },
    {
      need: 'Live Citizen Evidence',
      source: 'AegisLocal App Submissions',
      usage:
        'Geo-tagged field photos, timestamps, and localized observations',
      provenance: 'CITIZEN',
      status: 'LIVE EVIDENCE',
      priority: 'Primary'
    },
    {
      need: 'Authoritative Alerts',
      source: 'TNSDMA / GCC Control Center',
      usage:
        'Official disaster alerts and relief centre operations',
      provenance: 'OFFICIAL',
      status: 'LIVE',
      priority: 'Primary'
    }
  ];

  const stages = [
    {
      stage: 'STAGE 1',
      title: 'Data Ingestion',
      description:
        'IMD, Open-Meteo, Copernicus DEM, Bhuvan, OSM, TNGIS, Citizen uploads.',
      accent: '#087F8C'
    },
    {
      stage: 'STAGE 2',
      title: 'Geospatial Processing',
      description:
        'Elevation, slope, flow accumulation, water proximity & road segmentation.',
      accent: '#1D4E89'
    },
    {
      stage: 'STAGE 3',
      title: 'Hyperlocal Risk Engine',
      description:
        '100m grid scoring, multi-source evidence weighting, FloodNet CV validation.',
      accent: '#18794E'
    },
    {
      stage: 'STAGE 4',
      title: 'Decision Engine',
      description:
        'Risk-aware routing, road exposure transfer, safe facility ranking, risk windows.',
      accent: '#A67C00'
    },
    {
      stage: 'STAGE 5',
      title: 'Citizen & Admin Action',
      description:
        'Interactive Leaflet maps, route navigation, field reporting & verification.',
      accent: '#087F8C'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="bg-white border border-[#C9D9E1] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#087F8C] mb-2">
              DISPATCH VIII • SYSTEM ARCHITECTURE & METHODOLOGY
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#102A43] tracking-tight flex items-center gap-3">
              <FileCode2 className="w-6 h-6 text-[#087F8C]" />
              <span>Data, GIS Architecture & Methodology</span>
            </h1>

            <p className="text-xs text-[#52606D] mt-2 max-w-3xl font-sans leading-relaxed">
              A transparent, open-source, and zero-cost disaster intelligence
              pipeline designed to transform broad regional alerts and spatial
              observations into explainable decisions.
            </p>
          </div>

          <div className="bg-white border border-[#C9D9E1] rounded-xl px-4 py-3 text-xs font-sans shadow-sm shrink-0">
            <div className="text-[#7B8794] mb-1">
              Target Resolution
            </div>

            <strong className="text-[#087F8C] font-mono">
              100m × 100m Grid
            </strong>
          </div>
        </div>
      </div>

      {/* =========================================================
          1. ARCHITECTURE PIPELINE
      ========================================================= */}

      <div className="bg-white border border-[#C9D9E1] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9D9E1] pb-4">
          <h2 className="text-base font-serif font-bold text-[#102A43] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#087F8C]" />
            <span>Deterministic 5-Stage Architecture Pipeline</span>
          </h2>

          <span className="text-[10px] text-[#7B8794] font-sans uppercase tracking-wider">
            Multi-Source GIS Fusion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-1 font-sans">
          {stages.map((stage) => (
            <div
              key={stage.stage}
              className="bg-white border border-[#C9D9E1] rounded-xl p-4 space-y-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{
                borderTopWidth: '3px',
                borderTopColor: stage.accent
              }}
            >
              <div
                className="text-[9px] font-mono font-bold"
                style={{ color: stage.accent }}
              >
                {stage.stage}
              </div>

              <div className="text-xs font-serif font-bold text-[#102A43] uppercase tracking-wide">
                {stage.title}
              </div>

              <p className="text-[11px] text-[#52606D] leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          2. DATA SOURCE REGISTRY
      ========================================================= */}

      <div className="bg-white border border-[#C9D9E1] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9D9E1] pb-4">
          <h3 className="text-base font-serif font-bold text-[#102A43] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#087F8C]" />
            <span>Finalized Data Source Registry (Chennai MVP)</span>
          </h3>

          <span className="text-[10px] text-[#7B8794] font-sans uppercase tracking-wider">
            Open-Data Specifications
          </span>
        </div>

        <div className="overflow-x-auto border border-[#C9D9E1] rounded-xl">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#E7F1F5] text-[#52606D] uppercase text-[9px] tracking-wider border-b border-[#C9D9E1]">
              <tr>
                <th className="p-3 font-bold">Data Need</th>
                <th className="p-3 font-bold">Source Provider</th>
                <th className="p-3 font-bold">Exact PravahAI Usage</th>
                <th className="p-3 font-bold">Category</th>
                <th className="p-3 font-bold">Data Status</th>
                <th className="p-3 font-bold">Priority</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#C9D9E1]">
              {dataSources.map((ds, i) => (
                <tr
                  key={i}
                  className="bg-white hover:bg-[#F1F7FA] transition-colors"
                >
                  <td className="p-3 font-serif font-bold text-[#102A43]">
                    {ds.need}
                  </td>

                  <td className="p-3 text-[#087F8C] font-mono text-[11px] font-bold">
                    {ds.source}
                  </td>

                  <td className="p-3 text-[#52606D] leading-relaxed">
                    {ds.usage}
                  </td>

                  <td className="p-3">
                    <span className="inline-flex px-2 py-1 rounded-lg text-[9px] font-sans font-bold bg-white text-[#52606D] border border-[#C9D9E1] uppercase tracking-wider">
                      {ds.provenance}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-sans font-bold uppercase tracking-wider border ${
                        ds.status.includes('LIVE')
                          ? 'bg-[#E8F6EF] text-[#18794E] border-[#A7D8C0]'
                          : ds.status.includes('HISTORICAL')
                          ? 'bg-[#FFF8D9] text-[#8A6A00] border-[#E5CF78]'
                          : 'bg-[#E7F1F5] text-[#1D4E89] border-[#C9D9E1]'
                      }`}
                    >
                      {ds.status}
                    </span>
                  </td>

                  <td className="p-3 text-[#52606D] text-[11px]">
                    {ds.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          3. RISK FORMULA + ZERO COST
      ========================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Formula */}

        <div className="bg-white border border-[#C9D9E1] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase text-[#102A43] tracking-wider border-b border-[#C9D9E1] pb-3">
            <Cpu className="w-4 h-4 text-[#087F8C]" />
            <span>Explainable Risk Formula (MVP Calibration)</span>
          </div>

          <div className="bg-white border border-[#C9D9E1] rounded-xl p-4 font-mono text-xs text-[#102A43] leading-relaxed shadow-sm">
            R = 100 × (
            <br />
            &nbsp;&nbsp;0.25 • Rainfall + 0.15 • Recent_Accum +
            <br />
            &nbsp;&nbsp;0.15 • Terrain_DEM + 0.10 • Flow_Accum +
            <br />
            &nbsp;&nbsp;0.10 • Historical_Inundation + 0.10 • Water_Proximity +
            <br />
            &nbsp;&nbsp;0.10 • Citizen_Evidence + 0.05 • Official_Alerts
            <br />)
          </div>

          <div className="bg-white border border-[#C9D9E1] rounded-xl p-4 text-xs text-[#52606D] leading-relaxed">
            <strong className="text-[#102A43]">
              Missing-Data Principle:
            </strong>{' '}
            PravahAI never silently treats missing data as zero risk. Missing
            variables dynamically lower evidence confidence scores.
          </div>
        </div>

        {/* Zero Cost */}

        <div className="bg-white border border-[#C9D9E1] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase text-[#102A43] tracking-wider border-b border-[#C9D9E1] pb-3">
            <Server className="w-4 h-4 text-[#18794E]" />
            <span>Zero-Cost & Offline-Resilient Architecture</span>
          </div>

          <div className="bg-white border border-[#C9D9E1] rounded-xl p-4">
            <ul className="text-xs text-[#52606D] space-y-3 leading-relaxed font-sans">
              <li>
                <strong className="text-[#102A43]">
                  Open-Source Core:
                </strong>{' '}
                Python, PostGIS, FastAPI, React, Leaflet, OpenStreetMap, OSRM,
                PyTorch.
              </li>

              <li>
                <strong className="text-[#102A43]">
                  No Paid APIs:
                </strong>{' '}
                Zero dependency on proprietary map licensing or paid inference
                cloud tiers.
              </li>

              <li>
                <strong className="text-[#102A43]">
                  Offline Resilience:
                </strong>{' '}
                Preprocessed local demo cache ensures the SIH demonstration does
                not collapse if venue connectivity falters.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================
          4. SAFETY & SCIENTIFIC DISCLAIMERS
      ========================================================= */}

      <div className="bg-white border border-[#E9A6A1] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#B42318] font-serif font-bold uppercase tracking-wider text-xs border-b border-[#F1C8C4] pb-3">
          <AlertTriangle className="w-4 h-4" />
          <span>Mandatory Safety, Ethical & Scientific Disclaimers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed font-sans">
          <div className="bg-white border border-[#F1C8C4] rounded-xl p-4">
            <strong className="text-[#102A43] font-serif font-bold block mb-2">
              Spatial Resolution Limitation
            </strong>

            <span className="text-[#52606D]">
              PravahAI provides modeled neighbourhood/grid-level flood-risk
              intelligence (100m × 100m). It does not guarantee street-level
              flood depth, exact inundation timing, or safe travel.
            </span>
          </div>

          <div className="bg-white border border-[#F1C8C4] rounded-xl p-4">
            <strong className="text-[#102A43] font-serif font-bold block mb-2">
              Precedence of Official Warnings
            </strong>

            <span className="text-[#52606D]">
              Official instructions from Greater Chennai Corporation, TNSDMA,
              and Disaster Management Authorities take absolute precedence over
              model-derived recommendations.
            </span>
          </div>

          <div className="bg-white border border-[#F1C8C4] rounded-xl p-4">
            <strong className="text-[#102A43] font-serif font-bold block mb-2">
              Citizen Evidence Integrity
            </strong>

            <span className="text-[#52606D]">
              Citizen reports are treated as observational evidence signals and
              not ground truth until corroborated by spatial proximity,
              timestamps, and responder verification.
            </span>
          </div>

          <div className="bg-white border border-[#F1C8C4] rounded-xl p-4">
            <strong className="text-[#102A43] font-serif font-bold block mb-2">
              Route Terminology Standard
            </strong>

            <span className="text-[#52606D]">
              PravahAI strictly uses the term "lower-risk route" or
              "risk-aware route" and never guarantees absolute route safety
              during severe weather events.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};