import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard } from '../components/ui';

export default function Reports() {
  const store = useStore();
  const { showToast } = useToast();

  const stats = store.getStats();

  const reports = [
    {
      id: '1',
      title: 'Laporan Kehadiran Bulanan',
      description: 'Rekap absensi karyawan per bulan',
      icon: '📊',
      category: 'Absensi',
    },
    {
      id: '2',
      title: 'Laporan Payroll',
      description: 'Detail penggajian karyawan',
      icon: '💰',
      category: 'Payroll',
    },
    {
      id: '3',
      title: 'Laporan Cuti & Izin',
      description: 'Rekap pengajuan cuti karyawan',
      icon: '📅',
      category: 'Cuti',
    },
    {
      id: '4',
      title: 'Laporan Lembur',
      description: 'Rekap lembur dan biaya',
      icon: '⏰',
      category: 'Lembur',
    },
    {
      id: '5',
      title: 'Laporan KPI',
      description: 'Evaluasi performance karyawan',
      icon: '🎯',
      category: 'Performance',
    },
    {
      id: '6',
      title: 'Laporan Rekrutmen',
      description: 'Status pipeline kandidat',
      icon: '👥',
      category: 'Recruitment',
    },
    {
      id: '7',
      title: 'Laporan Kontrak',
      description: 'Status kontrak karyawan',
      icon: '📄',
      category: 'Kontrak',
    },
    {
      id: '8',
      title: 'Laporan Disiplin',
      description: 'Rekap pelanggaran dan sanksi',
      icon: '⚠️',
      category: 'Disiplin',
    },
  ];

  const handleGenerateReport = (report: typeof reports[0]) => {
    showToast('info', 'Generating Report', `Membuat ${report.title}...`);
    setTimeout(() => {
      showToast('success', 'Report Generated', `${report.title} berhasil dibuat`);
    }, 1500);
  };

  return (
    <div>
      <PageHeader
        title="Laporan"
        subtitle="Generate dan download laporan HR"
        icon={<FileText size={20} />}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Karyawan" value={stats.totalEmployees} color="blue" />
        <StatCard label="Kehadiran" value={`${stats.attendanceRate}%`} color="emerald" />
        <StatCard label="Total Payroll" value={`Rp ${(stats.totalPayroll / 1000000).toFixed(1)}M`} color="purple" />
        <StatCard label="Lowongan" value={stats.openPositions} color="amber" />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{report.icon}</div>
              <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">
                {report.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">{report.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{report.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleGenerateReport(report)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
              >
                <FileText size={14} />
                Generate
              </button>
              <button
                onClick={() => showToast('info', 'Download', 'Mengunduh laporan...')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
