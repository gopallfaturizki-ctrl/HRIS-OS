import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  CalendarDays,
  Timer,
  DollarSign,
  UserPlus,
  Target,
  GraduationCap,
  AlertTriangle,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Data Karyawan', icon: Users },
  { path: '/attendance', label: 'Absensi', icon: Clock },
  { path: '/shifts', label: 'Shift', icon: CalendarDays },
  { path: '/leave', label: 'Cuti & Izin', icon: Calendar },
  { path: '/overtime', label: 'Lembur', icon: Timer },
  { path: '/payroll', label: 'Payroll', icon: DollarSign },
  { path: '/recruitment', label: 'Recruitment', icon: UserPlus },
  { path: '/performance', label: 'KPI & Performance', icon: Target },
  { path: '/training', label: 'Training', icon: GraduationCap },
  { path: '/discipline', label: 'Disiplin', icon: AlertTriangle },
  { path: '/contracts', label: 'Kontrak', icon: FileText },
  { path: '/resign', label: 'Resign', icon: LogOut },
];

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-slate-900 to-slate-800 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MV</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm">MR VAPOR</h1>
              <p className="text-slate-400 text-xs">HRIS System</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 px-3 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">Admin HRD</p>
              <p className="text-xs text-slate-400 truncate">admin@mrvapor.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">MR VAPOR HRIS</h2>
              <p className="text-xs text-gray-500">Human Resource Information System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
