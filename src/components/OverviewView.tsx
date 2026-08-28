import React from 'react';
import {
  AlertOctagon,
  CloudRain,
  Navigation,
  Camera,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Search,
  Droplets,
  Mountain,
  Compass,
  History,
  Building2,
  Users,
  BellRing
} from 'lucide-react';
import {
  ChennaiNeighbourhood,
  RiskCell,
  RiskFactorItem,
  ConfidenceLevel,
  RiskLevel
} from '../types';
import {
  CHENNAI_NEIGHBOURHOODS,
  HOURLY_RAINFALL_DATA
} from '../data/chennaiData';
import { getFactorBreakdown } from '../services/riskEngine';

interface OverviewViewProps {
  selectedNeighbourhood: ChennaiNeighbourhood;
  onSelectNeighbourhood: (n: ChennaiNeighbourhood) => void;
  activeRiskCell: RiskCell;
  onNavigateTab: (tab: 'map' | 'route' | 'report' | 'emergency' | 'alerts' | 'dashboard' | 'methodology') => void;
  onSelectCell: (cell: RiskCell) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedNeighbourhood,
  onSelectNeighbourhood,
  activeRiskCell,
  onNavigateTab,
  onSelectCell
}) => {
  const [formulaExpanded, setFormulaExpanded] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const factorItems = getFactorBreakdown(activeRiskCell);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-[#9E2A2B]/5',
          border: 'border-[#9E2A2B]/30',
          text: 'text-[#9E2A2B]',
          badge: 'bg-[#9E2A2B]/10 text-[#9E2A2B] border-[#9E2A2B]/40',
          bar: 'bg-[#9E2A2B]',
          ring: 'text-[#9E2A2B]'
        };
      case 'HIGH':
        return {
          bg: 'bg-[#C97A2C]/5',
          border: 'border-[#C97A2C]/30',
          text: 'text-[#C97A2C]',
          badge: 'bg-[#C97A2C]/10 text-[#C97A2C] border-[#C97A2C]/40',
          bar: 'bg-[#C97A2C]',
          ring: 'text-[#C97A2C]'
        };
      case 'MODERATE':
        return {
          bg: 'bg-[#8B5E3C]/5',
          border: 'border-[#8B5E3C]/30',
          text: 'text-[#8B5E3C]',
          badge: 'bg-[#8B5E3C]/10 text-[#8B5E3C] border-[#8B5E3C]/40',
          bar: 'bg-[#8B5E3C]',
          ring: 'text-[#8B5E3C]'
        };
      default:
        return {
          bg: 'bg-[#2D5A43]/5',
          border: 'border-[#2D5A43]/30',
          text: 'text-[#2D5A43]',
          badge: 'bg-[#2D5A43]/10 text-[#2D5A43] border-[#2D5A43]/40',
          bar: 'bg-[#2D5A43]',
          ring: 'text-[#2D5A43]'
        };
    }
  };

  const riskTheme = getRiskColor(activeRiskCell.riskLevel);

  const filteredNeighbourhoods = CHENNAI_NEIGHBOURHOODS.filter((n) =>
    n.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Official Emergency Warning Banner */}
      <div className="bg-white border-l-4 border-[#9E2A2B] border-y border-r border-[#1A1A1A]/15 p-5 lg:p-6 shadow-sm relative overflow-hidden rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-[#9E2A2B]/10 border border-[#9E2A2B]/30 text-[#9E2A2B] shrink-0 rounded-sm">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#9E2A2B] text-white rounded-sm">
                  OFFICIAL ADVISORY
                </span>
                <span className="text-xs text-[#9E2A2B] font-serif font-semibold">
                  IMD Regional Met Centre &bull; Greater Chennai Disaster Management
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Severe Precipitation Warning &mdash; Greater Chennai Basin
              </h2>
              <p className="text-xs lg:text-sm text-[#1A1A1A]/80 mt-1 max-w-3xl font-sans leading-relaxed">
                Elevated flood risk is modeled across low-lying depressions and drainage bottlenecks. High antecedent soil saturation necessitates route vigilance.
              </p>
            </div>
          </div>

          {/* Action Quick Links */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigateTab('route')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF8F5] hover:bg-[#EAE6E1] border border-[#1A1A1A]/20 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] transition-all rounded-sm shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Plan Safe Route</span>
            </button>

            <button
              onClick={() => onNavigateTab('report')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#9E2A2B] hover:bg-[#7E1F20] text-xs font-sans font-bold uppercase tracking-wider text-white transition-all rounded-sm shadow-sm"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search & Chennai Neighbourhood Picker */}
      <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-0.5">
              SECTOR SELECTION &bull; BASIN ATLAS
            </div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A67C52]" />
              <span>Greater Chennai Ward & Catchment Selector</span>
            </h3>
            <p className="text-xs text-[#1A1A1A]/60 font-sans mt-0.5">
              Select a catchment to inspect its explainable 100m multi-factor risk profile.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ward or neighbourhood..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#1A1A1A]/20 text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#A67C52] rounded-sm"
            />
          </div>
        </div>

        {/* Neighbourhood Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {filteredNeighbourhoods.map((n) => {
            const isSelected = selectedNeighbourhood.id === n.id;
            return (
              <button
                key={n.id}
                onClick={() => onSelectNeighbourhood(n)}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded-sm transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-[#F4F1EE] font-serif font-bold shadow-sm border border-[#1A1A1A]'
                    : 'bg-[#FAF8F5] hover:bg-[#EAE6E1] text-[#1A1A1A] border border-[#1A1A1A]/15'
                }`}
              >
                <span>{n.name}</span>
                <span
                  className={`text-[9px] font-sans px-1.5 py-0.2 rounded-sm font-bold uppercase tracking-wider ${
                    isSelected
                      ? 'bg-[#A67C52] text-white'
                      : n.baseRisk === 'CRITICAL'
                      ? 'text-[#9E2A2B] bg-[#9E2A2B]/10'
                      : n.baseRisk === 'HIGH'
                      ? 'text-[#C97A2C] bg-[#C97A2C]/10'
                      : 'text-[#2D5A43] bg-[#2D5A43]/10'
                  }`}
                >
                  {n.score}/100
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Decision Split: Selected Area Risk Gauge & Escalation Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Selected Area Risk Gauge Card */}
        <div className={`lg:col-span-7 bg-white border ${riskTheme.border} p-6 shadow-sm rounded-sm flex flex-col justify-between`}>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#8B5E3C]">
                    CURRENT DOSSIER
                  </span>
                  <span className="text-[#1A1A1A]/30">&bull;</span>
                  <span className="text-xs font-mono text-[#1A1A1A]/70">{activeRiskCell.cellId}</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-3">
                  <span>{selectedNeighbourhood.name}</span>
                  <span className={`text-[10px] font-sans px-2.5 py-0.5 border font-bold uppercase tracking-wider rounded-sm ${riskTheme.badge}`}>
                    {activeRiskCell.riskLevel} RISK
                  </span>
                </h1>
                <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-md font-sans leading-relaxed">
                  {selectedNeighbourhood.description}
                </p>
              </div>

              {/* Confidence Badge */}
              <div className="text-right shrink-0">
                <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 tracking-wider">
                  EVIDENCE CONFIDENCE
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-0.5 text-xs font-serif font-bold text-[#2D5A43]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>{activeRiskCell.evidenceConfidence}</span>
                </div>
              </div>
            </div>

            {/* Circular Risk Score Gauge Visualization */}
            <div className="my-6 p-5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm flex flex-col sm:flex-row items-center justify-around gap-6">
              <div className="relative flex items-center justify-center">
                {/* SVG Circular Meter */}
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-[#E5E1DD]"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * activeRiskCell.riskScore) / 100}
                    strokeLinecap="square"
                    className={`${riskTheme.ring} transition-all duration-1000 ease-out`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                    {activeRiskCell.riskScore}
                  </div>
                  <div className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 tracking-[0.2em]">
                    INDEX / 100
                  </div>
                </div>
              </div>

              {/* Risk Scale Legend */}
              <div className="space-y-2 text-xs w-full sm:w-auto">
                <div className="text-[10px] font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1">
                  CALIBRATED RISK TIERS
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white border border-[#1A1A1A]/10 rounded-sm flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold text-[#2D5A43]">0–24 LOW</span>
                    <div className="w-2 h-2 bg-[#2D5A43]"></div>
                  </div>
                  <div className="p-2 bg-white border border-[#1A1A1A]/10 rounded-sm flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold text-[#8B5E3C]">25–49 MOD</span>
                    <div className="w-2 h-2 bg-[#8B5E3C]"></div>
                  </div>
                  <div className={`p-2 bg-white border ${activeRiskCell.riskLevel === 'HIGH' ? 'border-[#C97A2C] bg-[#C97A2C]/5' : 'border-[#1A1A1A]/10'} rounded-sm flex items-center justify-between gap-2`}>
                    <span className="text-[10px] font-sans font-semibold text-[#C97A2C]">50–74 HIGH</span>
                    <div className="w-2 h-2 bg-[#C97A2C]"></div>
                  </div>
                  <div className={`p-2 bg-white border ${activeRiskCell.riskLevel === 'CRITICAL' ? 'border-[#9E2A2B] bg-[#9E2A2B]/5' : 'border-[#1A1A1A]/10'} rounded-sm flex items-center justify-between gap-2`}>
                    <span className="text-[10px] font-sans font-semibold text-[#9E2A2B]">75–100 CRIT</span>
                    <div className="w-2 h-2 bg-[#9E2A2B]"></div>
                  </div>
                </div>
                <div className="text-[10px] text-[#1A1A1A]/50 italic pt-1 font-sans">
                  *Standardized 100m grid cell resolution &bull; Chennai Basin.
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Quick Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1A1A1A]/10">
            <div className="text-[11px] text-[#1A1A1A]/60 flex items-center gap-1.5 font-sans">
              <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Last Model Run: {activeRiskCell.updatedAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateTab('map')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-xs font-sans font-bold uppercase tracking-wider text-[#1A1A1A] border border-[#1A1A1A]/20 rounded-sm transition-colors shadow-sm"
              >
                <span>Inspect on Cartographic Map</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A67C52]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Risk-Escalation Window & Weather Trend */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Risk Escalation Window Card */}
          <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A67C52]" />
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
                  TEMPORAL ESCALATION WINDOW
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 bg-[#8B5E3C]/10 text-[#8B5E3C] border border-[#8B5E3C]/30 rounded-sm">
                {activeRiskCell.riskWindow.confidence}
              </span>
            </div>

            <div className="my-3 p-4 bg-[#FAF8F5] border border-[#A67C52]/30 rounded-sm flex items-center justify-between">
              <div>
                <div className="text-[9px] font-sans text-[#1A1A1A]/50 uppercase font-bold tracking-wider">Estimated Inundation Risk Window</div>
                <div className="text-2xl font-serif font-bold text-[#8B5E3C] tracking-tight mt-0.5">
                  {activeRiskCell.riskWindow.start} &mdash; {activeRiskCell.riskWindow.end}
                </div>
              </div>
              <TrendingUp className="w-7 h-7 text-[#A67C52]/70" />
            </div>

            <div className="space-y-1.5 text-xs text-[#1A1A1A]/80 font-sans">
              <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/50">Primary Contributing Driver:</div>
              <p className="text-xs text-[#1A1A1A] font-serif italic bg-[#FAF8F5] p-2.5 border border-[#1A1A1A]/10 rounded-sm">
                "{activeRiskCell.riskWindow.primaryDriver}"
              </p>
              <p className="text-[10px] text-[#1A1A1A]/60 pt-1 leading-relaxed">
                Calculated via hydraulic gradient and precipitation velocity; indicates peak susceptibility timeframe.
              </p>
            </div>
          </div>

          {/* Hourly Rainfall Context Chart */}
          <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-[#A67C52]" />
                  <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
                    PRECIPITATION BAROMETRIC PROFILE
                  </h3>
                </div>
                <span className="text-[10px] text-[#1A1A1A]/50 font-mono">mm/hr</span>
              </div>

              {/* Micro Bar Chart */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {HOURLY_RAINFALL_DATA.slice(2, 7).map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="text-[9px] font-sans font-bold text-[#1A1A1A]/60 truncate w-full text-center">
                      {d.time.split(' ')[0]}
                    </div>
                    <div className="w-full bg-[#FAF8F5] rounded-sm h-20 flex items-end p-1 border border-[#1A1A1A]/10">
                      <div
                        style={{ height: `${Math.min(100, (d.rainfallMm / 45) * 100)}%` }}
                        className={`w-full rounded-xs transition-all ${
                          d.rainfallMm > 30 ? 'bg-[#9E2A2B]' : 'bg-[#A67C52]'
                        }`}
                      ></div>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-[#1A1A1A]">
                      {d.rainfallMm}m
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] font-sans text-[#1A1A1A]/60 pt-3 border-t border-[#1A1A1A]/10 mt-3 flex items-center justify-between">
              <span>Station: <strong className="text-[#8B5E3C] font-semibold">CACHED RADAR ARCHIVE</strong></span>
              <span className="text-[#1A1A1A] font-mono font-medium">Accum: 130.9 mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Explainable Risk Factors: "WHY IS THIS AREA AT RISK?" */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1A1A1A]/10 pb-3">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-0.5">
              EXHIBIT B &bull; HYDROLOGICAL DECOMPOSITION
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A67C52]" />
              <h2 className="text-lg lg:text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Explainable Multi-Source Risk Decomposition
              </h2>
            </div>
            <p className="text-xs text-[#1A1A1A]/60 font-sans mt-0.5">
              Transparent deterministic weighting matrix. Every index increment is accounted for.
            </p>
          </div>
          <div className="text-xs font-sans text-[#1A1A1A]/70">
            Total Composite Score: <span className="font-serif font-bold text-[#1A1A1A] text-sm">{activeRiskCell.riskScore} / 100</span>
          </div>
        </div>

        {/* 8 Transparent Factor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {factorItems.map((factor) => {
            const factorScoreColor =
              factor.score >= 75
                ? 'text-[#9E2A2B] bg-[#9E2A2B]'
                : factor.score >= 50
                ? 'text-[#C97A2C] bg-[#C97A2C]'
                : 'text-[#8B5E3C] bg-[#8B5E3C]';

            return (
              <div
                key={factor.id}
                className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm flex flex-col justify-between hover:border-[#A67C52]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-serif font-bold text-[#1A1A1A] truncate">
                      {factor.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#8B5E3C]">
                      {Math.round(factor.weight * 100)}% wt
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2 my-1.5">
                    <div className="text-2xl font-serif font-bold text-[#1A1A1A]">
                      {factor.score}
                      <span className="text-xs font-sans font-normal text-[#1A1A1A]/40"> / 100</span>
                    </div>
                    <span className="text-[9px] font-sans uppercase font-bold px-1.5 py-0.2 rounded-sm bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/15">
                      {factor.dataStatus}
                    </span>
                  </div>

                  {/* Score Progress Bar */}
                  <div className="w-full bg-[#E5E1DD] rounded-full h-1.5 mb-2.5 overflow-hidden">
                    <div
                      style={{ width: `${factor.score}%` }}
                      className={`h-full rounded-full ${factorScoreColor.split(' ')[1]}`}
                    ></div>
                  </div>

                  <p className="text-[11px] font-sans text-[#1A1A1A]/70 leading-relaxed line-clamp-2">
                    {factor.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1A1A1A]/10 flex items-center justify-between text-[10px] font-sans text-[#1A1A1A]/60">
                  <span className="truncate max-w-[120px]">{factor.source}</span>
                  <span className="font-serif font-bold text-[#2D5A43]">{factor.evidenceConfidence}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. "How Risk Is Calculated" Transparent Mathematical Formula Card */}
      <div className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm">
        <button
          onClick={() => setFormulaExpanded(!formulaExpanded)}
          className="w-full flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#A67C52]/15 text-[#8B5E3C] rounded-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">
                The Mathematical Weighting Matrix & Calculation Formula
              </h3>
              <p className="text-xs font-sans text-[#1A1A1A]/60">
                Transparent expert-calibrated starting weights for Greater Chennai Basin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans text-[#8B5E3C] font-semibold">
            <span>{formulaExpanded ? 'Collapse Matrix' : 'Inspect Matrix'}</span>
            {formulaExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {formulaExpanded && (
          <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 space-y-3 animate-in fade-in">
            <div className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 font-mono text-xs text-[#1A1A1A] overflow-x-auto leading-relaxed rounded-sm">
              <span className="text-[#9E2A2B] font-bold">R_composite</span> = 100 &times; (
              <span className="text-[#8B5E3C]"> 0.25 &bull; Rainfall</span> +
              <span className="text-[#8B5E3C]"> 0.15 &bull; Antecedent Accum</span> +
              <span className="text-[#2D5A43]"> 0.15 &bull; DEM Elevation</span> +
              <span className="text-[#2D5A43]"> 0.10 &bull; Flow Accumulation</span> +
              <span className="text-[#9E2A2B]"> 0.10 &bull; Historic Inundation</span> +
              <span className="text-[#8B5E3C]"> 0.10 &bull; Drainage Proximity</span> +
              <span className="text-[#A67C52]"> 0.10 &bull; Validated Citizen Data</span> +
              <span className="text-[#1A1A1A]/60"> 0.05 &bull; Official Bulletins</span> )
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#1A1A1A]/80 font-sans">
              <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                <strong className="text-[#1A1A1A] font-serif">Analytical Pipeline:</strong>
                <p className="text-[#1A1A1A]/70 text-[11px] mt-0.5">
                  Raw Ingest &rarr; Spatial Normalization &rarr; Hyperlocal Risk Engine &rarr; Decision Engine &rarr; Field Action.
                </p>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                <strong className="text-[#1A1A1A] font-serif">Scientific Calibration Notice:</strong>
                <p className="text-[#1A1A1A]/70 text-[11px] mt-0.5">
                  Weights represent calibrated initial baselines for monsoon deployment and adapt as sensor calibration improves.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('map')}
          className="cursor-pointer group p-5 bg-white border border-[#1A1A1A]/15 hover:border-[#A67C52] transition-all shadow-sm rounded-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 text-[#8B5E3C] group-hover:bg-[#A67C52] group-hover:text-white transition-colors rounded-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-[#1A1A1A] group-hover:text-[#8B5E3C] transition-colors">
                100m Cartographic Grid
              </div>
              <div className="text-xs text-[#1A1A1A]/60 font-sans">Interactive GIS layer explorer</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A]/30 group-hover:text-[#A67C52] group-hover:translate-x-1 transition-all" />
        </div>

        <div
          onClick={() => onNavigateTab('route')}
          className="cursor-pointer group p-5 bg-white border border-[#1A1A1A]/15 hover:border-[#A67C52] transition-all shadow-sm rounded-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 text-[#8B5E3C] group-hover:bg-[#A67C52] group-hover:text-white transition-colors rounded-sm">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-[#1A1A1A] group-hover:text-[#8B5E3C] transition-colors">
                Risk-Aware Route Planner
              </div>
              <div className="text-xs text-[#1A1A1A]/60 font-sans">Compare fastest vs lower-risk routes</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A]/30 group-hover:text-[#A67C52] group-hover:translate-x-1 transition-all" />
        </div>

        <div
          onClick={() => onNavigateTab('emergency')}
          className="cursor-pointer group p-5 bg-white border border-[#1A1A1A]/15 hover:border-[#A67C52] transition-all shadow-sm rounded-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 text-[#2D5A43] group-hover:bg-[#2D5A43] group-hover:text-white transition-colors rounded-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-[#1A1A1A] group-hover:text-[#2D5A43] transition-colors">
                Relief & Emergency Posts
              </div>
              <div className="text-xs text-[#1A1A1A]/60 font-sans">Verified shelters & medical stations</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#1A1A1A]/30 group-hover:text-[#2D5A43] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
