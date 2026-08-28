import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Clock,
  MapPin,
  Camera,
  Layers,
  Sparkles,
  ExternalLink,
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import { OfficialAlert, CitizenReport, RiskCell, SourceCategory } from '../types';
import { INITIAL_OFFICIAL_ALERTS } from '../data/chennaiData';

interface OfficialAlertsViewProps {
  citizenReports: CitizenReport[];
  activeRiskCell: RiskCell;
}

export const OfficialAlertsView: React.FC<OfficialAlertsViewProps> = ({
  citizenReports,
  activeRiskCell
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | SourceCategory>('ALL');

  const alerts = INITIAL_OFFICIAL_ALERTS;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-1">
              DISPATCH VI &bull; SITUATIONAL PROVENANCE
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <BellRing className="w-6 h-6 text-[#9E2A2B]" />
              <span>Official Alerts & Multi-Source Intelligence</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-3xl font-sans leading-relaxed">
              AegisLocal strictly isolates authoritative government notices, model-derived GIS forecasts, and ground-level citizen observations to ensure absolute clarity and trust.
            </p>
          </div>

          {/* Provenance Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-sm border border-[#1A1A1A]/15">
            {(['ALL', 'OFFICIAL', 'OPEN_DATA', 'CITIZEN'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#F4F1EE]'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EAE6E1]'
                }`}
              >
                {cat === 'ALL'
                  ? 'All 3 Categories'
                  : cat === 'OFFICIAL'
                  ? '1. Official Govt'
                  : cat === 'OPEN_DATA'
                  ? '2. Aegis Model'
                  : '3. Citizen Evidence'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Strict Columns of Provenance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 1: OFFICIAL GOVERNMENT INFORMATION */}
        {(selectedCategory === 'ALL' || selectedCategory === 'OFFICIAL') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-[#9E2A2B]/40 text-[#9E2A2B] rounded-sm shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9E2A2B]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A]">
                  1. Official Government
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-sm bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30 uppercase tracking-wider">
                AUTHORITATIVE
              </span>
            </div>

            {alerts
              .filter((a) => a.category === 'OFFICIAL')
              .map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[9px] uppercase font-bold text-[#9E2A2B] tracking-wider">
                      {alert.sourceName}
                    </span>
                    <span className="text-[10px] text-[#1A1A1A]/50 font-mono">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug">{alert.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/75 leading-relaxed font-sans">{alert.headline}</p>

                  <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm space-y-1.5">
                    <div className="text-[9px] font-sans font-bold text-[#8B5E3C] uppercase tracking-wider">
                      Authoritative Advisory Actions:
                    </div>
                    <ul className="text-xs text-[#1A1A1A]/80 space-y-1 list-disc list-inside font-sans">
                      {alert.advisoryActions.map((action, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                    <span>Target: <strong className="text-[#1A1A1A] font-serif">{alert.location}</strong></span>
                    <span className="text-[#2D5A43] font-mono font-bold text-[10px]">VALID UNTIL {alert.validUntil}</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 2: AEGISLOCAL MODEL OUTPUT */}
        {(selectedCategory === 'ALL' || selectedCategory === 'OPEN_DATA') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-[#A67C52]/40 text-[#A67C52] rounded-sm shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A67C52]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A]">
                  2. AegisLocal Model Output
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-sm bg-[#A67C52]/10 text-[#8B5E3C] border border-[#A67C52]/30 uppercase tracking-wider">
                100M GRID
              </span>
            </div>

            {alerts
              .filter((a) => a.category === 'OPEN_DATA')
              .map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#1A1A1A]/15 p-5 shadow-sm rounded-sm space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[9px] uppercase font-bold text-[#8B5E3C] tracking-wider">
                      {alert.sourceName}
                    </span>
                    <span className="text-[10px] text-[#1A1A1A]/50 font-mono">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug">{alert.title}</h4>
                  <p className="text-xs text-[#1A1A1A]/75 leading-relaxed font-sans">{alert.headline}</p>

                  <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm space-y-1.5">
                    <div className="text-[9px] font-sans font-bold text-[#8B5E3C] uppercase tracking-wider">
                      Model Decision Guidelines:
                    </div>
                    <ul className="text-xs text-[#1A1A1A]/80 space-y-1 list-disc list-inside font-sans">
                      {alert.advisoryActions.map((action, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                    <span>Target: <strong className="text-[#1A1A1A] font-serif">{alert.location}</strong></span>
                    <span className="text-[#8B5E3C] font-mono font-bold text-[10px]">{alert.validUntil}</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 3: CITIZEN EVIDENCE OBSERVATIONS */}
        {(selectedCategory === 'ALL' || selectedCategory === 'CITIZEN') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-[#C97A2C]/40 text-[#C97A2C] rounded-sm shadow-sm">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C97A2C]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#1A1A1A]">
                  3. Citizen Field Evidence
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-sm bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30 uppercase tracking-wider">
                LOCAL REPORTS
              </span>
            </div>

            {citizenReports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-[#1A1A1A]/15 p-4 shadow-sm rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[9px] uppercase font-bold text-[#8B5E3C] tracking-wider">
                    AegisLocal Verified Observation
                  </span>
                  <span className="text-[10px] text-[#1A1A1A]/50 font-mono">{report.timestamp}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={report.imageUrl}
                    alt={report.areaName}
                    className="w-16 h-16 object-cover rounded-sm border border-[#1A1A1A]/15 shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-serif font-bold text-[#1A1A1A]">{report.areaName}</h5>
                    <p className="text-[11px] text-[#1A1A1A]/70 line-clamp-2 mt-0.5 font-sans">
                      {report.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="p-2 rounded-sm bg-[#FAF8F5] border border-[#1A1A1A]/10">
                    <span className="text-[9px] text-[#1A1A1A]/50 block">AI Confidence</span>
                    <strong className="text-[#8B5E3C] font-mono">{report.aiFloodConfidence}% Flood</strong>
                  </div>
                  <div className="p-2 rounded-sm bg-[#FAF8F5] border border-[#1A1A1A]/10">
                    <span className="text-[9px] text-[#1A1A1A]/50 block">Verification</span>
                    <strong className="text-[#2D5A43] font-serif font-bold">{report.verificationStatus}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
