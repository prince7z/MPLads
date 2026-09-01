import React from 'react';
import { Search, Calendar } from 'lucide-react';

interface RiskFiltersBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedState: string;
  onStateChange: (s: string) => void;
  selectedRisk: string;
  onRiskChange: (r: string) => void;
  onClear: () => void;
}

export const RiskFiltersBar: React.FC<RiskFiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedState,
  onStateChange,
  selectedRisk,
  onRiskChange,
  onClear
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Dropdown Filters Group */}
      <div className="flex flex-wrap items-center gap-3">
        {/* State Select */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">State</label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:border-navy-900 focus:outline-none min-w-[130px]"
          >
            <option value="All">All States</option>
            <option value="Bihar">Bihar</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Jharkhand">Jharkhand</option>
          </select>
        </div>

        {/* District Select */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">District</label>
          <select className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:border-navy-900 focus:outline-none min-w-[130px]">
            <option value="All">All Districts</option>
            <option value="Aurangabad">Aurangabad</option>
            <option value="Gorakhpur">Gorakhpur</option>
            <option value="Nashik">Nashik</option>
            <option value="Murshidabad">Murshidabad</option>
            <option value="Bhilwara">Bhilwara</option>
          </select>
        </div>

        {/* Financial Year */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">Financial Year</label>
          <select className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:border-navy-900 focus:outline-none">
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </select>
        </div>

        {/* Work Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">Work Type</label>
          <select className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:border-navy-900 focus:outline-none">
            <option value="All">All</option>
            <option value="Road">Road</option>
            <option value="Building">Building</option>
            <option value="Water">Water</option>
            <option value="Education">Education</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">Risk Level</label>
          <select
            value={selectedRisk}
            onChange={(e) => onRiskChange(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:border-navy-900 focus:outline-none min-w-[100px]"
          >
            <option value="All">All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-slate-500 uppercase">Date Range</label>
          <div className="flex items-center gap-1.5 border border-slate-300 rounded px-2.5 py-1.5 bg-white text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>01 Apr 2024 - 01 May 2026</span>
          </div>
        </div>
      </div>

      {/* Search Input & Clear */}
      <div className="flex items-center gap-2 self-end">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Project / ID"
            className="pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:border-navy-900 focus:outline-none w-56 font-medium"
          />
        </div>

        <button
          onClick={onClear}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-2 py-1.5 hover:bg-slate-100 rounded transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
