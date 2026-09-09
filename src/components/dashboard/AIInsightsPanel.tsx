import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CopyCheck, AlertTriangle, ArrowRight, Sparkles, ChevronDown, ChevronUp, Filter, CheckCircle2 } from 'lucide-react';
import { AI_INSIGHTS } from '../../data/dashboardData';

export const AIInsightsPanel: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [expandedInsightId, setExpandedInsightId] = useState<string | null>(null);
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false);

  const getInsightIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'CopyCheck': return CopyCheck;
      case 'AlertTriangle': return AlertTriangle;
      default: return TrendingUp;
    }
  };

  const extraDetails: Record<string, { confidence: string; recommendation: string; district: string }> = {
    'insight-1': {
      confidence: '96.4%',
      recommendation: 'Conduct priority field physical verification for Aurangabad and Patna constituency projects.',
      district: 'Bihar (142 Projects)'
    },
    'insight-2': {
      confidence: '93.1%',
      recommendation: 'Cross-reference spatial coordinates with State PWD asset registry before releasing 2nd installment.',
      district: 'Multi-State (17 Works)'
    },
    'insight-3': {
      confidence: '91.8%',
      recommendation: 'Issue automated escalation notices to executing agencies with delay offsets > 90 days.',
      district: 'National Scope (43 Works)'
    }
  };

  const filteredInsights = AI_INSIGHTS.filter((insight) => {
    if (selectedTopic === 'all') return true;
    if (selectedTopic === 'anomaly') return insight.badge?.toLowerCase().includes('anomaly');
    if (selectedTopic === 'duplicate') return insight.badge?.toLowerCase().includes('duplicate');
    if (selectedTopic === 'delay') return insight.badge?.toLowerCase().includes('delay');
    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs transition-all">
      {/* Top Header with Dropdowns */}
      <div className={`flex items-center justify-between ${isSectionOpen ? 'border-b border-slate-100 pb-3' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-navy-900 text-amber-400 rounded-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
              AI Generated Insights
              <span className="text-[9px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.2 rounded-full border border-amber-300">
                {AI_INSIGHTS.length} Insights
              </span>
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">NLP analytics & recommendation synthesis</p>
          </div>
        </div>

        {/* Dropdown Selectors */}
        <div className="flex items-center gap-2">
          {/* Topic Dropdown Selector */}
          <div className="relative flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Topics ({AI_INSIGHTS.length})</option>
              <option value="anomaly">Expenditure Anomaly</option>
              <option value="duplicate">Duplicate Risk</option>
              <option value="delay">Deadline Delay</option>
            </select>
          </div>

          {/* Section Expand/Collapse Accordion Button */}
          <button
            onClick={() => setIsSectionOpen(!isSectionOpen)}
            className="p-1 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors"
            title={isSectionOpen ? 'Collapse Panel' : 'Expand Panel'}
          >
            {isSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Body */}
      {isSectionOpen && (
        <div className="mt-3 space-y-2.5">
          {filteredInsights.map((insight) => {
            const Icon = getInsightIcon(insight.icon);
            const isExpanded = expandedInsightId === insight.id;
            const detail = extraDetails[insight.id];

            return (
              <div
                key={insight.id}
                className={`border rounded-lg transition-all overflow-hidden ${
                  isExpanded ? 'border-navy-900/30 bg-slate-50/80 shadow-2xs' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Header Dropdown Bar */}
                <button
                  onClick={() => setExpandedInsightId(isExpanded ? null : insight.id)}
                  className="w-full p-2.5 flex items-start gap-2.5 text-left transition-colors"
                >
                  <div className="p-1.5 bg-navy-900 text-amber-400 rounded shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {insight.title}
                      </h4>
                      {insight.badge && (
                        <span className="text-[9px] font-extrabold uppercase bg-red-100 text-red-700 px-1.5 py-0.5 rounded shrink-0">
                          {insight.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-tight">
                      {insight.supportingText}
                    </p>
                  </div>
                  <div className="text-slate-400 shrink-0 self-center">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-navy-900" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Dropdown Content */}
                {isExpanded && detail && (
                  <div className="px-3 pb-3 pt-2 border-t border-slate-200/60 bg-white text-xs space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 bg-slate-50 p-2 rounded">
                      <span>Scope: <strong className="text-slate-800">{detail.district}</strong></span>
                      <span>AI Model Confidence: <strong className="text-emerald-700">{detail.confidence}</strong></span>
                    </div>
                    <div className="text-[11px] p-2 bg-amber-50/70 border border-amber-200 rounded text-amber-950">
                      <strong className="text-amber-900 block mb-0.5 font-bold">Recommended Policy Action:</strong>
                      {detail.recommendation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => navigate('/risk-intelligence')}
              className="w-full py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore All High-Risk Projects & Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
