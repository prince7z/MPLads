import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { TimelineMilestone } from '../../types/project';

interface ProjectTimelineProps {
  timeline: TimelineMilestone[];
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
        1. Project Progress Timeline
      </h3>

      {/* Horizontal Milestone Tracker */}
      <div className="relative my-3 px-2">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
        <div className="grid grid-cols-6 gap-2 text-center relative z-10">
          {timeline.map((item, idx) => {
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${
                  item.status === 'completed'
                    ? 'border-emerald-600 text-emerald-600 bg-emerald-50'
                    : item.status === 'in_progress'
                    ? 'border-blue-600 text-blue-600 bg-blue-50 font-bold text-xs'
                    : item.status === 'delayed'
                    ? 'border-red-600 text-red-600 bg-red-50'
                    : 'border-slate-300 text-slate-400'
                }`}>
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : item.status === 'delayed' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : item.status === 'in_progress' ? (
                    <span className="text-[11px]">50%</span>
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <span className="text-[11px] font-bold text-slate-800 mt-2 leading-tight">
                  {item.stage}
                </span>
                <span className={`text-[10px] font-semibold mt-0.5 ${item.status === 'delayed' ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delay Metrics Summary Cards */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 bg-slate-50/50 p-2 rounded">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block">Expected Completion</span>
          <span className="text-xs font-bold text-blue-700">15 Dec 2026</span>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block">AI Predicted Completion</span>
          <span className="text-xs font-extrabold text-red-600">Mar 2027</span>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block">Delay Probability</span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-extrabold text-red-600">82%</span>
            <div className="w-full bg-slate-200 rounded-full h-1">
              <div className="bg-red-600 h-1 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-500 block">Delay (Predicted)</span>
          <span className="text-xs font-extrabold text-red-600">3 Months</span>
        </div>
      </div>
    </div>
  );
};
