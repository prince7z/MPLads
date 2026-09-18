import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, RefreshCw, AlertCircle, IndianRupee, CheckCircle2, FileText, User } from 'lucide-react';
import { apiService } from '../services/api';
import { formatCurrencyRupees, formatIndianNumber, formatPercentage, formatIndianDate } from '../utils/formatters';

export const MPDashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [mpData, setMpData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMP = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getMPDetails(id);
      setMpData(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch MP details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMP();
  }, [id]);

  const mp = mpData?.mp;
  const expenditure = mpData?.expenditure;
  const works = mpData?.works;

  return (
    <div className="space-y-6 pb-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/dashboard" className="hover:text-navy-900 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">{mp?.name || 'Member of Parliament'}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-navy-900 text-amber-400 rounded-full flex items-center justify-center font-black text-lg shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-navy-900 tracking-tight">
                {mp?.name || 'MP Performance Profile'}
              </h1>
              <span className="text-[10px] font-bold bg-navy-900 text-white px-2 py-0.5 rounded">
                {mp?.house || 'Parliament'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Constituency: <strong className="text-slate-800">{mp?.constituency || 'General'}</strong> | State:{' '}
              <strong className="text-slate-800">{mp?.state || '—'}</strong>
            </p>
          </div>
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

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400 animate-pulse bg-white border border-slate-200 rounded-xl">
          Loading MP scorecard and official transactions...
        </div>
      ) : !mp ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-xl">
          MP record not found
        </div>
      ) : (
        <>
          {/* MP KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Allocated Fund
              </span>
              <div className="text-2xl font-black text-navy-900 mt-1">
                {formatCurrencyRupees(mp.allocatedAmount)}
              </div>
              <span className="text-xs text-slate-600 font-medium mt-0.5 block">
                Official Term Entitlement
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total Expenditure
              </span>
              <div className="text-2xl font-black text-navy-900 mt-1">
                {formatCurrencyRupees(mp.totalExpenditure)}
              </div>
              <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">
                {formatPercentage(mp.utilizationPercentage)} Utilization Rate
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Works Completed
              </span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {formatIndianNumber(mp.completedWorksCount)}
              </div>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                {formatPercentage(mp.completionRate)} Physical Completion Rate
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Unspent Balance
              </span>
              <div className="text-2xl font-black text-slate-800 mt-1">
                {formatCurrencyRupees(mp.unspentAmount || mp.allocatedAmount - mp.totalExpenditure)}
              </div>
              <span className="text-xs text-amber-700 font-semibold mt-0.5 block">
                {formatIndianNumber(mp.pendingWorks)} Pending Works
              </span>
            </div>
          </div>

          {/* Recent Works List */}
          {works?.recentWorks && works.recentWorks.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-navy-900">Recent Completed Works under this MP</h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {works.recentWorks.map((w: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-800">{w.workDescription}</h4>
                      <div className="flex items-center gap-3 text-slate-500 text-[11px] mt-0.5">
                        <span className="bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-600">
                          {w.workCategory || 'Civil Work'}
                        </span>
                        {w.completedDate && (
                          <span>Completed: {formatIndianDate(w.completedDate)}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className="font-extrabold text-navy-900">{formatCurrencyRupees(w.finalAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MPDashboardPage;
