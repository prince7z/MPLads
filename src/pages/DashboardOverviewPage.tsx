import React, { useState, useEffect } from 'react';
import { KPICard } from '../components/common/KPICard';
import { FundProgressChart } from '../components/dashboard/FundProgressChart';
import { RiskDonutChart } from '../components/dashboard/RiskDonutChart';
import { EarlyWarningsPanel } from '../components/dashboard/EarlyWarningsPanel';
import { IndiaRiskMap } from '../components/dashboard/IndiaRiskMap';
import { TopStatesTable } from '../components/dashboard/TopStatesTable';
import { AIInsightsPanel } from '../components/dashboard/AIInsightsPanel';
import { apiService } from '../services/api';
import { OverviewData, SyncInfoData } from '../types/api';
import { formatCurrencyRupees, formatIndianNumber, formatPercentage } from '../utils/formatters';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';

export const DashboardOverviewPage: React.FC = () => {
  const [house, setHouse] = useState<'Both Houses' | 'Lok Sabha' | 'Rajya Sabha'>('Both Houses');
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [syncInfo, setSyncInfo] = useState<SyncInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, syncData] = await Promise.all([
        apiService.getOverview({ house }),
        apiService.getSyncInfo().catch(() => null),
      ]);
      setOverview(overviewData);
      setSyncInfo(syncData);
    } catch (err: any) {
      setError(err?.message || 'Failed to load dashboard metrics from official API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [house]);

  const kpis = overview
    ? [
        {
          id: 'kpi-1',
          title: 'Total Allocated',
          value: formatCurrencyRupees(overview.totalAllocated),
          change: 'Official Central Allocation',
          changeType: 'positive' as const,
          icon: 'IndianRupee',
        },
        {
          id: 'kpi-2',
          title: 'Works Recommended',
          value: formatIndianNumber(overview.totalWorksRecommended),
          change: `${formatIndianNumber(overview.pendingWorks)} Works Pending`,
          changeType: 'neutral' as const,
          icon: 'FileText',
        },
        {
          id: 'kpi-3',
          title: 'Works Completed',
          value: formatIndianNumber(overview.totalWorksCompleted),
          change: `${formatPercentage(overview.completionRate)} Completion Rate`,
          changeType: 'positive' as const,
          icon: 'CheckCircle',
        },
        {
          id: 'kpi-4',
          title: 'Total Expenditure',
          value: formatCurrencyRupees(overview.totalExpenditure),
          change: `${formatCurrencyRupees(overview.completedWorksValue)} Works Value`,
          changeType: 'positive' as const,
          icon: 'Coins',
        },
        {
          id: 'kpi-5',
          title: 'Fund Utilization',
          value: formatPercentage(overview.utilizationPercentage),
          change: `${formatPercentage(overview.expenditurePercentage)} Disbursed`,
          changeType: overview.utilizationPercentage >= 60 ? ('positive' as const) : ('neutral' as const),
          icon: 'ClipboardCheck',
        },
        {
          id: 'kpi-6',
          title: 'Total MPs Tracked',
          value: formatIndianNumber(overview.totalMPs),
          change: `${formatIndianNumber(overview.totalTransactions)} Transactions`,
          changeType: 'positive' as const,
          icon: 'ShieldAlert',
          riskBadge: 'Live API',
          highlight: true,
        },
      ]
    : [];

  return (
    <div className="space-y-6 pb-8 select-none">
      {/* Top Header Filter & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
        <div>
          <h1 className="text-lg font-black text-navy-900 tracking-tight flex items-center gap-2">
            <span>National MPLADS Operations & Risk Intelligence</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
              Official Production API Connected
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Directly synchronized with official Empowered Indian & eSanchayan MoSPI databases
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* House Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-lg text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-slate-500 ml-1" />
            {(['Both Houses', 'Lok Sabha', 'Rajya Sabha'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setHouse(h)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  house === h
                    ? 'bg-navy-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <button
            onClick={fetchData}
            title="Refresh Data from API"
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-navy-900' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-red-800 text-xs">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchData}
            className="font-bold underline hover:text-red-900 ml-4"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* KPI Cards Grid - 6 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {loading && !overview
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse h-28 flex flex-col justify-between"
              >
                <div className="h-3 bg-slate-200 rounded w-24"></div>
                <div className="h-7 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-100 rounded w-20"></div>
              </div>
            ))
          : kpis.map((kpi) => <KPICard key={kpi.id} {...kpi} />)}
      </div>

      {/* Primary Analytics Section - Map (Statewise Detail) & Main Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Map of India & Top States Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-extrabold text-navy-900 flex items-center gap-2">
                <span>State-wise Risk Intelligence & GIS Spatial Map</span>
                <span className="text-[10px] font-bold bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
                  Live Geospatial
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Interactive OpenStreetMap view with real state allocation, expenditure & utilization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch flex-1">
            <div className="md:col-span-7 min-h-[320px]">
              <IndiaRiskMap house={house} />
            </div>
            <div className="md:col-span-5 border-l border-slate-100 pl-3 flex flex-col justify-between">
              <TopStatesTable house={house} />
            </div>
          </div>
        </div>

        {/* Right Column: Graphs (Fund Progress Chart & Risk Donut Chart) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="h-[210px]">
            <FundProgressChart house={house} />
          </div>
          <div className="h-[200px]">
            <RiskDonutChart overview={overview} />
          </div>
        </div>
      </div>

      {/* AI Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <EarlyWarningsPanel />
        </div>
        <div className="lg:col-span-6">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Bottom Footer with Live Freshness Metadata */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium">
        <div>
          Last API Sync:{' '}
          <span className="font-semibold text-slate-700">
            {syncInfo?.lastUpdated ? syncInfo.lastUpdated : 'Synchronized via Official API'}
          </span>
          {syncInfo?.totalRecords ? ` (${formatIndianNumber(syncInfo.totalRecords)} records indexed)` : ''}
        </div>
        <div>
          Official Source:{' '}
          <span className="font-bold text-navy-900">
            {syncInfo?.source || 'Empowered Indian Backend (api.empoweredindian.in)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
