interface StatusBadgeProps {
  status: string;
  type?: 'leave' | 'overtime' | 'payroll' | 'contract' | 'candidate' | 'attendance' | 'employee' | 'training' | 'discipline' | 'shift';
  size?: 'sm' | 'md';
}

const badgeStyles: Record<string, string> = {
  // Common
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-red-50 text-red-700 border-red-200',
  'Draft': 'bg-slate-50 text-slate-700 border-slate-200',
  'Paid': 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Attendance
  'Hadir': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Terlambat': 'bg-amber-50 text-amber-700 border-amber-200',
  'Izin': 'bg-blue-50 text-blue-700 border-blue-200',
  'Sakit': 'bg-purple-50 text-purple-700 border-purple-200',
  'Alpha': 'bg-red-50 text-red-700 border-red-200',

  // Employee status
  'Tetap': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Kontrak': 'bg-blue-50 text-blue-700 border-blue-200',
  'Probation': 'bg-amber-50 text-amber-700 border-amber-200',
  'Magang': 'bg-purple-50 text-purple-700 border-purple-200',

  // Contract
  'Aktif': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Akan Berakhir': 'bg-amber-50 text-amber-700 border-amber-200',
  'Berakhir': 'bg-slate-50 text-slate-700 border-slate-200',
  'Diperpanjang': 'bg-blue-50 text-blue-700 border-blue-200',

  // Training
  'Upcoming': 'bg-blue-50 text-blue-700 border-blue-200',
  'Ongoing': 'bg-amber-50 text-amber-700 border-amber-200',
  'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Discipline
  'SP1': 'bg-amber-50 text-amber-700 border-amber-200',
  'SP2': 'bg-orange-50 text-orange-700 border-orange-200',
  'SP3': 'bg-red-50 text-red-700 border-red-200',
  'PHK': 'bg-red-100 text-red-800 border-red-300',

  // Recruitment
  'Lamaran': 'bg-slate-50 text-slate-700 border-slate-200',
  'Screening': 'bg-blue-50 text-blue-700 border-blue-200',
  'Interview HR': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Interview User': 'bg-purple-50 text-purple-700 border-purple-200',
  'Medical': 'bg-amber-50 text-amber-700 border-amber-200',
  'Offering': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Diterima': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Ditolak': 'bg-red-50 text-red-700 border-red-200',

  // Leave types
  'Cuti Tahunan': 'bg-blue-50 text-blue-700 border-blue-200',
  'Cuti Sakit': 'bg-purple-50 text-purple-700 border-purple-200',
  'Cuti Melahirkan': 'bg-pink-50 text-pink-700 border-pink-200',
  'Cuti Menikah': 'bg-rose-50 text-rose-700 border-rose-200',
  'Izin Khusus': 'bg-cyan-50 text-cyan-700 border-cyan-200',

  // Contract types
  'PKWT': 'bg-blue-50 text-blue-700 border-blue-200',
  'PKWTT': 'bg-emerald-50 text-emerald-700 border-emerald-200',

  // Training types
  'Internal': 'bg-purple-50 text-purple-700 border-purple-200',
  'External': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Online': 'bg-indigo-50 text-indigo-700 border-indigo-200',

  // Discipline categories
  'Ringan': 'bg-amber-50 text-amber-700 border-amber-200',
  'Sedang': 'bg-orange-50 text-orange-700 border-orange-200',
  'Berat': 'bg-red-50 text-red-700 border-red-200',

  // Handover
  'Sudah': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Belum': 'bg-amber-50 text-amber-700 border-amber-200',

  // Resign
  'Proses': 'bg-amber-50 text-amber-700 border-amber-200',
  'Selesai': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const style = badgeStyles[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-medium rounded-md border whitespace-nowrap ${style} ${sizeClass}`}>
      {status}
    </span>
  );
}
