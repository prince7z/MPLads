import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { apiService } from '../../services/api';
import { OverviewData, StateSummaryDoc } from '../../types/api';
import { formatIndianNumber } from '../../utils/formatters';

interface RiskDonutChartProps {
  overview?: OverviewData | null;
}

interface TierItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export const RiskDonutChart: React.FC<RiskDonutChartProps> = ({ overview }) => {
  const [tiers, setTiers] = useState<TierItem[]>([
    { name: 'Optimal (>=75%)', count: 12, percentage: 33, color: '#12B76A' },
    { name: 'Moderate (55-74%)', count: 14, percentage: 39, color: '#EAAA08' },
    { name: 'Low (35-54%)', count: 7, percentage: 19, color: '#F79009' },
    { name: 'Lagging (<35%)', count: 3, percentage: 9, color: '#D92D20' },
  ]);
  const [totalEntities, setTotalEntities] = useState<number>(36);

  useEffect(() => {
    let isMounted = true;

    apiService
      .getStateSummaries({ limit: 50 })
      .then((states: StateSummaryDoc[]) => {
        if (!isMounted || states.length === 0) return;

        let opt = 0;
        let mod = 0;
        let low = 0;
        let lag = 0;

        states.forEach((s) => {
          const u = s.utilizationPercentage || 0;
          if (u >= 75) opt++;
          else if (u >= 55) mod++;
          else if (u >= 35) low++;
          else lag++;
        });

        const total = states.length;
        setTotalEntities(total);

        setTiers([
          {
            name: 'Optimal (>=75%)',
            count: opt,
            percentage: Math.round((opt / total) * 100),
            color: '#12B76A',
          },
          {
            name: 'Moderate (55-74%)',
            count: mod,
            percentage: Math.round((mod / total) * 100),
            color: '#EAAA08',
          },
          {
            name: 'Low (35-54%)',
            count: low,
            percentage: Math.round((low / total) * 100),
            color: '#F79009',
          },
          {
            name: 'Lagging (<35%)',
            count: lag,
            percentage: Math.round((lag / total) * 100),
            color: '#D92D20',
          },
        ]);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between shadow-2xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
          State Performance Distribution
          <span
            className="text-[10px] font-semibold text-slate-400 cursor-help"
            title="Classification of Indian states across 4 fund utilization tiers"
          >
            ⓘ
          </span>
        </h3>
        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          Live States
        </span>
      </div>

      <div className="flex items-center my-2">
        {/* Donut Chart Visual */}
        <div className="w-[160px] h-[160px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tiers}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={70}
                paddingAngle={3}
                dataKey="count"
              >
                {tiers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#E2E8F0',
                  fontSize: '11px',
                  borderRadius: '4px',
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} States (${props.payload.percentage}%)`,
                  props.payload.name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-2 pl-2 border-l border-slate-100">
          {tiers.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700 text-[11px] truncate max-w-[110px]">{item.name}</span>
              </div>
              <div className="text-slate-500 font-medium whitespace-nowrap">
                <span className="font-bold text-slate-800">{item.percentage}%</span>
                <span className="text-[10px] text-slate-400 ml-1">({item.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Total States Analyzed:</span>
        <span className="font-bold text-slate-800">
          {totalEntities} States & UTs
        </span>
      </div>
    </div>
  );
};
