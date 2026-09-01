import React from 'react';
import { User, Shield, Key, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 top-11 w-56 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden text-xs">
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="font-bold text-navy-900">Nodal Monitoring Officer</div>
        <div className="text-[11px] text-slate-500">Ministry of Statistics & Programme Implementation</div>
        <div className="text-[10px] text-emerald-700 font-semibold mt-1">Role: Senior Admin</div>
      </div>

      <div className="py-1">
        <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Officer Profile</span>
        </button>
        <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>Access Permissions</span>
        </button>
        <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Key className="w-3.5 h-3.5 text-slate-400" />
          <span>API Tokens & Keys</span>
        </button>
      </div>

      <div className="border-t border-slate-200 py-1">
        <button onClick={onClose} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold">
          <LogOut className="w-3.5 h-3.5 text-red-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
