import React from 'react';

interface RiskBadgeProps {
  score?: number;
  category?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  score,
  category = 'HIGH',
  size = 'md',
  showScore = false
}) => {
  const catUpper = category.toUpperCase();

  let bg = 'bg-emerald-50 border-emerald-200 text-emerald-700';
  let badgeColor = 'bg-emerald-600 text-white';

  if (catUpper === 'CRITICAL' || (score && score >= 90)) {
    bg = 'bg-red-50 border-red-200 text-red-700';
    badgeColor = 'bg-red-600 text-white';
  } else if (catUpper === 'HIGH' || (score && score >= 70)) {
    bg = 'bg-amber-50 border-amber-200 text-amber-800';
    badgeColor = 'bg-amber-600 text-white';
  } else if (catUpper === 'MEDIUM' || (score && score >= 40)) {
    bg = 'bg-yellow-50 border-yellow-200 text-yellow-800';
    badgeColor = 'bg-yellow-500 text-white';
  }

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 font-bold rounded',
    md: 'text-xs px-2 py-0.5 font-bold rounded',
    lg: 'text-sm px-3 py-1 font-bold rounded-md'
  };

  if (showScore && score !== undefined) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-semibold ${bg} border px-2 py-0.5 rounded text-xs`}>
        <span className="font-bold">{score} / 100</span>
        <span className={`${badgeColor} uppercase tracking-wider text-[10px] px-1.5 py-0.2 rounded font-extrabold`}>
          {category}
        </span>
      </div>
    );
  }

  return (
    <span className={`inline-block uppercase tracking-wider ${sizes[size]} ${badgeColor}`}>
      {category}
    </span>
  );
};
