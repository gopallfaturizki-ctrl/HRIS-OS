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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-sm">MV</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-sm leading-tight">MR VAPOR</h1>
                <p className="text-slate-400 text-[10px] leading-tight">HRIS System</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                    ${isActive
                      ? 'bg-emerald-500/15 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`
                  }
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User Profile Footer */}
          <div className="border-t border-slate-800 p-3 flex-shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate leading-tight">Admin HRD</p>
                <p className="text-xs text-slate-400 truncate leading-tight">admin@mrvapor.com</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="text-slate-400 hover:text-white transition p-1 flex-shrink-0"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - with left margin for sidebar on desktop */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-base font-semibold text-slate-800 leading-tight">MR VAPOR HRIS</h2>
                <p className="text-xs text-slate-500 leading-tight hidden sm:block">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
