import React from 'react';
import { IndianRupee, TrendingUp, CreditCard, Download } from 'lucide-react';
import { FundProgressChart } from '../components/dashboard/FundProgressChart';

export const FinancialsPage: React.FC = () => {
  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
            Financial Intelligence & Fund Utilization
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time tracking of allocations, sanctions, releases, and expenditure anomalies
          </p>
        </div>

        <button className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 font-bold text-xs px-3 py-1.5 rounded-md">
          <Download className="w-3.5 h-3.5" />
          <span>Financial Audit Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Sanctioned Fund</span>
          <div className="text-2xl font-black text-navy-900 mt-1">₹ 8,318.00 Cr</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">100% of National Budget</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Cumulative Expenditure</span>
          <div className="text-2xl font-black text-navy-900 mt-1">₹ 2,748.45 Cr</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">33.04% Utilization Rate</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Flagged Payment Anomalies</span>
          <div className="text-2xl font-black text-red-600 mt-1">₹ 142.80 Cr</div>
          <div className="text-xs text-red-600 font-bold mt-1">28 High-Risk Transactions</div>
        </div>
      </div>

      <div className="h-[380px]">
        <FundProgressChart />
      </div>
    </div>
  );
};
