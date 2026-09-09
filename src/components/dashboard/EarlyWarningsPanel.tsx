import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarX, CopyCheck, IndianRupee, CreditCard, ChevronRight, ChevronDown, ChevronUp, AlertCircle, Filter } from 'lucide-react';
import { AI_EARLY_WARNINGS } from '../../data/dashboardData';

export const EarlyWarningsPanel: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarX': return CalendarX;
      case 'CopyCheck': return CopyCheck;
      case 'IndianRupee': return IndianRupee;
      case 'CreditCard': return CreditCard;
      default: return CalendarX;
    }
  };

  const alertDetails: Record<string, { description: string; actionText: string; impactedCount: number }> = {
    'ew-1': {
      description: 'AI model predicts over 85% probability of deadline breach due to land acquisition and UC clearance delays.',
      actionText: 'Trigger Escalate Alert to District Nodal Officer',
      impactedCount: 43
    },
    'ew-2': {
      description: 'Spatial & textual match engine flagged 17 sanctioned works with >80% overlap with existing PWD assets.',
      actionText: 'Review GIS Spatial Overlay',
      impactedCount: 17
    },
    'ew-3': {
      description: 'Cost per unit distance is 55% higher than regional PWD standard rate schedules for 31 road construction works.',
      actionText: 'Initiate Cost Estimate Re-evaluation',
      impactedCount: 31
    },
    'ew-4': {
      description: 'Front-loaded fund disbursement patterns detected in 28 works prior to physical completion milestones.',
      actionText: 'Audit Payment Disbursements',
      impactedCount: 28
    }
  };

  const filteredWarnings = AI_EARLY_WARNINGS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.severity === selectedFilter;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs transition-all">
      {/* Top Header with Dropdowns */}
      <div className={`flex items-center justify-between ${isSectionOpen ? 'border-b border-slate-100 pb-3' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
              AI Early Warnings
              <span className="text-[9px] bg-red-100 text-red-800 font-extrabold px-1.5 py-0.2 rounded-full">
                {AI_EARLY_WARNINGS.length} Alerts
              </span>
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Machine-learning anomaly triggers</p>
          </div>
        </div>

        {/* Filter Dropdown & Expand Section Toggle */}
        <div className="flex items-center gap-2">
          {/* Category Dropdown Selector */}
          <div className="relative flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Alerts ({AI_EARLY_WARNINGS.length})</option>
              <option value="critical">Critical Severity</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
            </select>
          </div>

          {/* Section Accordion Dropdown Button */}
          <button
            onClick={() => setIsSectionOpen(!isSectionOpen)}
            className="p-1 text-slate-500 hover:text-navy-900 hover:bg-slate-100 rounded transition-colors"
            title={isSectionOpen ? 'Collapse Panel' : 'Expand Panel'}
          >
            {isSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Body */}
      {isSectionOpen && (
        <div className="mt-3 space-y-2">
          {filteredWarnings.map((item) => {
            const Icon = getIcon(item.icon);
            const isExpanded = expandedAlertId === item.id;
            const detail = alertDetails[item.id];

            return (
              <div
                key={item.id}
                className={`border rounded-lg transition-all overflow-hidden ${
                  isExpanded ? 'border-navy-900/30 bg-slate-50/80 shadow-2xs' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Alert Header Row (Clickable Dropdown Toggle) */}
                <button
                  onClick={() => setExpandedAlertId(isExpanded ? null : item.id)}
                  className="w-full p-2.5 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded ${
                      item.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      item.severity === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 leading-snug block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Severity: <span className="uppercase font-bold">{item.severity}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-navy-900 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                      {item.count}
                    </span>
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-navy-900" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Dropdown Content */}
                {isExpanded && detail && (
                  <div className="px-3 pb-3 pt-1 border-t border-slate-200/60 text-xs space-y-2 bg-white">
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {detail.description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Impacted Works: {detail.impactedCount}
                      </span>
                      <button
                        onClick={() => navigate('/risk-intelligence')}
                        className="text-[11px] font-extrabold bg-navy-900 hover:bg-navy-800 text-white px-2.5 py-1 rounded transition-colors"
                      >
                        {detail.actionText}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => navigate('/risk-intelligence')}
              className="text-xs font-bold text-navy-900 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <span>View All Alerts in Detail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
