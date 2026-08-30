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
      <div className="bg-white border border-[#C9D9E1] p-6 shadow-sm rounded-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#087F8C] mb-1">
              DISPATCH VI &bull; SITUATIONAL PROVENANCE
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#17212B] tracking-tight flex items-center gap-2.5">
              <BellRing className="w-6 h-6 text-[#B42318]" />
              <span>Official Alerts & Multi-Source Intelligence</span>
            </h1>
            <p className="text-xs text-[#17212B]/70 mt-1 max-w-3xl font-sans leading-relaxed">
              AegisLocal strictly isolates authoritative government notices, model-derived GIS forecasts, and ground-level citizen observations to ensure absolute clarity and trust.
            </p>
          </div>

          {/* Provenance Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#C9D9E1]">
            {(['ALL', 'OFFICIAL', 'OPEN_DATA', 'CITIZEN'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#102A43] text-white'
                    : 'text-[#17212B]/60 hover:text-[#17212B] hover:bg-[#DCEBF1]'
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
            <div className="flex items-center justify-between p-3 bg-white border border-[#B42318]/40 text-[#B42318] rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B42318]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#17212B]">
                  1. Official Government
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-xl bg-[#B42318]/10 text-[#B42318] border border-[#B42318]/30 uppercase tracking-wider">
                AUTHORITATIVE
              </span>
            </div>

            {alerts
              .filter((a) => a.category === 'OFFICIAL')
              .map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#C9D9E1] p-5 shadow-sm rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[9px] uppercase font-bold text-[#B42318] tracking-wider">
                      {alert.sourceName}
                    </span>
                    <span className="text-[10px] text-[#17212B]/50 font-mono">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#17212B] leading-snug">{alert.title}</h4>
                  <p className="text-xs text-[#17212B]/75 leading-relaxed font-sans">{alert.headline}</p>

                  <div className="p-3 bg-[#E7F1F5] border border-[#D6E3E8] rounded-xl space-y-1.5">
                    <div className="text-[9px] font-sans font-bold text-[#087F8C] uppercase tracking-wider">
                      Authoritative Advisory Actions:
                    </div>
                    <ul className="text-xs text-[#17212B]/80 space-y-1 list-disc list-inside font-sans">
                      {alert.advisoryActions.map((action, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#17212B]/60 pt-2 border-t border-[#D6E3E8]">
                    <span>Target: <strong className="text-[#17212B] font-serif">{alert.location}</strong></span>
                    <span className="text-[#18794E] font-mono font-bold text-[10px]">VALID UNTIL {alert.validUntil}</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 2: AEGISLOCAL MODEL OUTPUT */}
        {(selectedCategory === 'ALL' || selectedCategory === 'OPEN_DATA') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-[#087F8C]/40 text-[#087F8C] rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#087F8C]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#17212B]">
                  2. AegisLocal Model Output
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-xl bg-[#087F8C]/10 text-[#087F8C] border border-[#087F8C]/30 uppercase tracking-wider">
                100M GRID
              </span>
            </div>

            {alerts
              .filter((a) => a.category === 'OPEN_DATA')
              .map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white border border-[#C9D9E1] p-5 shadow-sm rounded-xl space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-[9px] uppercase font-bold text-[#087F8C] tracking-wider">
                      {alert.sourceName}
                    </span>
                    <span className="text-[10px] text-[#17212B]/50 font-mono">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#17212B] leading-snug">{alert.title}</h4>
                  <p className="text-xs text-[#17212B]/75 leading-relaxed font-sans">{alert.headline}</p>

                  <div className="p-3 bg-[#E7F1F5] border border-[#D6E3E8] rounded-xl space-y-1.5">
                    <div className="text-[9px] font-sans font-bold text-[#087F8C] uppercase tracking-wider">
                      Model Decision Guidelines:
                    </div>
                    <ul className="text-xs text-[#17212B]/80 space-y-1 list-disc list-inside font-sans">
                      {alert.advisoryActions.map((action, i) => (
                        <li key={i} className="text-[11px] leading-relaxed">
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-sans text-[#17212B]/60 pt-2 border-t border-[#D6E3E8]">
                    <span>Target: <strong className="text-[#17212B] font-serif">{alert.location}</strong></span>
                    <span className="text-[#087F8C] font-mono font-bold text-[10px]">{alert.validUntil}</span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 3: CITIZEN EVIDENCE OBSERVATIONS */}
        {(selectedCategory === 'ALL' || selectedCategory === 'CITIZEN') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border border-[#C05621]/40 text-[#C05621] rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#C05621]" />
                <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#17212B]">
                  3. Citizen Field Evidence
                </h3>
              </div>
              <span className="text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-xl bg-[#C05621]/10 text-[#C05621] border border-[#C05621]/30 uppercase tracking-wider">
                LOCAL REPORTS
              </span>
            </div>

            {citizenReports.map((report) => (
              <div
                key={report.id}
                className="bg-white border border-[#C9D9E1] p-4 shadow-sm rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[9px] uppercase font-bold text-[#087F8C] tracking-wider">
                    AegisLocal Verified Observation
                  </span>
                  <span className="text-[10px] text-[#17212B]/50 font-mono">{report.timestamp}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={report.imageUrl}
                    alt={report.areaName}
                    className="w-16 h-16 object-cover rounded-xl border border-[#C9D9E1] shrink-0"
                  />
                  <div>
                    <h5 className="text-xs font-serif font-bold text-[#17212B]">{report.areaName}</h5>
                    <p className="text-[11px] text-[#17212B]/70 line-clamp-2 mt-0.5 font-sans">
                      {report.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="p-2 rounded-xl bg-[#E7F1F5] border border-[#D6E3E8]">
                    <span className="text-[9px] text-[#17212B]/50 block">AI Confidence</span>
                    <strong className="text-[#087F8C] font-mono">{report.aiFloodConfidence}% Flood</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#E7F1F5] border border-[#D6E3E8]">
                    <span className="text-[9px] text-[#17212B]/50 block">Verification</span>
                    <strong className="text-[#18794E] font-serif font-bold">{report.verificationStatus}</strong>
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
