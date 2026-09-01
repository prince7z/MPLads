export interface KPICardData {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'danger';
  icon: string;
  riskBadge?: string;
  highlight?: boolean;
}

export interface MonthlyFinancialPoint {
  month: string;
  expenditure: number; // ₹ Cr
  sanctioned: number;  // count
  completed: number;   // count
}

export interface RiskCategory {
  name: 'Critical' | 'High' | 'Medium' | 'Low';
  percentage: number;
  count: number;
  color: string;
}

export interface EarlyWarningItem {
  id: string;
  title: string;
  count: number;
  icon: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface StateRiskData {
  id: string;
  state: string;
  riskIndex: number;
  trend: 'upward' | 'downward' | 'stable';
  highRiskProjects: number;
  delayedProjects: number;
  sanctionedAmount: string;
  status: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface AIInsight {
  id: string;
  title: string;
  supportingText: string;
  icon: string;
  badge?: string;
}
