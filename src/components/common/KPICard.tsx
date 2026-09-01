import React from 'react';
import * as Icons from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'danger';
  icon: string;
  riskBadge?: string;
  highlight?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  riskBadge,
  highlight = false
}) => {
  // Dynamically resolve icon component from Lucide
  const IconComponent = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[icon] || Icons.HelpCircle;

  return (
    <div className={`bg-white border rounded-lg p-3.5 flex flex-col justify-between transition-all duration-150 ${
      highlight ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200 hover:border-slate-300'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {title}
        </span>
        <div className={`p-1.5 rounded-full border ${
          highlight 
            ? 'bg-red-50 text-red-600 border-red-200' 
            : 'bg-slate-50 text-navy-900 border-slate-200'
        }`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2">
        <div className="text-xl font-bold text-slate-900 tracking-tight flex items-baseline justify-between">
          <span>{value}</span>
          {riskBadge && (
            <span className="text-[10px] font-black uppercase bg-red-600 text-white px-1.5 py-0.5 rounded tracking-wider">
              {riskBadge}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1 text-[11px] font-medium">
          {changeType === 'danger' ? (
            <span className="text-red-600 font-bold uppercase tracking-wider">{change}</span>
          ) : changeType === 'positive' ? (
            <span className="text-emerald-700">{change}</span>
          ) : (
            <span className="text-slate-500">{change}</span>
          )}
        </div>
      </div>
    </div>
  );
};
