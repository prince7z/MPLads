import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  FolderKanban, 
  IndianRupee, 
  ClipboardCheck, 
  FileText, 
  HelpCircle, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Risk Intelligence', path: '/risk-intelligence', icon: ShieldAlert },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Financials', path: '/financials', icon: IndianRupee },
    { name: 'Compliance', path: '/compliance', icon: ClipboardCheck },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  return (
    <aside
      onClick={() => {
        if (!isOpen) onToggle();
      }}
      className={`fixed left-0 top-0 z-30 h-screen bg-white border-r border-slate-200 flex flex-col justify-between select-none shadow-xs transition-[width] duration-300 ease-in-out ${
        isOpen ? 'w-[250px]' : 'w-[68px] cursor-pointer'
      }`}
    >
      <div>
        {/* Top Header Branding Section */}
        <div className={`border-b border-slate-200 bg-white transition-all duration-300 relative ${
          isOpen ? 'p-3 pt-4' : 'h-16 flex items-center justify-between px-2'
        }`}>
          {isOpen ? (
            <div className="relative w-full flex items-center justify-center">
              <img
                src="/images/Branding.png"
                alt="eSanchayan Branding"
                className="w-full h-auto max-h-24 object-contain transition-all duration-300"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shadow-2xs"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full px-1">
              <img
                src="/images/logo.png"
                alt="NIRVANA Logo"
                className="w-8 h-8 object-contain shrink-0"
                title="Click to expand menu"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="p-2 space-y-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.name === 'Projects' && location.pathname.startsWith('/projects'));

            return (
              <NavLink
                key={item.name + item.path}
                to={item.path}
                title={!isOpen ? item.name : undefined}
                className={({ isActive: linkActive }) => {
                  const active = isActive || linkActive;
                  return `flex items-center gap-3.5 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-200 relative ${
                    active
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`;
                }}
              >
                {({ isActive: linkActive }) => {
                  const active = isActive || linkActive;
                  return (
                    <>
                      {active && (
                        <span className="absolute left-0 top-1 bottom-1 w-1 bg-amber-500 rounded-r" />
                      )}
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        <Icon className={`w-4.5 h-4.5 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                      </div>
                      <span
                        className={`truncate whitespace-nowrap font-bold transition-all duration-300 ease-in-out ${
                          isOpen 
                            ? 'opacity-100 max-w-[160px] translate-x-0' 
                            : 'opacity-0 max-w-0 -translate-x-2 pointer-events-none'
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings */}
      <div className="p-2 border-t border-slate-200 bg-white">
        <NavLink
          to="/settings"
          title={!isOpen ? "Settings" : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-[#0A2540] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`
          }
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <Settings className="w-4.5 h-4.5 text-slate-500" />
          </div>
          <span
            className={`truncate whitespace-nowrap font-bold transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'opacity-100 max-w-[160px] translate-x-0' 
                : 'opacity-0 max-w-0 -translate-x-2 pointer-events-none'
            }`}
          >
            Settings
          </span>
        </NavLink>
      </div>
    </aside>
  );
};
