interface StatusBadgeProps {
  status: string;
  type?: 'leave' | 'overtime' | 'payroll' | 'contract' | 'candidate' | 'attendance' | 'employee' | 'training' | 'discipline' | 'shift';
  size?: 'sm' | 'md';
}

const badgeStyles: Record<string, string> = {
  // Common
  'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
  'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-red-100 text-red-700 border-red-200',
  'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
  'Paid': 'bg-emerald-100 text-emerald-700 border-emerald-200',

  // Attendance
  'Hadir': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Terlambat': 'bg-amber-100 text-amber-700 border-amber-200',
  'Izin': 'bg-blue-100 text-blue-700 border-blue-200',
  'Sakit': 'bg-purple-100 text-purple-700 border-purple-200',
  'Alpha': 'bg-red-100 text-red-700 border-red-200',

  // Employee status
  'Tetap': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Kontrak': 'bg-blue-100 text-blue-700 border-blue-200',
  'Probation': 'bg-amber-100 text-amber-700 border-amber-200',
  'Magang': 'bg-purple-100 text-purple-700 border-purple-200',

  // Contract
  'Aktif': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Akan Berakhir': 'bg-amber-100 text-amber-700 border-amber-200',
  'Berakhir': 'bg-gray-100 text-gray-700 border-gray-200',
  'Diperpanjang': 'bg-blue-100 text-blue-700 border-blue-200',

  // Training
  'Upcoming': 'bg-blue-100 text-blue-700 border-blue-200',
  'Ongoing': 'bg-amber-100 text-amber-700 border-amber-200',
  'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',

  // Discipline
  'SP1': 'bg-amber-100 text-amber-700 border-amber-200',
  'SP2': 'bg-orange-100 text-orange-700 border-orange-200',
  'SP3': 'bg-red-100 text-red-700 border-red-200',
  'PHK': 'bg-red-200 text-red-800 border-red-300',

  // Recruitment
  'Lamaran': 'bg-gray-100 text-gray-700 border-gray-200',
  'Screening': 'bg-blue-100 text-blue-700 border-blue-200',
  'Interview HR': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Interview User': 'bg-purple-100 text-purple-700 border-purple-200',
  'Medical': 'bg-amber-100 text-amber-700 border-amber-200',
  'Offering': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Diterima': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Ditolak': 'bg-red-100 text-red-700 border-red-200',

  // Leave types
  'Cuti Tahunan': 'bg-blue-100 text-blue-700 border-blue-200',
  'Cuti Sakit': 'bg-purple-100 text-purple-700 border-purple-200',
  'Cuti Melahirkan': 'bg-pink-100 text-pink-700 border-pink-200',
  'Cuti Menikah': 'bg-rose-100 text-rose-700 border-rose-200',
  'Izin Khusus': 'bg-cyan-100 text-cyan-700 border-cyan-200',

  // Contract types
  'PKWT': 'bg-blue-100 text-blue-700 border-blue-200',
  'PKWTT': 'bg-emerald-100 text-emerald-700 border-emerald-200',

  // Training types
  'Internal': 'bg-purple-100 text-purple-700 border-purple-200',
  'External': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Online': 'bg-indigo-100 text-indigo-700 border-indigo-200',

  // Discipline categories
  'Ringan': 'bg-amber-100 text-amber-700 border-amber-200',
  'Sedang': 'bg-orange-100 text-orange-700 border-orange-200',
  'Berat': 'bg-red-100 text-red-700 border-red-200',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const style = badgeStyles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${style} ${sizeClass}`}>
      {status}
    </span>
  );
}
