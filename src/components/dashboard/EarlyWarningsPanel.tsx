import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarX, CopyCheck, IndianRupee, CreditCard, ChevronRight } from 'lucide-react';
import { AI_EARLY_WARNINGS } from '../../data/dashboardData';

export const EarlyWarningsPanel: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarX': return CalendarX;
      case 'CopyCheck': return CopyCheck;
      case 'IndianRupee': return IndianRupee;
      case 'CreditCard': return CreditCard;
      default: return CalendarX;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
          AI Early Warnings
          <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Automated machine-learning anomaly triggers">ⓘ</span>
        </h3>
      </div>

      <div className="divide-y divide-slate-100 flex-1 my-1">
        {AI_EARLY_WARNINGS.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors px-1 rounded">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-100 text-navy-900 border border-slate-200 rounded">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{item.title}</span>
              </div>
              <span className="text-sm font-extrabold text-navy-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="text-xs font-bold text-navy-900 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <span>View All Alerts</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
