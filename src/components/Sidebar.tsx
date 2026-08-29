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
      badge: 'Feedback',
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
          : undefined,
      badgeColor:
        'bg-red-500/20 text-red-300 border-red-500/40',
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
        lg:w-64
        bg-[#F4F1EE]
        border-r
        border-[#1A1A1A]/15
        shrink-0
        flex
        flex-col
        justify-between
        py-4
      "
    >
      {/* Navigation */}
      <div className="px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <React.Fragment key={item.id}>
              {/* Section Heading */}
              {item.section && (
                <div
                  className="
                    pt-4
                    pb-1.5
                    px-3
                    text-[9px]
                    font-sans
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#1A1A1A]/50
                    border-t
                    border-[#1A1A1A]/10
                    mt-2
                  "
                >
                  {item.section}
                </div>
              )}

              {/* Navigation Button */}
              <button
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`
                  w-full
                  group
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2.5
                  rounded-sm
                  text-left

                  transition-all
                  duration-200
                  ease-out

                  hover:-translate-y-0.5
                  hover:shadow-md

                  active:scale-[0.97]

                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#A67C52]/50

                  ${
                    isActive
                      ? `
                        bg-white
                        text-[#1A1A1A]
                        border-l-2
                        border-[#A67C52]
                        shadow-sm
                        font-semibold
                      `
                      : `
                        text-[#1A1A1A]/70
                        hover:text-[#1A1A1A]
                        hover:bg-[#EBE7E2]
                        font-medium
                      `
                  }
                `}
              >
                {/* Left Side */}
                <div className="flex items-center gap-3 min-w-0">

                  {/* Icon */}
                  <div
                    className={`
                      p-1.5
                      rounded-sm
                      transition-all
                      duration-200
                      ease-out

                      group-hover:scale-110
                      group-hover:rotate-2

                      ${
                        isActive
                          ? `
                            bg-[#A67C52]
                            text-white
                            shadow-sm
                          `
                          : `
                            bg-[#EAE6E1]
                            text-[#1A1A1A]/70
                            group-hover:bg-[#DCD6CE]
                            group-hover:text-[#1A1A1A]
                            group-hover:shadow-sm
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
                      "
                    />
                  </div>

                  {/* Text */}
                  <div className="truncate">

                    {/* Main Label */}
                    <div
                      className={`
                        text-xs
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              text-[#1A1A1A]
                              font-serif
                              font-bold
                            `
                            : `
                              text-[#1A1A1A]/80
                              font-serif
                              group-hover:translate-x-0.5
                              group-hover:text-[#1A1A1A]
                            `
                        }
                      `}
                    >
                      {item.label}
                    </div>

                    {/* Sub Label */}
                    <div
                      className="
                        text-[10px]
                        text-[#1A1A1A]/50
                        font-sans
                        truncate
                        transition-colors
                        duration-200
                        group-hover:text-[#1A1A1A]/70
                      "
                    >
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-1.5 shrink-0">

                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`
                        text-[9px]
                        font-sans
                        font-bold
                        uppercase
                        tracking-wider
                        px-1.5
                        py-0.5
                        rounded-sm
                        border

                        transition-all
                        duration-200
                        ease-out

                        group-hover:scale-105

                        ${
                          item.badgeColor ||
                          (isActive
                            ? `
                              bg-[#A67C52]/10
                              text-[#8B5E3C]
                              border-[#A67C52]/30
                            `
                            : `
                              bg-[#EAE6E1]
                              text-[#1A1A1A]/60
                              border-[#1A1A1A]/10
                            `)
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Arrow */}
                  <ChevronRight
                    className={`
                      w-3.5
                      h-3.5

                      transition-all
                      duration-200
                      ease-out

                      ${
                        isActive
                          ? `
                            text-[#A67C52]
                            translate-x-0.5
                          `
                          : `
                            text-[#1A1A1A]/30
                            group-hover:text-[#1A1A1A]/70
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
      </div>

      {/* Footer */}
      <div className="px-4 pt-4 mt-4 border-t border-[#1A1A1A]/10">
        <div
          className="
            p-3
            bg-[#EAE6E1]
            border
            border-[#1A1A1A]/15
            text-[11px]
            space-y-1.5
            rounded-sm

            transition-all
            duration-300
            ease-out

            hover:bg-[#E4DED7]
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          {/* Doctrine Title */}
          <div
            className="
              flex
              items-center
              gap-1.5
              text-[#8B5E3C]
              font-serif
              font-bold
            "
          >
            <ShieldCheck
              className="
                w-3.5
                h-3.5
                text-[#A67C52]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <span>PravahAI Doctrine</span>
          </div>

          {/* Principle */}
          <p
            className="
              text-[#1A1A1A]/70
              text-[10px]
              font-sans
              leading-relaxed
            "
          >
            Data &rarr; Geospatial Model &rarr; Explainable Risk &rarr;
            Decision &rarr; Relief.
          </p>

          {/* Footer Information */}
          <div
            className="
              text-[9px]
              text-[#1A1A1A]/50
              font-mono
              pt-1
              border-t
              border-[#1A1A1A]/10
            "
          >
            Open Data &bull; CartoDB &bull; Zero-Cost
          </div>
        </div>
      </div>
    </aside>
  );
};