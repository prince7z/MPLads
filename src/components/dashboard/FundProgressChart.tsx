import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { MONTHLY_FINANCIAL_DATA } from '../../data/dashboardData';

export const FundProgressChart: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
            Fund Utilization & Project Progress
            <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Combined metric showing expenditure alongside works sanctioned and completed">ⓘ</span>
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-navy-900 rounded-xs" />
            <span className="text-slate-600">Expenditure (₹ Cr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-sky-500 rounded-xs" />
            <span className="text-slate-600">Works Sanctioned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-600 rounded-xs" />
            <span className="text-slate-600">Works Completed</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={MONTHLY_FINANCIAL_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fontSize: 10, fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
              unit=""
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: '#64748B' }}
              axisLine={{ stroke: '#CBD5E1' }}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', fontSize: '11px', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: number, name: string) => {
                if (name === 'expenditure') return [`₹ ${value.toLocaleString()} Cr`, 'Expenditure'];
                if (name === 'sanctioned') return [`${value.toLocaleString()} Works`, 'Works Sanctioned'];
                if (name === 'completed') return [`${value.toLocaleString()} Works`, 'Works Completed'];
                return [value, name];
              }}
            />
            <Bar yAxisId="left" dataKey="expenditure" fill="#0A2540" radius={[2, 2, 0, 0]} barSize={20} />
            <Line yAxisId="right" type="monotone" dataKey="sanctioned" stroke="#0284C7" strokeWidth={2} dot={{ r: 3, fill: '#0284C7' }} />
            <Line yAxisId="right" type="monotone" dataKey="completed" stroke="#16A34A" strokeWidth={2} dot={{ r: 3, fill: '#16A34A' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
