import { useState } from 'react';
import { Search, Calendar, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import { attendanceRecords } from '../data/mockData';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = attendanceRecords.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const summary = {
    hadir: attendanceRecords.filter(r => r.status === 'Hadir').length,
    terlambat: attendanceRecords.filter(r => r.status === 'Terlambat').length,
    izin: attendanceRecords.filter(r => r.status === 'Izin').length,
    sakit: attendanceRecords.filter(r => r.status === 'Sakit').length,
    alpha: attendanceRecords.filter(r => r.status === 'Alpha').length,
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'Hadir': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'Terlambat': return <Clock size={14} className="text-amber-500" />;
      case 'Izin': return <CheckCircle size={14} className="text-blue-500" />;
      case 'Sakit': return <XCircle size={14} className="text-purple-500" />;
      case 'Alpha': return <XCircle size={14} className="text-red-500" />;
      default: return null;
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Hadir': return 'bg-emerald-100 text-emerald-700';
      case 'Terlambat': return 'bg-amber-100 text-amber-700';
      case 'Izin': return 'bg-blue-100 text-blue-700';
      case 'Sakit': return 'bg-purple-100 text-purple-700';
      case 'Alpha': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Absensi Karyawan</h1>
          <p className="text-sm text-gray-500">Monitoring kehadiran karyawan harian</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <CheckCircle size={16} /> Input Absensi
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-700">{summary.hadir}</p>
          <p className="text-xs text-emerald-600 mt-1">Hadir</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{summary.terlambat}</p>
          <p className="text-xs text-amber-600 mt-1">Terlambat</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{summary.izin}</p>
          <p className="text-xs text-blue-600 mt-1">Izin</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-700">{summary.sakit}</p>
          <p className="text-xs text-purple-600 mt-1">Sakit</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{summary.alpha}</p>
          <p className="text-xs text-red-600 mt-1">Alpha</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama karyawan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Semua Status</option>
            <option value="Hadir">Hadir</option>
            <option value="Terlambat">Terlambat</option>
            <option value="Izin">Izin</option>
            <option value="Sakit">Sakit</option>
            <option value="Alpha">Alpha</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Check In</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Check Out</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Total Jam</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => {
                const totalHours = record.checkIn !== '-' && record.checkOut !== '-'
                  ? `${parseInt(record.checkOut) - parseInt(record.checkIn)}j`
                  : '-';
                return (
                  <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                          {record.employeeName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{record.date}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono">{record.checkIn}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono">{record.checkOut}</td>
                    <td className="px-4 py-3 text-gray-600 font-medium">{totalHours}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusBadge(record.status)}`}>
                        {statusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{record.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
