import { Users, UserCheck, UserX, Clock, Briefcase, CalendarClock, Timer, FileWarning, Activity, Award } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, ActionButtons, Table } from '../components/ui';

export default function Dashboard() {
  const store = useStore();
  const { showToast } = useToast();
  const stats = store.getStats();

  const pendingLeaves = store.leaves.filter(l => l.status === 'Pending');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan data HR MR VAPOR"
        icon={<Activity size={20} />}
      />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">Selamat Datang di MR VAPOR HRIS 👋</h1>
          <p className="mt-1 text-emerald-100">Sistem Informasi Sumber Daya Manusia Terpadu</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
              <p className="text-xs text-emerald-100">Tingkat Kehadiran</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-bold">Rp {(stats.totalPayroll / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-emerald-100">Payroll Bulanan</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-bold">{stats.totalEmployees}</p>
              <p className="text-xs text-emerald-100">Total Karyawan</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-bold">{stats.openPositions}</p>
              <p className="text-xs text-emerald-100">Posisi Terbuka</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Karyawan"
          value={stats.totalEmployees}
          icon={<Users size={18} className="text-white" />}
          color="blue"
          trend={{ value: '+2', up: true }}
        />
        <StatCard
          label="Hadir Hari Ini"
          value={stats.presentToday}
          icon={<UserCheck size={18} className="text-white" />}
          color="emerald"
          trend={{ value: `${stats.attendanceRate}%`, up: true }}
        />
        <StatCard
          label="Cuti/Izin"
          value={stats.onLeave}
          icon={<UserX size={18} className="text-white" />}
          color="amber"
        />
        <StatCard
          label="Terlambat"
          value={stats.lateToday}
          icon={<Clock size={18} className="text-white" />}
          color="red"
        />
        <StatCard
          label="Lowongan Terbuka"
          value={stats.openPositions}
          icon={<Briefcase size={18} className="text-white" />}
          color="purple"
        />
        <StatCard
          label="Cuti Pending"
          value={stats.pendingLeaves}
          icon={<CalendarClock size={18} className="text-white" />}
          color="cyan"
        />
        <StatCard
          label="Lembur Pending"
          value={stats.pendingOvertime}
          icon={<Timer size={18} className="text-white" />}
          color="indigo"
        />
        <StatCard
          label="Kontrak Akan Habis"
          value={stats.expiringContracts}
          icon={<FileWarning size={18} className="text-white" />}
          color="orange"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('info', 'Tambah Karyawan', 'Membuka form tambah karyawan...')}
              className="text-xs bg-emerald-50 text-emerald-700 px-3 py-3 rounded-lg hover:bg-emerald-100 transition font-medium border border-emerald-100"
            >
              👤 Tambah Karyawan
            </button>
            <button
              onClick={() => showToast('info', 'Input Absensi', 'Membuka form absensi...')}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-3 rounded-lg hover:bg-blue-100 transition font-medium border border-blue-100"
            >
              ⏰ Input Absensi
            </button>
            <button
              onClick={() => showToast('info', 'Buat Payroll', 'Membuka form payroll...')}
              className="text-xs bg-purple-50 text-purple-700 px-3 py-3 rounded-lg hover:bg-purple-100 transition font-medium border border-purple-100"
            >
              💰 Buat Payroll
            </button>
            <button
              onClick={() => showToast('info', 'Posting Lowongan', 'Membuka form lowongan...')}
              className="text-xs bg-amber-50 text-amber-700 px-3 py-3 rounded-lg hover:bg-amber-100 transition font-medium border border-amber-100"
            >
              📢 Posting Lowongan
            </button>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Top Performer (KPI)</h3>
            <Award size={16} className="text-amber-500" />
          </div>
          <div className="space-y-3">
            {store.kpi.slice(0, 3).map((perf, idx) => (
              <div key={perf.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-amber-100 text-amber-700' :
                  idx === 1 ? 'bg-gray-100 text-gray-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{perf.employeeName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                        style={{ width: `${perf.finalScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{perf.finalScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Menunggu Persetujuan</h3>
          <span className="px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
            {pendingLeaves.length} pending
          </span>
        </div>
        <Table
          headers={['Karyawan', 'Tipe', 'Tanggal', 'Durasi', 'Status', 'Aksi']}
          isEmpty={pendingLeaves.length === 0}
          emptyMessage="Tidak ada pengajuan yang menunggu persetujuan"
        >
          {pendingLeaves.map((leave) => (
            <tr key={leave.id} className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-medium text-slate-800">{leave.employeeName}</td>
              <td className="px-4 py-3">
                <StatusBadge status={leave.type} />
              </td>
              <td className="px-4 py-3 text-slate-600">{leave.startDate} - {leave.endDate}</td>
              <td className="px-4 py-3 text-slate-600">{leave.days} hari</td>
              <td className="px-4 py-3">
                <StatusBadge status={leave.status} />
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  showApproveReject
                  onApprove={() => {
                    store.approveLeave(leave.id);
                    showToast('success', 'Cuti Disetujui', `${leave.employeeName} - ${leave.days} hari`);
                  }}
                  onReject={() => {
                    store.rejectLeave(leave.id);
                    showToast('error', 'Cuti Ditolak', `${leave.employeeName} - ${leave.days} hari`);
                  }}
                />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
