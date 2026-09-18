import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Users, CheckCircle2, TrendingUp, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { StateSummaryDoc, ConstituencySummaryDoc, MPSummaryDoc } from '../types/api';
import { formatCurrencyRupees, formatIndianNumber, formatPercentage } from '../utils/formatters';

export const StateDashboardPage: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const navigate = useNavigate();

  const [stateSummary, setStateSummary] = useState<StateSummaryDoc | null>(null);
  const [constituencies, setConstituencies] = useState<ConstituencySummaryDoc[]>([]);
  const [mps, setMps] = useState<MPSummaryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStateData = async () => {
    if (!state) return;
    setLoading(true);
    setError(null);
    try {
      const [stateRes, constRes, mpsRes] = await Promise.all([
        apiService.getStateSummaries({ state }),
        apiService.getConstituencySummaries(state).catch(() => ({ items: [] })),
        apiService.getMPSummaries({ state, limit: 50 }).catch(() => ({ items: [] })),
      ]);

      if (stateRes.length > 0) {
        setStateSummary(stateRes[0]);
      }
      setConstituencies(constRes.items || []);
      setMps(mpsRes.items || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load state metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStateData();
  }, [state]);

  const stateName = decodeURIComponent(state || '');

  return (
    <div className="space-y-6 pb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/dashboard" className="hover:text-navy-900 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/risk-intelligence" className="hover:text-navy-900 transition-colors">
          State Risk Intelligence
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">{stateName}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-navy-900 tracking-tight">
              {stateName} State Performance Dashboard
            </h1>
            <span className="text-[10px] font-bold bg-navy-900 text-amber-400 px-2 py-0.5 rounded">
              Official State Profile
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Constituency-level fund allocations, utilization milestones, and MP roaster
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md text-xs font-semibold hover:bg-slate-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* State Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            State Allocation
          </span>
          <div className="text-2xl font-black text-navy-900 mt-1">
            {stateSummary ? formatCurrencyRupees(stateSummary.totalAllocated) : '—'}
          </div>
          <span className="text-xs text-slate-600 font-medium mt-0.5 block">
            {stateSummary ? formatIndianNumber(stateSummary.totalMPs || stateSummary.mpCount) : '—'} Members of Parliament
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Total Expenditure
          </span>
          <div className="text-2xl font-black text-navy-900 mt-1">
            {stateSummary ? formatCurrencyRupees(stateSummary.totalExpenditure) : '—'}
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">
            {stateSummary ? formatPercentage(stateSummary.utilizationPercentage) : '0%'} Fund Utilization
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Works Completed
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {stateSummary ? formatIndianNumber(stateSummary.totalWorksCompleted || stateSummary.completedWorksCount) : '—'}
          </div>
          <span className="text-xs text-slate-500 font-medium mt-0.5 block">
            {stateSummary?.recommendedWorksCount ? `${formatIndianNumber(stateSummary.recommendedWorksCount)} Recommended` : 'Verified on Ground'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Active Constituencies
          </span>
          <div className="text-2xl font-black text-navy-900 mt-1">
            {constituencies.length > 0 ? constituencies.length : '—'}
          </div>
          <span className="text-xs text-blue-700 font-semibold mt-0.5 block">
            Parliamentary Segments
          </span>
        </div>
      </div>

      {/* Constituencies Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-navy-900">Constituency Breakdown for {stateName}</h3>

        <div className="overflow-x-auto border border-slate-200 rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Constituency</th>
                <th className="py-2.5 px-3">Representing MP</th>
                <th className="py-2.5 px-3 text-right">Allocated</th>
                <th className="py-2.5 px-3 text-right">Spent</th>
                <th className="py-2.5 px-3 text-center">Utilization</th>
                <th className="py-2.5 px-3 text-center">Completed Works</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3 px-3">
                      <div className="h-3 bg-slate-200 rounded w-24"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="h-3 bg-slate-200 rounded w-32"></div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="h-3 bg-slate-200 rounded w-16 ml-auto"></div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="h-3 bg-slate-200 rounded w-16 ml-auto"></div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="h-4 bg-slate-200 rounded w-12 mx-auto"></div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="h-3 bg-slate-200 rounded w-12 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : constituencies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No constituency records found for {stateName}
                  </td>
                </tr>
              ) : (
                constituencies.map((c) => (
                  <tr key={c.id || c.name} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-800">{c.name}</td>
                    <td className="py-2.5 px-3 text-navy-900 font-medium">{c.mpName || '—'}</td>
                    <td className="py-2.5 px-3 text-right">{formatCurrencyRupees(c.totalAllocated)}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700 font-semibold">
                      {formatCurrencyRupees(c.totalExpenditure)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                          c.utilizationPercentage >= 70
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : c.utilizationPercentage >= 50
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {formatPercentage(c.utilizationPercentage)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">
                      {formatIndianNumber(c.totalWorksCompleted)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MPs Roster for this State */}
      {mps.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-navy-900">Members of Parliament from {stateName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mps.map((mp) => (
              <div
                key={mp.id}
                onClick={() => navigate(`/mplads/mps/${mp.id}`)}
                className="p-3 border border-slate-200 rounded-lg hover:border-navy-900 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-navy-900 truncate max-w-[170px]" title={mp.mpName}>
                      {mp.mpName}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                      {mp.house}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Constituency: <strong className="text-slate-700">{mp.constituency || 'State Representative'}</strong>
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Utilization:</span>
                    <span className="font-bold text-slate-900">{formatPercentage(mp.utilizationPercentage)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Completed:</span>
                    <span className="font-bold text-emerald-700">{formatIndianNumber(mp.completedWorksCount)} Works</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t text-right text-[11px] font-bold text-navy-900">
                  View MP Profile &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateDashboardPage;
