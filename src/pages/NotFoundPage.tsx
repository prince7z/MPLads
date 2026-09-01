import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-3 bg-red-50 text-red-600 rounded-full border border-red-200 mb-3">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-black text-navy-900">Page Not Found</h1>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
        The requested screen or resource does not exist in the MPLADS AI directory.
      </p>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 bg-navy-900 text-white font-bold text-xs px-4 py-2 rounded-md hover:bg-navy-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
