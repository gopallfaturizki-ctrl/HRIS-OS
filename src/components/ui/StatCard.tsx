import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'emerald' | 'blue' | 'amber' | 'red' | 'purple' | 'cyan' | 'indigo' | 'orange';
  trend?: { value: string; up: boolean };
  onClick?: () => void;
}

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  red: 'bg-red-50 text-red-600 border-red-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  orange: 'bg-orange-50 text-orange-600 border-orange-100',
};

export default function StatCard({ label, value, icon, color = 'emerald', trend, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-slate-200 transition-all h-full flex flex-col
        ${onClick ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-slate-300' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={`p-2.5 rounded-lg border ${colorMap[color]}`}>
            {icon}
          </div>
        )}
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-1 rounded-md
            ${trend.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="mt-auto">
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        <p className="text-xs text-slate-500 mt-1 leading-tight">{label}</p>
      </div>
    </div>
  );
}
