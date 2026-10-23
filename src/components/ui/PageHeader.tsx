import { ReactNode } from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, actionLabel, onAction, icon, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100 text-emerald-600">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5 leading-tight truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
        {children}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm shadow-emerald-600/20"
          >
            <Plus size={16} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
