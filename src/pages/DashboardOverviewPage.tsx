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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight flex flex-wrap items-center gap-2">
            <span>NIRVANA</span>
            <span className="text-slate-300 font-normal">—</span>
            <span className="text-base font-semibold text-slate-700">
              National Intelligence & Risk Visualization for Administrative Network & Assets
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time spatial risk intelligence, financial tracking, and predictive monitoring across administrative networks
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Financial Year</span>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-1.5 bg-white font-bold text-slate-800 focus:border-navy-900 focus:outline-none shadow-2xs"
            >
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
        </div>
      </div>

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
        <div>Source: <span className="font-bold text-navy-900">NIRVANA MoSPI Platform</span></div>
      </div>
    </div>
  );
};
