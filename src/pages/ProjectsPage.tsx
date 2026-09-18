import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Download, RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiService } from '../services/api';
import { CompletedWorkDoc, PaginationMeta } from '../types/api';
import { formatCurrencyRupees, formatIndianNumber, formatIndianDate } from '../utils/formatters';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const [works, setWorks] = useState<CompletedWorkDoc[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({ currentPage: 1, totalPages: 1, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statesList, setStatesList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Load states for filter dropdown
  useEffect(() => {
    apiService.getFilterSummary().then((filters) => {
      if (filters.states) setStatesList(filters.states);
    }).catch(() => {});
  }, []);

  // Fetch works from API
  const fetchWorks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getCompletedWorks({
        page,
        limit: 12,
        search: debouncedQuery.trim() || undefined,
        state: selectedState !== 'All' ? selectedState : undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
      });
      setWorks(res.items);
      setPagination(res.pagination);
    } catch (err: any) {
      setError(err?.message || 'Failed to load projects from official API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, [page, debouncedQuery, selectedState, selectedCategory]);

  const handleExport = () => {
    const params: Record<string, string> = {};
    if (selectedState !== 'All') params.state = selectedState;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (debouncedQuery) params.search = debouncedQuery;

    window.open(apiService.getExportUrl('completed-works', params), '_blank');
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
            All Projects & Works Directory (Track Area)
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time catalog of sanctioned & completed MPLADS works from official MoSPI database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 bg-navy-900 text-white font-bold text-xs px-3.5 py-2 rounded-md hover:bg-navy-800 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchWorks}
            title="Refresh"
            className="p-2 border border-slate-200 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter & Search Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by work description, IDA, or keyword..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:border-navy-900 focus:outline-none"
          />
        </div>

        {/* State Filter */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">State:</span>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 rounded px-2.5 py-1.5 bg-white font-medium focus:border-navy-900 focus:outline-none max-w-[170px] truncate"
          >
            <option value="All">All States</option>
            {statesList.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-500">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="border border-slate-300 rounded px-2.5 py-1.5 bg-white font-medium focus:border-navy-900 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Roads, Pathways and Bridges">Roads & Pathways</option>
            <option value="Drinking Water Facility">Drinking Water</option>
            <option value="Education">Education</option>
            <option value="Health and Family Welfare">Health</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity Facility">Electricity</option>
            <option value="Community Hall">Community Hall</option>
            <option value="Other Public Facilities">Other Facilities</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-red-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchWorks} className="font-bold underline ml-4 hover:text-red-950">
            Retry
          </button>
        </div>
      )}

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing{' '}
          <strong className="text-slate-800">
            {formatIndianNumber(pagination.totalCount)}
          </strong>{' '}
          works recorded in official database
        </span>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages || 1}
        </span>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg p-4 animate-pulse h-52 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                  <div className="h-3 bg-slate-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
              <div className="h-6 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : works.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500">
          <div className="w-10 h-10 mx-auto mb-2 text-slate-400 bg-slate-50 rounded-full flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No works found</h3>
          <p className="text-xs text-slate-500 mt-1">
            No official records match the selected filters. Try resetting search query or state.
          </p>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-navy-900 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-navy-900">
                    #{project.work_id || project._id.slice(-6)}
                  </span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[130px]">
                    {project.category || 'General'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1 line-clamp-2" title={project.work_description}>
                  {project.work_description || 'Work description pending'}
                </h3>
                <p className="text-xs text-slate-500">
                  {project.district ? `${project.district}, ` : ''}{project.state}
                </p>

                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Sanctioned Cost:</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrencyRupees(project.cost)}
                    </span>
                  </div>
                  {project.mp_details?.name && (
                    <div className="flex justify-between text-slate-600">
                      <span>Recommending MP:</span>
                      <span className="font-bold text-navy-900 truncate max-w-[140px]" title={project.mp_details.name}>
                        {project.mp_details.name}
                      </span>
                    </div>
                  )}
                  {project.completion_date && (
                    <div className="flex justify-between text-slate-600">
                      <span>Completed Date:</span>
                      <span className="text-slate-700">
                        {formatIndianDate(project.completion_date)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-900">
                <span>View Full Inspection & Payments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-medium">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-slate-600">
            Page <strong className="text-slate-800">{pagination.currentPage}</strong> of{' '}
            {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages || loading}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
