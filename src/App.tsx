import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { AICopilotDrawer } from './components/copilot/AICopilotDrawer';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { RiskIntelligencePage } from './pages/RiskIntelligencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { CompliancePage } from './pages/CompliancePage';
import { ReportsPage } from './pages/ReportsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 antialiased">
      {/* Fixed Left Sidebar (~250px) */}
      <Sidebar />

      {/* Main Viewport Container */}
      <div className="flex-1 pl-[250px] flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <TopHeader onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardOverviewPage />} />
            <Route path="/risk-intelligence" element={<RiskIntelligencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/financials" element={<FinancialsPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      {/* Global AI Copilot Right-side Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  );
};
export default App;
