import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Briefcase,
  CalendarClock,
  Timer,
  FileWarning,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { dashboardStats, attendanceRecords, employees, leaveRequests, contractRecords } from '../data/mockData';

const attendanceData = [
  { name: 'Hadir', value: 7, color: '#10b981' },
  { name: 'Terlambat', value: 1, color: '#f59e0b' },
  { name: 'Izin', value: 1, color: '#3b82f6' },
  { name: 'Sakit', value: 1, color: '#8b5cf6' },
  { name: 'Alpha', value: 1, color: '#ef4444' },
];

const monthlyAttendance = [
  { month: 'Aug', hadir: 92, terlambat: 5, alpha: 3 },
  { month: 'Sep', hadir: 89, terlambat: 7, alpha: 4 },
  { month: 'Oct', hadir: 94, terlambat: 4, alpha: 2 },
  { month: 'Nov', hadir: 91, terlambat: 6, alpha: 3 },
  { month: 'Dec', hadir: 88, terlambat: 8, alpha: 4 },
  { month: 'Jan', hadir: 92, terlambat: 5, alpha: 3 },
];

const departmentData = [
  { name: 'Operasional', employees: 4 },
  { name: 'Finance', employees: 2 },
  { name: 'HRD', employees: 1 },
  { name: 'Marketing', employees: 1 },
  { name: 'IT', employees: 1 },
  { name: 'Warehouse', employees: 1 },
];

const recentActivities = [
  { time: '08:10', action: 'Siti Nurhaliza check-in (Terlambat)', type: 'warning' },
  { time: '07:55', action: 'Ahmad Rizki check-in', type: 'success' },
  { time: '07:50', action: 'Budi Santoso check-in', type: 'success' },
  { time: '07:45', action: 'Fajar Nugroho check-in', type: 'success' },
  { time: '07:00', action: 'Shift Pagi dimulai', type: 'info' },
];

export default function Dashboard() {
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold">Selamat Datang di MR VAPOR HRIS 👋</h1>
        <p className="mt-1 text-emerald-100">Sistem Informasi Sumber Daya Manusia Terpadu</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold">{dashboardStats.attendanceRate}%</p>
            <p className="text-xs text-emerald-100">Tingkat Kehadiran</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold">Rp {(dashboardStats.monthlyPayroll / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-emerald-100">Payroll Bulanan</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold">{dashboardStats.totalEmployees}</p>
            <p className="text-xs text-emerald-100">Total Karyawan</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold">{dashboardStats.openPositions}</p>
            <p className="text-xs text-emerald-100">Posisi Terbuka</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Tren Kehadiran Bulanan (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hadir" stroke="#10b981" strokeWidth={2} name="Hadir" />
              <Line type="monotone" dataKey="terlambat" stroke="#f59e0b" strokeWidth={2} name="Terlambat" />
              <Line type="monotone" dataKey="alpha" stroke="#ef4444" strokeWidth={2} name="Alpha" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Attendance Pie */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Absensi Hari Ini</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Distribusi Karyawan per Departemen</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="employees" fill="#10b981" radius={[4, 4, 0, 0]} name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-xs text-gray-400 font-mono min-w-[40px]">{activity.time}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
                <p className="text-sm text-gray-700">{activity.action}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Aksi Cepat</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">
                + Tambah Karyawan
              </button>
              <button className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition font-medium">
                + Input Absensi
              </button>
              <button className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition font-medium">
                + Buat Payroll
              </button>
              <button className="text-xs bg-amber-50 text-amber-700 px-3 py-2 rounded-lg hover:bg-amber-100 transition font-medium">
                + Posting Lowongan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Menunggu Persetujuan</h3>
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
                <tr key={leave.id} className="border-b border-gray-50">
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
                      <button className="px-2 py-1 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600">Approve</button>
                      <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
