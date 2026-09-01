import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShieldAlert, ArrowRight } from 'lucide-react';
import { PRIORITY_QUEUE } from '../data/riskData';
import { RiskBadge } from '../components/common/RiskBadge';
import { StatusBadge } from '../components/common/StatusBadge';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filtered = PRIORITY_QUEUE.filter((p) => {
    const matchesQ = p.projectName.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase());
    const matchesT = filterType === 'All' || p.workType === filterType;
    return matchesQ && matchesT;
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
            All Projects & Works Directory
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Comprehensive list of sanctioned, ongoing, and completed MPLADS works
          </p>
        </div>

        <button className="bg-navy-900 text-white font-bold text-xs px-3.5 py-2 rounded-md hover:bg-navy-800 transition-colors">
          Export Project Data
        </button>
      </div>

      {/* Filter & Search Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Project Name, ID, or District..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:border-navy-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-500">Work Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 bg-white font-medium focus:border-navy-900 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Road">Road</option>
            <option value="Building">Building</option>
            <option value="Water">Water</option>
            <option value="Education">Education</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-navy-900 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-navy-900">{project.id}</span>
                <RiskBadge score={project.riskScore} category={project.riskCategory} size="sm" showScore />
              </div>

              <h3 className="text-sm font-bold text-slate-800 leading-snug mb-1">{project.projectName}</h3>
              <p className="text-xs text-slate-500">{project.district}, {project.state}</p>

              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Sanctioned Amount:</span>
                  <span className="font-bold text-slate-900">{project.amountFormatted}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Detected Anomaly:</span>
                  <span className="font-bold text-amber-700">{project.issueDetected}</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-navy-900 h-full rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-900">
              <span>View Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
