import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Camera,
  Car,
  FileCheck2,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

import { CitizenReport } from '../types';

interface AdminDashboardViewProps {
  citizenReports: CitizenReport[];
  onVerifyReport: (
    reportId: string,
    status: 'VERIFIED' | 'REJECTED'
  ) => void;
  onNavigateToMapWithCell?: (cellId: string) => void;
  onSelectNeighbourhoodByName?: (name: string) => void;
}

export const AdminDashboardView: React.FC<
  AdminDashboardViewProps
> = ({
  citizenReports,
  onVerifyReport,
  onSelectNeighbourhoodByName,
}) => {
  const [reportFilter, setReportFilter] = useState<
    'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'
  >('ALL');

  const pendingReports = citizenReports.filter(
    (r) => r.verificationStatus === 'PENDING'
  );

  const filteredReports = citizenReports.filter((r) => {
    if (reportFilter === 'ALL') return true;

    return r.verificationStatus === reportFilter;
  });

  return (
    <div className="space-y-6 pb-12">

      {/* =====================================================
          TOP COMMAND BANNER
      ====================================================== */}

      <div
        className="
          bg-white
          border border-[#C9D9E1]
          rounded-2xl
          p-6
          shadow-sm
        "
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <div>

            <div
              className="
                text-[9px]
                font-sans
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#B42318]
                mb-2
                flex
                items-center
                gap-1.5
              "
            >
              <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse inline-block" />

              <span>
                COMMAND DISPATCH VII • RESCUE OPERATIONS
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
                items-center
                gap-2.5
              "
            >
              <Activity className="w-6 h-6 text-[#087F8C]" />

              <span>
                Emergency Command Operations
              </span>
            </h1>

            <p
              className="
                text-xs
                text-[#52606D]
                mt-2
                max-w-3xl
                font-sans
                leading-relaxed
              "
            >
              Real-time multi-source intelligence fusion for disaster
              responders: prioritized field verification queues, exposed
              transport corridors, and calibrated spatial risk hotspots.
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs">

            <span
              className="
                px-4
                py-2
                bg-[#F7FBFC]
                border
                border-[#C9D9E1]
                text-[#52606D]
                font-sans
                rounded-xl
              "
            >
              Status:{' '}

              <strong
                className="
                  text-[#18794E]
                  font-serif
                  font-bold
                "
              >
                OPERATIONAL
              </strong>

            </span>

          </div>

        </div>
      </div>


      {/* =====================================================
          TOP KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Critical Zones */}

        <div
          className="
            p-4
            bg-white
            border
            border-[#C9D9E1]
            shadow-sm
            rounded-2xl
          "
        >
          <div className="flex items-center justify-between text-xs text-[#B42318] font-sans font-bold mb-2">

            <span className="uppercase tracking-wider text-[10px]">
              Critical Zones
            </span>

            <AlertOctagon className="w-4 h-4 text-[#B42318]" />

          </div>

          <div className="text-3xl font-serif font-bold text-[#102A43]">
            8
          </div>

          <div className="text-[10px] text-[#7B8794] mt-1 font-sans">
            Anna Nagar, Otteri
          </div>

        </div>


        {/* High Risk Zones */}

        <div
          className="
            p-4
            bg-white
            border
            border-[#C9D9E1]
            shadow-sm
            rounded-2xl
          "
        >
          <div className="flex items-center justify-between text-xs text-[#C05621] font-sans font-bold mb-2">

            <span className="uppercase tracking-wider text-[10px]">
              High-Risk Zones
            </span>

            <ShieldAlert className="w-4 h-4 text-[#C05621]" />

          </div>

          <div className="text-3xl font-serif font-bold text-[#102A43]">
            17
          </div>

          <div className="text-[10px] text-[#7B8794] mt-1 font-sans">
            Velachery, Adyar Basin
          </div>

        </div>


        {/* Citizen Reports */}

        <div
          className="
            p-4
            bg-white
            border
            border-[#C9D9E1]
            shadow-sm
            rounded-2xl
          "
        >
          <div className="flex items-center justify-between text-xs text-[#087F8C] font-sans font-bold mb-2">

            <span className="uppercase tracking-wider text-[10px]">
              Citizen Reports
            </span>

            <Camera className="w-4 h-4 text-[#087F8C]" />

          </div>

          <div className="text-3xl font-serif font-bold text-[#102A43]">
            {citizenReports.length + 38}
          </div>

          <div className="text-[10px] text-[#7B8794] mt-1 font-sans">
            Validated via FloodNet CV
          </div>

        </div>


        {/* Exposed Roads */}

        <div
          className="
            p-4
            bg-white
            border
            border-[#C9D9E1]
            shadow-sm
            rounded-2xl
          "
        >
          <div className="flex items-center justify-between text-xs text-[#52606D] font-sans font-bold mb-2">

            <span className="uppercase tracking-wider text-[10px]">
              Exposed Roads
            </span>

            <Car className="w-4 h-4 text-[#087F8C]" />

          </div>

          <div className="text-3xl font-serif font-bold text-[#102A43]">
            12
          </div>

          <div className="text-[10px] text-[#7B8794] mt-1 font-sans">
            Modeled flood risk
          </div>

        </div>


        {/* Queue */}

        <div
          className="
            p-4
            bg-white
            border
            border-[#C9D9E1]
            shadow-sm
            rounded-2xl
            col-span-2
            lg:col-span-1
          "
        >
          <div className="flex items-center justify-between text-xs text-[#B42318] font-sans font-bold mb-2">

            <span className="uppercase tracking-wider text-[10px]">
              Queue to Verify
            </span>

            <FileCheck2 className="w-4 h-4 text-[#B42318]" />

          </div>

          <div className="text-3xl font-serif font-bold text-[#B42318]">
            {pendingReports.length}
          </div>

          <div className="text-[10px] text-[#7B8794] mt-1 font-sans">
            Action required by operators
          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN COMMAND SECTION
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


        {/* =====================================================
            FIELD VERIFICATION QUEUE
        ====================================================== */}

        <div
          className="
            lg:col-span-7
            bg-white
            border
            border-[#C9D9E1]
            p-6
            shadow-sm
            rounded-2xl
            space-y-4
          "
        >

          <div className="flex items-center justify-between border-b border-[#C9D9E1] pb-4">

            <div>

              <h2
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
                <FileCheck2 className="w-4 h-4 text-[#087F8C]" />

                <span>
                  Field Evidence Verification Queue
                </span>

              </h2>

              <p
                className="
                  text-xs
                  text-[#52606D]
                  mt-1
                  font-sans
                "
              >
                Review AI-classified field reports. Verifying immediately
                upgrades local evidence reliability and refreshes GIS hotspots.
              </p>

            </div>


            <span
              className="
                px-3
                py-1.5
                rounded-lg
                bg-[#FDECEC]
                text-[#B42318]
                text-xs
                font-sans
                font-bold
                uppercase
                tracking-wider
                border
                border-[#E9A6A1]
              "
            >
              {pendingReports.length} PENDING
            </span>

          </div>


          {/* Pending Reports */}

          {pendingReports.length > 0 ? (

            <div className="space-y-4">

              {pendingReports.map((report) => (

                <div
                  key={report.id}
                  className="
                    p-4
                    bg-[#F7FBFC]
                    border
                    border-[#C9D9E1]
                    hover:border-[#087F8C]
                    transition-all
                    space-y-3
                    rounded-xl
                  "
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-start gap-3">

                      <img
                        src={report.imageUrl}
                        alt="Evidence"
                        className="
                          w-20
                          h-20
                          object-cover
                          rounded-xl
                          border
                          border-[#C9D9E1]
                          shrink-0
                        "
                      />


                      <div>

                        <div className="flex items-center gap-2 mb-1">

                          <span
                            className="
                              text-xs
                              font-serif
                              font-bold
                              text-[#102A43]
                            "
                          >
                            {report.areaName}
                          </span>


                          <span
                            className="
                              text-[10px]
                              font-mono
                              text-[#52606D]
                              bg-white
                              px-2
                              py-0.5
                              rounded-md
                              border
                              border-[#C9D9E1]
                            "
                          >
                            {report.id}
                          </span>

                        </div>


                        <p
                          className="
                            text-xs
                            text-[#52606D]
                            leading-relaxed
                            font-sans
                          "
                        >
                          {report.description}
                        </p>


                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            text-[#7B8794]
                            mt-2
                            font-sans
                          "
                        >
                          <span>
                            {report.timestamp}
                          </span>

                          <span>
                            •
                          </span>

                          <span className="text-[#18794E] font-bold">
                            GPS Confidence: HIGH
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* AI Evidence Metrics */}

                  <div
                    className="
                      grid
                      grid-cols-3
                      gap-2
                      p-3
                      bg-white
                      border
                      border-[#C9D9E1]
                      text-[11px]
                      rounded-xl
                      font-sans
                    "
                  >

                    <div>

                      <span className="text-[9px] uppercase font-bold text-[#7B8794] block">
                        AI Classification
                      </span>

                      <strong className="text-[#087F8C] font-mono">
                        {report.aiFloodConfidence}% Flood
                      </strong>

                    </div>


                    <div>

                      <span className="text-[9px] uppercase font-bold text-[#7B8794] block">
                        Corroboration
                      </span>

                      <strong className="text-[#18794E] font-mono">
                        {report.nearbyCorroborations} Reports
                      </strong>

                    </div>


                    <div>

                      <span className="text-[9px] uppercase font-bold text-[#7B8794] block">
                        Evidence Impact
                      </span>

                      <strong className="text-[#087F8C] font-mono">
                        +{Math.round(report.aiFloodConfidence * 0.1)} Score
                      </strong>

                    </div>

                  </div>


                  {/* Actions */}

                  <div className="flex items-center justify-between pt-1">

                    <span
                      className="
                        text-[10px]
                        text-[#7B8794]
                        italic
                        font-serif
                      "
                    >
                      Authorizes incorporation into local risk grid
                    </span>


                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          onVerifyReport(
                            report.id,
                            'REJECTED'
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-1
                          px-3
                          py-2
                          bg-white
                          hover:bg-[#FDECEC]
                          text-[#52606D]
                          hover:text-[#B42318]
                          border
                          border-[#C9D9E1]
                          hover:border-[#E9A6A1]
                          text-xs
                          font-sans
                          font-bold
                          uppercase
                          tracking-wider
                          rounded-lg
                          transition-colors
                        "
                      >
                        <X className="w-3.5 h-3.5" />

                        <span>
                          Reject
                        </span>

                      </button>


                      <button
                        onClick={() =>
                          onVerifyReport(
                            report.id,
                            'VERIFIED'
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-1.5
                          px-4
                          py-2
                          bg-[#102A43]
                          hover:bg-[#0B1F33]
                          text-white
                          text-xs
                          font-sans
                          font-bold
                          uppercase
                          tracking-wider
                          rounded-lg
                          shadow-sm
                          transition-all
                        "
                      >
                        <Check className="w-3.5 h-3.5 text-[#DDF3F3]" />

                        <span>
                          Verify Report
                        </span>

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div
              className="
                p-8
                text-center
                bg-[#F7FBFC]
                border
                border-dashed
                border-[#C9D9E1]
                text-xs
                text-[#52606D]
                space-y-2
                rounded-xl
              "
            >

              <CheckCircle2 className="w-8 h-8 text-[#18794E] mx-auto" />

              <div
                className="
                  font-serif
                  font-bold
                  text-[#102A43]
                  text-sm
                "
              >
                All Field Reports Cleared & Verified
              </div>


              <p className="text-[11px] text-[#7B8794] font-sans">
                Newly submitted citizen observations will automatically queue
                here for responder authorization.
              </p>

            </div>

          )}

        </div>



        {/* =====================================================
            PRIORITY ACTION AREAS
        ====================================================== */}

        <div
          className="
            lg:col-span-5
            bg-white
            border
            border-[#C9D9E1]
            p-6
            shadow-sm
            rounded-2xl
            flex
            flex-col
            justify-between
            space-y-4
          "
        >

          <div>

            <div className="flex items-center justify-between border-b border-[#C9D9E1] pb-4">

              <h2
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
                <AlertTriangle className="w-4 h-4 text-[#C05621]" />

                <span>
                  Priority Action Areas
                </span>

              </h2>


              <span
                className="
                  text-[10px]
                  text-[#7B8794]
                  font-sans
                  uppercase
                  tracking-wider
                "
              >
                Ranked Exposure
              </span>

            </div>


            <div className="space-y-4 mt-4">


              {/* Velachery */}

              <div
                className="
                  p-4
                  bg-[#F7FBFC]
                  border
                  border-[#E7B18A]
                  space-y-2
                  rounded-xl
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      text-xs
                      font-serif
                      font-bold
                      text-[#102A43]
                    "
                  >
                    1. Velachery Basin
                  </span>


                  <span
                    className="
                      px-2
                      py-1
                      rounded-lg
                      bg-[#FFF3E8]
                      text-[#C05621]
                      text-[9px]
                      font-sans
                      font-bold
                      uppercase
                      tracking-wider
                      border
                      border-[#E7B18A]
                    "
                  >
                    72 / 100 HIGH RISK
                  </span>

                </div>


                <div
                  className="
                    text-[11px]
                    text-[#52606D]
                    leading-relaxed
                    font-sans
                  "
                >
                  <strong>
                    Why prioritized:
                  </strong>{' '}

                  High modeled rainfall load + extreme depression topography
                  (4.8m DEM) + 2 recent citizen flood reports along lake
                  bypass.

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pt-1
                    text-[10px]
                    font-sans
                  "
                >

                  <span className="text-[#7B8794]">
                    3 exposed road segments
                  </span>


                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) {
                        onSelectNeighbourhoodByName('Velachery');
                      }
                    }}
                    className="
                      text-[#087F8C]
                      hover:text-[#102A43]
                      font-bold
                      uppercase
                      tracking-wider
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <span>
                      Inspect Area
                    </span>

                    <ArrowRight className="w-3 h-3" />

                  </button>

                </div>

              </div>



              {/* Anna Nagar */}

              <div
                className="
                  p-4
                  bg-[#F7FBFC]
                  border
                  border-[#E9A6A1]
                  space-y-2
                  rounded-xl
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      text-xs
                      font-serif
                      font-bold
                      text-[#102A43]
                    "
                  >
                    2. Anna Nagar (Otteri Basin)
                  </span>


                  <span
                    className="
                      px-2
                      py-1
                      rounded-lg
                      bg-[#FDECEC]
                      text-[#B42318]
                      text-[9px]
                      font-sans
                      font-bold
                      uppercase
                      tracking-wider
                      border
                      border-[#E9A6A1]
                    "
                  >
                    78 / 100 CRITICAL
                  </span>

                </div>


                <div
                  className="
                    text-[11px]
                    text-[#52606D]
                    leading-relaxed
                    font-sans
                  "
                >
                  <strong>
                    Why prioritized:
                  </strong>{' '}

                  Otteri Nullah channel overflow + confirmed road obstruction
                  on 2nd Avenue.

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pt-1
                    text-[10px]
                    font-sans
                  "
                >

                  <span className="text-[#7B8794]">
                    4 exposed road segments
                  </span>


                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) {
                        onSelectNeighbourhoodByName('Anna Nagar');
                      }
                    }}
                    className="
                      text-[#087F8C]
                      hover:text-[#102A43]
                      font-bold
                      uppercase
                      tracking-wider
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <span>
                      Inspect Area
                    </span>

                    <ArrowRight className="w-3 h-3" />

                  </button>

                </div>

              </div>



              {/* Adyar */}

              <div
                className="
                  p-4
                  bg-[#F7FBFC]
                  border
                  border-[#C9D9E1]
                  space-y-2
                  rounded-xl
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      text-xs
                      font-serif
                      font-bold
                      text-[#102A43]
                    "
                  >
                    3. Adyar River Corridor
                  </span>


                  <span
                    className="
                      px-2
                      py-1
                      rounded-lg
                      bg-[#FFF3E8]
                      text-[#C05621]
                      text-[9px]
                      font-sans
                      font-bold
                      uppercase
                      tracking-wider
                      border
                      border-[#E7B18A]
                    "
                  >
                    64 / 100 HIGH RISK
                  </span>

                </div>


                <div
                  className="
                    text-[11px]
                    text-[#52606D]
                    leading-relaxed
                    font-sans
                  "
                >
                  <strong>
                    Why prioritized:
                  </strong>{' '}

                  Upstream Chembarambakkam reservoir discharge + high tide
                  backpressure at river mouth.

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pt-1
                    text-[10px]
                    font-sans
                  "
                >

                  <span className="text-[#7B8794]">
                    2 exposed road segments
                  </span>


                  <button
                    onClick={() => {
                      if (onSelectNeighbourhoodByName) {
                        onSelectNeighbourhoodByName('Adyar');
                      }
                    }}
                    className="
                      text-[#087F8C]
                      hover:text-[#102A43]
                      font-bold
                      uppercase
                      tracking-wider
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <span>
                      Inspect Area
                    </span>

                    <ArrowRight className="w-3 h-3" />

                  </button>

                </div>

              </div>

            </div>

          </div>


          <div
            className="
              p-4
              bg-[#F7FBFC]
              border
              border-[#C9D9E1]
              text-[10px]
              text-[#7B8794]
              italic
              font-serif
              text-center
              rounded-xl
            "
          >
            *Priorities combine Geospatial Model scores, Copernicus DEM
            slope, and verified citizen observations.
          </div>

        </div>

      </div>



      {/* =====================================================
          CITIZEN OBSERVATIONS REGISTRY
      ====================================================== */}

      <div
        className="
          bg-white
          border
          border-[#C9D9E1]
          p-6
          shadow-sm
          rounded-2xl
          space-y-4
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
            border-b
            border-[#C9D9E1]
            pb-4
          "
        >

          <div>

            <h3
              className="
                text-base
                font-serif
                font-bold
                text-[#102A43]
              "
            >
              Citizen Field Observations Registry
            </h3>


            <span
              className="
                text-xs
                text-[#52606D]
                font-sans
              "
            >
              Complete community evidence history with verification audit
              states
            </span>

          </div>



          {/* Filter */}

          <div
            className="
              flex
              items-center
              gap-1.5
              bg-[#F7FBFC]
              p-1.5
              rounded-xl
              border
              border-[#C9D9E1]
            "
          >

            {(
              ['ALL', 'VERIFIED', 'PENDING', 'REJECTED'] as const
            ).map((st) => (

              <button
                key={st}
                onClick={() => setReportFilter(st)}
                className={`
                  px-3
                  py-1.5
                  rounded-lg
                  text-xs
                  font-sans
                  font-bold
                  uppercase
                  tracking-wider
                  transition-all
                  ${
                    reportFilter === st
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'text-[#52606D] hover:text-[#102A43] hover:bg-white'
                  }
                `}
              >
                {st}
              </button>

            ))}

          </div>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full text-left text-xs font-sans">

            <thead
              className="
                bg-[#E7F1F5]
                text-[#52606D]
                uppercase
                font-sans
                text-[9px]
                tracking-wider
                border-b
                border-[#C9D9E1]
              "
            >

              <tr>

                <th className="p-3">
                  Report ID / Location
                </th>

                <th className="p-3">
                  Observation
                </th>

                <th className="p-3">
                  Severity
                </th>

                <th className="p-3">
                  AI CV Confidence
                </th>

                <th className="p-3">
                  Evidence Score
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Time
                </th>

              </tr>

            </thead>



            <tbody className="divide-y divide-[#C9D9E1]">

              {filteredReports.map((rep) => (

                <tr
                  key={rep.id}
                  className="
                    hover:bg-[#F7FBFC]
                    transition-colors
                  "
                >

                  <td className="p-3 font-semibold text-[#102A43]">

                    <div className="font-serif font-bold text-xs">
                      {rep.areaName}
                    </div>


                    <div
                      className="
                        text-[10px]
                        text-[#7B8794]
                        font-mono
                      "
                    >
                      {rep.id}
                    </div>

                  </td>


                  <td
                    className="
                      p-3
                      text-[#52606D]
                      max-w-xs
                      truncate
                    "
                  >
                    {rep.description}
                  </td>



                  <td className="p-3">

                    <span
                      className={`
                        px-2
                        py-1
                        rounded-lg
                        text-[9px]
                        font-sans
                        font-bold
                        uppercase
                        tracking-wider
                        ${
                          rep.reportedSeverity === 'CRITICAL'
                            ? 'bg-[#FDECEC] text-[#B42318] border border-[#E9A6A1]'
                            : rep.reportedSeverity === 'HIGH'
                            ? 'bg-[#FFF3E8] text-[#C05621] border border-[#E7B18A]'
                            : 'bg-[#FFF8D9] text-[#8A6A00] border border-[#E5CF78]'
                        }
                      `}
                    >
                      {rep.reportedSeverity}
                    </span>

                  </td>



                  <td className="p-3 text-[#087F8C] font-mono font-bold">
                    {rep.aiFloodConfidence}%
                  </td>



                  <td className="p-3 text-[#102A43] font-mono">
                    {rep.citizenEvidenceScore} / 100
                  </td>



                  <td className="p-3">

                    <span
                      className={`
                        px-2
                        py-1
                        rounded-lg
                        text-[9px]
                        font-sans
                        font-bold
                        uppercase
                        tracking-wider
                        ${
                          rep.verificationStatus === 'VERIFIED'
                            ? 'bg-[#E8F6EF] text-[#18794E] border border-[#A7D8C0]'
                            : rep.verificationStatus === 'PENDING'
                            ? 'bg-[#FFF3E8] text-[#C05621] border border-[#E7B18A]'
                            : 'bg-[#FDECEC] text-[#B42318] border border-[#E9A6A1]'
                        }
                      `}
                    >
                      {rep.verificationStatus}
                    </span>

                  </td>



                  <td
                    className="
                      p-3
                      text-[#7B8794]
                      font-mono
                      text-[11px]
                    "
                  >
                    {rep.timestamp}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};