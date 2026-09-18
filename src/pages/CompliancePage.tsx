import React, { useEffect, useState } from 'react';
import { ClipboardCheck, CheckCircle2, Clock, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';
import { OverviewData } from '../types/api';
import { formatPercentage, formatIndianNumber, formatCurrencyRupees } from '../utils/formatters';

export const CompliancePage: React.FC = () => {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .getOverview()
      .then((data) => setOverview(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2">
            <span>Compliance, Audit & Physical Verification</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
              Official MoSPI Sync
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Audit oversight of physical work completion, fiscal sanctions, and compliance milestones
          </p>
        </div>

        <button
          onClick={fetchData}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-navy-900' : ''}`} />
        </button>
      </div>

      {/* 4 Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">National Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 mt-1.5">
            {overview ? formatPercentage(overview.completionRate) : '—'}
          </div>
          <span className="text-xs text-emerald-700 font-medium mt-0.5 block">
            {overview ? formatIndianNumber(overview.totalWorksCompleted) : '0'} Works Completed
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Works In Progress / Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1.5">
            {overview ? formatIndianNumber(overview.pendingWorks) : '—'}
          </div>
          <span className="text-xs text-amber-700 font-medium mt-0.5 block">
            Active Works in Execution
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Verified Completed Asset Value</span>
            <ShieldCheck className="w-4 h-4 text-navy-900" />
          </div>
          <div className="text-2xl font-black text-navy-900 mt-1.5">
            {overview ? formatCurrencyRupees(overview.completedWorksValue) : '—'}
          </div>
          <span className="text-xs text-slate-600 font-medium mt-0.5 block">
            Asset Value Transferred
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase">Fund Disbursal Rate</span>
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-800 mt-1.5">
            {overview ? formatPercentage(overview.expenditurePercentage) : '—'}
          </div>
          <span className="text-xs text-blue-700 font-medium mt-0.5 block">
            {overview ? formatCurrencyRupees(overview.totalExpenditure) : '₹0'} Disbursed
          </span>
        </div>
      </div>

      {/* Compliance Guidelines Information Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-navy-900">
          Statutory Verification Framework & Physical Audit Protocol
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          According to the MoSPI MPLADS Scheme guidelines, District Authorities inspect at least 10% of all works completed annually. Expenditure disbursements are reconciled against Utilization Certificates (UCs) and physical milestone reports certified by the District Collector (DC / DM).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-bold text-slate-800 block">Inspection Threshold</span>
            <p className="text-[11px] text-slate-500 mt-1">
              10% mandatory ground inspection by District Nodal Authority before final payment.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-bold text-slate-800 block">Geo-Tagging Policy</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Before and after photographs with GPS coordinates required for work completion sign-off.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[11px] font-bold text-slate-800 block">UC Audit Reconciliation</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Utilization certificates reconciled with PFMS and state treasury ledgers quarterly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
