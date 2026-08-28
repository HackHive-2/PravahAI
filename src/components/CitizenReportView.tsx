import React, { useState } from 'react';
import {
  Camera,
  Upload,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Radio,
  FileText,
  Image as ImageIcon,
  Cpu,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
import { CitizenReport, SeverityLevel, ConfidenceLevel } from '../types';
import { CHENNAI_NEIGHBOURHOODS } from '../data/chennaiData';

interface CitizenReportViewProps {
  onSubmitReport: (newReport: Omit<CitizenReport, 'id' | 'timestamp' | 'evidenceConfidence' | 'citizenEvidenceScore' | 'verificationStatus'>) => void;
  onNavigateToMap: () => void;
}

export const CitizenReportView: React.FC<CitizenReportViewProps> = ({
  onSubmitReport,
  onNavigateToMap
}) => {
  // Preset illustrative sample images for demonstration
  const samplePresets = [
    {
      id: 'p1',
      title: 'Velachery Bypass Waterlogging',
      url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      description: 'Knee-deep standing water near flyover underpass. Storm drain clogged.',
      area: 'Velachery',
      severity: 'HIGH' as SeverityLevel
    },
    {
      id: 'p2',
      title: 'Anna Nagar Otteri Nullah Ingress',
      url: 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=600&q=80',
      description: 'Canal bank overflow spilling into residential lane. 2-wheelers stranded.',
      area: 'Anna Nagar',
      severity: 'CRITICAL' as SeverityLevel
    },
    {
      id: 'p3',
      title: 'Adyar River Bank Gutter Spill',
      url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
      description: 'Localized street inundation near storm drain outlet after cloudburst.',
      area: 'Adyar',
      severity: 'MODERATE' as SeverityLevel
    }
  ];

  const [selectedImage, setSelectedImage] = useState<string>(samplePresets[0].url);
  const [selectedArea, setSelectedArea] = useState<string>('Velachery');
  const [description, setDescription] = useState<string>(
    'Water accumulation over 1.5 feet near Velachery 100ft road junction. Vehicles stalling in low-lying depression.'
  );
  const [severity, setSeverity] = useState<SeverityLevel>('HIGH');
  const [useGps, setUseGps] = useState<boolean>(true);

  // AI Pipeline State Simulation
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [validatedReport, setValidatedReport] = useState<CitizenReport | null>(null);

  const pipelineStages = [
    'Checking Image Quality & Artifacts...',
    'Running Flood / Non-Flood Classification (FloodNet CV Model)...',
    'Estimating Inundation Severity Confidence...',
    'Performing GPS & Timestamp Freshness Cross-Check...',
    'Cross-Referencing with Nearby Observations (2 Corroborations Found)...',
    'Computing Citizen Evidence Reliability Score...',
    'Injecting Evidence into Local Risk Grid...'
  ];

  const handleSelectPreset = (preset: typeof samplePresets[0]) => {
    setSelectedImage(preset.url);
    setSelectedArea(preset.area);
    setDescription(preset.description);
    setSeverity(preset.severity);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSelectedImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartValidation = () => {
    setIsValidating(true);
    setPipelineStep(0);
    setValidatedReport(null);

    // Sequential step simulation
    const interval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev >= pipelineStages.length - 1) {
          clearInterval(interval);
          setIsValidating(false);

          // Get neighbourhood coords
          const nInfo = CHENNAI_NEIGHBOURHOODS.find((n) => n.name === selectedArea) || CHENNAI_NEIGHBOURHOODS[0];

          const newRep: CitizenReport = {
            id: `REP-CHN-${Math.floor(1000 + Math.random() * 9000)}`,
            areaName: selectedArea,
            location: { lat: nInfo.center.lat + (Math.random() - 0.5) * 0.005, lng: nInfo.center.lng + (Math.random() - 0.5) * 0.005 },
            timestamp: '18:43 IST (Just now)',
            imageUrl: selectedImage,
            description,
            reportedSeverity: severity,
            aiClassification: 'FLOOD / WATER ACCUMULATION',
            aiFloodConfidence: 87,
            imageQuality: 'GOOD',
            locationConfidence: 'HIGH',
            timestampFreshness: 'HIGH',
            nearbyCorroborations: 2,
            evidenceConfidence: 'HIGH',
            citizenEvidenceScore: 78,
            verificationStatus: 'PENDING',
            isIllustrativeDemo: true
          };

          setValidatedReport(newRep);
          onSubmitReport(newRep);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52] mb-1">
              DISPATCH IV &bull; FIELD INTELLIGENCE
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight flex items-center gap-2.5">
              <Camera className="w-6 h-6 text-[#A67C52]" />
              <span>Citizen Inundation Evidence & Field Logging</span>
            </h1>
            <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-2xl font-sans leading-relaxed">
              Photographs submitted by ground observers undergo algorithmic validation to verify standing water, reject spurious submissions, and corroborate local hazard evidence.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] border border-[#1A1A1A]/15 text-xs text-[#1A1A1A] space-y-1 max-w-xs rounded-sm">
            <div className="text-[9px] font-sans uppercase font-bold text-[#8B5E3C] tracking-wider">Verification Protocol</div>
            <p className="text-[11px] font-sans text-[#1A1A1A]/75 leading-relaxed">
              Singular report = provisional signal. Multi-citizen corroboration + elevation DEM = actionable ground truth.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workflow Form & AI Pipeline Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5-Step Report Submission Form */}
        <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
            <div className="text-xs font-serif font-bold text-[#1A1A1A] uppercase tracking-wider">
              Step-by-Step Evidence Submission
            </div>
            <span className="text-[9px] text-[#1A1A1A]/50 font-sans uppercase tracking-wider">Chennai Geo-Tagged Form</span>
          </div>

          {/* Step 1: Upload Photo / Choose Illustrative Preset */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#A67C52]/20 text-[#8B5E3C] flex items-center justify-center text-[10px] font-sans font-bold">1</span>
                <span>Select or Upload Field Photo</span>
              </label>
              <span className="text-[9px] text-[#1A1A1A]/50 font-mono">JPG / PNG / WebP</span>
            </div>

            {/* Illustrative Demo Presets */}
            <div className="grid grid-cols-3 gap-2">
              {samplePresets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className={`p-1.5 rounded-sm border text-left transition-all ${
                    selectedImage === p.url
                      ? 'bg-[#FAF8F5] border-[#A67C52] ring-1 ring-[#A67C52]'
                      : 'bg-[#FAF8F5]/50 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-full h-16 object-cover rounded-sm mb-1"
                  />
                  <div className="text-[10px] font-serif font-bold text-[#1A1A1A] truncate">{p.title}</div>
                  <div className="text-[9px] text-[#1A1A1A]/60 font-sans">{p.area}</div>
                </button>
              ))}
            </div>

            {/* Custom Upload Drop Area */}
            <div className="relative border border-dashed border-[#1A1A1A]/20 hover:border-[#A67C52] rounded-sm p-3 bg-[#FAF8F5] text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center gap-2 text-xs text-[#1A1A1A]/70 font-sans">
                <Upload className="w-4 h-4 text-[#A67C52]" />
                <span>Or Drag & Drop / Tap to Upload Local Image</span>
              </div>
            </div>
          </div>

          {/* Step 2: Location Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#A67C52]/20 text-[#8B5E3C] flex items-center justify-center text-[10px] font-sans font-bold">2</span>
              <span>Chennai Ward / Zone Designation</span>
            </label>
            <div className="flex gap-2">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#1A1A1A]/20 text-xs font-serif font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#A67C52] rounded-sm"
              >
                {CHENNAI_NEIGHBOURHOODS.map((n) => (
                  <option key={n.id} value={n.name}>
                    {n.name} (Chennai Area)
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setUseGps(!useGps)}
                className={`px-3 py-2 text-xs font-sans font-bold uppercase tracking-wider border rounded-sm flex items-center gap-1.5 transition-colors ${
                  useGps
                    ? 'bg-[#2D5A43]/10 text-[#2D5A43] border-[#2D5A43]/30'
                    : 'bg-[#FAF8F5] text-[#1A1A1A]/60 border-[#1A1A1A]/20'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{useGps ? 'GPS Active' : 'Manual'}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Timestamp Display */}
          <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm text-xs">
            <div className="flex items-center gap-2 text-[#1A1A1A]/80 font-sans">
              <Clock className="w-4 h-4 text-[#A67C52]" />
              <span>Timestamp: <strong>18:43 IST Today (Live Snapshot)</strong></span>
            </div>
            <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/20">
              FRESHNESS: OPTIMAL
            </span>
          </div>

          {/* Step 4: Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#A67C52]/20 text-[#8B5E3C] flex items-center justify-center text-[10px] font-sans font-bold">4</span>
              <span>Field Description & Observed Hazards</span>
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe standing water depth, blocked storm drains, impassable roads..."
              className="w-full p-3 bg-[#FAF8F5] border border-[#1A1A1A]/20 text-xs font-sans text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#A67C52] rounded-sm"
            />
          </div>

          {/* Step 5: Optional Observed Severity */}
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#A67C52]/20 text-[#8B5E3C] flex items-center justify-center text-[10px] font-sans font-bold">5</span>
              <span>Observed Inundation Magnitude</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as SeverityLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSeverity(lvl)}
                  className={`py-2 text-xs font-sans font-bold uppercase tracking-wider border rounded-sm transition-all ${
                    severity === lvl
                      ? lvl === 'CRITICAL'
                        ? 'bg-[#9E2A2B] text-white border-[#9E2A2B]'
                        : lvl === 'HIGH'
                        ? 'bg-[#C97A2C] text-white border-[#C97A2C]'
                        : lvl === 'MODERATE'
                        ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]'
                        : 'bg-[#2D5A43] text-white border-[#2D5A43]'
                      : 'bg-[#FAF8F5] text-[#1A1A1A]/60 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Trigger */}
          <button
            type="button"
            onClick={handleStartValidation}
            disabled={isValidating}
            className="w-full py-3 bg-[#1A1A1A] hover:bg-[#333333] text-[#F4F1EE] text-xs font-sans font-bold uppercase tracking-wider shadow-sm rounded-sm transition-all flex items-center justify-center gap-2"
          >
            {isValidating ? (
              <>
                <RefreshCw className="w-4 h-4 text-[#A67C52] animate-spin" />
                <span>PROCESSING AI EVIDENCE VALIDATION PIPELINE...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#A67C52]" />
                <span>SUBMIT EVIDENCE & EXECUTE MODEL INFERENCE</span>
              </>
            )}
          </button>
        </div>

        {/* Right: AI-Assisted Validation Live Pipeline Output */}
        <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/15 p-6 shadow-sm rounded-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
              <Cpu className="w-5 h-5 text-[#A67C52]" />
              <div>
                <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                  AI Evidence Validation Engine
                </h3>
                <span className="text-[11px] text-[#1A1A1A]/60 font-sans">FloodNet Computer Vision Inference</span>
              </div>
            </div>

            {/* In-Flight Pipeline Sequence */}
            {isValidating && (
              <div className="my-5 p-4 bg-[#FAF8F5] border border-[#A67C52]/30 rounded-sm space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs text-[#8B5E3C] font-sans font-bold">
                  <span>Executing Pipeline Step {pipelineStep + 1} of 7</span>
                  <span className="font-mono">{Math.round(((pipelineStep + 1) / 7) * 100)}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A]/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    style={{ width: `${((pipelineStep + 1) / 7) * 100}%` }}
                    className="h-full bg-[#A67C52] transition-all duration-300"
                  ></div>
                </div>
                <p className="text-xs font-mono text-[#1A1A1A] bg-white p-2.5 rounded-sm border border-[#1A1A1A]/10 animate-pulse">
                  {pipelineStages[pipelineStep]}
                </p>
              </div>
            )}

            {/* Validated Evidence Result Card */}
            {validatedReport && !isValidating && (
              <div className="my-3 space-y-3 animate-in zoom-in-95 duration-300">
                <div className="p-3 bg-[#2D5A43]/10 border border-[#2D5A43]/30 flex items-center justify-between rounded-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2D5A43]" />
                    <div>
                      <div className="text-xs font-serif font-bold text-[#1A1A1A]">FLOOD EVIDENCE DETECTED</div>
                      <div className="text-[10px] text-[#2D5A43] font-sans">Classification: Water Accumulation Confirmed</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-sm bg-[#2D5A43] text-white text-[10px] font-sans font-bold uppercase tracking-wider">
                    87% CONFIDENCE
                  </span>
                </div>

                <div className="relative rounded-sm overflow-hidden border border-[#1A1A1A]/15">
                  <img
                    src={validatedReport.imageUrl}
                    alt="Validated Submission"
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-[#1A1A1A]/90 text-white text-[9px] font-sans font-bold tracking-wider uppercase backdrop-blur-md">
                    ILLUSTRATIVE DEMO
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-[#1A1A1A]/90 text-[#F4F1EE] text-[9px] font-mono">
                    {validatedReport.areaName} &bull; {validatedReport.id}
                  </div>
                </div>

                {/* Evidence Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                    <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">Image Quality:</span>
                    <strong className="text-[#1A1A1A] font-serif">GOOD (Clear visibility)</strong>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                    <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">Location Confidence:</span>
                    <strong className="text-[#2D5A43] font-serif">HIGH (GPS Tagged)</strong>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                    <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">Timestamp Freshness:</span>
                    <strong className="text-[#2D5A43] font-serif">HIGH (&lt; 2 min)</strong>
                  </div>
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm">
                    <span className="text-[9px] font-sans uppercase font-bold text-[#1A1A1A]/50 block">Nearby Corroborations:</span>
                    <strong className="text-[#8B5E3C] font-serif">2 Independent Reports</strong>
                  </div>
                </div>

                {/* Citizen Evidence Score Bar */}
                <div className="p-3 bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-sm space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1A1A1A]/70 font-sans font-semibold">Citizen Evidence Score</span>
                    <span className="font-bold text-[#A67C52] font-serif">78 / 100 (HIGH)</span>
                  </div>
                  <div className="w-full bg-[#1A1A1A]/10 rounded-full h-1.5 overflow-hidden">
                    <div style={{ width: '78%' }} className="h-full bg-[#A67C52] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#1A1A1A]/60 font-sans">
                    <span>Verification State:</span>
                    <span className="font-bold text-[#C97A2C]">PENDING WARD VERIFICATION</span>
                  </div>
                </div>
              </div>
            )}

            {/* Default Placeholder State */}
            {!validatedReport && !isValidating && (
              <div className="my-8 text-center space-y-3 p-6 bg-[#FAF8F5] border border-dashed border-[#1A1A1A]/20 rounded-sm">
                <ImageIcon className="w-10 h-10 text-[#A67C52]/50 mx-auto" />
                <div className="text-xs font-serif font-bold text-[#1A1A1A]">
                  Ready to Validate Live Observations
                </div>
                <p className="text-[11px] font-sans text-[#1A1A1A]/60 max-w-xs mx-auto leading-relaxed">
                  Select an illustrative photo and click submit to trigger the FloodNet computer-vision classification and geospatial evidence cross-checking.
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {validatedReport && (
            <div className="pt-3 border-t border-[#1A1A1A]/10 space-y-2 animate-in fade-in">
              <button
                onClick={onNavigateToMap}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#A67C52] hover:bg-[#8B5E3C] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all"
              >
                <span>View Marker & Updated Grid on Risk Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
