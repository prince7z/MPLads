import React from 'react';
import { FileSpreadsheet, Download, Share2, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';

export const ReportsPage: React.FC = () => {
  const exportDatasets = [
    {
      title: 'Official Completed Works Register (All States & Districts)',
      description: 'Comprehensive line-item dataset of all completed MPLADS civil works with cost, dates, IDA and executing details.',
      type: 'CSV Dataset',
      exportType: 'completed-works' as const,
      frequency: 'Live Production Feed',
    },
    {
      title: 'Recommended & Sanctioned Works Pipeline',
      description: 'Full register of approved recommendations, priorities, stages, and sanctioned allocation estimates.',
      type: 'CSV Dataset',
      exportType: 'recommended-works' as const,
      frequency: 'Live Production Feed',
    },
    {
      title: 'Expenditure Disbursements & Voucher Ledger',
      description: 'Itemized financial transactions, vendor records, disbursement milestones, and payment settlement statuses.',
      type: 'CSV Dataset',
      exportType: 'expenditures' as const,
      frequency: 'Live Production Feed',
    },
    {
      title: 'MP Performance & Fund Utilization Scorecard',
      description: 'Nationwide MP metrics summary including allocated funds, total expenditure, utilization %, and works ratio.',
      type: 'CSV Dataset',
      exportType: 'mp-summary' as const,
      frequency: 'Live Production Feed',
    },
  ];

  const handleDownload = (type: 'completed-works' | 'recommended-works' | 'expenditures' | 'mp-summary') => {
    const url = apiService.getExportUrl(type);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2">
            <span>Official Data Export & Audit Reports</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
              Live CSV Exports
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Download authorized open-data spreadsheets directly exported from the Empowered Indian backend
          </p>
        </div>
      </div>

      {/* Dataset Cards List */}
      <div className="space-y-3">
        {exportDatasets.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <div className="flex items-start gap-3.5 max-w-2xl">
              <div className="p-3 bg-navy-900 text-amber-400 rounded-lg shrink-0 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{r.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-semibold mt-2">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Official Schema
                  </span>
                  <span>•</span>
                  <span>Format: {r.type}</span>
                  <span>•</span>
                  <span>Feed: {r.frequency}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(r.exportType)}
                className="flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded-md transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
