import React from 'react';
import { ChevronRight } from 'lucide-react';
import { FinancialBenchmark } from '../../types/project';

interface FinancialAnalysisCardProps {
  financial: FinancialBenchmark;
}

export const FinancialAnalysisCard: React.FC<FinancialAnalysisCardProps> = ({ financial }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
          2. Financial Analysis
        </h3>
        <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Cost metrics relative to regional benchmarks">ⓘ</span>
      </div>

      <div className="space-y-3 my-2">
        {/* Estimated Cost (This Project) */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Estimated Cost (This Project)</span>
            <span className="font-bold text-navy-900">₹ {(financial.estimatedCost / 100000).toFixed(2)} Lakhs</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
            <div className="bg-navy-900 h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        {/* Similar Projects Median */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span>Similar Projects Median</span>
            <span className="font-bold text-blue-700">₹ {(financial.similarProjectsMedian / 100000).toFixed(2)} Lakhs</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '55%' }} />
          </div>
        </div>
      </div>

      {/* Cost Deviation Alert Box */}
      <div className="bg-red-50 border border-red-200 p-2.5 rounded-md flex items-center justify-between text-xs">
        <span className="font-bold text-red-700">Cost Deviation</span>
        <span className="font-black text-red-700 text-sm">+{financial.costDeviationPercentage}% <span className="text-[10px] font-normal text-red-600">(Above Similar Projects Median)</span></span>
      </div>

      <div className="mt-2 text-right">
        <button className="text-xs font-bold text-navy-900 hover:text-blue-700 inline-flex items-center gap-1">
          <span>View Cost Benchmark Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
