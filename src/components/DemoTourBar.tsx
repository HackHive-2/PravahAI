import React from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  RotateCcw,
  X,
  Target,
  ArrowRight
} from 'lucide-react';
import { SIHTourStep } from '../types';
import { SIH_DEMO_TOUR_STEPS } from '../data/chennaiData';

interface DemoTourBarProps {
  currentStepIndex: number;
  onSetStepIndex: (index: number) => void;
  onClose: () => void;
  onActionExecute?: () => void;
}

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  currentStepIndex,
  onSetStepIndex,
  onClose,
  onActionExecute
}) => {
  const currentStep: SIHTourStep = SIH_DEMO_TOUR_STEPS[currentStepIndex] || SIH_DEMO_TOUR_STEPS[0];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === SIH_DEMO_TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) {
      onSetStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      onSetStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="bg-[#EAE6E1] border-b-2 border-[#A67C52] text-[#1A1A1A] px-4 lg:px-8 py-3 shadow-md relative z-30 animate-in slide-in-from-top duration-300">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Step Indicator & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#1A1A1A] text-[#F4F1EE] font-serif font-bold text-sm shrink-0 shadow-sm border border-[#1A1A1A]">
            0{currentStep.stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#8B5E3C] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#A67C52]" />
                PRESENTATION DISPATCH
              </span>
              <span className="text-[10px] text-[#1A1A1A]/40 font-mono">
                Section {currentStep.stepNumber} of {SIH_DEMO_TOUR_STEPS.length}
              </span>
            </div>
            <div className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <span>{currentStep.title}</span>
              <span className="text-[#1A1A1A]/30 font-normal hidden sm:inline">&bull;</span>
              <span className="text-xs text-[#1A1A1A]/70 font-sans italic font-normal hidden sm:inline">
                {currentStep.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Details */}
        <div className="flex-1 md:px-4 text-xs text-[#1A1A1A]/80 font-sans leading-relaxed border-l-0 md:border-l border-[#1A1A1A]/15 md:pl-4">
          <p className="line-clamp-2 sm:line-clamp-none">
            {currentStep.explanation}
          </p>
          <div className="text-[11px] text-[#8B5E3C] font-semibold mt-0.5 flex items-center gap-1">
            <Target className="w-3 h-3 text-[#A67C52] shrink-0" />
            <span>Target Action: {currentStep.suggestedAction}</span>
          </div>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`p-1.5 rounded-sm border text-xs flex items-center gap-1 transition-colors ${
              isFirst
                ? 'opacity-40 cursor-not-allowed border-[#1A1A1A]/10 text-[#1A1A1A]/40'
                : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F4F1EE]'
            }`}
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-sans text-xs">Prev</span>
          </button>

          {/* Step Pill Selector Dropdown or counter */}
          <select
            value={currentStepIndex}
            onChange={(e) => onSetStepIndex(Number(e.target.value))}
            aria-label="Select demo pitch step"
            className="bg-white text-xs font-serif font-bold text-[#1A1A1A] border border-[#1A1A1A]/20 rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-[#A67C52]"
          >
            {SIH_DEMO_TOUR_STEPS.map((s, idx) => (
              <option key={s.stepNumber} value={idx}>
                Plate {s.stepNumber}: {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleNext}
            disabled={isLast}
            className={`px-3 py-1.5 rounded-sm border text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-sm ${
              isLast
                ? 'opacity-40 cursor-not-allowed border-[#1A1A1A]/10 text-[#1A1A1A]/40'
                : 'border-[#A67C52] bg-[#A67C52] hover:bg-[#8B5E3C] text-white'
            }`}
            title="Next Step"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#DCD6CE] transition-colors ml-1"
            title="Exit Presentation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
