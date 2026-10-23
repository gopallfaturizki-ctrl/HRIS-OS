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
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Award,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { dashboardStats, attendanceRecords, employees, leaveRequests, contractRecords } from '../data/mockData';
import { useToast } from '../components/Toast';

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

const payrollTrend = [
  { month: 'Aug', amount: 62 },
  { month: 'Sep', amount: 64 },
  { month: 'Oct', amount: 65 },
  { month: 'Nov', amount: 66 },
  { month: 'Dec', amount: 67 },
  { month: 'Jan', amount: 68.9 },
];

const recentActivities = [
  { time: '08:10', action: 'Siti Nurhaliza check-in (Terlambat 10 menit)', type: 'warning' },
  { time: '07:55', action: 'Ahmad Rizki check-in tepat waktu', type: 'success' },
  { time: '07:50', action: 'Budi Santoso check-in tepat waktu', type: 'success' },
  { time: '07:45', action: 'Fajar Nugroho check-in tepat waktu', type: 'success' },
  { time: '07:30', action: 'Shift Pagi dimulai - 5 karyawan hadir', type: 'info' },
  { time: '07:00', action: 'Sistem HRIS aktif', type: 'info' },
];

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
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Tren Kehadiran Bulanan (%)</h3>
            <span className="text-xs text-gray-500">6 bulan terakhir</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyAttendance}>
              <defs>
                <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="hadir" stroke="#10b981" fill="url(#colorHadir)" strokeWidth={2} name="Hadir" />
              <Line type="monotone" dataKey="terlambat" stroke="#f59e0b" strokeWidth={2} name="Terlambat" />
              <Line type="monotone" dataKey="alpha" stroke="#ef4444" strokeWidth={2} name="Alpha" />
            </AreaChart>
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
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {attendanceData.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department & Payroll */}
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

        {/* Payroll Trend */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Tren Payroll Bulanan (Juta Rp)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={payrollTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`Rp ${value}M`, 'Payroll']} />
              <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} name="Payroll" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Aktivitas Terbaru</h3>
            <Activity size={16} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
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

        {/* Quick Actions & Top Performers */}
        <div className="space-y-6">
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
              <h3 className="text-sm font-semibold text-gray-800">Top Performer</h3>
              <Award size={16} className="text-amber-500" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Ahmad Rizki', score: 88.75, dept: 'Operasional' },
                { name: 'Siti Nurhaliza', score: 87.5, dept: 'Finance' },
                { name: 'Rina Wulandari', score: 84.25, dept: 'Operasional' },
              ].map((perf, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700' :
                    idx === 1 ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{perf.name}</p>
                    <p className="text-xs text-gray-500">{perf.dept}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">{perf.score}</span>
                </div>
              ))}
            </div>
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
  );
}
