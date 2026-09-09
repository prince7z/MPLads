import React from 'react';

export const EmblemLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Emblem SVG Icon */}
      <div className={`text-amber-600 flex items-center justify-center font-bold border-2 border-amber-600 rounded p-0.5 ${iconSizes[size]}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          {/* Stylized Ashoka Chakra & Lions representation */}
          <path d="M12 2L15 8H9L12 2Z" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M12 9V6M12 18V15M9 12H6M18 12H15" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 15L9 21H15L12 15Z" />
          <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" fill="none" />
        </svg>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider font-bold text-amber-700 leading-tight">
          NIRVANA Platform
        </div>
        <div className="text-[10px] text-slate-700 font-semibold leading-tight max-w-[170px]">
          Government of India • MoSPI
        </div>
        <div className="text-[8.5px] text-slate-500 font-medium leading-tight mt-0.5" title="National Intelligence & Risk Visualization for Administrative Network & Assets">
          National Intelligence & Risk Visualization
        </div>
      </div>
    </div>
  );
};
