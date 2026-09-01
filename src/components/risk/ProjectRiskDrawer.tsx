import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';
import { PriorityInvestigationItem } from '../../types/risk';

interface ProjectRiskDrawerProps {
  project: PriorityInvestigationItem | null;
  onClose: () => void;
}

export const ProjectRiskDrawer: React.FC<ProjectRiskDrawerProps> = ({ project, onClose }) => {
  const navigate = useNavigate();

  if (!project) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between select-none h-full shadow-sm">
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
          <h3 className="text-sm font-bold text-navy-900">Why are these projects risky?</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Project Card Header */}
        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Selected Project</span>
          <h4 className="text-base font-extrabold text-navy-900 tracking-tight leading-snug">
            {project.id}
          </h4>
          <p className="text-xs font-semibold text-slate-700">{project.projectName}</p>
          <p className="text-[11px] text-slate-500 font-medium">{project.district}, {project.state}</p>
        </div>

        {/* Risk Score Box */}
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Risk Score</span>
            <div className="text-xl font-black text-red-700 leading-tight">
              {project.riskScore} <span className="text-xs font-bold text-red-500">/ 100</span>
            </div>
          </div>
          <span className="bg-red-600 text-white font-extrabold uppercase text-[10px] px-2 py-1 rounded tracking-wider">
            {project.riskCategory}
          </span>
        </div>

        {/* Risk Factors Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span className="flex items-center gap-1">
              Risk Factors (Impact on Score)
              <HelpCircle className="w-3 h-3 text-slate-400" />
            </span>
          </div>

          <div className="space-y-2.5">
            {project.riskFactors.map((factor, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-700">
                  <span>{factor.factor}</span>
                  <span className="font-bold text-red-600">{factor.impact}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${factor.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Explanation Box */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-1">
            AI Explanation
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 p-2.5 rounded-md font-medium">
            {project.aiExplanation}
          </p>
        </div>

        {/* Recommended Action Box */}
        <div className="mb-4">
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-md text-[11px]">
            <span className="font-bold text-amber-900 block mb-0.5">Recommended Action</span>
            <span className="text-amber-950 font-medium">{project.recommendedAction}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => navigate(`/projects/${project.id}`)}
        className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
      >
        <span>Open Investigation</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
