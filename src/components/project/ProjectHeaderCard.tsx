import React from 'react';
import { MapPin, Calendar, FileCode, CheckCircle } from 'lucide-react';
import { ProjectDetail } from '../../types/project';
import { StatusBadge } from '../common/StatusBadge';

interface ProjectHeaderCardProps {
  project: ProjectDetail;
}

export const ProjectHeaderCard: React.FC<ProjectHeaderCardProps> = ({ project }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Project Thumbnail Image */}
        <div className="lg:col-span-3 h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Core Details */}
        <div className="lg:col-span-5 space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-900 tracking-tight">{project.title}</h2>
            <StatusBadge status={project.status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              Project ID: <span className="font-bold text-slate-800">{project.id}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Work Type: <span className="font-bold text-slate-800">{project.workType}</span>
            </span>
          </div>
        </div>

        {/* Key Metrics Columns */}
        <div className="lg:col-span-4 grid grid-cols-3 gap-2 border-l border-slate-200 pl-4">
          {/* Budget & Expenditure */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Budget</span>
            <div className="text-sm font-extrabold text-navy-900">{project.budget}</div>
            <div className="mt-1 text-[11px] font-semibold text-slate-600">Expenditure</div>
            <div className="text-xs font-bold text-slate-800">{project.expenditure} <span className="text-[10px] text-blue-600">({project.expenditurePercent})</span></div>
          </div>

          {/* Physical vs Expected Progress */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Physical Progress</span>
                <span>{project.physicalProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-0.5 overflow-hidden">
                <div className="bg-navy-900 h-full rounded-full" style={{ width: `${project.physicalProgress}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>Expected Progress</span>
                <span>{project.expectedProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-0.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${project.expectedProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Risk Score Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center flex flex-col justify-center items-center">
            <span className="text-[9px] font-extrabold text-red-700 uppercase tracking-wider">Risk Score</span>
            <div className="text-lg font-black text-red-700 leading-tight">
              {project.riskScore} <span className="text-[10px] text-red-500 font-bold">/100</span>
            </div>
            <span className="mt-0.5 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">
              {project.riskCategory} RISK
            </span>
            <span className="text-[9px] text-slate-500 mt-1 font-semibold">AI Confidence: {project.aiConfidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
