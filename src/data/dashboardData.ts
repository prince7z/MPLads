import { KPICardData, MonthlyFinancialPoint, RiskCategory, EarlyWarningItem, StateRiskData, AIInsight } from '../types/dashboard';

export const DASHBOARD_KPIS: KPICardData[] = [
  {
    id: 'kpi-1',
    title: 'Total Allocated',
    value: '₹8,318 Cr',
    change: '+4.6% vs FY 2023-24',
    changeType: 'positive',
    icon: 'IndianRupee'
  },
  {
    id: 'kpi-2',
    title: 'Works Recommended',
    value: '105,642',
    change: '+6.8% vs FY 2023-24',
    changeType: 'positive',
    icon: 'FileText'
  },
  {
    id: 'kpi-3',
    title: 'Works Sanctioned',
    value: '78,550',
    change: '+5.3% vs FY 2023-24',
    changeType: 'positive',
    icon: 'ClipboardCheck'
  },
  {
    id: 'kpi-4',
    title: 'Works Completed',
    value: '34,067',
    change: '+7.2% vs FY 2023-24',
    changeType: 'positive',
    icon: 'CheckCircle'
  },
  {
    id: 'kpi-5',
    title: 'Total Expenditure',
    value: '₹2,748 Cr',
    change: '+8.1% vs FY 2023-24',
    changeType: 'positive',
    icon: 'Coins'
  },
  {
    id: 'kpi-6',
    title: 'AI Risk Index',
    value: '67 / 100',
    change: 'HIGH RISK',
    changeType: 'danger',
    icon: 'ShieldAlert',
    riskBadge: 'HIGH RISK',
    highlight: true
  }
];

export const MONTHLY_FINANCIAL_DATA: MonthlyFinancialPoint[] = [
  { month: 'Apr 2024', expenditure: 320, sanctioned: 38000, completed: 14000 },
  { month: 'May 2024', expenditure: 450, sanctioned: 44000, completed: 18000 },
  { month: 'Jun 2024', expenditure: 680, sanctioned: 51000, completed: 21000 },
  { month: 'Jul 2024', expenditure: 890, sanctioned: 58000, completed: 24000 },
  { month: 'Aug 2024', expenditure: 1120, sanctioned: 62000, completed: 26000 },
  { month: 'Sep 2024', expenditure: 1350, sanctioned: 68000, completed: 28000 },
  { month: 'Oct 2024', expenditure: 1580, sanctioned: 72000, completed: 30000 },
  { month: 'Nov 2024', expenditure: 1790, sanctioned: 74000, completed: 31000 },
  { month: 'Dec 2024', expenditure: 1950, sanctioned: 76000, completed: 32000 },
  { month: 'Jan 2025', expenditure: 2180, sanctioned: 77500, completed: 33000 },
  { month: 'Feb 2025', expenditure: 2450, sanctioned: 78100, completed: 33600 },
  { month: 'Mar 2025', expenditure: 2748, sanctioned: 78550, completed: 34067 },
];

export const RISK_DISTRIBUTION: RiskCategory[] = [
  { name: 'Critical', percentage: 8, count: 217, color: '#D92D20' },
  { name: 'High', percentage: 21, count: 561, color: '#F79009' },
  { name: 'Medium', percentage: 34, count: 913, color: '#EAAA08' },
  { name: 'Low', percentage: 37, count: 1012, color: '#12B76A' },
];

export const AI_EARLY_WARNINGS: EarlyWarningItem[] = [
  {
    id: 'ew-1',
    title: 'Projects likely to miss deadline',
    count: 43,
    icon: 'CalendarX',
    severity: 'critical'
  },
  {
    id: 'ew-2',
    title: 'Possible duplicate works',
    count: 17,
    icon: 'CopyCheck',
    severity: 'high'
  },
  {
    id: 'ew-3',
    title: 'Unusual cost estimates',
    count: 31,
    icon: 'IndianRupee',
    severity: 'medium'
  },
  {
    id: 'ew-4',
    title: 'Unusual payment patterns',
    count: 28,
    icon: 'CreditCard',
    severity: 'high'
  }
];

export const STATE_RISK_LIST: StateRiskData[] = [
  { id: 'BR', state: 'Bihar', riskIndex: 72, trend: 'upward', highRiskProjects: 142, delayedProjects: 89, sanctionedAmount: '₹ 840 Cr', status: 'Critical' },
  { id: 'UP', state: 'Uttar Pradesh', riskIndex: 68, trend: 'upward', highRiskProjects: 198, delayedProjects: 124, sanctionedAmount: '₹ 1,420 Cr', status: 'High' },
  { id: 'WB', state: 'West Bengal', riskIndex: 63, trend: 'upward', highRiskProjects: 94, delayedProjects: 61, sanctionedAmount: '₹ 610 Cr', status: 'High' },
  { id: 'JH', state: 'Jharkhand', riskIndex: 58, trend: 'upward', highRiskProjects: 56, delayedProjects: 38, sanctionedAmount: '₹ 410 Cr', status: 'High' },
  { id: 'MP', state: 'Madhya Pradesh', riskIndex: 54, trend: 'upward', highRiskProjects: 82, delayedProjects: 45, sanctionedAmount: '₹ 730 Cr', status: 'High' },
  { id: 'RJ', state: 'Rajasthan', riskIndex: 48, trend: 'stable', highRiskProjects: 65, delayedProjects: 39, sanctionedAmount: '₹ 680 Cr', status: 'Medium' },
  { id: 'OD', state: 'Odisha', riskIndex: 45, trend: 'downward', highRiskProjects: 49, delayedProjects: 27, sanctionedAmount: '₹ 520 Cr', status: 'Medium' },
  { id: 'MH', state: 'Maharashtra', riskIndex: 41, trend: 'stable', highRiskProjects: 78, delayedProjects: 34, sanctionedAmount: '₹ 1,150 Cr', status: 'Medium' },
  { id: 'KA', state: 'Karnataka', riskIndex: 35, trend: 'downward', highRiskProjects: 38, delayedProjects: 19, sanctionedAmount: '₹ 590 Cr', status: 'Medium' },
  { id: 'TN', state: 'Tamil Nadu', riskIndex: 28, trend: 'downward', highRiskProjects: 24, delayedProjects: 11, sanctionedAmount: '₹ 620 Cr', status: 'Low' },
  { id: 'GJ', state: 'Gujarat', riskIndex: 24, trend: 'downward', highRiskProjects: 18, delayedProjects: 8, sanctionedAmount: '₹ 710 Cr', status: 'Low' },
  { id: 'KL', state: 'Kerala', riskIndex: 22, trend: 'downward', highRiskProjects: 12, delayedProjects: 5, sanctionedAmount: '₹ 380 Cr', status: 'Low' },
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'Bihar: expenditure is high relative to completion rate.',
    supportingText: 'Completion rate is 31%, significantly below the national average of 47%.',
    icon: 'TrendingUp',
    badge: 'High Anomaly'
  },
  {
    id: 'insight-2',
    title: '17 projects have high similarity with existing nearby works.',
    supportingText: 'These projects require verification to avoid duplication of public funds.',
    icon: 'CopyCheck',
    badge: 'Duplicate Risk'
  },
  {
    id: 'insight-3',
    title: '43 projects show probability >80% of deadline delay.',
    supportingText: 'Timely intervention can prevent cost overruns and improve outcomes.',
    icon: 'AlertTriangle',
    badge: 'Delay Risk'
  }
];
