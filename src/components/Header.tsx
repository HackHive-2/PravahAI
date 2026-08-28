import React from 'react';
import {
  ShieldAlert,
  MapPin,
  Clock,
  Radio,
  Sparkles,
  ChevronDown,
  Info,
  Layers,
  AlertTriangle,
  Play
} from 'lucide-react';
import { ChennaiNeighbourhood } from '../types';
import { CHENNAI_NEIGHBOURHOODS } from '../data/chennaiData';

interface HeaderProps {
  selectedNeighbourhood: ChennaiNeighbourhood;
  onSelectNeighbourhood: (n: ChennaiNeighbourhood) => void;
  tourActive: boolean;
  onToggleTour: () => void;
  unreadAlertCount: number;
  onOpenAlerts: () => void;
  onOpenMethodology: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedNeighbourhood,
  onSelectNeighbourhood,
  tourActive,
  onToggleTour,
  unreadAlertCount,
  onOpenAlerts,
  onOpenMethodology
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F4F1EE]/95 backdrop-blur-md border-b border-[#1A1A1A]/20 text-[#1A1A1A] px-4 lg:px-8 py-3 shadow-[0_2px_15px_rgba(26,26,26,0.04)]">
      {/* Top Editorial Archival Micro-bar */}
      <div className="max-w-[1600px] mx-auto hidden lg:flex items-center justify-between text-[9px] uppercase tracking-[0.25em] font-sans text-[#1A1A1A]/60 pb-2 mb-2 border-b border-[#1A1A1A]/10">
        <div>THE GEOSPATIAL INTELLIGENCE ARCHIVE &mdash; GREATER CHENNAI BASIN</div>
        <div>DISPATCH NO. 04 &bull; MONSOON SEASON 2026</div>
        <div>ISSN 2492-9012 &bull; SIH DISASTER OPS</div>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Product Identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-[#1A1A1A] text-[#F4F1EE] shadow-sm border border-[#1A1A1A]">
              <ShieldAlert className="w-5 h-5 text-[#A67C52]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#A67C52] rounded-full border border-[#F4F1EE]"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold tracking-tight text-xl lg:text-2xl text-[#1A1A1A]">
                  AEGISLOCAL
                </span>
                <span className="text-[9px] uppercase font-sans font-bold tracking-[0.2em] px-1.5 py-0.5 bg-[#A67C52]/15 text-[#8B5E3C] border border-[#A67C52]/30 rounded-sm">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-[#1A1A1A]/70 font-sans tracking-wide hidden sm:block">
                AI-Assisted Hyperlocal Flood Intelligence & Risk-Aware Decision System
              </p>
            </div>
          </div>

          {/* Mobile Tour Trigger */}
          <button
            onClick={onToggleTour}
            className={`md:hidden text-xs font-sans font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-sm flex items-center gap-1.5 transition-all ${
              tourActive
                ? 'bg-[#A67C52] text-white'
                : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/20'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#A67C52]" />
            <span>Tour</span>
          </button>
        </div>

        {/* Center: Geographic Lock & Neighbourhood Quick Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {/* Chennai Lock Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EBE7E2] border border-[#1A1A1A]/15 text-xs font-sans tracking-wider font-semibold text-[#1A1A1A]/80 rounded-sm">
            <MapPin className="w-3.5 h-3.5 text-[#A67C52]" />
            <span className="font-bold text-[#1A1A1A]">CHENNAI MVP</span>
            <span className="text-[#1A1A1A]/30">&bull;</span>
            <span className="text-[#1A1A1A]/60">TAMIL NADU</span>
          </div>

          {/* Neighbourhood Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#F9F7F5] border border-[#1A1A1A]/20 text-xs font-sans text-[#1A1A1A] transition-colors rounded-sm shadow-sm"
            >
              <span className="text-[#1A1A1A]/50 uppercase text-[10px] tracking-wider font-bold">Focus:</span>
              <span className="font-serif font-bold text-sm text-[#1A1A1A]">{selectedNeighbourhood.name}</span>
              <span
                className={`px-1.5 py-0.2 text-[9px] font-sans font-bold uppercase tracking-wider rounded-sm ${
                  selectedNeighbourhood.baseRisk === 'CRITICAL'
                    ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30'
                    : selectedNeighbourhood.baseRisk === 'HIGH'
                    ? 'bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30'
                    : 'bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30'
                }`}
              >
                {selectedNeighbourhood.baseRisk}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#1A1A1A]/50" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-[#FAF8F5] border border-[#1A1A1A]/20 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 rounded-sm">
                <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 px-2 py-1 border-b border-[#1A1A1A]/10 mb-1">
                  Select Chennai Ward / Basin
                </div>
                {CHENNAI_NEIGHBOURHOODS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectNeighbourhood(item);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 text-xs flex items-center justify-between transition-colors rounded-sm ${
                      selectedNeighbourhood.id === item.id
                        ? 'bg-[#A67C52]/15 text-[#1A1A1A] font-bold border-l-2 border-[#A67C52]'
                        : 'text-[#1A1A1A]/80 hover:bg-[#EAE6E1]'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-semibold text-[#1A1A1A]">{item.name}</div>
                      <div className="text-[10px] font-sans text-[#1A1A1A]/60">{item.elevationMeters}m DEM elevation</div>
                    </div>
                    <span
                      className={`text-[9px] font-sans px-1.5 py-0.5 font-bold uppercase tracking-wider ${
                        item.baseRisk === 'CRITICAL'
                          ? 'text-[#9E2A2B]'
                          : item.baseRisk === 'HIGH'
                          ? 'text-[#C97A2C]'
                          : 'text-[#2D5A43]'
                      }`}
                    >
                      {item.score}/100
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-2.5 text-xs font-sans">
          {/* SIH 2-3 min Tour Button */}
          <button
            onClick={onToggleTour}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider font-bold transition-all shadow-sm rounded-sm ${
              tourActive
                ? 'bg-[#1A1A1A] text-[#F4F1EE] border border-[#1A1A1A]'
                : 'bg-[#A67C52] hover:bg-[#8B5E3C] text-white border border-[#A67C52]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{tourActive ? 'Close Presentation' : '2-Min SIH Pitch Demo'}</span>
          </button>

          {/* Cached / Illustrative Tag */}
          <div
            onClick={onOpenMethodology}
            className="cursor-pointer group flex items-center gap-1 px-2.5 py-1 bg-[#EAE6E1] border border-[#1A1A1A]/20 text-[10px] font-sans uppercase tracking-widest font-semibold text-[#1A1A1A]/80 hover:bg-[#DCD6CE] transition-colors rounded-sm"
            title="AegisLocal uses cached & preprocessed data for offline demonstration resilience."
          >
            <Radio className="w-3 h-3 text-[#A67C52] animate-pulse" />
            <span>CACHED SNAPSHOT</span>
          </div>

          {/* Official Alerts Trigger */}
          <button
            onClick={onOpenAlerts}
            className="relative p-2 bg-white hover:bg-[#EBE7E2] border border-[#1A1A1A]/20 text-[#1A1A1A] transition-colors rounded-sm shadow-sm"
            title="Official & Model Alerts"
          >
            <AlertTriangle className="w-4 h-4 text-[#A67C52]" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#9E2A2B] text-white text-[9px] font-sans font-bold flex items-center justify-center rounded-full">
                {unreadAlertCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
