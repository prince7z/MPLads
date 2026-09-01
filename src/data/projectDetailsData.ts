import { ProjectDetail } from '../types/project';

export const PROJECT_DETAILS_MPL9281: ProjectDetail = {
  id: 'MPL-9281',
  title: 'Rural Road Construction – Rampur',
  workType: 'Road',
  status: 'ONGOING',
  location: 'Aurangabad, Bihar',
  state: 'Bihar',
  district: 'Aurangabad',
  budget: '₹ 42,000,000',
  expenditure: '₹ 27,000,000',
  expenditurePercent: '64.3%',
  physicalProgress: 58,
  expectedProgress: 76,
  riskScore: 89,
  riskCategory: 'HIGH',
  aiConfidence: 94,
  heroImage: '/images/rural_road_construction.png',
  timeline: [
    { stage: 'Recommended', date: '05 Apr 2024', status: 'completed' },
    { stage: 'Sanctioned', date: '20 May 2024', status: 'completed' },
    { stage: 'Work Started', date: '15 Jun 2024', status: 'completed' },
    { stage: '50% Progress', date: '10 Nov 2024', status: 'completed' },
    { stage: 'Expected Completion', date: '15 Dec 2026', status: 'in_progress' },
    { stage: 'Actual / Predicted Completion', date: 'Mar 2027 (Predicted)', status: 'delayed', isActualOrPredicted: true }
  ],
  financial: {
    estimatedCost: 42000000,
    similarProjectsMedian: 26000000,
    costDeviationPercentage: 61
  },
  duplicate: {
    matchedProjectId: 'MPL-8842',
    similarityScore: 93,
    currentProject: {
      name: 'Rural Road Construction',
      location: 'Rampur, Aurangabad, Bihar',
      amount: '₹ 42,000,000',
      length: '2.10 km',
      sanctionDate: '20 May 2024',
      image: '/images/rural_road_construction.png'
    },
    similarProject: {
      name: 'Rural Road Improvement',
      location: 'Rampur, Aurangabad, Bihar',
      amount: '₹ 39,000,000',
      length: '2.05 km',
      sanctionDate: '18 Jun 2024',
      image: '/images/rural_road_improvement.png'
    },
    similarityFactors: {
      location: 96,
      description: 89,
      workCategory: 94,
      beneficiaryArea: 91
    }
  },
  compliance: {
    score: 78,
    statusText: 'Partially Compliant',
    items: [
      { id: 'c-1', label: 'Administrative Approval', status: 'Available' },
      { id: 'c-2', label: 'Technical Sanction', status: 'Available' },
      { id: 'c-3', label: 'Funds Released', status: 'Available' },
      { id: 'c-4', label: 'Utilization Certificate', status: 'Pending' },
      { id: 'c-5', label: 'Physical Progress Report', status: 'Available' },
      { id: 'c-6', label: 'Completion Certificate', status: 'Not Available' },
      { id: 'c-7', label: 'Geo-tagged Photos', status: 'Pending' }
    ]
  }
};
