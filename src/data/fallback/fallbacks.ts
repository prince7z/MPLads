/**
 * Fallback & Demo Intelligence Data
 * 
 * POLICY COMPLIANCE:
 * Any metric in this file is maintained strictly because it is not currently 
 * collected, modeled, or provided by the official MoSPI / Empowered Indian backend API.
 * All core fiscal, operational, MP, state, and work-level records are retrieved live 
 * from https://api.empoweredindian.in/api/.
 */

import { AIDetectionModel } from '../../types/risk';

// Fallback only: The official MoSPI MPLADS API does not execute a client-side SHAP / XGBoost engine;
// these descriptions demonstrate the AI Decision-Support Layer architecture proposed in SIH 2026.
export const DEMO_AI_DETECTION_MODELS: AIDetectionModel[] = [
  {
    id: 'model-1',
    title: 'Cost Anomaly Detection',
    status: 'Active',
    description: 'Statistical z-score and IQR analysis on work category unit costs across neighboring districts.',
    icon: 'BarChart3'
  },
  {
    id: 'model-2',
    title: 'Duplicate Work Detection',
    status: 'Active',
    description: 'Semantic vector similarity on work descriptions combined with geo-radius proximity checks.',
    icon: 'CopyCheck'
  },
  {
    id: 'model-3',
    title: 'Delay Forecast Engine',
    status: 'Active',
    description: 'Milestone tracking against sanction dates to flag projects trending behind schedule.',
    icon: 'Clock'
  },
  {
    id: 'model-4',
    title: 'Payment Schedule Monitor',
    status: 'Active',
    description: 'Audit tracking for front-loaded disbursement vouchers relative to physical completion.',
    icon: 'CreditCard'
  }
];

// Fallback only: Demo risk factor breakdown for project investigations when machine learning
// explainability weights are not present in the backend database.
export const DEMO_RISK_FACTOR_WEIGHTS = {
  costAnomaly: '+35% above district category benchmark',
  delayRisk: '+25% elapsed duration with <40% completion',
  documentationGap: '+15% pending inspection report',
  duplicateProbability: '+5% text overlap with adjacent works'
};
