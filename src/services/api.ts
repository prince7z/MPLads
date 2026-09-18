import {
  OverviewData,
  StateSummaryDoc,
  MPSummaryDoc,
  ConstituencySummaryDoc,
  CompletedWorkDoc,
  RecommendedWorkDoc,
  WorkPaymentData,
  ExpenditureDoc,
  PaginatedResponse,
  AnalyticsTrendsData,
  SyncInfoData,
  FilterSummaryData,
} from '../types/api';

const API_BASE_URL = '/api';
const DIRECT_API_URL = 'https://api.empoweredindian.in/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      // If relative proxy returns 404/502, try direct URL
      if (res.status === 404 || res.status === 502) {
        return await fetchDirect<T>(endpoint, options);
      }

      let errMsg = `HTTP Error ${res.status}`;
      try {
        const errorJson = await res.json();
        errMsg = errorJson.message || errorJson.error || errMsg;
      } catch {
        // use fallback status
      }
      throw new ApiError(errMsg, res.status);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Try direct URL as fallback if proxy failed to connect
    try {
      return await fetchDirect<T>(endpoint, options);
    } catch {
      throw new ApiError(err?.message || 'Network connection failed', 0);
    }
  }
}

async function fetchDirect<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const directUrl = `${DIRECT_API_URL}${endpoint}`;
  const res = await fetch(directUrl, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let errMsg = `HTTP Error ${res.status}`;
    try {
      const errorJson = await res.json();
      errMsg = errorJson.message || errorJson.error || errMsg;
    } catch {}
    throw new ApiError(errMsg, res.status);
  }

  return await res.json();
}

export const apiService = {
  // Summary Overview
  async getOverview(params?: { house?: string; lsTerm?: string }): Promise<OverviewData> {
    const query = new URLSearchParams();
    if (params?.house && params.house !== 'Both Houses') query.append('house', params.house);
    if (params?.lsTerm) query.append('lsTerm', params.lsTerm);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{ success: boolean; data: OverviewData }>(`/summary/overview${qStr}`);
    return res.data;
  },

  // State Summaries
  async getStateSummaries(params?: {
    state?: string;
    house?: string;
    limit?: number;
    sortBy?: string;
    order?: string;
    lsTerm?: string;
  }): Promise<StateSummaryDoc[]> {
    const query = new URLSearchParams();
    if (params?.state) query.append('state', params.state);
    if (params?.house && params.house !== 'Both Houses') query.append('house', params.house);
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.sortBy) query.append('sortBy', params.sortBy);
    if (params?.order) query.append('order', params.order);
    if (params?.lsTerm) query.append('lsTerm', params.lsTerm);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{ success: boolean; data: StateSummaryDoc[] }>(`/summary/states${qStr}`);
    return res.data || [];
  },

  // MP Summaries
  async getMPSummaries(params?: {
    page?: number;
    limit?: number;
    search?: string;
    state?: string;
    house?: string;
    sortBy?: string;
    order?: string;
    lsTerm?: string;
  }): Promise<PaginatedResponse<MPSummaryDoc>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.state && params.state !== 'All') query.append('state', params.state);
    if (params?.house && params.house !== 'Both Houses') query.append('house', params.house);
    if (params?.sortBy) query.append('sortBy', params.sortBy);
    if (params?.order) query.append('order', params.order);
    if (params?.lsTerm) query.append('lsTerm', params.lsTerm);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{
      success: boolean;
      data: MPSummaryDoc[];
      pagination: { currentPage: number; totalPages: number; totalCount: number };
    }>(`/summary/mps${qStr}`);

    return {
      items: res.data || [],
      pagination: res.pagination || { currentPage: 1, totalPages: 1, totalCount: res.data?.length || 0 },
    };
  },

  // Constituency Summaries for a State
  async getConstituencySummaries(
    state: string,
    params?: { limit?: number; sortBy?: string; order?: string; lsTerm?: string }
  ): Promise<{ items: ConstituencySummaryDoc[]; summary: Record<string, any> }> {
    const query = new URLSearchParams();
    query.append('state', state);
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.sortBy) query.append('sortBy', params.sortBy);
    if (params?.order) query.append('order', params.order);
    if (params?.lsTerm) query.append('lsTerm', params.lsTerm);

    const res = await fetchJson<{
      success: boolean;
      data: ConstituencySummaryDoc[];
      summary: Record<string, any>;
    }>(`/summary/constituencies?${query.toString()}`);

    return {
      items: res.data || [],
      summary: res.summary || {},
    };
  },

  // Completed Works Directory
  async getCompletedWorks(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    state?: string;
    constituency?: string;
    category?: string;
    year?: string;
    min_cost?: number;
    max_cost?: number;
    house?: string;
    lsTerm?: string;
  }): Promise<PaginatedResponse<CompletedWorkDoc>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.sort) query.append('sort', params.sort);
    if (params?.search) query.append('search', params.search);
    if (params?.state && params.state !== 'All') query.append('state', params.state);
    if (params?.constituency) query.append('constituency', params.constituency);
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.year) query.append('year', params.year);
    if (params?.min_cost !== undefined) query.append('min_cost', params.min_cost.toString());
    if (params?.max_cost !== undefined) query.append('max_cost', params.max_cost.toString());
    if (params?.house && params.house !== 'Both Houses') query.append('house', params.house);
    if (params?.lsTerm) query.append('lsTerm', params.lsTerm);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{
      success: boolean;
      data: {
        completedWorks: CompletedWorkDoc[];
        pagination: { currentPage: number; totalPages: number; totalCount: number; hasNext?: boolean; hasPrev?: boolean };
        summary: Record<string, any>;
      };
    }>(`/works/completed${qStr}`);

    return {
      items: res.data?.completedWorks || [],
      pagination: res.data?.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 },
      summary: res.data?.summary,
    };
  },

  // Recommended Works
  async getRecommendedWorks(params?: {
    page?: number;
    limit?: number;
    search?: string;
    state?: string;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<RecommendedWorkDoc>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.state && params.state !== 'All') query.append('state', params.state);
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.status) query.append('status', params.status);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{
      success: boolean;
      data: {
        recommendedWorks: RecommendedWorkDoc[];
        pagination: { currentPage: number; totalPages: number; totalCount: number; hasNext?: boolean; hasPrev?: boolean };
        summary: Record<string, any>;
      };
    }>(`/works/recommended${qStr}`);

    return {
      items: res.data?.recommendedWorks || [],
      pagination: res.data?.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 },
      summary: res.data?.summary,
    };
  },

  // Work Details (Completed Work)
  async getCompletedWorkDetails(id: string): Promise<CompletedWorkDoc> {
    const res = await fetchJson<{ success: boolean; data: CompletedWorkDoc }>(`/works/completed/${id}`);
    return res.data;
  },

  // Work Details (Recommended Work)
  async getRecommendedWorkDetails(id: string): Promise<RecommendedWorkDoc> {
    const res = await fetchJson<{ success: boolean; data: RecommendedWorkDoc }>(`/works/recommended/${id}`);
    return res.data;
  },

  // Work Payments Timeline & Records
  async getWorkPayments(workId: number | string): Promise<WorkPaymentData> {
    const res = await fetchJson<{ success: boolean; data: WorkPaymentData }>(`/works/${workId}/payments`);
    return res.data;
  },

  // Expenditures Transaction Ledger
  async getExpenditures(params?: {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    state?: string;
    category?: string;
    year?: string;
    min_amount?: number;
    max_amount?: number;
  }): Promise<PaginatedResponse<ExpenditureDoc>> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.sort) query.append('sort', params.sort);
    if (params?.search) query.append('search', params.search);
    if (params?.state && params.state !== 'All') query.append('state', params.state);
    if (params?.category) query.append('category', params.category);
    if (params?.year) query.append('year', params.year);
    if (params?.min_amount !== undefined) query.append('min_amount', params.min_amount.toString());
    if (params?.max_amount !== undefined) query.append('max_amount', params.max_amount.toString());

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{
      success: boolean;
      data: {
        expenditures: ExpenditureDoc[];
        pagination: { currentPage: number; totalPages: number; totalCount: number };
        summary?: Record<string, any>;
      };
    }>(`/expenditures${qStr}`);

    return {
      items: res.data?.expenditures || [],
      pagination: res.data?.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 },
      summary: res.data?.summary,
    };
  },

  // Analytics Trends (Yearly / Monthly)
  async getAnalyticsTrends(params?: {
    start_year?: number;
    end_year?: number;
    state?: string;
    house?: string;
    granularity?: string;
  }): Promise<AnalyticsTrendsData> {
    const query = new URLSearchParams();
    if (params?.start_year) query.append('start_year', params.start_year.toString());
    if (params?.end_year) query.append('end_year', params.end_year.toString());
    if (params?.state) query.append('state', params.state);
    if (params?.house && params.house !== 'Both Houses') query.append('house', params.house);
    if (params?.granularity) query.append('granularity', params.granularity);

    const qStr = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchJson<{ success: boolean; data: AnalyticsTrendsData }>(`/analytics/trends${qStr}`);
    return res.data;
  },

  // MP Details (Full MP profile)
  async getMPDetails(id: string): Promise<{
    mp: MPSummaryDoc;
    expenditure: { summary: any; yearlyTrend: any[]; categoryBreakdown?: any[] };
    works: { completedCount: number; recommendedCount: number; recentWorks?: any[] };
  }> {
    const res = await fetchJson<{ success: boolean; data: any }>(`/mplads/mps/${id}`);
    return res.data;
  },

  // Filter Summary (Global Distinct Values)
  async getFilterSummary(): Promise<FilterSummaryData> {
    const res = await fetchJson<{
      success: boolean;
      filters: FilterSummaryData;
    }>('/filters/summary');
    return res.filters || { states: [], houses: [], constituencies: [] };
  },

  // Data Sync Info (Freshness)
  async getSyncInfo(): Promise<SyncInfoData> {
    const res = await fetchJson<{ success: boolean; data: SyncInfoData }>('/metadata/sync-info');
    return res.data;
  },

  // CSV Export URL builder
  getExportUrl(
    type: 'completed-works' | 'recommended-works' | 'expenditures' | 'mp-summary',
    params?: Record<string, string>
  ): string {
    const query = new URLSearchParams(params);
    const qStr = query.toString() ? `?${query.toString()}` : '';
    return `${API_BASE_URL}/export/${type}${qStr}`;
  },
};
