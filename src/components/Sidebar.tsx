import React from 'react';
import {
  LayoutDashboard,
  Map,
  Navigation,
  Camera,
  Hospital,
  BellRing,
  Activity,
  FileCode2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export type NavTabId =
  | 'overview'
  | 'map'
  | 'route'
  | 'report'
  | 'emergency'
  | 'alerts'
  | 'dashboard'
  | 'methodology';

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  pendingReportsCount: number;
  criticalZonesCount: number;
}

interface NavItem {
  id: NavTabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  section?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingReportsCount,
  criticalZonesCount,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      sublabel: 'Citizen Decision Home',
      icon: LayoutDashboard,
      section: 'CITIZEN INTELLIGENCE',
    },
    {
      id: 'map',
      label: 'Risk Map',
      sublabel: '100m Hyperlocal Grid',
      icon: Map,
      badge: 'Interactive',
    },
    {
      id: 'route',
      label: 'Route Planner',
      sublabel: 'Risk-Aware Exposure',
      icon: Navigation,
      badge: 'Dual Route',
    },
    {
      id: 'report',
      label: 'Report Flooding',
      sublabel: 'AI Evidence Validation',
      icon: Camera,
      badge:
        pendingReportsCount > 0
          ? pendingReportsCount
          : 'Feedback',
    },
    {
      id: 'emergency',
      label: 'Emergency Locations',
      sublabel: 'Verified Relief Facilities',
      icon: Hospital,
    },
    {
      id: 'alerts',
      label: 'Official Alerts',
      sublabel: 'Multi-Source Provenance',
      icon: BellRing,
      badge: '3 Sources',
    },
    {
      id: 'dashboard',
      label: 'Emergency Command',
      sublabel: 'Admin Response Center',
      icon: Activity,
      badge:
        criticalZonesCount > 0
          ? `${criticalZonesCount} Critical`
          : 'Command',
      badgeColor:
        'bg-[#FDECEC] text-[#B42318] border-[#E9A6A1]',
      section: 'DISASTER MANAGEMENT',
    },
    {
      id: 'methodology',
      label: 'Data & Methodology',
      sublabel: 'Architecture & Disclaimers',
      icon: FileCode2,
    },
  ];

  return (
    <aside
      className="
        w-full
        lg:w-72
        lg:min-w-72
        lg:max-w-72

        bg-[#F5F7F8]

        border-r
        border-[#102A43]/15

        shrink-0

        flex
        flex-col
        justify-between

        py-4

        min-h-full
        min-w-0

        overflow-hidden
      "
    >

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav
        className="
          w-full
          px-3
          space-y-1.5
          min-w-0
        "
        aria-label="Primary navigation"
      >

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <React.Fragment key={item.id}>

              {/* =================================================
                  SECTION HEADING
              ================================================== */}

              {item.section && (
                <div
                  className="
                    pt-4
                    pb-2
                    px-2

                    mt-3

                    text-[9px]

                    font-sans
                    font-bold

                    uppercase
                    tracking-[0.2em]

                    text-[#52606D]

                    border-t
                    border-[#102A43]/10

                    whitespace-nowrap
                    overflow-hidden
                    text-ellipsis
                  "
                >
                  {item.section}
                </div>
              )}

              {/* =================================================
                  NAVIGATION BUTTON
              ================================================== */}

              <button
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={
                  isActive ? 'page' : undefined
                }
                className={`
                  group
                  relative

                  w-full
                  min-w-0

                  flex
                  items-center

                  gap-2

                  px-2.5
                  py-2.5

                  rounded-lg

                  text-left

                  border

                  transition-all
                  duration-200
                  ease-out

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#087F8C]/40

                  active:scale-[0.98]

                  ${
                    isActive
                      ? `
                        bg-[#DDF3F3]

                        text-[#102A43]

                        border-[#087F8C]/30

                        shadow-[0_4px_12px_rgba(8,127,140,0.12)]

                        translate-x-0.5
                      `
                      : `
                        bg-white

                        text-[#52606D]

                        border-[#D6DEE3]

                        hover:bg-[#EEF6F7]

                        hover:border-[#087F8C]/30

                        hover:text-[#102A43]

                        hover:-translate-y-0.5

                        hover:shadow-[0_4px_10px_rgba(16,42,67,0.08)]
                      `
                  }
                `}
              >

                {/* =================================================
                    ACTIVE INDICATOR
                ================================================== */}

                {isActive && (
                  <span
                    className="
                      absolute

                      left-0
                      top-2
                      bottom-2

                      w-1

                      bg-[#087F8C]

                      rounded-r-full

                      shadow-sm
                    "
                  />
                )}

                {/* =================================================
                    ICON
                ================================================== */}

                <div
                  className={`
                    shrink-0

                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-md

                    border

                    transition-all
                    duration-200
                    ease-out

                    ${
                      isActive
                        ? `
                          bg-[#102A43]

                          text-[#DDF3F3]

                          border-[#102A43]

                          shadow-sm

                          scale-105
                        `
                        : `
                          bg-[#EEF2F4]

                          text-[#087F8C]

                          border-[#D6DEE3]

                          group-hover:bg-[#DDF3F3]

                          group-hover:border-[#087F8C]/30

                          group-hover:text-[#087F8C]

                          group-hover:scale-105
                        `
                    }
                  `}
                >
                  <Icon
                    className="
                      w-4
                      h-4

                      transition-transform
                      duration-200

                      group-hover:scale-110
                    "
                  />
                </div>

                {/* =================================================
                    TEXT CONTENT

                    IMPORTANT:
                    This section is allowed to shrink and wrap.
                    This prevents long labels from overlapping
                    the badge/arrow.
                ================================================== */}

                <div
                  className="
                    min-w-0
                    flex-1

                    overflow-hidden
                  "
                >

                  {/* Main Label */}

                  <div
                    className={`
                      text-[13px]

                      leading-[1.15]

                      break-words

                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            text-[#102A43]

                            font-serif
                            font-bold
                          `
                          : `
                            text-[#263746]

                            font-serif
                            font-semibold

                            group-hover:text-[#087F8C]
                          `
                      }
                    `}
                  >
                    {item.label}
                  </div>

                  {/* Sub Label */}

                  <div
                    className="
                      mt-0.5

                      text-[9px]

                      leading-[1.2]

                      text-[#7B8794]

                      font-sans

                      overflow-hidden

                      line-clamp-1

                      transition-colors
                      duration-200

                      group-hover:text-[#52606D]
                    "
                  >
                    {item.sublabel}
                  </div>

                </div>

                {/* =================================================
                    RIGHT CONTENT
                ================================================== */}

                <div
                  className="
                    shrink-0

                    flex
                    items-center

                    gap-1

                    ml-auto
                  "
                >

                  {/* =================================================
                      BADGE
                  ================================================== */}

                  {item.badge && (
                    <span
                      className={`
                        shrink-0

                        max-w-[58px]

                        text-[7px]

                        font-sans
                        font-bold

                        uppercase
                        tracking-[0.06em]

                        px-1.5
                        py-1

                        rounded

                        border

                        whitespace-nowrap

                        overflow-hidden
                        text-ellipsis

                        transition-all
                        duration-200

                        ${
                          item.badgeColor
                            ? item.badgeColor
                            : isActive
                            ? `
                              bg-white

                              text-[#087F8C]

                              border-[#087F8C]/25
                            `
                            : `
                              bg-[#F1F5F7]

                              text-[#52606D]

                              border-[#D6DEE3]

                              group-hover:bg-[#DDF3F3]

                              group-hover:text-[#087F8C]

                              group-hover:border-[#087F8C]/25
                            `
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* =================================================
                      ARROW
                  ================================================== */}

                  <ChevronRight
                    className={`
                      w-3.5
                      h-3.5

                      shrink-0

                      transition-all
                      duration-200
                      ease-out

                      ${
                        isActive
                          ? `
                            text-[#087F8C]

                            translate-x-0.5
                          `
                          : `
                            text-[#9AA5B1]

                            group-hover:text-[#087F8C]

                            group-hover:translate-x-1
                          `
                      }
                    `}
                  />

                </div>
              </button>

            </React.Fragment>
          );
        })}

      </nav>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          w-full

          px-3
          lg:px-4

          pt-4
          mt-4

          border-t
          border-[#102A43]/10

          min-w-0
        "
      >

        <div
          className="
            group

            w-full

            p-3.5

            bg-[#102A43]

            border
            border-[#183B56]

            text-[11px]

            space-y-2

            rounded-lg

            shadow-md

            transition-all
            duration-300
            ease-out

            hover:-translate-y-0.5
            hover:shadow-xl
          "
        >

          {/* =================================================
              DOCTRINE TITLE
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between

              gap-2

              min-w-0
            "
          >

            <div
              className="
                flex
                items-center
                gap-1.5

                min-w-0

                text-[#DDF3F3]

                font-serif
                font-bold
              "
            >

              <ShieldCheck
                className="
                  w-4
                  h-4

                  shrink-0

                  text-[#D49A3A]

                  transition-transform
                  duration-300

                  group-hover:scale-110
                  group-hover:rotate-6
                "
              />

              <span
                className="
                  truncate
                "
              >
                PravahAI Doctrine
              </span>

            </div>

            <span
              className="
                shrink-0

                text-[8px]

                font-sans
                font-bold

                uppercase
                tracking-widest

                text-[#8FD3D3]
              "
            >
              LIVE
            </span>

          </div>

          {/* =================================================
              PRINCIPLE
          ================================================== */}

          <p
            className="
              text-[#D6E2EA]

              text-[10px]

              font-sans

              leading-relaxed
            "
          >
            Data &rarr; Geospatial Model &rarr; Explainable Risk &rarr;
            Decision &rarr; Relief.
          </p>

          {/* =================================================
              DATA INFORMATION
          ================================================== */}

          <div
            className="
              pt-2

              border-t
              border-white/10
            "
          >

            <div
              className="
                text-[9px]

                text-[#AFC0CC]

                font-mono

                leading-relaxed
              "
            >
              Open Data &bull; CartoDB &bull; Zero-Cost
            </div>

          </div>

          {/* =================================================
              HACKHIVE
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between

              gap-2

              pt-1
            "
          >

            <span
              className="
                text-[9px]

                font-sans
                font-bold

                uppercase
                tracking-widest

                text-[#D49A3A]
              "
            >
              2026 HackHive
            </span>

            <span
              className="
                text-[8px]

                font-mono

                text-[#8FA4B3]
              "
            >
              SIH
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
};