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
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Search,
  Building2,
} from 'lucide-react';

import {
  ChennaiNeighbourhood,
  RiskCell,
  RiskLevel,
} from '../types';

import {
  CHENNAI_NEIGHBOURHOODS,
  HOURLY_RAINFALL_DATA,
} from '../data/chennaiData';

import { getFactorBreakdown } from '../services/riskEngine';

interface OverviewViewProps {
  selectedNeighbourhood: ChennaiNeighbourhood;
  onSelectNeighbourhood: (n: ChennaiNeighbourhood) => void;
  activeRiskCell: RiskCell;
  onNavigateTab: (
    tab:
      | 'map'
      | 'route'
      | 'report'
      | 'emergency'
      | 'alerts'
      | 'dashboard'
      | 'methodology'
  ) => void;
  onSelectCell: (cell: RiskCell) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedNeighbourhood,
  onSelectNeighbourhood,
  activeRiskCell,
  onNavigateTab,
  onSelectCell,
}) => {
  const [formulaExpanded, setFormulaExpanded] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const factorItems = getFactorBreakdown(activeRiskCell);

  /* =========================================================
     RISK THEME
  ========================================================= */

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-[#FDECEC]',
          border: 'border-[#B42318]/40',
          text: 'text-[#B42318]',
          badge:
            'bg-[#FDECEC] text-[#B42318] border-[#E9A6A1]',
          bar: 'bg-[#B42318]',
          ring: 'text-[#B42318]',
        };

      case 'HIGH':
        return {
          bg: 'bg-[#FFF4E5]',
          border: 'border-[#D97706]/40',
          text: 'text-[#B45309]',
          badge:
            'bg-[#FFF4E5] text-[#B45309] border-[#F3C98B]',
          bar: 'bg-[#D97706]',
          ring: 'text-[#D97706]',
        };

      case 'MODERATE':
        return {
          bg: 'bg-[#EEF6F7]',
          border: 'border-[#087F8C]/30',
          text: 'text-[#087F8C]',
          badge:
            'bg-[#EEF6F7] text-[#087F8C] border-[#9ED5D8]',
          bar: 'bg-[#087F8C]',
          ring: 'text-[#087F8C]',
        };

      default:
        return {
          bg: 'bg-[#EAF6EF]',
          border: 'border-[#238653]/30',
          text: 'text-[#237A4B]',
          badge:
            'bg-[#EAF6EF] text-[#237A4B] border-[#9AD1AF]',
          bar: 'bg-[#238653]',
          ring: 'text-[#238653]',
        };
    }
  };

  const riskTheme = getRiskColor(activeRiskCell.riskLevel);

  const filteredNeighbourhoods =
    CHENNAI_NEIGHBOURHOODS.filter((n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6 pb-12">

      {/* =====================================================
          1. OFFICIAL EMERGENCY WARNING
      ====================================================== */}

      <section
        className="
          bg-white
          border
          border-[#D6DEE3]
          border-l-4
          border-l-[#B42318]

          p-5
          lg:p-6

          shadow-sm
          rounded-xl

          relative
          overflow-hidden

          transition-all
          duration-300

          hover:shadow-lg
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between

            gap-4

            relative
            z-10
          "
        >

          {/* Warning Content */}

          <div className="flex items-start gap-4 min-w-0">

            <div
              className="
                p-2.5

                bg-[#FDECEC]
                border
                border-[#E9A6A1]

                text-[#B42318]

                shrink-0

                rounded-lg

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-md
              "
            >
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>

            <div className="min-w-0">

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2

                  mb-1.5
                "
              >

                <span
                  className="
                    px-2
                    py-1

                    text-[9px]

                    font-sans
                    font-bold

                    uppercase
                    tracking-[0.2em]

                    bg-[#B42318]
                    text-white

                    rounded-md

                    shadow-sm
                  "
                >
                  OFFICIAL ADVISORY
                </span>

                <span
                  className="
                    text-xs

                    text-[#B42318]

                    font-serif
                    font-semibold
                  "
                >
                  IMD Regional Met Centre • Greater Chennai Disaster Management
                </span>

              </div>

              <h2
                className="
                  text-xl
                  lg:text-2xl

                  font-serif
                  font-bold

                  text-[#102A43]

                  tracking-tight
                "
              >
                Severe Precipitation Warning — Greater Chennai Basin
              </h2>

              <p
                className="
                  text-xs
                  lg:text-sm

                  text-[#52606D]

                  mt-1

                  max-w-3xl

                  font-sans
                  leading-relaxed
                "
              >
                Elevated flood risk is modeled across low-lying depressions
                and drainage bottlenecks. High antecedent soil saturation
                necessitates route vigilance.
              </p>

            </div>
          </div>

          {/* Action Buttons */}

          <div
            className="
              flex
              flex-wrap
              items-center

              gap-2.5

              shrink-0

              w-full
              md:w-auto
            "
          >

            {/* PLAN SAFE ROUTE */}

            <button
              type="button"
              onClick={() => onNavigateTab('route')}
              className="
                group

                flex-1
                md:flex-none

                flex
                items-center
                justify-center

                gap-2

                px-4
                py-2.5

                bg-[#EEF6F7]
                hover:bg-[#DDF3F3]

                border
                border-[#087F8C]/30
                hover:border-[#087F8C]

                text-xs

                font-sans
                font-bold

                uppercase
                tracking-wider

                text-[#087F8C]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-md

                active:scale-[0.97]

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#087F8C]/40

                rounded-lg
              "
            >
              <Navigation
                className="
                  w-3.5
                  h-3.5

                  transition-transform
                  duration-200

                  group-hover:scale-110
                  group-hover:translate-x-0.5
                "
              />

              <span>Plan Safe Route</span>

              <ArrowRight
                className="
                  w-3
                  h-3

                  opacity-0
                  -translate-x-1

                  transition-all
                  duration-200

                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
              />
            </button>

            {/* SUBMIT REPORT */}

            <button
              type="button"
              onClick={() => onNavigateTab('report')}
              className="
                group

                flex-1
                md:flex-none

                flex
                items-center
                justify-center

                gap-2

                px-4
                py-2.5

                bg-[#B42318]
                hover:bg-[#8F1D15]

                text-xs

                font-sans
                font-bold

                uppercase
                tracking-wider

                text-white

                border
                border-[#B42318]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-lg

                active:scale-[0.97]

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#B42318]/30

                rounded-lg
              "
            >
              <Camera
                className="
                  w-3.5
                  h-3.5

                  transition-transform
                  duration-200

                  group-hover:scale-110
                  group-hover:rotate-3
                "
              />

              <span>Submit Report</span>

              <ArrowRight
                className="
                  w-3
                  h-3

                  opacity-0
                  -translate-x-1

                  transition-all
                  duration-200

                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
              />
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. CHENNAI NEIGHBOURHOOD SELECTOR
      ====================================================== */}

      <section
        className="
          bg-white

          border
          border-[#D6DEE3]

          p-5

          shadow-sm
          rounded-xl

          transition-all
          duration-300

          hover:shadow-md
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row

            items-start
            sm:items-center

            justify-between

            gap-3

            mb-4
          "
        >

          <div className="min-w-0">

            <div
              className="
                text-[9px]

                font-sans
                font-bold

                uppercase
                tracking-[0.25em]

                text-[#087F8C]

                mb-0.5
              "
            >
              SECTOR SELECTION • BASIN ATLAS
            </div>

            <h3
              className="
                text-base

                font-serif
                font-bold

                text-[#102A43]

                flex
                items-center

                gap-2
              "
            >
              <MapPin className="w-4 h-4 text-[#087F8C]" />

              <span>
                Greater Chennai Ward & Catchment Selector
              </span>
            </h3>

            <p
              className="
                text-xs

                text-[#52606D]

                font-sans

                mt-0.5
              "
            >
              Select a catchment to inspect its explainable 100m
              multi-factor risk profile.
            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full sm:w-72">

            <Search
              className="
                w-3.5
                h-3.5

                text-[#7B8794]

                absolute

                left-3
                top-2.5
              "
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ward or neighbourhood..."
              className="
                w-full

                pl-8
                pr-3
                py-2

                bg-[#F5F7F8]

                border
                border-[#D6DEE3]

                text-xs
                text-[#102A43]

                placeholder-[#7B8794]

                focus:outline-none

                focus:border-[#087F8C]

                focus:ring-2
                focus:ring-[#087F8C]/15

                transition-all
                duration-200

                rounded-lg
              "
            />

          </div>
        </div>

        {/* NEIGHBOURHOOD BUTTONS */}

        <div className="flex flex-wrap gap-2 pt-1">

          {filteredNeighbourhoods.map((n) => {

            const isSelected =
              selectedNeighbourhood.id === n.id;

            return (
              <button
                type="button"
                key={n.id}
                onClick={() => onSelectNeighbourhood(n)}
                aria-pressed={isSelected}
                className={`
                  group

                  flex
                  items-center

                  gap-2

                  px-3
                  py-2

                  text-xs

                  rounded-lg

                  border

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-md

                  active:scale-[0.97]

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#087F8C]/30

                  ${
                    isSelected
                      ? `
                        bg-[#102A43]
                        text-white

                        border-[#102A43]

                        font-serif
                        font-bold

                        shadow-md

                        ring-2
                        ring-[#087F8C]/20
                      `
                      : `
                        bg-[#F5F7F8]

                        text-[#263746]

                        border-[#D6DEE3]

                        font-medium

                        hover:bg-[#EEF6F7]
                        hover:border-[#087F8C]/40
                        hover:text-[#087F8C]
                      `
                  }
                `}
              >

                <span>
                  {n.name}
                </span>

                <span
                  className={`
                    text-[9px]

                    font-sans

                    px-1.5
                    py-0.5

                    rounded-md

                    font-bold

                    uppercase
                    tracking-wider

                    transition-all
                    duration-200

                    ${
                      isSelected
                        ? 'bg-[#087F8C] text-white'
                        : n.baseRisk === 'CRITICAL'
                        ? 'text-[#B42318] bg-[#FDECEC]'
                        : n.baseRisk === 'HIGH'
                        ? 'text-[#B45309] bg-[#FFF4E5]'
                        : 'text-[#237A4B] bg-[#EAF6EF]'
                    }
                  `}
                >
                  {n.score}/100
                </span>

              </button>
            );
          })}

          {filteredNeighbourhoods.length === 0 && (
            <div
              className="
                w-full

                py-6

                text-center

                text-xs

                text-[#7B8794]

                font-sans
              "
            >
              No matching neighbourhood found.
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          3. MAIN DECISION AREA
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* =================================================
            RISK GAUGE
        ================================================== */}

        <section
          className={`
            lg:col-span-7

            bg-white

            border
            ${riskTheme.border}

            p-6

            shadow-sm
            rounded-xl

            flex
            flex-col
            justify-between

            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:shadow-lg
          `}
        >

          <div>

            {/* HEADING */}

            <div
              className="
                flex
                items-start
                justify-between

                gap-4
              "
            >

              <div className="min-w-0">

                <div
                  className="
                    flex
                    items-center

                    gap-2

                    mb-1
                  "
                >

                  <span
                    className="
                      text-[9px]

                      font-sans
                      font-bold

                      uppercase
                      tracking-[0.25em]

                      text-[#087F8C]
                    "
                  >
                    CURRENT DOSSIER
                  </span>

                  <span className="text-[#9AA5B1]">
                    •
                  </span>

                  <span
                    className="
                      text-xs

                      font-mono

                      text-[#52606D]
                    "
                  >
                    {activeRiskCell.cellId}
                  </span>

                </div>

                <h1
                  className="
                    text-2xl
                    lg:text-3xl

                    font-serif
                    font-bold

                    text-[#102A43]

                    tracking-tight

                    flex
                    flex-wrap
                    items-center

                    gap-3
                  "
                >

                  <span>
                    {selectedNeighbourhood.name}
                  </span>

                  <span
                    className={`
                      text-[10px]

                      font-sans

                      px-2.5
                      py-1

                      border

                      font-bold

                      uppercase
                      tracking-wider

                      rounded-md

                      ${riskTheme.badge}
                    `}
                  >
                    {activeRiskCell.riskLevel} RISK
                  </span>

                </h1>

                <p
                  className="
                    text-xs

                    text-[#52606D]

                    mt-1

                    max-w-md

                    font-sans
                    leading-relaxed
                  "
                >
                  {selectedNeighbourhood.description}
                </p>

              </div>

              {/* CONFIDENCE */}

              <div className="text-right shrink-0">

                <div
                  className="
                    text-[9px]

                    font-sans

                    uppercase
                    font-bold

                    text-[#7B8794]

                    tracking-wider
                  "
                >
                  EVIDENCE CONFIDENCE
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-end

                    gap-1.5

                    mt-0.5

                    text-xs

                    font-serif
                    font-bold

                    text-[#237A4B]
                  "
                >

                  <CheckCircle2
                    className="
                      w-3.5
                      h-3.5

                      text-[#238653]
                    "
                  />

                  <span>
                    {activeRiskCell.evidenceConfidence}
                  </span>

                </div>

              </div>
            </div>

            {/* RISK GAUGE */}

            <div
              className="
                my-6

                p-5

                bg-[#F5F7F8]

                border
                border-[#D6DEE3]

                rounded-xl

                flex
                flex-col

                sm:flex-row

                items-center
                justify-around

                gap-6

                transition-all
                duration-300

                hover:bg-[#EEF6F7]
              "
            >

              <div className="relative flex items-center justify-center">

                <svg
                  className="
                    w-36
                    h-36

                    transform
                    -rotate-90

                    transition-transform
                    duration-500

                    hover:scale-105
                  "
                >

                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-[#D6DEE3]"
                    fill="transparent"
                  />

                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={364.4}
                    strokeDashoffset={
                      364.4 -
                      (364.4 * activeRiskCell.riskScore) /
                        100
                    }
                    strokeLinecap="round"
                    className={`
                      ${riskTheme.ring}

                      transition-all
                      duration-1000
                      ease-out
                    `}
                    fill="transparent"
                  />

                </svg>

                <div className="absolute text-center">

                  <div
                    className="
                      text-4xl

                      font-serif
                      font-bold

                      text-[#102A43]

                      tracking-tight
                    "
                  >
                    {activeRiskCell.riskScore}
                  </div>

                  <div
                    className="
                      text-[9px]

                      font-sans

                      uppercase
                      font-bold

                      text-[#7B8794]

                      tracking-[0.2em]
                    "
                  >
                    INDEX / 100
                  </div>

                </div>
              </div>

              {/* RISK SCALE */}

              <div className="space-y-2 text-xs w-full sm:w-auto">

                <div
                  className="
                    text-[10px]

                    font-sans
                    font-bold

                    text-[#52606D]

                    uppercase

                    tracking-[0.2em]

                    mb-1
                  "
                >
                  CALIBRATED RISK TIERS
                </div>

                <div className="grid grid-cols-2 gap-2">

                  <div
                    className="
                      p-2.5

                      bg-white

                      border
                      border-[#D6DEE3]

                      rounded-lg

                      flex
                      items-center
                      justify-between

                      gap-2
                    "
                  >
                    <span className="text-[10px] font-sans font-semibold text-[#237A4B]">
                      0–24 LOW
                    </span>

                    <div className="w-2 h-2 rounded-full bg-[#238653]" />
                  </div>

                  <div
                    className="
                      p-2.5

                      bg-white

                      border
                      border-[#D6DEE3]

                      rounded-lg

                      flex
                      items-center
                      justify-between

                      gap-2
                    "
                  >
                    <span className="text-[10px] font-sans font-semibold text-[#087F8C]">
                      25–49 MOD
                    </span>

                    <div className="w-2 h-2 rounded-full bg-[#087F8C]" />
                  </div>

                  <div
                    className={`
                      p-2.5

                      bg-white

                      border

                      rounded-lg

                      flex
                      items-center
                      justify-between

                      gap-2

                      transition-all
                      duration-300

                      ${
                        activeRiskCell.riskLevel === 'HIGH'
                          ? 'border-[#D97706] bg-[#FFF4E5] shadow-sm'
                          : 'border-[#D6DEE3]'
                      }
                    `}
                  >
                    <span className="text-[10px] font-sans font-semibold text-[#B45309]">
                      50–74 HIGH
                    </span>

                    <div className="w-2 h-2 rounded-full bg-[#D97706]" />
                  </div>

                  <div
                    className={`
                      p-2.5

                      bg-white

                      border

                      rounded-lg

                      flex
                      items-center
                      justify-between

                      gap-2

                      transition-all
                      duration-300

                      ${
                        activeRiskCell.riskLevel === 'CRITICAL'
                          ? 'border-[#B42318] bg-[#FDECEC] shadow-sm'
                          : 'border-[#D6DEE3]'
                      }
                    `}
                  >
                    <span className="text-[10px] font-sans font-semibold text-[#B42318]">
                      75–100 CRIT
                    </span>

                    <div className="w-2 h-2 rounded-full bg-[#B42318]" />
                  </div>

                </div>

                <div
                  className="
                    text-[10px]

                    text-[#7B8794]

                    italic

                    pt-1

                    font-sans
                  "
                >
                  *Standardized 100m grid cell resolution •
                  Chennai Basin.
                </div>

              </div>
            </div>
          </div>

          {/* CARD FOOTER */}

          <div
            className="
              flex
              flex-wrap

              items-center
              justify-between

              gap-3

              pt-4

              border-t
              border-[#D6DEE3]
            "
          >

            <div
              className="
                text-[11px]

                text-[#52606D]

                flex
                items-center

                gap-1.5

                font-sans
              "
            >
              <Clock className="w-3.5 h-3.5 text-[#087F8C]" />

              <span>
                Last Model Run: {activeRiskCell.updatedAt}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('map')}
              className="
                group

                flex
                items-center

                gap-1.5

                px-3
                py-2

                bg-[#EEF6F7]
                hover:bg-[#DDF3F3]

                text-xs

                font-sans
                font-bold

                uppercase
                tracking-wider

                text-[#087F8C]

                border
                border-[#087F8C]/30

                rounded-lg

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:shadow-md

                active:scale-[0.97]

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#087F8C]/30
              "
            >
              <span>
                Inspect on Cartographic Map
              </span>

              <ArrowRight
                className="
                  w-3.5
                  h-3.5

                  transition-transform
                  duration-200

                  group-hover:translate-x-1
                "
              />
            </button>

          </div>
        </section>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* RISK ESCALATION */}

          <section
            className="
              bg-white

              border
              border-[#D6DEE3]

              p-5

              shadow-sm
              rounded-xl

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            <div className="flex items-center justify-between gap-2 mb-2">

              <div className="flex items-center gap-2">

                <Clock className="w-4 h-4 text-[#087F8C]" />

                <h3
                  className="
                    text-[10px]

                    font-sans
                    font-bold

                    uppercase

                    tracking-[0.2em]

                    text-[#102A43]
                  "
                >
                  TEMPORAL ESCALATION WINDOW
                </h3>

              </div>

              <span
                className="
                  text-[9px]

                  font-sans
                  font-bold

                  uppercase
                  tracking-wider

                  px-2
                  py-1

                  bg-[#EEF6F7]

                  text-[#087F8C]

                  border
                  border-[#9ED5D8]

                  rounded-md
                "
              >
                {activeRiskCell.riskWindow.confidence}
              </span>

            </div>

            <div
              className="
                my-3

                p-4

                bg-[#EEF6F7]

                border
                border-[#9ED5D8]

                rounded-xl

                flex
                items-center
                justify-between

                transition-all
                duration-300

                hover:bg-[#DDF3F3]
              "
            >

              <div>

                <div
                  className="
                    text-[9px]

                    font-sans

                    text-[#7B8794]

                    uppercase
                    font-bold

                    tracking-wider
                  "
                >
                  Estimated Inundation Risk Window
                </div>

                <div
                  className="
                    text-2xl

                    font-serif
                    font-bold

                    text-[#087F8C]

                    tracking-tight

                    mt-0.5
                  "
                >
                  {activeRiskCell.riskWindow.start} —
                  {activeRiskCell.riskWindow.end}
                </div>

              </div>

              <TrendingUp
                className="
                  w-7
                  h-7

                  text-[#087F8C]

                  transition-transform
                  duration-300

                  hover:scale-110
                "
              />

            </div>

            <div
              className="
                space-y-1.5

                text-xs

                text-[#52606D]

                font-sans
              "
            >

              <div
                className="
                  text-[10px]

                  font-sans
                  font-bold

                  uppercase

                  tracking-wider

                  text-[#7B8794]
                "
              >
                Primary Contributing Driver:
              </div>

              <p
                className="
                  text-xs

                  text-[#102A43]

                  font-serif
                  italic

                  bg-[#F5F7F8]

                  p-2.5

                  border
                  border-[#D6DEE3]

                  rounded-lg

                  transition-colors
                  duration-200

                  hover:bg-[#EEF6F7]
                "
              >
                "{activeRiskCell.riskWindow.primaryDriver}"
              </p>

              <p
                className="
                  text-[10px]

                  text-[#7B8794]

                  pt-1

                  leading-relaxed
                "
              >
                Calculated via hydraulic gradient and precipitation
                velocity; indicates peak susceptibility timeframe.
              </p>

            </div>
          </section>

          {/* =================================================
              RAINFALL CHART
          ================================================== */}

          <section
            className="
              bg-white

              border
              border-[#D6DEE3]

              p-5

              shadow-sm
              rounded-xl

              flex-1

              flex
              flex-col
              justify-between

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-md
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between

                  gap-2

                  mb-2
                "
              >

                <div className="flex items-center gap-2">

                  <CloudRain
                    className="
                      w-4
                      h-4

                      text-[#087F8C]

                      transition-transform
                      duration-300

                      hover:scale-110
                    "
                  />

                  <h3
                    className="
                      text-[10px]

                      font-sans
                      font-bold

                      uppercase

                      tracking-[0.2em]

                      text-[#102A43]
                    "
                  >
                    PRECIPITATION BAROMETRIC PROFILE
                  </h3>

                </div>

                <span
                  className="
                    text-[10px]

                    text-[#7B8794]

                    font-mono
                  "
                >
                  mm/hr
                </span>

              </div>

              {/* RAINFALL BARS */}

              <div className="grid grid-cols-5 gap-2 pt-2">

                {HOURLY_RAINFALL_DATA.slice(2, 7).map(
                  (d, i) => (
                    <div
                      key={i}
                      className="
                        flex
                        flex-col
                        items-center

                        gap-1.5
                      "
                    >

                      <div
                        className="
                          text-[9px]

                          font-sans
                          font-bold

                          text-[#52606D]

                          truncate

                          w-full

                          text-center
                        "
                      >
                        {d.time.split(' ')[0]}
                      </div>

                      <div
                        className="
                          w-full

                          bg-[#F5F7F8]

                          rounded-lg

                          h-20

                          flex
                          items-end

                          p-1

                          border
                          border-[#D6DEE3]
                        "
                      >

                        <div
                          style={{
                            height: `${Math.min(
                              100,
                              (d.rainfallMm / 45) * 100
                            )}%`,
                          }}
                          className={`
                            w-full

                            rounded-md

                            transition-all
                            duration-700

                            ease-out

                            hover:opacity-80
                            hover:scale-x-105

                            ${
                              d.rainfallMm > 30
                                ? 'bg-[#B42318]'
                                : 'bg-[#087F8C]'
                            }
                          `}
                        />

                      </div>

                      <div
                        className="
                          text-[10px]

                          font-mono
                          font-bold

                          text-[#102A43]
                        "
                      >
                        {d.rainfallMm}m
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

            <div
              className="
                text-[10px]

                font-sans

                text-[#52606D]

                pt-3

                border-t
                border-[#D6DEE3]

                mt-3

                flex
                items-center
                justify-between
              "
            >

              <span>
                Station:{' '}
                <strong className="text-[#087F8C] font-semibold">
                  CACHED RADAR ARCHIVE
                </strong>
              </span>

              <span
                className="
                  text-[#102A43]

                  font-mono
                  font-medium
                "
              >
                Accum: 130.9 mm
              </span>

            </div>

          </section>

        </div>
      </div>

      {/* =====================================================
          4. EXPLAINABLE RISK FACTORS
      ====================================================== */}

      <section
        className="
          bg-white

          border
          border-[#D6DEE3]

          p-6

          shadow-sm
          rounded-xl

          space-y-4

          transition-shadow
          duration-300

          hover:shadow-md
        "
      >

        <div
          className="
            flex
            flex-col

            sm:flex-row

            items-start
            sm:items-center

            justify-between

            gap-2

            border-b
            border-[#D6DEE3]

            pb-3
          "
        >

          <div>

            <div
              className="
                text-[9px]

                font-sans
                font-bold

                uppercase

                tracking-[0.25em]

                text-[#087F8C]

                mb-0.5
              "
            >
              EXHIBIT B • HYDROLOGICAL DECOMPOSITION
            </div>

            <div className="flex items-center gap-2">

              <Sparkles className="w-4 h-4 text-[#D49A3A]" />

              <h2
                className="
                  text-lg
                  lg:text-xl

                  font-serif
                  font-bold

                  text-[#102A43]

                  tracking-tight
                "
              >
                Explainable Multi-Source Risk Decomposition
              </h2>

            </div>

            <p
              className="
                text-xs

                text-[#52606D]

                font-sans

                mt-0.5
              "
            >
              Transparent deterministic weighting matrix. Every index
              increment is accounted for.
            </p>

          </div>

          <div
            className="
              text-xs

              font-sans

              text-[#52606D]
            "
          >
            Total Composite Score:{' '}

            <span
              className="
                font-serif
                font-bold

                text-[#102A43]

                text-sm
              "
            >
              {activeRiskCell.riskScore} / 100
            </span>

          </div>

        </div>

        {/* FACTOR CARDS */}

        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4

            gap-3.5
          "
        >

          {factorItems.map((factor) => {

            const factorScoreColor =
              factor.score >= 75
                ? 'text-[#B42318] bg-[#B42318]'
                : factor.score >= 50
                ? 'text-[#B45309] bg-[#D97706]'
                : 'text-[#087F8C] bg-[#087F8C]';

            return (
              <div
                key={factor.id}
                className="
                  group

                  p-4

                  bg-[#F5F7F8]

                  border
                  border-[#D6DEE3]

                  rounded-lg

                  flex
                  flex-col
                  justify-between

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  hover:border-[#087F8C]/40

                  hover:shadow-md

                  hover:bg-[#EEF6F7]
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between

                      gap-1

                      mb-1
                    "
                  >

                    <span
                      className="
                        text-xs

                        font-serif
                        font-bold

                        text-[#102A43]

                        truncate

                        group-hover:text-[#087F8C]

                        transition-colors
                        duration-200
                      "
                    >
                      {factor.name}
                    </span>

                    <span
                      className="
                        text-[10px]

                        font-mono

                        text-[#087F8C]
                      "
                    >
                      {Math.round(factor.weight * 100)}% wt
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-baseline
                      justify-between

                      gap-2

                      my-1.5
                    "
                  >

                    <div
                      className="
                        text-2xl

                        font-serif
                        font-bold

                        text-[#102A43]
                      "
                    >
                      {factor.score}

                      <span
                        className="
                          text-xs

                          font-sans
                          font-normal

                          text-[#7B8794]
                        "
                      >
                        {' '}
                        / 100
                      </span>
                    </div>

                    <span
                      className="
                        text-[9px]

                        font-sans

                        uppercase
                        font-bold

                        px-1.5
                        py-0.5

                        rounded-md

                        bg-white

                        text-[#52606D]

                        border
                        border-[#D6DEE3]
                      "
                    >
                      {factor.dataStatus}
                    </span>

                  </div>

                  {/* PROGRESS BAR */}

                  <div
                    className="
                      w-full

                      bg-[#D6DEE3]

                      rounded-full

                      h-1.5

                      mb-2.5

                      overflow-hidden
                    "
                  >
                    <div
                      style={{
                        width: `${factor.score}%`,
                      }}
                      className={`
                        h-full

                        rounded-full

                        transition-all
                        duration-1000

                        ease-out

                        group-hover:opacity-80

                        ${factorScoreColor.split(' ')[1]}
                      `}
                    />
                  </div>

                  <p
                    className="
                      text-[11px]

                      font-sans

                      text-[#52606D]

                      leading-relaxed

                      line-clamp-2
                    "
                  >
                    {factor.description}
                  </p>

                </div>

                <div
                  className="
                    mt-3

                    pt-2

                    border-t
                    border-[#D6DEE3]

                    flex
                    items-center
                    justify-between

                    text-[10px]

                    font-sans

                    text-[#7B8794]
                  "
                >

                  <span className="truncate max-w-[120px]">
                    {factor.source}
                  </span>

                  <span className="font-serif font-bold text-[#237A4B]">
                    {factor.evidenceConfidence}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* =====================================================
          5. FORMULA CARD
      ====================================================== */}

      <section
        className="
          bg-white

          border
          border-[#D6DEE3]

          p-5

          shadow-sm
          rounded-xl

          transition-shadow
          duration-300

          hover:shadow-md
        "
      >

        <button
          type="button"
          onClick={() => setFormulaExpanded(!formulaExpanded)}
          aria-expanded={formulaExpanded}
          className="
            group

            w-full

            flex
            items-center
            justify-between

            gap-3

            text-left

            p-2
            -m-2

            rounded-lg

            transition-all
            duration-200

            hover:bg-[#EEF6F7]

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#087F8C]/30
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                p-2

                bg-[#EEF6F7]

                text-[#087F8C]

                rounded-lg

                border
                border-[#9ED5D8]

                transition-all
                duration-200

                group-hover:bg-[#DDF3F3]

                group-hover:scale-105
              "
            >
              <HelpCircle className="w-4 h-4" />
            </div>

            <div className="min-w-0">

              <h3
                className="
                  text-sm

                  font-serif
                  font-bold

                  text-[#102A43]

                  transition-colors
                  duration-200

                  group-hover:text-[#087F8C]
                "
              >
                The Mathematical Weighting Matrix & Calculation Formula
              </h3>

              <p
                className="
                  text-xs

                  font-sans

                  text-[#52606D]
                "
              >
                Transparent expert-calibrated starting weights for
                Greater Chennai Basin.
              </p>

            </div>

          </div>

          <div
            className="
              flex
              items-center

              gap-1.5

              text-xs

              font-sans

              text-[#087F8C]

              font-semibold

              shrink-0
            "
          >

            <span className="hidden sm:inline">
              {formulaExpanded
                ? 'Collapse Matrix'
                : 'Inspect Matrix'}
            </span>

            {formulaExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}

          </div>

        </button>

        {formulaExpanded && (
          <div
            className="
              mt-4

              pt-4

              border-t
              border-[#D6DEE3]

              space-y-3

              animate-in
              fade-in
              duration-300
            "
          >

            <div
              className="
                p-4

                bg-[#102A43]

                border
                border-[#183B56]

                font-mono

                text-xs

                text-[#E8F1F5]

                overflow-x-auto

                leading-relaxed

                rounded-lg

                shadow-sm
              "
            >

              <span className="text-[#FCA5A5] font-bold">
                R_composite
              </span>{' '}

              = 100 × (

              <span className="text-[#8FD3D3]">
                {' '}
                0.25 • Rainfall
              </span>{' '}

              +

              <span className="text-[#8FD3D3]">
                {' '}
                0.15 • Antecedent Accum
              </span>{' '}

              +

              <span className="text-[#A7D8B9]">
                {' '}
                0.15 • DEM Elevation
              </span>{' '}

              +

              <span className="text-[#A7D8B9]">
                {' '}
                0.10 • Flow Accumulation
              </span>{' '}

              +

              <span className="text-[#FCA5A5]">
                {' '}
                0.10 • Historic Inundation
              </span>{' '}

              +

              <span className="text-[#8FD3D3]">
                {' '}
                0.10 • Drainage Proximity
              </span>{' '}

              +

              <span className="text-[#F4C978]">
                {' '}
                0.10 • Validated Citizen Data
              </span>{' '}

              +

              <span className="text-[#AFC0CC]">
                {' '}
                0.05 • Official Bulletins
              </span>

              )

            </div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2

                gap-3

                text-xs

                text-[#52606D]

                font-sans
              "
            >

              <div
                className="
                  p-3

                  bg-[#F5F7F8]

                  border
                  border-[#D6DEE3]

                  rounded-lg

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-sm
                "
              >

                <strong className="text-[#102A43] font-serif">
                  Analytical Pipeline:
                </strong>

                <p className="text-[#52606D] text-[11px] mt-0.5">
                  Raw Ingest → Spatial Normalization →
                  Hyperlocal Risk Engine → Decision Engine →
                  Field Action.
                </p>

              </div>

              <div
                className="
                  p-3

                  bg-[#F5F7F8]

                  border
                  border-[#D6DEE3]

                  rounded-lg

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-sm
                "
              >

                <strong className="text-[#102A43] font-serif">
                  Scientific Calibration Notice:
                </strong>

                <p className="text-[#52606D] text-[11px] mt-0.5">
                  Weights represent calibrated initial baselines
                  for monsoon deployment and adapt as sensor
                  calibration improves.
                </p>

              </div>

            </div>

          </div>
        )}

      </section>

      {/* =====================================================
          6. QUICK ACTION CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* MAP */}

        <button
          type="button"
          onClick={() => onNavigateTab('map')}
          className="
            group

            w-full

            p-5

            bg-white

            border
            border-[#D6DEE3]

            hover:border-[#087F8C]/50

            transition-all
            duration-300
            ease-out

            hover:-translate-y-1
            hover:shadow-lg

            active:scale-[0.98]

            shadow-sm

            rounded-xl

            flex
            items-center
            justify-between

            text-left

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#087F8C]/30
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                p-3

                bg-[#EEF6F7]

                border
                border-[#9ED5D8]

                text-[#087F8C]

                rounded-lg

                transition-all
                duration-300

                group-hover:bg-[#087F8C]
                group-hover:text-white

                group-hover:scale-105
                group-hover:rotate-2
              "
            >
              <Layers className="w-5 h-5" />
            </div>

            <div className="min-w-0">

              <div
                className="
                  text-sm

                  font-serif
                  font-bold

                  text-[#102A43]

                  group-hover:text-[#087F8C]

                  transition-colors
                  duration-200
                "
              >
                100m Cartographic Grid
              </div>

              <div
                className="
                  text-xs

                  text-[#7B8794]

                  font-sans
                "
              >
                Interactive GIS layer explorer
              </div>

            </div>

          </div>

          <ArrowRight
            className="
              w-4
              h-4

              shrink-0

              text-[#9AA5B1]

              transition-all
              duration-200

              group-hover:text-[#087F8C]
              group-hover:translate-x-1
              group-hover:scale-110
            "
          />

        </button>

        {/* ROUTE */}

        <button
          type="button"
          onClick={() => onNavigateTab('route')}
          className="
            group

            w-full

            p-5

            bg-white

            border
            border-[#D6DEE3]

            hover:border-[#087F8C]/50

            transition-all
            duration-300
            ease-out

            hover:-translate-y-1
            hover:shadow-lg

            active:scale-[0.98]

            shadow-sm

            rounded-xl

            flex
            items-center
            justify-between

            text-left

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#087F8C]/30
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                p-3

                bg-[#EEF6F7]

                border
                border-[#9ED5D8]

                text-[#087F8C]

                rounded-lg

                transition-all
                duration-300

                group-hover:bg-[#087F8C]
                group-hover:text-white

                group-hover:scale-105
                group-hover:rotate-2
              "
            >
              <Navigation className="w-5 h-5" />
            </div>

            <div className="min-w-0">

              <div
                className="
                  text-sm

                  font-serif
                  font-bold

                  text-[#102A43]

                  group-hover:text-[#087F8C]

                  transition-colors
                  duration-200
                "
              >
                Risk-Aware Route Planner
              </div>

              <div
                className="
                  text-xs

                  text-[#7B8794]

                  font-sans
                "
              >
                Compare fastest vs lower-risk routes
              </div>

            </div>

          </div>

          <ArrowRight
            className="
              w-4
              h-4

              shrink-0

              text-[#9AA5B1]

              transition-all
              duration-200

              group-hover:text-[#087F8C]
              group-hover:translate-x-1
              group-hover:scale-110
            "
          />

        </button>

        {/* EMERGENCY */}

        <button
          type="button"
          onClick={() => onNavigateTab('emergency')}
          className="
            group

            w-full

            p-5

            bg-white

            border
            border-[#D6DEE3]

            hover:border-[#238653]/50

            transition-all
            duration-300
            ease-out

            hover:-translate-y-1
            hover:shadow-lg

            active:scale-[0.98]

            shadow-sm

            rounded-xl

            flex
            items-center
            justify-between

            text-left

            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#238653]/30
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                p-3

                bg-[#EAF6EF]

                border
                border-[#9AD1AF]

                text-[#238653]

                rounded-lg

                transition-all
                duration-300

                group-hover:bg-[#238653]
                group-hover:text-white

                group-hover:scale-105
                group-hover:rotate-2
              "
            >
              <Building2 className="w-5 h-5" />
            </div>

            <div className="min-w-0">

              <div
                className="
                  text-sm

                  font-serif
                  font-bold

                  text-[#102A43]

                  group-hover:text-[#238653]

                  transition-colors
                  duration-200
                "
              >
                Relief & Emergency Posts
              </div>

              <div
                className="
                  text-xs

                  text-[#7B8794]

                  font-sans
                "
              >
                Verified shelters & medical stations
              </div>

            </div>

          </div>

          <ArrowRight
            className="
              w-4
              h-4

              shrink-0

              text-[#9AA5B1]

              transition-all
              duration-200

              group-hover:text-[#238653]
              group-hover:translate-x-1
              group-hover:scale-110
            "
          />

        </button>

      </div>

    </div>
  );
};