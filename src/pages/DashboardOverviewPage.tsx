import React, { useState } from 'react';
import { KPICard } from '../components/common/KPICard';
import { FundProgressChart } from '../components/dashboard/FundProgressChart';
import { RiskDonutChart } from '../components/dashboard/RiskDonutChart';
import { EarlyWarningsPanel } from '../components/dashboard/EarlyWarningsPanel';
import { IndiaRiskMap } from '../components/dashboard/IndiaRiskMap';
import { TopStatesTable } from '../components/dashboard/TopStatesTable';
import { AIInsightsPanel } from '../components/dashboard/AIInsightsPanel';
import { DASHBOARD_KPIS } from '../data/dashboardData';

export const DashboardOverviewPage: React.FC = () => {
  const [financialYear, setFinancialYear] = useState('2024-25');

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Dashboard Title Header Bar */}
   

      {/* KPI Cards Grid - 6 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {DASHBOARD_KPIS.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Primary Analytics Section - Map (Statewise Detail) Moved UP Side-by-Side with Main Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Authentic Interactive Map of India & Top States Table (Moved UP) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-extrabold text-navy-900 flex items-center gap-2">
                <span>State-wise Risk Intelligence & GIS Spatial Map</span>
                <span className="text-[10px] font-bold bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
                  Live Geospatial
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">Interactive OpenStreetMap view of Indian states & risk metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1">
            <div className="md:col-span-7 min-h-[320px]">
              <IndiaRiskMap />
            </div>
            <div className="md:col-span-5 border-l border-slate-100 pl-3 flex flex-col justify-between">
              <TopStatesTable />
            </div>
          </div>
        </div>

        {/* Right Column: Graphs (Fund Progress Chart & Risk Donut Chart) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="h-[210px]">
            <FundProgressChart />
          </div>
          <div className="h-[200px]">
            <RiskDonutChart />
          </div>
        </div>
      </div>

      {/* AI Dropdown Intelligence Section (Alerts & AI Insights Panels as Dropdowns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* AI Early Warnings Panel (Dropdown Filter & Accordions) */}
        <div className="lg:col-span-6">
          <EarlyWarningsPanel />
        </div>

        {/* AI Generated Insights Panel (Dropdown Topics & Accordions) */}
        <div className="lg:col-span-6">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
        <div>Last Updated: 01 May 2026 10:30 AM</div>
        <div>Source: <span className="font-bold text-navy-900">eSanchayan MoSPI Platform</span></div>
      </div>
    </div>
  );
};
