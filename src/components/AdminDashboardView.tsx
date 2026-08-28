import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Camera,
  Car,
  TrendingUp,
  ShieldAlert,
  Users,
  Search,
  Filter,
  Eye,
  Check,
  X,
  ArrowRight,
  Sparkles,
  BarChart3,
  Layers,
  Radio,
  FileCheck2
} from 'lucide-react';
import { CitizenReport, RiskCell, RoadSegment, VerificationStatus } from '../types';
import { CHENNAI_ROAD_SEGMENTS, CHENNAI_NEIGHBOURHOODS } from '../data/chennaiData';

interface AdminDashboardViewProps {
  citizenReports: CitizenReport[];
  onVerifyReport: (reportId: string, status: 'VERIFIED' | 'REJECTED') => void;
  onNavigateToMapWithCell?: (cellId: string) => void;
  onSelectNeighbourhoodByName?: (name: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  citizenReports,
  onVerifyReport,
  onNavigateToMapWithCell,
  onSelectNeighbourhoodByName
}) => {
  const [reportFilter, setReportFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');
  const [selectedReportToInspect, setSelectedReportToInspect] = useState<CitizenReport | null>(null);

  const pendingReports = citizenReports.filter((r) => r.verificationStatus === 'PENDING');
  const verifiedReports = citizenReports.filter((r) => r.verificationStatus === 'VERIFIED');

  const filteredReports = citizenReports.filter((r) => {
    if (reportFilter === 'ALL') return true;
    return r.verificationStatus === reportFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Command Banner */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9E2A2B] animate-pulse inline-block"></span>
              <span>COMMAND DISPATCH VII &bull; RESCUE OPERATIONS</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-[#A67C52]" />
              <span>Emergency Command Operations</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-3xl font-sans leading-relaxed">
              Real-time multi-source intelligence fusion for disaster responders: prioritized field verification queues, exposed transport corridors, and calibrated spatial risk hotspots.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#1A1A1A]/15 text-[#1A1A1A] font-sans rounded-sm">
              Status: <strong className="text-[#2D5A43] font-serif font-bold">OPERATIONAL</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Top 5 High-Impact KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#9E2A2B] font-sans font-bold mb-1">
            <span className="uppercase tracking-wider text-[10px]">Critical Zones</span>
            <AlertOctagon className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1A1A1A]">8</div>
          <div className="text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">Anna Nagar, Otteri</div>
        </div>

        <div className="p-4 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#C97A2C] font-sans font-bold mb-1">
            <span className="uppercase tracking-wider text-[10px]">High-Risk Zones</span>
            <ShieldAlert className="w-4 h-4 text-[#C97A2C]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1A1A1A]">17</div>
          <div className="text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">Velachery, Adyar Basin</div>
        </div>

        <div className="p-4 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#A67C52] font-sans font-bold mb-1">
            <span className="uppercase tracking-wider text-[10px]">Citizen Reports</span>
            <Camera className="w-4 h-4 text-[#A67C52]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{citizenReports.length + 38}</div>
          <div className="text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">Validated via FloodNet CV</div>
        </div>

        <div className="p-4 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm">
          <div className="flex items-center justify-between text-xs text-[#8B5E3C] font-sans font-bold mb-1">
            <span className="uppercase tracking-wider text-[10px]">Exposed Roads</span>
            <Car className="w-4 h-4 text-[#8B5E3C]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#1A1A1A]">12</div>
          <div className="text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">Modeled flood risk</div>
        </div>

        <div className="p-4 bg-white border border-[#1A1A1A]/15 shadow-sm rounded-sm col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-[#9E2A2B] font-sans font-bold mb-1">
            <span className="uppercase tracking-wider text-[10px]">Queue to Verify</span>
            <FileCheck2 className="w-4 h-4 text-[#9E2A2B]" />
          </div>
          <div className="text-3xl font-serif font-bold text-[#9E2A2B]">{pendingReports.length}</div>
          <div className="text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">Action required by operators</div>
        </div>
      </div>

      {/* Main Command Split: Verification Queue & Priority Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Field Verification Queue & Action Console */}
        <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
            <div>
              <h2 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#A67C52]" />
                <span>Field Evidence Verification Queue</span>
              </h2>
              <p className="text-xs text-[#1A1A1A]/65 mt-0.5 font-sans">
                Review AI-classified field reports. Verifying immediately upgrades local evidence reliability and refreshes GIS hotspots.
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-sm bg-[#9E2A2B]/10 text-[#9E2A2B] text-xs font-sans font-bold uppercase tracking-wider border border-[#9E2A2B]/30">
              {pendingReports.length} PENDING
            </span>
          </div>

          {/* Pending Reports List */}
          {pendingReports.length > 0 ? (
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-[#FAF8F5] border border-[#1A1A1A]/15 hover:border-[#A67C52] transition-all space-y-3 rounded-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={report.imageUrl}
                        alt="Evidence"
                        className="w-20 h-20 object-cover rounded-sm border border-[#1A1A1A]/15 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-serif font-bold text-[#1A1A1A]">{report.areaName}</span>
                          <span className="text-[10px] font-mono text-[#8B5E3C] bg-white px-1.5 py-0.2 rounded-sm border border-[#1A1A1A]/15">
                            {report.id}
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                          {report.description}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/60 mt-1 font-sans">
                          <span>{report.timestamp}</span>
                          <span>&bull;</span>
                          <span className="text-[#2D5A43] font-bold">GPS Confidence: HIGH</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Evidence Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 p-2 bg-white border border-[#1A1A1A]/10 text-[11px] rounded-sm font-sans">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#1A1A1A]/50 block">AI Classification</span>
                      <strong className="text-[#8B5E3C] font-mono">{report.aiFloodConfidence}% Flood</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#1A1A1A]/50 block">Corroboration</span>
                      <strong className="text-[#2D5A43] font-mono">{report.nearbyCorroborations} Reports</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#1A1A1A]/50 block">Evidence Impact</span>
                      <strong className="text-[#A67C52] font-mono">+{Math.round(report.aiFloodConfidence * 0.1)} Score</strong>
                    </div>
                  </div>

                  {/* Action Buttons: VERIFY / REJECT */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#1A1A1A]/50 italic font-serif">
                      Authorizes incorporation into local risk grid
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onVerifyReport(report.id, 'REJECTED')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-red-50 text-[#1A1A1A]/70 hover:text-[#9E2A2B] border border-[#1A1A1A]/20 hover:border-[#9E2A2B]/40 text-xs font-sans font-bold uppercase tracking-wider rounded-sm transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => onVerifyReport(report.id, 'VERIFIED')}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#F4F1EE] text-xs font-sans font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all"
                      >
                        <Check className="w-3.5 h-3.5 text-[#A67C52]" />
                        <span>Verify Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#FAF8F5] border border-dashed border-[#1A1A1A]/20 text-xs text-[#1A1A1A]/60 space-y-2 rounded-sm">
              <CheckCircle2 className="w-8 h-8 text-[#2D5A43] mx-auto" />
              <div className="font-serif font-bold text-[#1A1A1A] text-sm">All Field Reports Cleared & Verified</div>
              <p className="text-[11px] text-[#1A1A1A]/60 font-sans">
                Newly submitted citizen observations will automatically queue here for responder authorization.
              </p>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Priority Areas Requiring Field Verification */}
        <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
              <h2 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#C97A2C]" />
                <span>Priority Action Areas</span>
              </h2>
              <span className="text-[10px] text-[#1A1A1A]/50 font-sans uppercase tracking-wider">Ranked Exposure</span>
            </div>

            <div className="space-y-3 mt-4">
              {/* 1. Velachery */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#C97A2C]/30 space-y-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#1A1A1A]">1. Velachery Basin</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#C97A2C]/10 text-[#C97A2C] text-[10px] font-sans font-bold uppercase tracking-wider border border-[#C97A2C]/30">
                    72 / 100 HIGH RISK
                  </span>
                </div>
                <div className="text-[11px] text-[#1A1A1A]/75 leading-relaxed font-sans">
                  <strong>Why prioritized:</strong> High modeled rainfall load + extreme depression topography (4.8m DEM) + 2 recent citizen flood reports along lake bypass.
                </div>
                <div className="flex items-center justify-between pt-1 text-[10px] font-sans">
                  <span className="text-[#1A1A1A]/60">3 exposed road segments</span>
                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) onSelectNeighbourhoodByName('Velachery');
                    }}
                    className="text-[#A67C52] hover:text-[#8B5E3C] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Inspect Area</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 2. Anna Nagar */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#9E2A2B]/30 space-y-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#1A1A1A]">2. Anna Nagar (Otteri Basin)</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#9E2A2B]/10 text-[#9E2A2B] text-[10px] font-sans font-bold uppercase tracking-wider border border-[#9E2A2B]/30">
                    78 / 100 CRITICAL
                  </span>
                </div>
                <div className="text-[11px] text-[#1A1A1A]/75 leading-relaxed font-sans">
                  <strong>Why prioritized:</strong> Otteri Nullah channel overflow + confirmed road obstruction on 2nd Avenue.
                </div>
                <div className="flex items-center justify-between pt-1 text-[10px] font-sans">
                  <span className="text-[#1A1A1A]/60">4 exposed road segments</span>
                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) onSelectNeighbourhoodByName('Anna Nagar');
                    }}
                    className="text-[#A67C52] hover:text-[#8B5E3C] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Inspect Area</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3. Adyar */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#8B5E3C]/30 space-y-2 rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#1A1A1A]">3. Adyar River Corridor</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#8B5E3C]/10 text-[#8B5E3C] text-[10px] font-sans font-bold uppercase tracking-wider border border-[#8B5E3C]/30">
                    64 / 100 HIGH RISK
                  </span>
                </div>
                <div className="text-[11px] text-[#1A1A1A]/75 leading-relaxed font-sans">
                  <strong>Why prioritized:</strong> Upstream Chembarambakkam reservoir discharge + high tide backpressure at river mouth.
                </div>
                <div className="flex items-center justify-between pt-1 text-[10px] font-sans">
                  <span className="text-[#1A1A1A]/60">2 exposed road segments</span>
                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) onSelectNeighbourhoodByName('Adyar');
                    }}
                    className="text-[#A67C52] hover:text-[#8B5E3C] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Inspect Area</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 text-[10px] text-[#1A1A1A]/60 italic font-serif text-center rounded-sm">
            *Priorities combine Geospatial Model scores, Copernicus DEM slope, and verified citizen observations.
          </div>
        </div>
      </div>

      {/* All Recent Citizen Reports Table */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1A1A1A]/10 pb-3">
          <div>
            <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
              Citizen Field Observations Registry
            </h3>
            <span className="text-xs text-[#1A1A1A]/65 font-sans">Complete community evidence history with verification audit states</span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-sm border border-[#1A1A1A]/15">
            {(['ALL', 'VERIFIED', 'PENDING', 'REJECTED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setReportFilter(st)}
                className={`px-3 py-1 rounded-sm text-xs font-sans font-bold uppercase tracking-wider transition-all ${
                  reportFilter === st ? 'bg-[#1A1A1A] text-[#F4F1EE]' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAF8F5] text-[#1A1A1A]/60 uppercase font-sans text-[9px] tracking-wider border-b border-[#1A1A1A]/10">
              <tr>
                <th className="p-3">Report ID / Location</th>
                <th className="p-3">Observation</th>
                <th className="p-3">Severity</th>
                <th className="p-3">AI CV Confidence</th>
                <th className="p-3">Evidence Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/10">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="p-3 font-semibold text-[#1A1A1A]">
                    <div className="font-serif font-bold text-xs">{rep.areaName}</div>
                    <div className="text-[10px] text-[#1A1A1A]/50 font-mono">{rep.id}</div>
                  </td>
                  <td className="p-3 text-[#1A1A1A]/75 max-w-xs truncate">{rep.description}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[9px] font-sans font-bold uppercase tracking-wider ${
                        rep.reportedSeverity === 'CRITICAL'
                          ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30'
                          : rep.reportedSeverity === 'HIGH'
                          ? 'bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30'
                          : 'bg-[#8B5E3C]/10 text-[#8B5E3C] border border-[#8B5E3C]/30'
                      }`}
                    >
                      {rep.reportedSeverity}
                    </span>
                  </td>
                  <td className="p-3 text-[#8B5E3C] font-mono font-bold">
                    {rep.aiFloodConfidence}%
                  </td>
                  <td className="p-3 text-[#1A1A1A] font-mono">
                    {rep.citizenEvidenceScore} / 100
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[9px] font-sans font-bold uppercase tracking-wider ${
                        rep.verificationStatus === 'VERIFIED'
                          ? 'bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30'
                          : rep.verificationStatus === 'PENDING'
                          ? 'bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30'
                          : 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30'
                      }`}
                    >
                      {rep.verificationStatus}
                    </span>
                  </td>
                  <td className="p-3 text-[#1A1A1A]/60 font-mono text-[11px]">{rep.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
