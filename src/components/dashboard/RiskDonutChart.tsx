import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RISK_DISTRIBUTION } from '../../data/dashboardData';

export const RiskDonutChart: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
          Risk Distribution
          <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Classification of all monitored projects into 4 AI risk tiers">ⓘ</span>
        </h3>
      </div>

      <div className="flex items-center my-2">
        {/* Donut Chart Visual */}
        <div className="w-[170px] h-[170px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={RISK_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="count"
              >
                {RISK_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', fontSize: '11px', borderRadius: '4px' }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} Projects (${props.payload.percentage}%)`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-2 pl-2 border-l border-slate-100">
          {RISK_DISTRIBUTION.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700">{item.name}</span>
              </div>
              <div className="text-slate-500 font-medium">
                <span className="font-bold text-slate-800">{item.percentage}%</span>
                <span className="text-[10px] text-slate-400 ml-1">({item.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Total Projects Analyzed:</span>
        <span className="font-bold text-slate-800">2,703</span>
      </div>
    </div>
  );
};
