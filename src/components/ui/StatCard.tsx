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
  emerald: 'bg-emerald-100 text-emerald-600',
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
  cyan: 'bg-cyan-100 text-cyan-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  orange: 'bg-orange-100 text-orange-600',
};

export default function StatCard({ label, value, icon, color = 'emerald', trend, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm transition-all ${
        onClick ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        {icon && (
          <div className={`p-2 rounded-lg ${colorMap[color]}`}>
            {icon}
          </div>
        )}
        {trend && (
          <span className={`text-xs font-medium flex items-center gap-0.5 ${trend.up ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
