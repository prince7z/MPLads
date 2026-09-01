import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { PriorityInvestigationItem } from '../../types/risk';

interface PriorityInvestigationQueueProps {
  items: PriorityInvestigationItem[];
  selectedProjectId: string | null;
  onSelectProject: (project: PriorityInvestigationItem) => void;
}

export const PriorityInvestigationQueue: React.FC<PriorityInvestigationQueueProps> = ({
  items,
  selectedProjectId,
  onSelectProject
}) => {
  const navigate = useNavigate();

  const getScoreBadgeClass = (score: number) => {
    if (score >= 90) return 'bg-red-600 text-white font-extrabold';
    if (score >= 70) return 'bg-orange-500 text-white font-extrabold';
    if (score >= 40) return 'bg-yellow-500 text-white font-extrabold';
    return 'bg-emerald-600 text-white font-extrabold';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
          Priority Investigation Queue
          <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="High-risk projects prioritized by risk score and AI confidence">ⓘ</span>
        </h3>
      </div>

      <div className="border border-slate-200 rounded-md overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
            <tr>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                  <span>Risk Score</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3">Project ID</th>
              <th className="py-2.5 px-3">Project Name</th>
              <th className="py-2.5 px-3">State</th>
              <th className="py-2.5 px-3">District</th>
              <th className="py-2.5 px-3">Amount (₹)</th>
              <th className="py-2.5 px-3 min-w-[100px]">Progress</th>
              <th className="py-2.5 px-3">Issue Detected</th>
              <th className="py-2.5 px-3 text-center">AI Confidence</th>
              <th className="py-2.5 px-3 text-center">Action</th>
              <th className="py-2.5 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {items.map((row) => {
              const isSelected = selectedProjectId === row.id;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectProject(row)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-50/70 border-l-4 border-l-amber-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded text-center min-w-[32px] ${getScoreBadgeClass(row.riskScore)}`}>
                      {row.riskScore}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{row.projectName}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.state}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.district}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.amountFormatted}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${row.progress < 40 ? 'text-red-600' : 'text-slate-700'}`}>
                        {row.progress}%
                      </span>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.progress < 40 ? 'bg-red-500' : 'bg-amber-500'}`}
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] font-semibold text-slate-700">
                      {row.issueDetected}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                    {row.aiConfidence}%
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${row.id}`);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-navy-900 border border-slate-300 rounded hover:bg-navy-900 hover:text-white transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
        <div>Showing 1 to {items.length} of 2,183 records</div>
        <div className="flex items-center gap-1">
          <button className="p-1 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <button className="px-2.5 py-1 bg-navy-900 text-white rounded font-bold">1</button>
          <button className="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-100">2</button>
          <button className="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-100">3</button>
          <button className="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-100">4</button>
          <button className="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-100">5</button>
          <span className="px-1 text-slate-400">...</span>
          <button className="px-2.5 py-1 border border-slate-300 rounded hover:bg-slate-100">437</button>
          <button className="p-1 border border-slate-300 rounded hover:bg-slate-100">
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
