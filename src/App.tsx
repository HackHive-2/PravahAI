import React, { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { Sidebar, NavTabId } from './components/Sidebar';
import { DemoTourBar } from './components/DemoTourBar';
import { OverviewView } from './components/OverviewView';
import { RiskMapView } from './components/RiskMapView';
import { RoutePlannerView } from './components/RoutePlannerView';
import { CitizenReportView } from './components/CitizenReportView';
import { EmergencyLocationsView } from './components/EmergencyLocationsView';
import { OfficialAlertsView } from './components/OfficialAlertsView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { DataMethodologyView } from './components/DataMethodologyView';

import {
  NotificationToast,
  ToastMessage,
} from './components/NotificationToast';

import {
  ChennaiNeighbourhood,
  RiskCell,
  CitizenReport,
} from './types';

import {
  CHENNAI_NEIGHBOURHOODS,
  INITIAL_RISK_CELLS,
  INITIAL_CITIZEN_REPORTS,
  SIH_DEMO_TOUR_STEPS,
} from './data/chennaiData';

import { apiService } from './services/riskEngine';
import { submitReportToBackend } from './services/backendApi';

export function App() {
  // =========================================================
  // GLOBAL STATE
  // =========================================================

  const [selectedNeighbourhood, setSelectedNeighbourhood] =
    useState<ChennaiNeighbourhood>(
      CHENNAI_NEIGHBOURHOODS[0]
    );

  const [activeTab, setActiveTab] =
    useState<NavTabId>('overview');

  const [activeRiskCell, setActiveRiskCell] =
    useState<RiskCell>(
      INITIAL_RISK_CELLS[0]
    );

  const [citizenReports, setCitizenReports] =
    useState<CitizenReport[]>(
      INITIAL_CITIZEN_REPORTS
    );

  const [toasts, setToasts] =
    useState<ToastMessage[]>([]);

  const [highlightRouteId, setHighlightRouteId] =
    useState<
      'FASTEST' | 'LOWER_RISK' | 'ALL'
    >('ALL');

  // =========================================================
  // SIH DEMO TOUR STATE
  // =========================================================

  const [tourActive, setTourActive] =
    useState<boolean>(false);

  const [tourStepIndex, setTourStepIndex] =
    useState<number>(0);

  // =========================================================
  // TOAST HELPERS
  // =========================================================

  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'warning' | 'info' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
    };

    setToasts((prev) => [
      ...prev,
      newToast,
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter(
          (toast) =>
            toast.id !== newToast.id
        )
      );
    }, 4500);
  };

  const handleDismissToast = (
    id: string
  ) => {
    setToasts((prev) =>
      prev.filter(
        (toast) => toast.id !== id
      )
    );
  };

  // =========================================================
  // NEIGHBOURHOOD SELECTION
  // =========================================================

  const handleSelectNeighbourhood = (
    neighbourhood: ChennaiNeighbourhood
  ) => {
    setSelectedNeighbourhood(
      neighbourhood
    );

    const matchedCell =
      INITIAL_RISK_CELLS.find((cell) =>
        cell.areaName
          .toLowerCase()
          .includes(
            neighbourhood.name.toLowerCase()
          )
      ) || INITIAL_RISK_CELLS[0];

    setActiveRiskCell(matchedCell);

    addToast(
      `Area Selected: ${neighbourhood.name}`,
      `Loaded hyperlocal risk model (${matchedCell.riskScore}/100 - ${matchedCell.riskLevel}) for ${neighbourhood.name}.`,
      'info'
    );
  };

  // =========================================================
  // RISK CELL SELECTION
  // =========================================================

  const handleSelectCell = (
    cell: RiskCell
  ) => {
    setActiveRiskCell(cell);

    const matchedNeighbourhood =
      CHENNAI_NEIGHBOURHOODS.find(
        (neighbourhood) =>
          cell.areaName
            .toLowerCase()
            .includes(
              neighbourhood.name.toLowerCase()
            )
      );

    if (matchedNeighbourhood) {
      setSelectedNeighbourhood(
        matchedNeighbourhood
      );
    }
  };

  // =========================================================
  // CITIZEN REPORT SUBMISSION
  // =========================================================

  const handleSubmitCitizenReport = async (
    reportData: Omit<
      CitizenReport,
      | 'id'
      | 'timestamp'
      | 'evidenceConfidence'
      | 'citizenEvidenceScore'
      | 'verificationStatus'
    >
  ) => {
    try {
      const backendResponse =
        await submitReportToBackend({
          location: reportData.areaName,
          description:
            reportData.description,
          severity:
            reportData.reportedSeverity,
        });

      const createdReport: CitizenReport = {
        ...reportData,
        id: backendResponse.report.id,
        timestamp:
          backendResponse.report.submitted_at,
        evidenceConfidence: 'MODERATE',
        citizenEvidenceScore: 50,
        verificationStatus: 'PENDING',
      };

      setCitizenReports((prev) => [
        createdReport,
        ...prev,
      ]);

      // Refresh active cell score
      if (
        activeRiskCell.areaName
          .toLowerCase()
          .includes(
            createdReport.areaName.toLowerCase()
          )
      ) {
        setActiveRiskCell((prev) => ({
          ...prev,
          citizenScore: Math.min(
            100,
            prev.citizenScore + 8
          ),
          riskScore: Math.min(
            100,
            prev.riskScore + 2
          ),
        }));
      }

      addToast(
        'Flood Report Submitted',
        `Report ${createdReport.id} in ${createdReport.areaName} was successfully submitted to the PravahAI backend.`,
        'success'
      );
    } catch (error) {
      console.error(
        'Backend report submission failed:',
        error
      );

      addToast(
        'Report Submission Failed',
        error instanceof Error
          ? error.message
          : 'Could not connect to the PravahAI backend.',
        'warning'
      );
    }
  };

  // =========================================================
  // ADMIN REPORT VERIFICATION
  // =========================================================

  const handleVerifyReport = async (
    reportId: string,
    status: 'VERIFIED' | 'REJECTED'
  ) => {
    const updated =
      await apiService.verifyReport(
        reportId,
        status
      );

    if (!updated) {
      return;
    }

    setCitizenReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? {
              ...report,
              verificationStatus: status,
            }
          : report
      )
    );

    if (status === 'VERIFIED') {
      addToast(
        'Citizen Report Verified',
        `Report ${reportId} marked as OFFICIAL VERIFIED by responder. Local GIS evidence reliability upgraded to HIGH.`,
        'success'
      );
    } else {
      addToast(
        'Citizen Report Rejected',
        `Report ${reportId} rejected due to insufficient corroboration or invalid terrain context.`,
        'warning'
      );
    }
  };

  // =========================================================
  // SIH TOUR SYNCHRONIZATION
  // =========================================================

  useEffect(() => {
    if (!tourActive) {
      return;
    }

    const currentTourStep =
      SIH_DEMO_TOUR_STEPS[
        tourStepIndex
      ];

    if (!currentTourStep) {
      return;
    }

    // Change active screen
    setActiveTab(
      currentTourStep.targetView
    );

    // Keep presentation focused on Velachery
    if (
      tourStepIndex === 1 ||
      tourStepIndex === 2 ||
      tourStepIndex === 3 ||
      tourStepIndex === 4 ||
      tourStepIndex === 5
    ) {
      const velachery =
        CHENNAI_NEIGHBOURHOODS[0];

      setSelectedNeighbourhood(
        velachery
      );

      setActiveRiskCell(
        INITIAL_RISK_CELLS[0]
      );
    }

    // Route presentation
    if (
      tourStepIndex === 6 ||
      tourStepIndex === 7
    ) {
      setHighlightRouteId('ALL');
    }
  }, [
    tourStepIndex,
    tourActive,
  ]);

  // =========================================================
  // COUNTERS
  // =========================================================

  const pendingReportsCount =
    citizenReports.filter(
      (report) =>
        report.verificationStatus ===
        'PENDING'
    ).length;

  const criticalZonesCount =
    INITIAL_RISK_CELLS.filter(
      (cell) =>
        cell.riskLevel === 'CRITICAL'
    ).length + 6;

  // =========================================================
  // NAVIGATION HELPER
  // =========================================================

  const navigateToTab = (
    tab: NavTabId
  ) => {
    setActiveTab(tab);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =========================================================
  // APPLICATION UI
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#F4F1EE]
        text-[#1A1A1A]
        flex
        flex-col
        font-['Plus_Jakarta_Sans',sans-serif]
        selection:bg-[#A67C52]
        selection:text-white
        overflow-x-hidden
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header
        selectedNeighbourhood={
          selectedNeighbourhood
        }
        onSelectNeighbourhood={
          handleSelectNeighbourhood
        }
        tourActive={tourActive}
        onToggleTour={() =>
          setTourActive(
            (prev) => !prev
          )
        }
        unreadAlertCount={2}
        onOpenAlerts={() =>
          navigateToTab('alerts')
        }
        onOpenMethodology={() =>
          navigateToTab('methodology')
        }
      />

      {/* =====================================================
          SIH PRESENTATION BAR
      ====================================================== */}

      {tourActive && (
        <DemoTourBar
          currentStepIndex={
            tourStepIndex
          }
          onSetStepIndex={
            setTourStepIndex
          }
          onClose={() =>
            setTourActive(false)
          }
        />
      )}

      {/* =====================================================
          MAIN APPLICATION FRAME
      ====================================================== */}

      <div
        className="
          flex-1
          w-full
          max-w-[1600px]
          mx-auto

          flex
          flex-col
          lg:flex-row

          border-x
          border-[#1A1A1A]/10

          bg-[#F4F1EE]

          min-w-0
        "
      >
        {/* =================================================
            SIDEBAR
        ================================================== */}

        <aside
          className="
            w-full
            lg:w-72
            lg:min-w-72
            lg:max-w-72

            shrink-0

            bg-[#F4F1EE]

            border-b
            lg:border-b-0
            lg:border-r

            border-[#1A1A1A]/15

            min-w-0
          "
        >
          <Sidebar
            activeTab={activeTab}
            onSelectTab={navigateToTab}
            pendingReportsCount={
              pendingReportsCount
            }
            criticalZonesCount={
              criticalZonesCount
            }
          />
        </aside>

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <main
          className="
            flex-1
            min-w-0
            w-full

            bg-[#F4F1EE]

            p-4
            sm:p-5
            lg:p-8

            overflow-x-hidden
          "
        >
          {/* =============================================
              OVERVIEW
          ============================================== */}

          {activeTab === 'overview' && (
            <OverviewView
              selectedNeighbourhood={
                selectedNeighbourhood
              }
              onSelectNeighbourhood={
                handleSelectNeighbourhood
              }
              activeRiskCell={
                activeRiskCell
              }
              onNavigateTab={(tab) =>
                navigateToTab(tab)
              }
              onSelectCell={
                handleSelectCell
              }
            />
          )}

          {/* =============================================
              RISK MAP
          ============================================== */}

          {activeTab === 'map' && (
            <RiskMapView
              activeCell={
                activeRiskCell
              }
              onSelectCell={
                handleSelectCell
              }
              citizenReports={
                citizenReports
              }
              onNavigateTab={(tab) =>
                navigateToTab(tab)
              }
              highlightRouteId={
                highlightRouteId
              }
            />
          )}

          {/* =============================================
              ROUTE PLANNER
          ============================================== */}

          {activeTab === 'route' && (
            <RoutePlannerView
              onInspectRouteOnMap={(
                routeId
              ) => {
                setHighlightRouteId(
                  routeId
                );

                navigateToTab('map');
              }}
            />
          )}

          {/* =============================================
              CITIZEN REPORT
          ============================================== */}

          {activeTab === 'report' && (
            <CitizenReportView
              onSubmitReport={
                handleSubmitCitizenReport
              }
              onNavigateToMap={() =>
                navigateToTab('map')
              }
            />
          )}

          {/* =============================================
              EMERGENCY LOCATIONS
          ============================================== */}

          {activeTab === 'emergency' && (
            <EmergencyLocationsView
              onNavigateToRouteWithDest={(
                facilityName
              ) => {
                void facilityName;

                navigateToTab('route');
              }}
            />
          )}

          {/* =============================================
              OFFICIAL ALERTS
          ============================================== */}

          {activeTab === 'alerts' && (
            <OfficialAlertsView
              citizenReports={
                citizenReports
              }
              activeRiskCell={
                activeRiskCell
              }
            />
          )}

          {/* =============================================
              ADMIN DASHBOARD
          ============================================== */}

          {activeTab === 'dashboard' && (
            <AdminDashboardView
              citizenReports={
                citizenReports
              }
              onVerifyReport={
                handleVerifyReport
              }
              onSelectNeighbourhoodByName={(
                name
              ) => {
                const matched =
                  CHENNAI_NEIGHBOURHOODS.find(
                    (neighbourhood) =>
                      neighbourhood.name
                        .toLowerCase() ===
                      name.toLowerCase()
                  );

                if (matched) {
                  handleSelectNeighbourhood(
                    matched
                  );

                  navigateToTab(
                    'overview'
                  );
                }
              }}
            />
          )}

          {/* =============================================
              METHODOLOGY
          ============================================== */}

          {activeTab === 'methodology' && (
            <DataMethodologyView />
          )}

          {/* =============================================
              APPLICATION FOOTER
          ============================================== */}

          <footer
            className="
              mt-10
              pt-5

              border-t
              border-[#1A1A1A]/10

              flex
              flex-col
              sm:flex-row

              items-center
              justify-between

              gap-2

              text-[10px]
              font-sans

              text-[#1A1A1A]/50
            "
          >
            <span>
              PravahAI • AI-Assisted
              Hyperlocal Flood Intelligence
            </span>

            <span
              className="
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#8B5E3C]
              "
            >
              2026 HackHive • SIH
            </span>
          </footer>
        </main>
      </div>

      {/* =====================================================
          NOTIFICATION TOASTS
      ====================================================== */}

      <NotificationToast
        toasts={toasts}
        onDismiss={
          handleDismissToast
        }
      />
    </div>
  );
}

export default App;