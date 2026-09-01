import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { STATE_RISK_LIST } from '../../data/dashboardData';

export const TopStatesTable: React.FC = () => {
  const navigate = useNavigate();
  const top5States = STATE_RISK_LIST.slice(0, 5);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Top 5 States by Risk Index
        </h4>

        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2 px-3">State</th>
                <th className="py-2 px-3 text-center">Risk Index</th>
                <th className="py-2 px-3 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {top5States.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 font-semibold text-slate-800">{row.state}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-200">
                      {row.riskIndex}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-flex items-center text-red-600 font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 text-right">
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="text-xs font-bold text-navy-900 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>View State Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
