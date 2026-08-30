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
  ToastMessage
} from './components/NotificationToast';

import {
  ChennaiNeighbourhood,
  RiskCell,
  CitizenReport
} from './types';

import {
  CHENNAI_NEIGHBOURHOODS,
  INITIAL_RISK_CELLS,
  INITIAL_CITIZEN_REPORTS,
  SIH_DEMO_TOUR_STEPS
} from './data/chennaiData';

import { apiService } from './services/riskEngine';
import { submitReportToBackend } from './services/backendApi';

export function App() {
  // Global State
  const [selectedNeighbourhood, setSelectedNeighbourhood] =
    useState<ChennaiNeighbourhood>(CHENNAI_NEIGHBOURHOODS[0]);

  const [activeTab, setActiveTab] = useState<NavTabId>('overview');

  const [activeRiskCell, setActiveRiskCell] =
    useState<RiskCell>(INITIAL_RISK_CELLS[0]);

  const [citizenReports, setCitizenReports] =
    useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [highlightRouteId, setHighlightRouteId] =
    useState<'FASTEST' | 'LOWER_RISK' | 'ALL'>('ALL');

  // SIH 2-3 Minute Tour State
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);

  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'warning' | 'info' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((t) => t.id !== newToast.id)
      );
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  // Sync active risk cell when neighbourhood changes
  const handleSelectNeighbourhood = (
    n: ChennaiNeighbourhood
  ) => {
    setSelectedNeighbourhood(n);

    const matchedCell =
      INITIAL_RISK_CELLS.find((c) =>
        c.areaName.toLowerCase().includes(
          n.name.toLowerCase()
        )
      ) || INITIAL_RISK_CELLS[0];

    setActiveRiskCell(matchedCell);

    addToast(
      `Area Selected: ${n.name}`,
      `Loaded hyperlocal risk model (${matchedCell.riskScore}/100 - ${matchedCell.riskLevel}) for ${n.name}.`,
      'info'
    );
  };

  const handleSelectCell = (cell: RiskCell) => {
    setActiveRiskCell(cell);

    const matchedN =
      CHENNAI_NEIGHBOURHOODS.find((n) =>
        cell.areaName.toLowerCase().includes(
          n.name.toLowerCase()
        )
      );

    if (matchedN) {
      setSelectedNeighbourhood(matchedN);
    }
  };

  // Submit citizen report to the REAL Express backend
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
      const backendResponse = await submitReportToBackend({
        location: reportData.areaName,
        description: reportData.description,
        severity: reportData.reportedSeverity
      });

      // Create the full frontend CitizenReport object
      // so the existing UI continues to work.
      const createdReport: CitizenReport = {
        ...reportData,
        id: backendResponse.report.id,
        timestamp: backendResponse.report.submitted_at,
        evidenceConfidence: 'MODERATE',
        citizenEvidenceScore: 50,
        verificationStatus: 'PENDING'
      };

      setCitizenReports((prev) => [
        createdReport,
        ...prev
      ]);

      // Refresh active cell citizen score
      if (
        activeRiskCell.areaName
          .toLowerCase()
          .includes(createdReport.areaName.toLowerCase())
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
          )
        }));
      }

      addToast(
        'Flood Report Submitted',
        `Report ${createdReport.id} in ${createdReport.areaName} was successfully submitted to the PravahAI backend.`,
        'success'
      );
    } catch (error) {
      console.error('Backend report submission failed:', error);

      addToast(
        'Report Submission Failed',
        error instanceof Error
          ? error.message
          : 'Could not connect to the PravahAI backend.',
        'warning'
      );
    }
  };

  // Verifying citizen report in Admin queue
  // Still uses the prototype frontend service for now.
  const handleVerifyReport = async (
    reportId: string,
    status: 'VERIFIED' | 'REJECTED'
  ) => {
    const updated = await apiService.verifyReport(
      reportId,
      status
    );

    if (updated) {
      setCitizenReports((prev) =>
        prev.map((r) =>
          r.id === reportId
            ? {
                ...r,
                verificationStatus: status
              }
            : r
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
    }
  };

  // Tour Step Synchronization
  useEffect(() => {
    if (!tourActive) return;

    const currentTourStep =
      SIH_DEMO_TOUR_STEPS[tourStepIndex];

    if (!currentTourStep) return;

    // Switch view
    setActiveTab(currentTourStep.targetView);

    // Contextual updates per step
    if (
      tourStepIndex === 1 ||
      tourStepIndex === 2 ||
      tourStepIndex === 3 ||
      tourStepIndex === 4 ||
      tourStepIndex === 5
    ) {
      const vel = CHENNAI_NEIGHBOURHOODS[0];

      setSelectedNeighbourhood(vel);
      setActiveRiskCell(INITIAL_RISK_CELLS[0]);
    } else if (
      tourStepIndex === 6 ||
      tourStepIndex === 7
    ) {
      setHighlightRouteId('ALL');
    }
  }, [tourStepIndex, tourActive]);

  const pendingReportsCount =
    citizenReports.filter(
      (r) => r.verificationStatus === 'PENDING'
    ).length;

  const criticalZonesCount =
    INITIAL_RISK_CELLS.filter(
      (c) => c.riskLevel === 'CRITICAL'
    ).length + 6;

  return (
    <div className="min-h-screen bg-[#F4F1EE] text-[#1A1A1A] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#A67C52] selection:text-white">

      <Header
        selectedNeighbourhood={selectedNeighbourhood}
        onSelectNeighbourhood={handleSelectNeighbourhood}
        tourActive={tourActive}
        onToggleTour={() => setTourActive(!tourActive)}
        unreadAlertCount={2}
        onOpenAlerts={() => setActiveTab('alerts')}
        onOpenMethodology={() => setActiveTab('methodology')}
      />

      {tourActive && (
        <DemoTourBar
          currentStepIndex={tourStepIndex}
          onSetStepIndex={setTourStepIndex}
          onClose={() => setTourActive(false)}
        />
      )}

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto border-x border-[#1A1A1A]/10 bg-[#F4F1EE]">

        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
          pendingReportsCount={pendingReportsCount}
          criticalZonesCount={criticalZonesCount}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-full bg-[#F4F1EE]">

          {activeTab === 'overview' && (
            <OverviewView
              selectedNeighbourhood={selectedNeighbourhood}
              onSelectNeighbourhood={handleSelectNeighbourhood}
              activeRiskCell={activeRiskCell}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              onSelectCell={handleSelectCell}
            />
          )}

          {activeTab === 'map' && (
            <RiskMapView
              activeCell={activeRiskCell}
              onSelectCell={handleSelectCell}
              citizenReports={citizenReports}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              highlightRouteId={highlightRouteId}
            />
          )}

          {activeTab === 'route' && (
            <RoutePlannerView
              onInspectRouteOnMap={(rId) => {
                setHighlightRouteId(rId);
                setActiveTab('map');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            />
          )}

          {activeTab === 'report' && (
            <CitizenReportView
              onSubmitReport={handleSubmitCitizenReport}
              onNavigateToMap={() => {
                setActiveTab('map');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            />
          )}

          {activeTab === 'emergency' && (
            <EmergencyLocationsView
              onNavigateToRouteWithDest={() => {
                setActiveTab('route');

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            />
          )}

          {activeTab === 'alerts' && (
            <OfficialAlertsView
              citizenReports={citizenReports}
              activeRiskCell={activeRiskCell}
            />
          )}

          {activeTab === 'dashboard' && (
            <AdminDashboardView
              citizenReports={citizenReports}
              onVerifyReport={handleVerifyReport}
              onSelectNeighbourhoodByName={(name) => {
                const matched =
                  CHENNAI_NEIGHBOURHOODS.find(
                    (n) =>
                      n.name.toLowerCase() ===
                      name.toLowerCase()
                  );

                if (matched) {
                  handleSelectNeighbourhood(matched);
                  setActiveTab('overview');

                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          )}

          {activeTab === 'methodology' && (
            <DataMethodologyView />
          )}

        </main>
      </div>

      <NotificationToast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}

export default App;