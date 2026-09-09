import React from 'react';

export const EmblemLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; darkTheme?: boolean }> = ({ size = 'md', darkTheme = true }) => {
  const iconSizes = {
    sm: 'h-7',
    md: 'h-8.5',
    lg: 'h-10'
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Emblem Logo */}
      <img
        src="/images/Branding.png"
        alt="eSanchayan Logo"
        className={`${iconSizes[size]} w-auto object-contain shrink-0 drop-shadow-xs`}
      />

    </div>
  );
};
