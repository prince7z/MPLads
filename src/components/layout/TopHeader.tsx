import React, { useState } from 'react';
import { Bell, User, ChevronDown, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotificationPanel } from './NotificationPanel';
import { ProfileDropdown } from './ProfileDropdown';

interface TopHeaderProps {
  onToggleCopilot: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ 
  onToggleCopilot,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Left Brand Title & Toggle Button */}
      <div className="flex items-center gap-3 min-w-0">

        <Link to="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity min-w-0">

          <div className="h-5 w-[1px] bg-slate-200 shrink-0" />
          <img
            src="/images/name for navbar.png"
            alt="NIRVANA - National Intelligence & Risk Visualization"
            className="h-7 w-auto object-contain shrink-0 max-w-[200px]"
          />
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              12
            </span>
          </button>

          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* AI Copilot Button */}
        <button
          onClick={onToggleCopilot}
          className="flex items-center gap-2 border border-navy-900/30 bg-navy-50/50 hover:bg-navy-900 hover:text-white text-navy-900 px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-xs"
        >
          <span>AI Copilot</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative border-l border-slate-200 pl-3 ml-1">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 text-slate-700 hover:text-navy-900 text-xs font-semibold py-1 px-1.5 rounded hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600">
              <User className="w-4 h-4" />
            </div>
            <span>Officer</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
