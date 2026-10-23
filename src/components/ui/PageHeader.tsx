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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm"
          >
            <Plus size={16} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
