import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { apiService } from '../../services/api';
import { StateSummaryDoc } from '../../types/api';
import { formatPercentage, formatCurrencyRupees } from '../../utils/formatters';

interface TopStatesTableProps {
  house?: 'Both Houses' | 'Lok Sabha' | 'Rajya Sabha';
}

export const TopStatesTable: React.FC<TopStatesTableProps> = ({ house }) => {
  const navigate = useNavigate();
  const [states, setStates] = useState<StateSummaryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    apiService
      .getStateSummaries({
        house: house && house !== 'Both Houses' ? house : undefined,
        limit: 5,
        sortBy: 'utilizationPercentage',
        order: 'desc',
      })
      .then((data) => {
        if (isMounted) {
          setStates(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load states');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [house]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Top Performing States
          </h4>
          <span className="text-[10px] text-slate-400 font-semibold">By Utilization %</span>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2 px-3">State</th>
                <th className="py-2 px-3 text-right">Spent</th>
                <th className="py-2 px-3 text-center">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-2 px-3">
                      <div className="h-3 bg-slate-200 rounded w-20"></div>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <div className="h-3 bg-slate-200 rounded w-14 ml-auto"></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className="h-4 bg-slate-200 rounded w-10 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={3} className="py-3 px-3 text-center text-red-600 text-xs">
                    {error}
                  </td>
                </tr>
              ) : states.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-3 text-center text-slate-400 text-xs">
                    No state data available
                  </td>
                </tr>
              ) : (
                states.map((row) => (
                  <tr
                    key={row.state}
                    onClick={() => navigate(`/mplads/states/${encodeURIComponent(row.state)}`)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    title={`Click to view ${row.state} Dashboard`}
                  >
                    <td className="py-2 px-3 font-semibold text-slate-800">
                      <div className="truncate max-w-[110px]">{row.state}</div>
                    </td>
                    <td className="py-2 px-3 text-right text-slate-600 text-[11px]">
                      {formatCurrencyRupees(row.totalExpenditure, { fractionDigits: 0 })}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span
                        className={`inline-block font-black px-2 py-0.5 rounded text-[10px] border ${
                          row.utilizationPercentage >= 70
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : row.utilizationPercentage >= 50
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {formatPercentage(row.utilizationPercentage)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 text-right">
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="text-xs font-bold text-navy-900 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>View All State Analytics</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
