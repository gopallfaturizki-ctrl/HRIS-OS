import { useState } from 'react';
import { Clock, Download, Calendar } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter } from '../components/ui';

export default function Attendance() {
  const store = useStore();
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = store.attendance.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const summary = {
    hadir: store.attendance.filter(r => r.status === 'Hadir').length,
    terlambat: store.attendance.filter(r => r.status === 'Terlambat').length,
    izin: store.attendance.filter(r => r.status === 'Izin').length,
    sakit: store.attendance.filter(r => r.status === 'Sakit').length,
    alpha: store.attendance.filter(r => r.status === 'Alpha').length,
  };

  return (
    <div>
      <PageHeader
        title="Absensi Karyawan"
        subtitle="Monitoring kehadiran karyawan harian"
        icon={<Clock size={20} />}
        actionLabel="Input Absensi"
        onAction={() => showToast('info', 'Input Absensi', 'Form input absensi akan segera tersedia')}
      >
        <button
          onClick={() => showToast('info', 'Export', 'Fitur export akan segera tersedia')}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Download size={16} /> Export
        </button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <StatCard label="Hadir" value={summary.hadir} color="emerald" />
        <StatCard label="Terlambat" value={summary.terlambat} color="amber" />
        <StatCard label="Izin" value={summary.izin} color="blue" />
        <StatCard label="Sakit" value={summary.sakit} color="purple" />
        <StatCard label="Alpha" value={summary.alpha} color="red" />
      </div>

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama karyawan..."
        filters={[
          {
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: 'Hadir', value: 'Hadir' },
              { label: 'Terlambat', value: 'Terlambat' },
              { label: 'Izin', value: 'Izin' },
              { label: 'Sakit', value: 'Sakit' },
              { label: 'Alpha', value: 'Alpha' },
            ],
            placeholder: 'Semua Status',
          },
        ]}
        onClear={() => {
          setSearch('');
          setFilterStatus('');
        }}
      />

      {/* Date Picker */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
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
                      <StatusBadge status={record.status} type="attendance" />
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
