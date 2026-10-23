import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Briefcase,
  CalendarClock,
  Timer,
  FileWarning,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award,
} from 'lucide-react';
import { dashboardStats, leaveRequests } from '../data/mockData';
import { useToast } from '../components/Toast';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function Dashboard() {
  const { showToast } = useToast();

  const stats = [
    { label: 'Total Karyawan', value: dashboardStats.totalEmployees, icon: Users, color: 'bg-blue-500', change: '+2', up: true },
    { label: 'Hadir Hari Ini', value: dashboardStats.presentToday, icon: UserCheck, color: 'bg-emerald-500', change: '92%', up: true },
    { label: 'Cuti/Izin', value: dashboardStats.onLeave, icon: UserX, color: 'bg-amber-500', change: '-1', up: false },
    { label: 'Terlambat', value: dashboardStats.lateToday, icon: Clock, color: 'bg-red-500', change: '10%', up: false },
    { label: 'Lowongan Terbuka', value: dashboardStats.openPositions, icon: Briefcase, color: 'bg-purple-500', change: '+1', up: true },
    { label: 'Cuti Pending', value: dashboardStats.pendingLeave, icon: CalendarClock, color: 'bg-cyan-500', change: '3', up: true },
    { label: 'Lembur Pending', value: dashboardStats.pendingOvertime, icon: Timer, color: 'bg-indigo-500', change: '1', up: true },
    { label: 'Kontrak Akan Habis', value: dashboardStats.contractsExpiring, icon: FileWarning, color: 'bg-orange-500', change: '1', up: false },
  ];

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold">Selamat Datang di MR VAPOR HRIS 👋</h1>
            <p className="mt-1 text-emerald-100">Sistem Informasi Sumber Daya Manusia Terpadu</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-2xl font-bold">{dashboardStats.attendanceRate}%</p>
                <p className="text-xs text-emerald-100">Tingkat Kehadiran</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-2xl font-bold">Rp {(dashboardStats.monthlyPayroll / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-emerald-100">Payroll Bulanan</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-2xl font-bold">{dashboardStats.totalEmployees}</p>
                <p className="text-xs text-emerald-100">Total Karyawan</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-2xl font-bold">{dashboardStats.openPositions}</p>
                <p className="text-xs text-emerald-100">Posisi Terbuka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              onClick={() => showToast('info', stat.label, `Total: ${stat.value}`)}
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-2 rounded-lg shadow-sm`}>
                  <stat.icon size={18} className="text-white" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
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

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Aktivitas Terbaru</h3>
              <Activity size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {[
                { time: '08:10', action: 'Siti Nurhaliza check-in (Terlambat 10 menit)', type: 'warning' },
                { time: '07:55', action: 'Ahmad Rizki check-in tepat waktu', type: 'success' },
                { time: '07:50', action: 'Budi Santoso check-in tepat waktu', type: 'success' },
                { time: '07:45', action: 'Fajar Nugroho check-in tepat waktu', type: 'success' },
                { time: '07:30', action: 'Shift Pagi dimulai - 5 karyawan hadir', type: 'info' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <span className="text-xs text-gray-400 font-mono min-w-[40px] mt-0.5">{activity.time}</span>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'warning' ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`} />
                  <p className="text-sm text-gray-700">{activity.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Menunggu Persetujuan</h3>
            <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              {leaveRequests.filter(l => l.status === 'Pending').length} pending
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Karyawan</th>
                  <th className="pb-2 font-medium">Tipe</th>
                  <th className="pb-2 font-medium">Tanggal</th>
                  <th className="pb-2 font-medium">Durasi</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.filter(l => l.status === 'Pending').map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 font-medium text-gray-800">{leave.employeeName}</td>
                    <td className="py-3 text-gray-600">{leave.type}</td>
                    <td className="py-3 text-gray-600">{leave.startDate} - {leave.endDate}</td>
                    <td className="py-3 text-gray-600">{leave.days} hari</td>
                    <td className="py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                        {leave.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => showToast('success', 'Cuti Disetujui', `${leave.employeeName} - ${leave.days} hari`)}
                          className="px-2 py-1 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => showToast('error', 'Cuti Ditolak', `${leave.employeeName} - ${leave.days} hari`)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
