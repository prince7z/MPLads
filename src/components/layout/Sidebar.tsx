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
  Settings 
} from 'lucide-react';
import { EmblemLogo } from '../common/EmblemLogo';

export const Sidebar: React.FC = () => {
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
    <aside className="w-[250px] bg-white border-r border-slate-200 flex flex-col justify-between h-screen fixed left-0 top-0 z-30 select-none shadow-xs">
      <div>
        {/* Emblem & Department Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70">
          <EmblemLogo size="md" />
        </div>

        {/* Navigation Section */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.name === 'Projects' && location.pathname.startsWith('/projects'));

            return (
              <NavLink
                key={item.name + item.path}
                to={item.path}
                className={({ isActive: linkActive }) => {
                  const active = isActive || linkActive;
                  return `flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-md transition-all relative ${
                    active
                      ? 'bg-navy-900 text-white shadow-xs'
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
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span className="truncate">{item.name}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Settings */}
      <div className="p-2 border-t border-slate-200 bg-slate-50/30">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-md transition-all ${
              isActive
                ? 'bg-navy-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};
