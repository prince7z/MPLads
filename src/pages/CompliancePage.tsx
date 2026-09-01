import React from 'react';
import { ClipboardCheck, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

export const CompliancePage: React.FC = () => {
  return (
    <div className="space-y-5 pb-8">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
          Compliance & Audit Verification
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Monitoring Utilization Certificates (UCs), Physical Verification Reports, and Geo-tagging compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">National UC Compliance</span>
          <div className="text-2xl font-black text-navy-900 mt-1">74.2%</div>
          <span className="text-xs text-emerald-700 font-medium">58,284 UCs Submitted</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Overdue UCs (&gt;90 Days)</span>
          <div className="text-2xl font-black text-amber-600 mt-1">12,410</div>
          <span className="text-xs text-amber-700 font-medium">Pending District Approval</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Geo-Tagged Verified</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">81.5%</div>
          <span className="text-xs text-emerald-700 font-medium">64,018 Works Verified</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-slate-500 uppercase">Audit Exception Flags</span>
          <div className="text-2xl font-black text-red-600 mt-1">418</div>
          <span className="text-xs text-red-600 font-bold">Action Required</span>
        </div>
      </div>
    </div>
  );
};
