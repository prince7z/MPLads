import React, { useState } from 'react';
import { STATE_RISK_LIST } from '../../data/dashboardData';

interface IndiaRiskMapProps {
  onSelectState?: (stateName: string) => void;
}

export const IndiaRiskMap: React.FC<IndiaRiskMapProps> = ({ onSelectState }) => {
  const [hoveredState, setHoveredState] = useState<{
    name: string;
    riskIndex: number;
    highRiskProjects: number;
    delayedProjects: number;
    status: string;
    x: number;
    y: number;
  } | null>(null);

  // Map state ID to color
  const getStateColor = (riskIndex: number) => {
    if (riskIndex >= 70) return '#D92D20'; // Critical Red
    if (riskIndex >= 50) return '#F79009'; // High Orange
    if (riskIndex >= 30) return '#EAAA08'; // Medium Yellow
    return '#12B76A'; // Low Green
  };

  // Simplified SVG paths representing major Indian states with clean geometry
  const statePaths = [
    // Jammu & Kashmir / Ladakh
    { id: 'JK', name: 'Jammu & Kashmir', d: 'M 180,30 L 220,15 L 260,35 L 250,75 L 200,85 L 175,60 Z', risk: 38 },
    { id: 'HP', name: 'Himachal Pradesh', d: 'M 220,80 L 250,75 L 260,100 L 230,110 Z', risk: 29 },
    { id: 'PB', name: 'Punjab', d: 'M 180,85 L 220,80 L 225,115 L 185,110 Z', risk: 34 },
    { id: 'UT', name: 'Uttarakhand', d: 'M 255,85 L 285,95 L 270,125 L 245,115 Z', risk: 42 },
    { id: 'HR', name: 'Haryana', d: 'M 200,115 L 235,112 L 230,145 L 195,140 Z', risk: 45 },
    { id: 'RJ', name: 'Rajasthan', d: 'M 110,130 L 195,120 L 210,195 L 155,225 L 105,185 Z', risk: 48 },
    { id: 'UP', name: 'Uttar Pradesh', d: 'M 235,120 L 335,135 L 345,190 L 280,205 L 230,160 Z', risk: 68 },
    { id: 'BR', name: 'Bihar', d: 'M 345,145 L 415,150 L 410,190 L 345,185 Z', risk: 72 },
    { id: 'WB', name: 'West Bengal', d: 'M 410,190 L 440,195 L 435,275 L 415,280 L 405,230 L 390,200 Z', risk: 63 },
    { id: 'JH', name: 'Jharkhand', d: 'M 345,190 L 405,190 L 395,240 L 340,230 Z', risk: 58 },
    { id: 'OD', name: 'Odisha', d: 'M 325,235 L 395,240 L 375,310 L 315,280 Z', risk: 45 },
    { id: 'MP', name: 'Madhya Pradesh', d: 'M 185,195 L 290,195 L 310,245 L 240,270 L 175,235 Z', risk: 54 },
    { id: 'GJ', name: 'Gujarat', d: 'M 75,195 L 150,215 L 140,270 L 70,250 L 65,215 Z', risk: 24 },
    { id: 'MH', name: 'Maharashtra', d: 'M 145,260 L 250,265 L 265,335 L 165,345 L 140,290 Z', risk: 41 },
    { id: 'CT', name: 'Chhattisgarh', d: 'M 290,205 L 340,210 L 330,285 L 295,280 Z', risk: 51 },
    { id: 'TS', name: 'Telangana', d: 'M 235,320 L 295,310 L 290,360 L 230,355 Z', risk: 36 },
    { id: 'AP', name: 'Andhra Pradesh', d: 'M 235,360 L 310,345 L 275,430 L 230,400 Z', risk: 39 },
    { id: 'KA', name: 'Karnataka', d: 'M 165,345 L 230,355 L 225,445 L 175,430 Z', risk: 35 },
    { id: 'TN', name: 'Tamil Nadu', d: 'M 205,440 L 250,435 L 235,510 L 195,490 Z', risk: 28 },
    { id: 'KL', name: 'Kerala', d: 'M 180,440 L 205,440 L 195,505 L 180,490 Z', risk: 22 },
    { id: 'NE', name: 'Northeast States', d: 'M 445,150 L 515,140 L 525,200 L 450,190 Z', risk: 44 }
  ];

  const handleMouseEnter = (stateItem: any, e: React.MouseEvent) => {
    const data = STATE_RISK_LIST.find((s) => s.state === stateItem.name) || {
      state: stateItem.name,
      riskIndex: stateItem.risk,
      highRiskProjects: Math.floor(stateItem.risk * 1.5),
      delayedProjects: Math.floor(stateItem.risk * 0.9),
      status: stateItem.risk >= 70 ? 'Critical' : stateItem.risk >= 50 ? 'High' : stateItem.risk >= 30 ? 'Medium' : 'Low'
    };

    setHoveredState({
      name: data.state,
      riskIndex: data.riskIndex,
      highRiskProjects: data.highRiskProjects,
      delayedProjects: data.delayedProjects,
      status: data.status,
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center bg-slate-50/50 rounded border border-slate-100 p-2">
      {/* Map SVG */}
      <svg viewBox="0 0 550 540" className="w-full h-full max-h-[300px]">
        {statePaths.map((state) => {
          const color = getStateColor(state.risk);
          return (
            <path
              key={state.id}
              d={state.d}
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="cursor-pointer transition-all duration-150 hover:opacity-85 hover:stroke-slate-900 hover:stroke-2"
              onMouseEnter={(e) => handleMouseEnter(state, e)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => onSelectState && onSelectState(state.name)}
            />
          );
        })}
      </svg>

      {/* Map Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs border border-slate-200 p-2 rounded text-[10px] space-y-1 shadow-2xs">
        <div className="font-bold text-slate-700 border-b border-slate-100 pb-0.5">Risk Level</div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#D92D20]" />
          <span>Critical (71–100)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#F79009]" />
          <span>High (51–70)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#EAAA08]" />
          <span>Medium (31–50)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#12B76A]" />
          <span>Low (0–30)</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredState && (
        <div
          className="fixed z-50 pointer-events-none bg-navy-900 text-white p-2.5 rounded-md shadow-xl text-xs space-y-1 border border-slate-700 min-w-[150px]"
          style={{
            left: `${hoveredState.x + 12}px`,
            top: `${hoveredState.y - 40}px`
          }}
        >
          <div className="font-bold text-amber-400 border-b border-slate-700 pb-1 flex justify-between items-center">
            <span>{hoveredState.name}</span>
            <span className="text-[10px] bg-red-600 px-1 py-0.2 rounded text-white font-extrabold uppercase">
              {hoveredState.status}
            </span>
          </div>
          <div className="text-[11px] space-y-0.5 pt-0.5">
            <div className="flex justify-between">
              <span className="text-slate-300">Risk Index:</span>
              <span className="font-bold">{hoveredState.riskIndex} / 100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">High Risk Works:</span>
              <span className="font-bold text-amber-300">{hoveredState.highRiskProjects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Delayed Works:</span>
              <span className="font-bold text-red-300">{hoveredState.delayedProjects}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
