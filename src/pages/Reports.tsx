import { FileText, Download, Users } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard } from '../components/ui';

export default function Reports() {
  const store = useStore();
  const { showToast } = useToast();
  const stats = store.getStats();

  const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('success', 'Download Berhasil', `File ${filename}.csv telah diunduh`);
  };

  const reports = [
    {
      id: '1',
      title: 'Laporan Data Karyawan',
      description: 'Export seluruh data karyawan',
      icon: '👥',
      category: 'Karyawan',
      count: store.employees.length,
      generate: () => {
        const headers = ['NIK', 'Nama', 'Email', 'Telepon', 'Departemen', 'Jabatan', 'Status', 'Tanggal Bergabung'];
        const rows = store.employees.map(e => [e.nik, e.name, e.email, e.phone, e.department, e.position, e.status, e.joinDate]);
        downloadCSV('data-karyawan', headers, rows);
      },
    },
    {
      id: '2',
      title: 'Laporan Kehadiran',
      description: 'Rekap absensi karyawan',
      icon: '📊',
      category: 'Absensi',
      count: store.attendance.length,
      generate: () => {
        const headers = ['Karyawan', 'Tanggal', 'Check In', 'Check Out', 'Status', 'Keterangan'];
        const rows = store.attendance.map(a => [a.employeeName, a.date, a.checkIn, a.checkOut, a.status, a.notes || '']);
        downloadCSV('laporan-kehadiran', headers, rows);
      },
    },
    {
      id: '3',
      title: 'Laporan Cuti & Izin',
      description: 'Rekap pengajuan cuti',
      icon: '📅',
      category: 'Cuti',
      count: store.leaves.length,
      generate: () => {
        const headers = ['Karyawan', 'Tipe', 'Tanggal Mulai', 'Tanggal Selesai', 'Durasi', 'Alasan', 'Status'];
        const rows = store.leaves.map(l => [l.employeeName, l.type, l.startDate, l.endDate, `${l.days} hari`, l.reason, l.status]);
        downloadCSV('laporan-cuti', headers, rows);
      },
    },
    {
      id: '4',
      title: 'Laporan Lembur',
      description: 'Rekap lembur dan biaya',
      icon: '⏰',
      category: 'Lembur',
      count: store.overtime.length,
      generate: () => {
        const headers = ['Karyawan', 'Tanggal', 'Mulai', 'Selesai', 'Durasi (jam)', 'Alasan', 'Status'];
        const rows = store.overtime.map(o => [o.employeeName, o.date, o.startTime, o.endTime, `${o.hours}`, o.reason, o.status]);
        downloadCSV('laporan-lembur', headers, rows);
      },
    },
    {
      id: '5',
      title: 'Laporan Payroll',
      description: 'Detail penggajian',
      icon: '💰',
      category: 'Payroll',
      count: store.payroll.length,
      generate: () => {
        const headers = ['Karyawan', 'Periode', 'Gaji Pokok', 'Tunjangan', 'Lembur', 'Potongan', 'Pajak', 'Gaji Bersih', 'Status'];
        const rows = store.payroll.map(p => [p.employeeName, p.period, p.basicSalary.toString(), p.allowances.toString(), p.overtime.toString(), p.deductions.toString(), p.tax.toString(), p.netSalary.toString(), p.status]);
        downloadCSV('laporan-payroll', headers, rows);
      },
    },
    {
      id: '6',
      title: 'Laporan Rekrutmen',
      description: 'Status pipeline kandidat',
      icon: '🎯',
      category: 'Recruitment',
      count: store.recruitment.length,
      generate: () => {
        const headers = ['Nama', 'Posisi', 'Email', 'Telepon', 'Tanggal Lamar', 'Stage', 'Rating'];
        const rows = store.recruitment.map(c => [c.name, c.position, c.email, c.phone, c.appliedDate, c.stage, c.rating.toString()]);
        downloadCSV('laporan-rekrutmen', headers, rows);
      },
    },
    {
      id: '7',
      title: 'Laporan Kontrak',
      description: 'Status kontrak karyawan',
      icon: '📄',
      category: 'Kontrak',
      count: store.contracts.length,
      generate: () => {
        const headers = ['Karyawan', 'Tipe', 'Tanggal Mulai', 'Tanggal Berakhir', 'Status'];
        const rows = store.contracts.map(c => [c.employeeName, c.type, c.startDate, c.endDate, c.status]);
        downloadCSV('laporan-kontrak', headers, rows);
      },
    },
    {
      id: '8',
      title: 'Laporan Disiplin',
      description: 'Rekap pelanggaran',
      icon: '⚠️',
      category: 'Disiplin',
      count: store.discipline.length,
      generate: () => {
        const headers = ['Karyawan', 'Tanggal', 'Pelanggaran', 'Kategori', 'Sanksi', 'Status'];
        const rows = store.discipline.map(d => [d.employeeName, d.date, d.violation, d.category, d.sanction, d.status]);
        downloadCSV('laporan-disiplin', headers, rows);
      },
    },
    {
      id: '9',
      title: 'Laporan Training',
      description: 'Program pelatihan',
      icon: '🎓',
      category: 'Training',
      count: store.training.length,
      generate: () => {
        const headers = ['Judul', 'Tipe', 'Mulai', 'Selesai', 'Peserta', 'Maks', 'Trainer', 'Status'];
        const rows = store.training.map(t => [t.title, t.type, t.startDate, t.endDate, t.participants.toString(), t.maxParticipants.toString(), t.trainer, t.status]);
        downloadCSV('laporan-training', headers, rows);
      },
    },
  ];

  const handleGenerateReport = (report: typeof reports[0]) => {
    report.generate();
  };

  return (
    <div>
      <PageHeader
        title="Laporan"
        subtitle="Generate dan download laporan HR dalam format CSV"
        icon={<FileText size={20} />}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Karyawan" value={stats.totalEmployees} icon={<Users size={16} />} color="blue" />
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
            <p className="text-xs text-slate-500 mb-2">{report.description}</p>
            <p className="text-xs text-slate-400 mb-4">{report.count} data tersedia</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleGenerateReport(report)}
                disabled={report.count === 0}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText size={14} />
                Generate CSV
              </button>
              <button
                onClick={() => handleGenerateReport(report)}
                disabled={report.count === 0}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
