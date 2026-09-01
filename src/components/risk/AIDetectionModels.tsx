import React from 'react';
import { BarChart3, CopyCheck, Clock, CreditCard } from 'lucide-react';
import { AI_DETECTION_MODELS } from '../../data/riskData';

export const AIDetectionModels: React.FC = () => {
  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return BarChart3;
      case 'CopyCheck': return CopyCheck;
      case 'Clock': return Clock;
      case 'CreditCard': return CreditCard;
      default: return BarChart3;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
          AI Detection Models
          <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Active AI model engines monitoring the scheme">ⓘ</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AI_DETECTION_MODELS.map((model) => {
          const Icon = getModelIcon(model.icon);
          return (
            <div key={model.id} className="p-3 border border-slate-200 rounded-md bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-navy-900 text-amber-400 rounded">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{model.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{model.status}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {model.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
