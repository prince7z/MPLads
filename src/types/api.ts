export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  count?: number;
  lastUpdated?: string;
}

export interface OverviewData {
  totalAllocated: number;
  totalExpenditure: number;
  totalRecommendedAmount: number;
  utilizationPercentage: number;
  recommendationUtilizationPercentage: number | null;
  utilizationDefinition: string;
  expenditurePercentage: number;
  totalMPs: number;
  totalWorksCompleted: number;
  totalWorksRecommended: number;
  completionRate: number;
  totalTransactions: number;
  avgAllocation: number;
  pendingWorks: number;
  paymentGap: number;
  completedWorksValue: number;
  inProgressPayments: number;
}

export interface StateSummaryDoc {
  state: string;
  house?: string;
  totalAllocated: number;
  totalExpenditure: number;
  totalRecommendedAmount: number;
  utilizationPercentage: number;
  expenditurePercentage: number;
  utilizationDefinition?: string;
  mpCount: number;
  totalMPs: number;
  totalWorksCompleted: number;
  completedWorksCount?: number;
  recommendedWorksCount?: number;
}

export interface MPSummaryDoc {
  id: string;
  mpName: string;
  house: string;
  state: string;
  constituency?: string;
  allocatedAmount: number;
  totalExpenditure: number;
  totalRecommendedAmount: number;
  utilizationPercentage: number;
  recommendationUtilizationPercentage: number | null;
  expenditurePercentage: number;
  completedWorksCount: number;
  recommendedWorksCount: number;
  completionRate: number;
  pendingWorks: number;
  unspentAmount: number;
  unpaidBalance: number | null;
  completedWorksValue: number;
  totalCompletedAmount?: number;
  inProgressPayments: number;
  paymentGapPercentage: number;
}

export interface ConstituencySummaryDoc {
  id: string;
  name: string;
  mpName?: string;
  house?: string;
  totalMPs: number;
  totalAllocated: number;
  totalExpenditure: number;
  totalRecommendedAmount: number;
  utilizationPercentage: number;
  expenditurePercentage: number;
  totalWorksCompleted: number;
  totalWorksRecommended: number;
}

export interface CompletedWorkDoc {
  _id: string;
  work_id: number | string;
  work_description: string;
  work_description_hi?: string;
  category: string;
  cost: number;
  completion_date?: string;
  completion_year?: number;
  location?: string;
  district?: string;
  state: string;
  beneficiaries?: number;
  implementing_agency?: string | null;
  photos?: {
    before?: string[];
    after?: string[];
  };
  gps_coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  status_timeline?: string;
  quality_rating?: number;
  mp_details?: {
    _id?: string;
    name?: string;
    constituency?: string;
    party?: string;
    house?: string;
  };
}

export interface RecommendedWorkDoc {
  _id: string;
  workId: number | string;
  work_description: string;
  category: string;
  estimated_cost: number;
  recommended_date?: string;
  location?: string;
  district?: string;
  state: string;
  priority?: string;
  status?: string;
  mp_details?: {
    name?: string;
    constituency?: string;
    party?: string;
    house?: string;
  };
}

export interface WorkPaymentSummary {
  totalInstallments: number;
  totalAmountPaid: number;
  successfulPayments: number;
  pendingPayments: number;
  firstPaymentDate?: string;
  lastPaymentDate?: string;
}

export interface PaymentItem {
  amount: number;
  date?: string;
  status: string;
  vendor?: string;
  ida?: string;
}

export interface WorkPaymentData {
  workId: number | string;
  workDetails?: {
    description?: string;
    mpName?: string;
    constituency?: string;
    ida?: string;
  };
  summary: WorkPaymentSummary;
  paymentTimeline: Array<{
    date: string;
    payments: Array<{ amount: number; vendor?: string; status: string; ida?: string }>;
    totalAmount: number;
    count: number;
  }>;
  allPayments: PaymentItem[];
}

export interface ExpenditureDoc {
  _id: string;
  work?: string;
  workId?: number;
  vendor?: string;
  ida?: string;
  expenditureDate?: string;
  paymentStatus?: string;
  amount: number;
  mp_details?: {
    name?: string;
    constituency?: string;
    house?: string;
    state?: string;
  };
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
  summary?: Record<string, any>;
  lastUpdated?: string;
}

export interface YearlyTrendPoint {
  year: number;
  totalExpenditure: number;
  uniqueMPCount?: number;
  transactionCount?: number;
  avgExpenditurePerMP?: number;
  state?: string | null;
  house?: string | null;
}

export interface WorksTrendPoint {
  year: number;
  totalWorksCompleted: number;
  totalCost: number;
  avgCostPerWork: number;
  totalBeneficiaries: number;
}

export interface AnalyticsTrendsData {
  utilization: {
    yearly: YearlyTrendPoint[];
    monthly?: Array<{ month: number; year: number; totalExpenditure: number; transactionCount: number }>;
  };
  works: WorksTrendPoint[];
  period: {
    start_year: number;
    end_year: number;
    granularity: string;
  };
  lastUpdated?: string;
}

export interface SyncInfoData {
  source: string;
  lastUpdated: string;
  nextUpdate: string;
  totalRecords: number;
  dataQuality: number;
  updateFrequency: string;
  syncStats: {
    lokSabhaRecords: number;
    rajyaSabhaRecords: number;
    allocations: number;
    expenditures: number;
    worksCompleted: number;
    worksRecommended: number;
    mps: number;
    syncDurationSeconds: number;
  };
}

export interface FilterSummaryData {
  states: string[];
  houses: string[];
  constituencies: string[];
}
