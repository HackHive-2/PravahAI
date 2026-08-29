import React from 'react';
import {
  ShieldAlert,
  MapPin,
  Radio,
  Sparkles,
  ChevronDown,
  AlertTriangle,
  Play,
  Check,
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
  onOpenMethodology,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-[#F5F7F8]/95
        backdrop-blur-md
        border-b
        border-[#102A43]/15
        text-[#17212B]
        px-4
        lg:px-8
        py-3
        shadow-[0_2px_18px_rgba(16,42,67,0.07)]
      "
    >
      {/* =====================================================
          TOP INFORMATION BAR
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

          text-[#52606D]

          pb-2
          mb-2

          border-b
          border-[#102A43]/10
        "
      >
        <div>
          THE GEOSPATIAL INTELLIGENCE ARCHIVE — GREATER CHENNAI BASIN
        </div>

        <div className="text-[#087F8C] font-bold">
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

        {/* ===================================================
            LOGO + PRODUCT IDENTITY
        ==================================================== */}

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

            {/* Logo */}
            <div
              className="
                group
                relative

                flex
                items-center
                justify-center

                w-11
                h-11

                rounded-lg

                bg-[#102A43]

                text-white

                border
                border-[#0B1F33]

                shadow-md

                transition-all
                duration-300
                ease-out

                hover:-translate-y-0.5
                hover:shadow-xl
                hover:bg-[#0B1F33]

                active:scale-95
              "
            >

              <ShieldAlert
                className="
                  w-5
                  h-5

                  text-[#D49A3A]

                  transition-all
                  duration-300

                  group-hover:scale-110
                  group-hover:rotate-6
                "
              />

              {/* Live indicator */}
              <div
                className="
                  absolute

                  -bottom-1
                  -right-1

                  w-3
                  h-3

                  bg-[#087F8C]

                  rounded-full

                  border-2
                  border-[#F5F7F8]

                  shadow-sm

                  animate-pulse
                "
              />
            </div>

            {/* Product Identity */}
            <div>

              <div className="flex items-center gap-2 flex-wrap">

                <span
                  className="
                    font-serif
                    font-bold

                    tracking-tight

                    text-xl
                    lg:text-2xl

                    text-[#102A43]

                    transition-colors
                    duration-200

                    hover:text-[#087F8C]
                  "
                >
                  PravahAI
                </span>

                {/* HackHive badge */}
                <span
                  className="
                    px-1.5
                    py-0.5

                    text-[8px]

                    font-sans
                    font-bold

                    uppercase
                    tracking-widest

                    bg-[#DDF3F3]

                    text-[#087F8C]

                    border
                    border-[#087F8C]/25

                    rounded
                  "
                >
                  2026 HackHive
                </span>

              </div>

              <p
                className="
                  text-[11px]

                  text-[#52606D]

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

          {/* =================================================
              MOBILE TOUR
          ================================================== */}

          <button
            type="button"
            onClick={onToggleTour}
            aria-label="Toggle presentation tour"
            className={`
              group

              md:hidden

              text-xs
              font-sans
              font-bold

              uppercase
              tracking-wider

              px-3
              py-2

              rounded-md

              flex
              items-center
              gap-1.5

              border

              transition-all
              duration-200
              ease-out

              active:scale-95

              ${
                tourActive
                  ? `
                    bg-[#102A43]
                    text-white
                    border-[#102A43]
                    shadow-md
                  `
                  : `
                    bg-white
                    text-[#102A43]
                    border-[#B8C6CF]

                    hover:bg-[#EEF6F7]
                    hover:border-[#087F8C]
                    hover:-translate-y-0.5
                    hover:shadow-md
                  `
              }
            `}
          >

            <Play
              className={`
                w-3.5
                h-3.5

                transition-transform
                duration-200

                ${
                  tourActive
                    ? 'text-[#D49A3A]'
                    : 'text-[#087F8C]'
                }

                group-hover:scale-110
              `}
            />

            <span>
              Tour
            </span>

          </button>

        </div>

        {/* ===================================================
            CENTER CONTROLS
        ==================================================== */}

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

          {/* =================================================
              CHENNAI MVP BADGE
          ================================================== */}

          <div
            className="
              group

              flex
              items-center
              gap-1.5

              px-3
              py-1.5

              bg-[#EEF2F4]

              border
              border-[#B8C6CF]

              text-xs

              font-sans
              tracking-wider
              font-semibold

              text-[#52606D]

              rounded-md

              transition-all
              duration-200

              hover:bg-[#DDF3F3]
              hover:border-[#087F8C]/30
              hover:-translate-y-0.5
              hover:shadow-sm
            "
          >

            <MapPin
              className="
                w-3.5
                h-3.5

                text-[#087F8C]

                transition-transform
                duration-200

                group-hover:scale-110
              "
            />

            <span className="font-bold text-[#102A43]">
              CHENNAI MVP
            </span>

            <span className="text-[#52606D]/40">
              •
            </span>

            <span className="text-[#52606D]">
              TAMIL NADU
            </span>

          </div>

          {/* =================================================
              NEIGHBOURHOOD DROPDOWN
          ================================================== */}

          <div className="relative">

            {/* Dropdown Trigger */}

            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className={`
                group

                flex
                items-center
                gap-2

                px-3
                py-1.5

                bg-white

                border

                text-xs
                font-sans
                text-[#17212B]

                transition-all
                duration-200
                ease-out

                rounded-md

                shadow-sm

                active:scale-[0.98]

                ${
                  dropdownOpen
                    ? `
                      border-[#087F8C]
                      ring-2
                      ring-[#087F8C]/10
                      bg-[#F7FCFC]
                    `
                    : `
                      border-[#B8C6CF]

                      hover:bg-[#EEF6F7]
                      hover:border-[#087F8C]/60
                      hover:-translate-y-0.5
                      hover:shadow-md
                    `
                }
              `}
            >

              <span
                className="
                  text-[#7B8794]

                  uppercase
                  text-[9px]

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

                  text-[#102A43]

                  transition-colors
                  duration-200

                  group-hover:text-[#087F8C]
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

                  rounded

                  border

                  transition-all
                  duration-200

                  ${
                    selectedNeighbourhood.baseRisk === 'CRITICAL'
                      ? `
                        bg-[#FDECEC]
                        text-[#B42318]
                        border-[#E9A6A1]
                      `
                      : selectedNeighbourhood.baseRisk === 'HIGH'
                      ? `
                        bg-[#FFF3E8]
                        text-[#C05621]
                        border-[#E7B18A]
                      `
                      : `
                        bg-[#E8F6EF]
                        text-[#18794E]
                        border-[#A7D8C0]
                      `
                  }
                `}
              >
                {selectedNeighbourhood.baseRisk}
              </span>

              <ChevronDown
                className={`
                  w-3.5
                  h-3.5

                  text-[#7B8794]

                  transition-all
                  duration-200

                  ${
                    dropdownOpen
                      ? 'rotate-180 text-[#087F8C]'
                      : 'group-hover:text-[#087F8C]'
                  }
                `}
              />

            </button>

            {/* =================================================
                DROPDOWN MENU
            ================================================== */}

            {dropdownOpen && (
              <div
                className="
                  absolute
                  left-0

                  mt-2

                  w-72

                  bg-[#FFFFFF]

                  border
                  border-[#B8C6CF]

                  shadow-2xl

                  p-2

                  z-50

                  rounded-lg

                  animate-in
                  fade-in
                  zoom-in-95
                  duration-150
                "
              >

                {/* Dropdown Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    px-2.5
                    py-2

                    mb-1

                    border-b
                    border-[#D6DEE3]
                  "
                >

                  <div>

                    <div
                      className="
                        text-[9px]

                        font-sans
                        font-bold

                        uppercase
                        tracking-[0.2em]

                        text-[#087F8C]
                      "
                    >
                      LOCATION FILTER
                    </div>

                    <div
                      className="
                        text-[10px]

                        font-sans

                        text-[#7B8794]

                        mt-0.5
                      "
                    >
                      Select Chennai Ward / Basin
                    </div>

                  </div>

                  <MapPin
                    className="
                      w-4
                      h-4

                      text-[#087F8C]
                    "
                  />

                </div>

                {/* Neighbourhoods */}

                <div className="space-y-1">

                  {CHENNAI_NEIGHBOURHOODS.map((item) => {

                    const isSelected =
                      selectedNeighbourhood.id === item.id;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          onSelectNeighbourhood(item);
                          setDropdownOpen(false);
                        }}
                        className={`
                          group

                          w-full

                          text-left

                          px-2.5
                          py-2.5

                          text-xs

                          flex
                          items-center
                          justify-between

                          transition-all
                          duration-150

                          rounded-md

                          border

                          active:scale-[0.98]

                          ${
                            isSelected
                              ? `
                                bg-[#DDF3F3]

                                border-[#087F8C]/30

                                text-[#102A43]

                                shadow-sm
                              `
                              : `
                                bg-[#F8FAFB]

                                border-transparent

                                text-[#52606D]

                                hover:bg-[#EEF6F7]
                                hover:border-[#087F8C]/20
                                hover:text-[#102A43]
                                hover:translate-x-0.5
                              `
                          }
                        `}
                      >

                        <div className="min-w-0">

                          <div
                            className={`
                              font-serif
                              font-bold

                              transition-colors
                              duration-150

                              ${
                                isSelected
                                  ? 'text-[#102A43]'
                                  : 'text-[#17212B] group-hover:text-[#087F8C]'
                              }
                            `}
                          >
                            {item.name}
                          </div>

                          <div
                            className="
                              text-[10px]

                              font-sans

                              text-[#7B8794]

                              mt-0.5
                            "
                          >
                            {item.elevationMeters}m DEM elevation
                          </div>

                        </div>

                        <div className="flex items-center gap-2 shrink-0">

                          <span
                            className={`
                              text-[9px]

                              font-sans
                              font-bold

                              uppercase
                              tracking-wider

                              px-1.5
                              py-0.5

                              rounded

                              ${
                                item.baseRisk === 'CRITICAL'
                                  ? 'text-[#B42318] bg-[#FDECEC]'
                                  : item.baseRisk === 'HIGH'
                                  ? 'text-[#C05621] bg-[#FFF3E8]'
                                  : 'text-[#18794E] bg-[#E8F6EF]'
                              }
                            `}
                          >
                            {item.score}/100
                          </span>

                          {isSelected && (
                            <Check
                              className="
                                w-3.5
                                h-3.5

                                text-[#087F8C]
                              "
                            />
                          )}

                        </div>

                      </button>
                    );
                  })}

                </div>
              </div>
            )}

          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE ACTIONS
        ==================================================== */}

        <div
          className="
            flex
            items-center

            gap-2.5

            text-xs
            font-sans
          "
        >

          {/* =================================================
              PRIMARY SIH BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={onToggleTour}
            className={`
              group

              hidden
              md:flex

              items-center
              gap-1.5

              px-3.5
              py-2

              text-xs

              font-sans
              uppercase
              tracking-wider
              font-bold

              transition-all
              duration-200
              ease-out

              active:scale-[0.97]

              rounded-md

              ${
                tourActive
                  ? `
                    bg-[#102A43]
                    text-white

                    border
                    border-[#102A43]

                    shadow-lg
                  `
                  : `
                    bg-[#102A43]
                    text-white

                    border
                    border-[#102A43]

                    shadow-md

                    hover:bg-[#0B1F33]
                    hover:-translate-y-0.5
                    hover:shadow-xl
                  `
              }
            `}
          >

            <Sparkles
              className="
                w-3.5
                h-3.5

                text-[#D49A3A]

                transition-all
                duration-300

                group-hover:scale-110
                group-hover:rotate-12
              "
            />

            <span>
              {tourActive
                ? 'Close Presentation'
                : '2-Min SIH Pitch Demo'}
            </span>

          </button>

          {/* =================================================
              CACHED SNAPSHOT
          ================================================== */}

          <button
            type="button"
            onClick={onOpenMethodology}
            className="
              group

              flex
              items-center
              gap-1.5

              px-2.5
              py-1.5

              bg-[#EEF2F4]

              border
              border-[#B8C6CF]

              text-[9px]

              font-sans
              uppercase
              tracking-widest
              font-bold

              text-[#52606D]

              transition-all
              duration-200

              hover:bg-[#DDF3F3]
              hover:border-[#087F8C]/30
              hover:text-[#087F8C]

              hover:-translate-y-0.5
              hover:shadow-sm

              active:scale-[0.98]

              rounded-md
            "
            title="PravahAI uses cached and preprocessed data for offline demonstration resilience."
          >

            <Radio
              className="
                w-3
                h-3

                text-[#087F8C]

                animate-pulse

                transition-transform
                duration-200

                group-hover:scale-125
              "
            />

            <span>
              CACHED SNAPSHOT
            </span>

          </button>

          {/* =================================================
              ALERT BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={onOpenAlerts}
            aria-label={`Open alerts${unreadAlertCount > 0 ? `, ${unreadAlertCount} unread` : ''}`}
            className="
              group

              relative

              flex
              items-center
              justify-center

              w-9
              h-9

              bg-white

              border
              border-[#B8C6CF]

              text-[#102A43]

              transition-all
              duration-200
              ease-out

              hover:bg-[#FFF8D9]
              hover:border-[#D49A3A]
              hover:-translate-y-0.5
              hover:shadow-md

              active:scale-90

              rounded-md

              shadow-sm
            "
            title="Official & Model Alerts"
          >

            <AlertTriangle
              className="
                w-4
                h-4

                text-[#D49A3A]

                transition-all
                duration-200

                group-hover:scale-110
                group-hover:rotate-3
              "
            />

            {/* Alert Count */}

            {unreadAlertCount > 0 && (
              <span
                className="
                  absolute

                  -top-1
                  -right-1

                  min-w-4
                  h-4

                  px-1

                  bg-[#B42318]

                  text-white

                  text-[8px]

                  font-sans
                  font-bold

                  flex
                  items-center
                  justify-center

                  rounded-full

                  border-2
                  border-[#F5F7F8]

                  shadow-sm

                  animate-pulse
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