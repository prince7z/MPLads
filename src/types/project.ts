export interface TimelineMilestone {
  stage: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending' | 'delayed';
  isActualOrPredicted?: boolean;
}

export interface FinancialBenchmark {
  estimatedCost: number;
  similarProjectsMedian: number;
  costDeviationPercentage: number;
}

export interface DuplicateMatch {
  matchedProjectId: string;
  similarityScore: number;
  currentProject: {
    name: string;
    location: string;
    amount: string;
    length?: string;
    sanctionDate: string;
    image: string;
  };
  similarProject: {
    name: string;
    location: string;
    amount: string;
    length?: string;
    sanctionDate: string;
    image: string;
  };
  similarityFactors: {
    location: number;
    description: number;
    workCategory: number;
    beneficiaryArea: number;
  };
}

export interface ComplianceItem {
  id: string;
  label: string;
  status: 'Available' | 'Pending' | 'Not Available';
}

export interface ProjectDetail {
  id: string;
  title: string;
  workType: string;
  status: 'ONGOING' | 'COMPLETED' | 'SANCTIONED' | 'HALTED';
  location: string;
  state: string;
  district: string;
  budget: string;
  expenditure: string;
  expenditurePercent: string;
  physicalProgress: number;
  expectedProgress: number;
  riskScore: number;
  riskCategory: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  aiConfidence: number;
  heroImage: string;
  timeline: TimelineMilestone[];
  financial: FinancialBenchmark;
  duplicate: DuplicateMatch;
  compliance: {
    score: number;
    statusText: string;
    items: ComplianceItem[];
  };
}
