import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, UserPlus, FileCheck, FileText, History, MoreHorizontal } from 'lucide-react';
import { ProjectHeaderCard } from '../components/project/ProjectHeaderCard';
import { ProjectTimeline } from '../components/project/ProjectTimeline';
import { FinancialAnalysisCard } from '../components/project/FinancialAnalysisCard';
import { DuplicateDetectionCard } from '../components/project/DuplicateDetectionCard';
import { ComplianceStatusCard } from '../components/project/ComplianceStatusCard';
import { PROJECT_DETAILS_MPL9281 } from '../data/projectDetailsData';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Use MPL-9281 detailed mock data or fallback
  const project = PROJECT_DETAILS_MPL9281;

  return (
    <div className="space-y-5 pb-12">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/risk-intelligence" className="hover:text-navy-900 transition-colors">
          Risk Intelligence
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/projects" className="hover:text-navy-900 transition-colors">
          High Risk Projects
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">{id || project.id}</span>
      </nav>

      {/* Page Title */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
          Project Investigation
        </h1>
      </div>

      {/* Top Project Summary Header Card */}
      <ProjectHeaderCard project={project} />

      {/* 2x2 Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Panel 1: Progress Timeline */}
        <div className="h-full">
          <ProjectTimeline timeline={project.timeline} />
        </div>

        {/* Panel 2: Financial Analysis */}
        <div className="h-full">
          <FinancialAnalysisCard financial={project.financial} />
        </div>

        {/* Panel 3: Potential Duplicate Detection */}
        <div className="h-full">
          <DuplicateDetectionCard duplicate={project.duplicate} />
        </div>

        {/* Panel 4: Compliance Status */}
        <div className="h-full">
          <ComplianceStatusCard compliance={project.compliance} />
        </div>
      </div>

      {/* Bottom Sticky Action Toolbar */}
      <div className="fixed bottom-0 left-[250px] right-0 bg-white border-t border-slate-200 p-3 px-6 z-20 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-4 py-2 rounded-md text-xs transition-all shadow-xs">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Assign Investigation</span>
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-md text-xs transition-colors">
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Request Verification</span>
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-md text-xs transition-colors">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Generate AI Report</span>
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-md text-xs transition-colors">
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>View Audit Trail</span>
          </button>
        </div>

        <button className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-md text-xs">
          <span>More Actions</span>
          <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
