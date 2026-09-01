import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, CopyCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { AI_INSIGHTS } from '../../data/dashboardData';

export const AIInsightsPanel: React.FC = () => {
  const navigate = useNavigate();

  const getInsightIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'CopyCheck': return CopyCheck;
      case 'AlertTriangle': return AlertTriangle;
      default: return TrendingUp;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
            AI Generated Insights
            <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Natural Language Insights derived from automated analytics">ⓘ</span>
          </h3>
        </div>

        <div className="space-y-3">
          {AI_INSIGHTS.map((insight) => {
            const Icon = getInsightIcon(insight.icon);
            return (
              <div
                key={insight.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-md hover:border-slate-300 transition-all flex gap-3"
              >
                <div className="p-2 bg-navy-900 text-amber-400 rounded h-fit shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
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
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    {insight.supportingText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="w-full py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <span>View All High-Risk Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
