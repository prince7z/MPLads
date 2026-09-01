import React, { useState, useMemo } from 'react';
import { AlertCircle, AlertTriangle, PieChart, CopyCheck, Clock } from 'lucide-react';
import { RiskFiltersBar } from '../components/risk/RiskFiltersBar';
import { AIDetectionModels } from '../components/risk/AIDetectionModels';
import { PriorityInvestigationQueue } from '../components/risk/PriorityInvestigationQueue';
import { ProjectRiskDrawer } from '../components/risk/ProjectRiskDrawer';
import { RISK_KPIS, PRIORITY_QUEUE } from '../data/riskData';
import { PriorityInvestigationItem } from '../types/risk';

export const RiskIntelligencePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PriorityInvestigationItem | null>(PRIORITY_QUEUE[0]);

  const filteredItems = useMemo(() => {
    return PRIORITY_QUEUE.filter((item) => {
      const matchesSearch =
        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === 'All' || item.state === selectedState;
      const matchesRisk = selectedRisk === 'All' || item.riskCategory === selectedRisk;

      return matchesSearch && matchesState && matchesRisk;
    });
  }, [searchQuery, selectedState, selectedRisk]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedRisk('All');
  };

  const getKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertCircle': return AlertCircle;
      case 'AlertTriangle': return AlertTriangle;
      case 'PieChart': return PieChart;
      case 'CopyCheck': return CopyCheck;
      case 'Clock': return Clock;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Subheader */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-extrabold text-navy-900 tracking-tight">
          AI Risk Intelligence
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Detect anomalies, irregularities and potential fraud before they become critical.
        </p>
      </div>

      {/* Filter Toolbar */}
      <RiskFiltersBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        selectedRisk={selectedRisk}
        onRiskChange={setSelectedRisk}
        onClear={handleClearFilters}
      />

      {/* 5 Risk Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {RISK_KPIS.map((kpi) => {
          const Icon = getKpiIcon(kpi.icon);
          return (
            <div
              key={kpi.id}
              className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between shadow-2xs hover:border-slate-300 transition-all"
            >
              <div>
                <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wide">
                  {kpi.title}
                </span>
                <div className="text-xl font-black text-navy-900 mt-1">{kpi.value}</div>
                <div className={`text-[11px] font-bold mt-0.5 ${kpi.color}`}>
                  {kpi.change}
                </div>
              </div>
              <div className={`p-2.5 rounded-full border ${kpi.bgColor} ${kpi.color} ${kpi.borderColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Layout: Risk Distribution Progress Bars + AI Detection Models */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Risk Distribution Breakdown */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-1.5">
            Risk Distribution
            <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="Risk classification breakdown across active works">ⓘ</span>
          </h3>

          <div className="space-y-3 my-2">
            {/* Critical */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Critical</span>
                <span className="font-bold text-red-600">8% <span className="text-[10px] text-slate-400">(217)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-600 h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            {/* High */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>High</span>
                <span className="font-bold text-amber-600">21% <span className="text-[10px] text-slate-400">(561)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '21%' }} />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Medium</span>
                <span className="font-bold text-yellow-600">34% <span className="text-[10px] text-slate-400">(913)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '34%' }} />
              </div>
            </div>

            {/* Low */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Low</span>
                <span className="font-bold text-emerald-600">37% <span className="text-[10px] text-slate-400">(1,012)</span></span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '37%' }} />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-medium text-center pt-2 border-t border-slate-100">
            Number of Projects
          </div>
        </div>

        {/* AI Detection Models */}
        <div className="lg:col-span-8">
          <AIDetectionModels />
        </div>
      </div>

      {/* Main Grid: Priority Investigation Queue Table + Right Project Risk Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className={selectedProject ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <PriorityInvestigationQueue
            items={filteredItems}
            selectedProjectId={selectedProject?.id || null}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        </div>

        {selectedProject && (
          <div className="lg:col-span-4 sticky top-20">
            <ProjectRiskDrawer
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
