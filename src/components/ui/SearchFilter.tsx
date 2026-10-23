import { Search, Filter, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
  }[];
  onClear?: () => void;
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Cari...',
  filters = [],
  onClear,
}: SearchFilterProps) {
  const hasActiveFilters = searchValue || filters.some(f => f.value);

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
        </div>
        {filters.map((filter, idx) => (
          <select
            key={idx}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          >
            <option value="">{filter.placeholder || 'Semua'}</option>
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}
        {hasActiveFilters && onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
