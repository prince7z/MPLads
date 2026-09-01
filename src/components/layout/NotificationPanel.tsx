import React from 'react';
import { AlertTriangle, Clock, CopyCheck, IndianRupee, Check } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    {
      id: '1',
      title: 'Critical Cost Anomaly Detected',
      desc: 'Project MPL-23981 in Bihar is 61% above cost benchmark.',
      time: '10m ago',
      icon: IndianRupee,
      type: 'critical'
    },
    {
      id: '2',
      title: 'High Delay Probability',
      desc: '43 projects flag >80% probability of deadline overruns.',
      time: '1h ago',
      icon: Clock,
      type: 'high'
    },
    {
      id: '3',
      title: 'Duplicate Work Flagged',
      desc: 'Project MPL-18762 in Nashik has 94% similarity match.',
      time: '2h ago',
      icon: CopyCheck,
      type: 'high'
    },
    {
      id: '4',
      title: 'UC Pending Escalation',
      desc: '12 districts in Uttar Pradesh have overdue UCs > 90 days.',
      time: '5h ago',
      icon: AlertTriangle,
      type: 'medium'
    }
  ];

  return (
    <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden text-xs">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="font-bold text-navy-900">Notifications & Alerts</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-2.5">
              <div className={`p-1.5 rounded h-fit ${
                n.type === 'critical' ? 'bg-red-50 text-red-600' :
                n.type === 'high' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800 flex justify-between">
                  <span>{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t border-slate-200 bg-slate-50 text-center">
        <button className="text-[11px] font-bold text-navy-900 hover:underline">
          View All Notifications
        </button>
      </div>
    </div>
  );
};
