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
    <div className="space-y-5 pb-8">
      {/* Dashboard Title Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
            National MPLADS Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            AI-powered monitoring of funds, projects, risks and implementation
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Financial Year</span>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1 bg-white font-bold text-slate-800 focus:border-navy-900 focus:outline-none"
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

      {/* Main Analytics Section - 3 Columns (Fund Progress | Risk Donut | AI Early Warnings) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 h-[340px]">
          <FundProgressChart />
        </div>
        <div className="lg:col-span-3 h-[340px]">
          <RiskDonutChart />
        </div>
        <div className="lg:col-span-3 h-[340px]">
          <EarlyWarningsPanel />
        </div>
      </div>

      {/* Bottom Intelligence Section - 2 Panels (State-wise Map & Top 5 States | AI Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* State-wise Risk Intelligence */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
              State-wise Risk Intelligence
              <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Interactive spatial risk visualization across Indian states">ⓘ</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7">
              <IndiaRiskMap />
            </div>
            <div className="md:col-span-5 border-l border-slate-100 pl-3 h-full">
              <TopStatesTable />
            </div>
          </div>
        </div>

        {/* AI Generated Insights */}
        <div className="lg:col-span-5">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
        <div>Last Updated: 01 May 2026 10:30 AM</div>
        <div>Source: <span className="font-bold text-navy-900">MPLADS DigiGov Portal</span></div>
      </div>
    </div>
  );
};
