import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { apiService } from '../../services/api';
import { AnalyticsTrendsData } from '../../types/api';
import { formatCurrencyRupees, formatIndianNumber } from '../../utils/formatters';

interface FundProgressChartProps {
  house?: 'Both Houses' | 'Lok Sabha' | 'Rajya Sabha';
}

interface ChartPoint {
  year: string;
  expenditureCr: number;
  completedWorks: number;
  transactions: number;
}

export const FundProgressChart: React.FC<FundProgressChartProps> = ({ house }) => {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    apiService
      .getAnalyticsTrends({
        house: house && house !== 'Both Houses' ? house : undefined,
        start_year: 2019,
        end_year: new Date().getFullYear(),
      })
      .then((res: AnalyticsTrendsData) => {
        if (!isMounted) return;

        const yearlyExp = res.utilization?.yearly || [];
        const yearlyWorks = res.works || [];

        // Build merged year map
        const yearMap = new Map<number, { expenditure: number; completed: number; tx: number }>();

        yearlyExp.forEach((item) => {
          const y = item.year;
          if (!yearMap.has(y)) {
            yearMap.set(y, { expenditure: 0, completed: 0, tx: 0 });
          }
          const curr = yearMap.get(y)!;
          curr.expenditure += item.totalExpenditure || 0;
          curr.tx += item.transactionCount || 0;
        });

        yearlyWorks.forEach((item) => {
          const y = item.year;
          if (!yearMap.has(y)) {
            yearMap.set(y, { expenditure: 0, completed: 0, tx: 0 });
          }
          const curr = yearMap.get(y)!;
          curr.completed += item.totalWorksCompleted || 0;
        });

        const sortedPoints: ChartPoint[] = Array.from(yearMap.entries())
          .sort(([a], [b]) => a - b)
          .map(([y, vals]) => ({
            year: y.toString(),
            expenditureCr: Number((vals.expenditure / 10000000).toFixed(1)),
            completedWorks: vals.completed,
            transactions: vals.tx,
          }));

        setChartData(sortedPoints);
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [house]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between shadow-2xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
            Year-over-Year Expenditure & Completed Works
            <span
              className="text-[10px] font-semibold text-slate-400 cursor-help"
              title="Official annual expenditure in ₹ Crore vs count of physically completed works"
            >
              ⓘ
            </span>
          </h3>
          <p className="text-[10px] text-slate-500">Official time-series trend from MoSPI database</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-navy-900 rounded-xs" />
            <span className="text-slate-600">Expenditure (₹ Cr)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-600 rounded-xs" />
            <span className="text-slate-600">Works Completed</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[220px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-xs text-slate-400 animate-pulse">Loading trend analytics...</div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            No historical trend records found for current filters
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="year"
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
                unit=" Cr"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#E2E8F0',
                  fontSize: '11px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'expenditureCr') return [`₹ ${value.toLocaleString()} Cr`, 'Expenditure'];
                  if (name === 'completedWorks') return [`${formatIndianNumber(value)} Works`, 'Works Completed'];
                  return [value, name];
                }}
              />
              <Bar yAxisId="left" dataKey="expenditureCr" fill="#0A2540" radius={[2, 2, 0, 0]} barSize={24} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="completedWorks"
                stroke="#16A34A"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#16A34A' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
