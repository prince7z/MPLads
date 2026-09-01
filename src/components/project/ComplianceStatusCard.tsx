import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react';
import { ComplianceItem } from '../../types/project';

interface ComplianceStatusCardProps {
  compliance: {
    score: number;
    statusText: string;
    items: ComplianceItem[];
  };
}

export const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({ compliance }) => {
  const chartData = [
    { name: 'Compliant', value: compliance.score, color: '#16A34A' },
    { name: 'Non-Compliant', value: 100 - compliance.score, color: '#E2E8F0' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
          4. Compliance Status
        </h3>
        <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Audit checklist for regulatory guidelines">ⓘ</span>
      </div>

      <div className="grid grid-cols-12 gap-3 items-center my-2">
        {/* Compliance Donut Visual */}
        <div className="col-span-5 flex flex-col items-center">
          <div className="w-[120px] h-[120px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={52}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill="#16A34A" stroke="none" />
                  <Cell fill="#E2E8F0" stroke="none" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[9px] font-semibold text-slate-500 uppercase">Compliance</span>
              <span className="text-base font-extrabold text-navy-900 leading-none">{compliance.score}%</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-700 mt-1">{compliance.statusText}</span>
        </div>

        {/* Compliance Checklist Items */}
        <div className="col-span-7 space-y-1.5 border-l border-slate-100 pl-3">
          {compliance.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-700">{item.label}</span>
              <span className="flex items-center gap-1 font-semibold text-[11px]">
                {item.status === 'Available' && (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Available
                  </span>
                )}
                {item.status === 'Pending' && (
                  <span className="text-amber-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending
                  </span>
                )}
                {item.status === 'Not Available' && (
                  <span className="text-red-700 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-600" /> Not Available
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right pt-2 border-t border-slate-100">
        <button className="text-xs font-bold text-navy-900 hover:text-blue-700 inline-flex items-center gap-1">
          <span>View Compliance Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
