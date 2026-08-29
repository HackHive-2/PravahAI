import React from 'react';
import {
  MapPin,
  Radio,
  Sparkles,
  ChevronDown,
  AlertTriangle,
  Play,
} from 'lucide-react';

import pravahaiLogo from '../assets/pravahai-logo.png';

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
  onOpenMethodology,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-[#F4F1EE]/95
        backdrop-blur-md
        border-b
        border-[#1A1A1A]/20
        text-[#1A1A1A]
        px-4
        lg:px-8
        py-3
        shadow-[0_2px_15px_rgba(26,26,26,0.04)]
      "
    >
      {/* =====================================================
          TOP EDITORIAL BAR
      ====================================================== */}
      <div
        className="
          max-w-[1600px]
          mx-auto
          hidden
          lg:flex
          items-center
          justify-between
          text-[9px]
          uppercase
          tracking-[0.25em]
          font-sans
          text-[#1A1A1A]/60
          pb-2
          mb-2
          border-b
          border-[#1A1A1A]/10
        "
      >
        <div>
          THE GEOSPATIAL INTELLIGENCE ARCHIVE — GREATER CHENNAI BASIN
        </div>

        <div>
          DISPATCH NO. 04 • MONSOON SEASON 2026
        </div>

        <div>
          ISSN 2492-9012 • SIH DISASTER OPS
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <div
        className="
          max-w-[1600px]
          mx-auto
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-3
        "
      >
        {/* =====================================================
            LOGO & PRODUCT IDENTITY
        ====================================================== */}
        <div
          className="
            flex
            items-center
            gap-3
            w-full
            md:w-auto
            justify-between
            md:justify-start
          "
        >
          <div className="flex items-center gap-3">

            {/* PravahAI Logo */}
            <div
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                shrink-0

                transition-all
                duration-300
                ease-out

                hover:scale-110
                hover:-translate-y-0.5
              "
            >
              <img
                src={pravahaiLogo}
                alt="PravahAI Logo"
                className="
                  w-full
                  h-full
                  object-contain
                "
              />
            </div>

            {/* Product Identity */}
            <div>
              <div className="flex items-center gap-2">

                <span
                  className="
                    font-serif
                    font-bold
                    tracking-tight
                    text-xl
                    lg:text-2xl
                    text-[#1A1A1A]

                    transition-all
                    duration-200

                    hover:text-[#8B5E3C]
                    hover:tracking-tight
                  "
                >
                  PravahAI
                </span>

              </div>

              <p
                className="
                  text-[11px]
                  text-[#1A1A1A]/70
                  font-sans
                  tracking-wide
                  hidden
                  sm:block
                "
              >
                AI-Assisted Hyperlocal Flood Intelligence & Risk-Aware Decision System
              </p>
            </div>
          </div>

          {/* =====================================================
              MOBILE TOUR BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={onToggleTour}
            className={`
              md:hidden
              text-xs
              font-sans
              font-bold
              uppercase
              tracking-wider
              px-2.5
              py-1.5
              rounded-sm
              flex
              items-center
              gap-1.5

              transition-all
              duration-200
              ease-out

              hover:-translate-y-0.5
              hover:shadow-md
              active:scale-95

              ${
                tourActive
                  ? 'bg-[#A67C52] text-white shadow-md'
                  : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#EBE7E2]'
              }
            `}
          >
            <Play
              className="
                w-3.5
                h-3.5
                fill-current
                text-[#A67C52]

                transition-transform
                duration-200

                group-hover:scale-110
              "
            />

            <span>
              Tour
            </span>
          </button>
        </div>

        {/* =====================================================
            CENTER CONTROLS
        ====================================================== */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
            w-full
            md:w-auto
          "
        >
          {/* =====================================================
              CHENNAI MVP
          ====================================================== */}
          <div
            className="
              flex
              items-center
              gap-1.5
              px-3
              py-1.5

              bg-[#EBE7E2]
              border
              border-[#1A1A1A]/15

              text-xs
              font-sans
              tracking-wider
              font-semibold
              text-[#1A1A1A]/80

              rounded-sm

              transition-all
              duration-200
              ease-out

              hover:bg-[#E3DED8]
              hover:-translate-y-0.5
              hover:shadow-sm
            "
          >
            <MapPin
              className="
                w-3.5
                h-3.5
                text-[#A67C52]

                transition-transform
                duration-200

                group-hover:scale-110
              "
            />

            <span className="font-bold text-[#1A1A1A]">
              CHENNAI MVP
            </span>

            <span className="text-[#1A1A1A]/30">
              •
            </span>

            <span className="text-[#1A1A1A]/60">
              TAMIL NADU
            </span>
          </div>

          {/* =====================================================
              NEIGHBOURHOOD DROPDOWN
          ====================================================== */}
          <div className="relative">

            {/* Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="
                group
                flex
                items-center
                gap-2
                px-3
                py-1.5

                bg-white
                hover:bg-[#F9F7F5]

                border
                border-[#1A1A1A]/20

                text-xs
                font-sans
                text-[#1A1A1A]

                transition-all
                duration-200
                ease-out

                hover:-translate-y-0.5
                hover:shadow-md

                active:scale-[0.98]

                rounded-sm
                shadow-sm
              "
            >
              <span
                className="
                  text-[#1A1A1A]/50
                  uppercase
                  text-[10px]
                  tracking-wider
                  font-bold
                "
              >
                Focus:
              </span>

              <span
                className="
                  font-serif
                  font-bold
                  text-sm
                  text-[#1A1A1A]

                  transition-colors
                  duration-200

                  group-hover:text-[#8B5E3C]
                "
              >
                {selectedNeighbourhood.name}
              </span>

              {/* Risk Badge */}
              <span
                className={`
                  px-1.5
                  py-0.5
                  text-[9px]
                  font-sans
                  font-bold
                  uppercase
                  tracking-wider
                  rounded-sm

                  transition-all
                  duration-200

                  group-hover:scale-105

                  ${
                    selectedNeighbourhood.baseRisk === 'CRITICAL'
                      ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] border border-[#9E2A2B]/30'
                      : selectedNeighbourhood.baseRisk === 'HIGH'
                      ? 'bg-[#C97A2C]/10 text-[#C97A2C] border border-[#C97A2C]/30'
                      : 'bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/30'
                  }
                `}
              >
                {selectedNeighbourhood.baseRisk}
              </span>

              <ChevronDown
                className={`
                  w-3.5
                  h-3.5
                  text-[#1A1A1A]/50

                  transition-transform
                  duration-200

                  ${dropdownOpen ? 'rotate-180 text-[#A67C52]' : ''}
                `}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="
                  absolute
                  left-0
                  mt-1.5
                  w-64

                  bg-[#FAF8F5]

                  border
                  border-[#1A1A1A]/20

                  shadow-xl
                  p-2

                  z-50
                  rounded-sm

                  animate-in
                  fade-in
                  zoom-in-95
                  duration-150
                "
              >
                <div
                  className="
                    text-[9px]
                    font-sans
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#1A1A1A]/50
                    px-2
                    py-1
                    border-b
                    border-[#1A1A1A]/10
                    mb-1
                  "
                >
                  Select Chennai Ward / Basin
                </div>

                {CHENNAI_NEIGHBOURHOODS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      onSelectNeighbourhood(item);
                      setDropdownOpen(false);
                    }}
                    className={`
                      w-full
                      text-left
                      px-2.5
                      py-2

                      text-xs

                      flex
                      items-center
                      justify-between

                      transition-all
                      duration-150
                      ease-out

                      rounded-sm

                      hover:translate-x-1
                      hover:shadow-sm

                      active:scale-[0.98]

                      ${
                        selectedNeighbourhood.id === item.id
                          ? `
                            bg-[#A67C52]/15
                            text-[#1A1A1A]
                            font-bold
                            border-l-2
                            border-[#A67C52]
                          `
                          : `
                            text-[#1A1A1A]/80
                            hover:bg-[#EAE6E1]
                          `
                      }
                    `}
                  >
                    <div>
                      <div
                        className="
                          font-serif
                          font-semibold
                          text-[#1A1A1A]
                        "
                      >
                        {item.name}
                      </div>

                      <div
                        className="
                          text-[10px]
                          font-sans
                          text-[#1A1A1A]/60
                        "
                      >
                        {item.elevationMeters}m DEM elevation
                      </div>
                    </div>

                    <span
                      className={`
                        text-[9px]
                        font-sans
                        px-1.5
                        py-0.5
                        font-bold
                        uppercase
                        tracking-wider

                        ${
                          item.baseRisk === 'CRITICAL'
                            ? 'text-[#9E2A2B]'
                            : item.baseRisk === 'HIGH'
                            ? 'text-[#C97A2C]'
                            : 'text-[#2D5A43]'
                        }
                      `}
                    >
                      {item.score}/100
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE ACTIONS
        ====================================================== */}
        <div
          className="
            flex
            items-center
            gap-2.5
            text-xs
            font-sans
          "
        >
          {/* =====================================================
              SIH TOUR BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={onToggleTour}
            className={`
              hidden
              md:flex
              items-center
              gap-1.5
              px-3
              py-1.5

              text-xs
              font-sans
              uppercase
              tracking-wider
              font-bold

              transition-all
              duration-200
              ease-out

              hover:-translate-y-0.5
              hover:shadow-lg

              active:scale-[0.97]

              shadow-sm
              rounded-sm

              ${
                tourActive
                  ? `
                    bg-[#1A1A1A]
                    text-[#F4F1EE]
                    border
                    border-[#1A1A1A]
                  `
                  : `
                    bg-[#A67C52]
                    hover:bg-[#8B5E3C]
                    text-white
                    border
                    border-[#A67C52]
                  `
              }
            `}
          >
            <Sparkles
              className="
                w-3.5
                h-3.5
                text-amber-200
              "
            />

            <span>
              {tourActive
                ? 'Close Presentation'
                : '2-Min SIH Pitch Demo'}
            </span>
          </button>

          {/* =====================================================
              CACHED SNAPSHOT
          ====================================================== */}
          <button
            type="button"
            onClick={onOpenMethodology}
            className="
              group
              flex
              items-center
              gap-1

              px-2.5
              py-1

              bg-[#EAE6E1]

              border
              border-[#1A1A1A]/20

              text-[10px]
              font-sans
              uppercase
              tracking-widest
              font-semibold
              text-[#1A1A1A]/80

              transition-all
              duration-200
              ease-out

              hover:bg-[#DCD6CE]
              hover:-translate-y-0.5
              hover:shadow-md

              active:scale-[0.98]

              rounded-sm
            "
            title="PravahAI uses cached & preprocessed data for offline demonstration resilience."
          >
            <Radio
              className="
                w-3
                h-3
                text-[#A67C52]

                animate-pulse
              "
            />

            <span>
              CACHED SNAPSHOT
            </span>
          </button>

          {/* =====================================================
              ALERT BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={onOpenAlerts}
            className="
              group
              relative

              p-2

              bg-white
              hover:bg-[#EBE7E2]

              border
              border-[#1A1A1A]/20

              text-[#1A1A1A]

              transition-all
              duration-200
              ease-out

              hover:-translate-y-0.5
              hover:shadow-md

              active:scale-90

              rounded-sm
              shadow-sm
            "
            title="Official & Model Alerts"
          >
            <AlertTriangle
              className="
                w-4
                h-4
                text-[#A67C52]
              "
            />

            {unreadAlertCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1

                  w-4
                  h-4

                  bg-[#9E2A2B]
                  text-white

                  text-[9px]
                  font-sans
                  font-bold

                  flex
                  items-center
                  justify-center

                  rounded-full

                  animate-pulse

                  shadow-sm
                "
              >
                {unreadAlertCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};