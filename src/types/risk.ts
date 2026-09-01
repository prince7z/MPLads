export interface PriorityInvestigationItem {
  id: string; // e.g. MPL-23981
  riskScore: number; // e.g. 94
  riskCategory: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  projectName: string;
  state: string;
  district: string;
  amount: number;
  amountFormatted: string; // e.g. ₹ 48,000,000
  progress: number; // percentage
  issueDetected: 'Cost Anomaly' | 'Delay Risk' | 'Possible Duplicate' | 'Payment Anomaly';
  aiConfidence: number; // percentage
  workType: string;
  riskFactors: {
    factor: string;
    impact: string; // +32%
    percentage: number;
  }[];
  aiExplanation: string;
  recommendedAction: string;
}

export interface AIDetectionModel {
  id: string;
  title: string;
  status: 'Active' | 'Training' | 'Idle';
  description: string;
  icon: string;
}
