import { PriorityInvestigationItem, AIDetectionModel } from '../types/risk';

export const RISK_KPIS = [
  {
    id: 'rkpi-1',
    title: 'High Risk Projects',
    value: '2,183',
    change: '↑ 18% vs Last Month',
    icon: 'AlertCircle',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'rkpi-2',
    title: 'Critical Alerts',
    value: '217',
    change: '↑ 12% vs Last Month',
    icon: 'AlertTriangle',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'rkpi-3',
    title: 'Cost Anomalies',
    value: '31',
    change: '↑ 15% vs Last Month',
    icon: 'PieChart',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'rkpi-4',
    title: 'Possible Duplicates',
    value: '17',
    change: '↑ 6% vs Last Month',
    icon: 'CopyCheck',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'rkpi-5',
    title: 'Predicted Delays',
    value: '43',
    change: '↑ 22% vs Last Month',
    icon: 'Clock',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  }
];

export const AI_DETECTION_MODELS: AIDetectionModel[] = [
  {
    id: 'model-1',
    title: 'Cost Anomaly Detection',
    status: 'Active',
    description: 'Analyzing cost patterns and deviations across similar works.',
    icon: 'BarChart3'
  },
  {
    id: 'model-2',
    title: 'Duplicate Work Detection',
    status: 'Active',
    description: 'Identifying similar or duplicate works using NLP & location similarity.',
    icon: 'CopyCheck'
  },
  {
    id: 'model-3',
    title: 'Delay Prediction',
    status: 'Active',
    description: 'Predicting likely delays based on progress and historical patterns.',
    icon: 'Clock'
  },
  {
    id: 'model-4',
    title: 'Payment Anomaly Detection',
    status: 'Active',
    description: 'Detecting unusual payment patterns and irregularities.',
    icon: 'CreditCard'
  }
];

export const PRIORITY_QUEUE: PriorityInvestigationItem[] = [
  {
    id: 'MPL-23981',
    riskScore: 94,
    riskCategory: 'CRITICAL',
    projectName: 'Rural Road Construction',
    state: 'Bihar',
    district: 'Aurangabad',
    amount: 48000000,
    amountFormatted: '₹ 48,000,000',
    progress: 31,
    issueDetected: 'Cost Anomaly',
    aiConfidence: 96,
    workType: 'Road',
    riskFactors: [
      { factor: 'Cost Deviation', impact: '+32%', percentage: 32 },
      { factor: 'Progress Deviation', impact: '+27%', percentage: 27 },
      { factor: 'Payment Anomaly', impact: '+18%', percentage: 18 },
      { factor: 'Location Similarity', impact: '+12%', percentage: 12 },
      { factor: 'Historical Pattern', impact: '+5%', percentage: 5 }
    ],
    aiExplanation: 'This project is estimated at ₹48 lakh, approximately 61% above the median cost of similar projects in the same region and work category. Physical progress is significantly below the expected trajectory. Payment pattern shows an unusual front-loading.',
    recommendedAction: 'Verify project estimate, payment records and physical progress.'
  },
  {
    id: 'MPL-22145',
    riskScore: 91,
    riskCategory: 'CRITICAL',
    projectName: 'Community Hall',
    state: 'Uttar Pradesh',
    district: 'Gorakhpur',
    amount: 72000000,
    amountFormatted: '₹ 72,000,000',
    progress: 28,
    issueDetected: 'Delay Risk',
    aiConfidence: 91,
    workType: 'Building',
    riskFactors: [
      { factor: 'Progress Delay', impact: '+41%', percentage: 41 },
      { factor: 'Contractor Latency', impact: '+25%', percentage: 25 },
      { factor: 'Fund Utilization Rate', impact: '+15%', percentage: 15 },
      { factor: 'Geo Tag Verification', impact: '+10%', percentage: 10 }
    ],
    aiExplanation: 'Physical completion is at 28% after 14 months of sanction. Machine learning model predicts a 9-month delay beyond target completion date. UC submission pending for Phase 2 funds.',
    recommendedAction: 'Issue notice to executing agency and request updated physical verification.'
  },
  {
    id: 'MPL-18762',
    riskScore: 89,
    riskCategory: 'HIGH',
    projectName: 'School Renovation',
    state: 'Maharashtra',
    district: 'Nashik',
    amount: 31000000,
    amountFormatted: '₹ 31,000,000',
    progress: 64,
    issueDetected: 'Possible Duplicate',
    aiConfidence: 94,
    workType: 'Education',
    riskFactors: [
      { factor: 'Spatial Proximity', impact: '+45%', percentage: 45 },
      { factor: 'Description Overlap', impact: '+30%', percentage: 30 },
      { factor: 'Beneficiary Area', impact: '+14%', percentage: 14 }
    ],
    aiExplanation: 'High similarity (92%) detected with a Zilla Parishad funded school upgrade project within 800m radius. Work descriptions and scope of work share 89% textual overlap.',
    recommendedAction: 'Conduct field verification to ensure non-duplication of scope with local body scheme.'
  },
  {
    id: 'MPL-20433',
    riskScore: 87,
    riskCategory: 'HIGH',
    projectName: 'Drainage Project',
    state: 'West Bengal',
    district: 'Murshidabad',
    amount: 18000000,
    amountFormatted: '₹ 18,000,000',
    progress: 42,
    issueDetected: 'Payment Anomaly',
    aiConfidence: 88,
    workType: 'Sanitation',
    riskFactors: [
      { factor: 'Disbursement Velocity', impact: '+38%', percentage: 38 },
      { factor: 'Milestone Discrepancy', impact: '+29%', percentage: 29 },
      { factor: 'Vendor Clustering', impact: '+20%', percentage: 20 }
    ],
    aiExplanation: '78% of funds released despite physical progress being verified at only 42%. Discrepancy detected between vendor billing dates and site geo-photo timestamps.',
    recommendedAction: 'Freeze further financial releases until physical audit report is submitted.'
  },
  {
    id: 'MPL-19876',
    riskScore: 82,
    riskCategory: 'HIGH',
    projectName: 'Water Supply Scheme',
    state: 'Rajasthan',
    district: 'Bhilwara',
    amount: 26500000,
    amountFormatted: '₹ 26,500,000',
    progress: 56,
    issueDetected: 'Delay Risk',
    aiConfidence: 82,
    workType: 'Water',
    riskFactors: [
      { factor: 'Material Supply Lag', impact: '+34%', percentage: 34 },
      { factor: 'Execution Rate', impact: '+26%', percentage: 26 },
      { factor: 'NOC Delay', impact: '+22%', percentage: 22 }
    ],
    aiExplanation: 'Project timeline has slipped by 4 months due to pending clearance from state forest department. Physical progress has halted for the last 60 days.',
    recommendedAction: 'Escalate to District Collector for expedited inter-departmental clearance.'
  },
  {
    id: 'MPL-9281',
    riskScore: 89,
    riskCategory: 'HIGH',
    projectName: 'Rural Road Construction - Rampur',
    state: 'Bihar',
    district: 'Aurangabad',
    amount: 42000000,
    amountFormatted: '₹ 42,000,000',
    progress: 58,
    issueDetected: 'Cost Anomaly',
    aiConfidence: 94,
    workType: 'Road',
    riskFactors: [
      { factor: 'Cost Deviation', impact: '+61%', percentage: 61 },
      { factor: 'Progress Lag', impact: '+18%', percentage: 18 },
      { factor: 'Nearby Duplicate Similarity', impact: '+93%', percentage: 93 }
    ],
    aiExplanation: 'Cost is 61% above comparable projects in the region. Predicted completion is 3 months later than expected. A highly similar project exists within 1.4 km radius.',
    recommendedAction: 'Verify cost estimate, physical progress, payment records, and duplicate-work possibility.'
  },
  {
    id: 'MPL-31044',
    riskScore: 78,
    riskCategory: 'MEDIUM',
    projectName: 'Primary Health Centre Upgrade',
    state: 'Jharkhand',
    district: 'Ranchi',
    amount: 15000000,
    amountFormatted: '₹ 15,000,000',
    progress: 70,
    issueDetected: 'Delay Risk',
    aiConfidence: 80,
    workType: 'Health',
    riskFactors: [
      { factor: 'Milestone Lag', impact: '+20%', percentage: 20 },
      { factor: 'UC Delay', impact: '+15%', percentage: 15 }
    ],
    aiExplanation: 'Project progress is steady but final equipment installation phase is delayed by 2 months.',
    recommendedAction: 'Follow up with medical equipment supplier.'
  },
  {
    id: 'MPL-14209',
    riskScore: 75,
    riskCategory: 'MEDIUM',
    projectName: 'Solar Street Lighting Installation',
    state: 'Kerala',
    district: 'Wayanad',
    amount: 8500000,
    amountFormatted: '₹ 8,500,000',
    progress: 88,
    issueDetected: 'Payment Anomaly',
    aiConfidence: 85,
    workType: 'Energy',
    riskFactors: [
      { factor: 'Invoice Discrepancy', impact: '+22%', percentage: 22 }
    ],
    aiExplanation: 'Minor discrepancy in unit installation costs compared to district benchmark rate.',
    recommendedAction: 'Review line item invoice for battery storage specifications.'
  }
];
