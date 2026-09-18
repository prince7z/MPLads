import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, CreditCard, Download, Search, RefreshCw, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { FundProgressChart } from '../components/dashboard/FundProgressChart';
import { apiService } from '../services/api';
import { OverviewData, ExpenditureDoc, PaginationMeta } from '../types/api';
import { formatCurrencyRupees, formatIndianNumber, formatPercentage, formatIndianDate } from '../utils/formatters';

export const FinancialsPage: React.FC = () => {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [expenditures, setExpenditures] = useState<ExpenditureDoc[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ currentPage: 1, totalPages: 1, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [expLoading, setExpLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch overview financial totals
  useEffect(() => {
    apiService
      .getOverview()
      .then((data) => setOverview(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Fetch live expenditures ledger
  const fetchExpenditures = async () => {
    setExpLoading(true);
    try {
      const res = await apiService.getExpenditures({
        page,
        limit: 10,
        search: debouncedSearch.trim() || undefined,
      });
      setExpenditures(res.items);
      setPagination(res.pagination);
    } catch {
      // ignore
    } finally {
      setExpLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, [page, debouncedSearch]);

  const handleExport = () => {
    const params: Record<string, string> = {};
    if (debouncedSearch) params.search = debouncedSearch;
    window.open(apiService.getExportUrl('expenditures', params), '_blank');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
            Financial Intelligence & Fund Utilization Ledger
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time tracking of allocations, sanctions, releases, and expenditure vouchers from MoSPI API
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 bg-navy-900 text-white font-bold text-xs px-3.5 py-2 rounded-md hover:bg-navy-800 transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Expenditures CSV</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Total Sanctioned Allocation
          </span>
          <div className="text-2xl font-black text-navy-900 mt-1">
            {overview ? formatCurrencyRupees(overview.totalAllocated) : 'Loading...'}
          </div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            National Central Pool ({overview ? formatIndianNumber(overview.totalMPs) : '782'} MPs Tracked)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Total Cumulative Expenditure
          </span>
          <div className="text-2xl font-black text-navy-900 mt-1">
            {overview ? formatCurrencyRupees(overview.totalExpenditure) : 'Loading...'}
          </div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">
            {overview ? formatPercentage(overview.utilizationPercentage) : '0%'} Official Utilization Rate
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            In-Progress Disbursements & Pipeline
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {overview ? formatCurrencyRupees(overview.inProgressPayments || overview.totalRecommendedAmount - overview.totalExpenditure) : 'Loading...'}
          </div>
          <div className="text-xs text-slate-600 font-semibold mt-1">
            {overview ? formatIndianNumber(overview.totalTransactions) : '—'} Total Recorded Transactions
          </div>
        </div>
      </div>

      {/* Main Historical Chart */}
      <div className="h-[320px]">
        <FundProgressChart />
      </div>

      {/* Real Expenditures Transaction Ledger */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-navy-900">
              Live Expenditure Ledger & Payment Vouchers
            </h3>
            <p className="text-[11px] text-slate-500">
              Transaction-level disbursements paid out to implementing vendors and agencies
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendor, work, or MP..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:border-navy-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Work / Purpose</th>
                <th className="py-2.5 px-3">Recommending MP</th>
                <th className="py-2.5 px-3">Vendor / Agency</th>
                <th className="py-2.5 px-3">Payment Date</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {expLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-2.5 px-3">
                      <div className="h-3 bg-slate-200 rounded w-48"></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="h-3 bg-slate-200 rounded w-28"></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="h-3 bg-slate-200 rounded w-24"></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="h-3 bg-slate-200 rounded w-20"></div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="h-4 bg-slate-200 rounded w-16 mx-auto"></div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="h-3 bg-slate-200 rounded w-16 ml-auto"></div>
                    </td>
                  </tr>
                ))
              ) : expenditures.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No expenditure records found
                  </td>
                </tr>
              ) : (
                expenditures.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 max-w-[280px] truncate" title={item.work}>
                      {item.work || 'Expenditure payment voucher'}
                    </td>
                    <td className="py-2.5 px-3 text-navy-900 font-bold max-w-[160px] truncate">
                      {item.mp_details?.name || '—'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-[160px] truncate" title={item.vendor}>
                      {item.vendor || 'Authorized Agency'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                      {formatIndianDate(item.expenditureDate)}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                          item.paymentStatus === 'Payment Success' || !item.paymentStatus
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {item.paymentStatus || 'Settled'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrencyRupees(item.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Ledger Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 text-xs font-medium text-slate-600">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || expLoading}
              className="flex items-center gap-1 px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span>
              Page {pagination.currentPage} of {pagination.totalPages} ({formatIndianNumber(pagination.totalCount)} records)
            </span>

            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages || expLoading}
              className="flex items-center gap-1 px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialsPage;
