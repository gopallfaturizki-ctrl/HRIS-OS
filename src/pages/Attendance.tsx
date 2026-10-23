import { useState } from 'react';
import { Clock, Download, Calendar, Plus } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, Table } from '../components/ui';
import Modal from '../components/Modal';

export default function Attendance() {
  const store = useStore();
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'Hadir' as 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit' | 'Alpha',
    notes: '',
  });

  const filtered = store.attendance.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAddAttendance = () => {
    if (!formData.employeeId || !formData.date) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const newAttendance = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: employee.name,
      date: formData.date,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: formData.status,
      notes: formData.notes || undefined,
    };

    store.addAttendance(newAttendance);
    showToast('success', 'Absensi Ditambahkan', `${employee.name} - ${formData.status}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      checkIn: '08:00',
      checkOut: '17:00',
      status: 'Hadir',
      notes: '',
    });
  };

  const handleExportCSV = () => {
    const headers = ['Karyawan', 'Tanggal', 'Check In', 'Check Out', 'Status', 'Keterangan'];
    const rows = store.attendance.map(a => [
      a.employeeName,
      a.date,
      a.checkIn,
      a.checkOut,
      a.status,
      a.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `absensi-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('success', 'Export Berhasil', 'File CSV telah diunduh');
  };

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
        onAction={() => setIsModalOpen(true)}
      >
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Download size={16} /> Export CSV
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
      <Table
        headers={['Karyawan', 'Tanggal', 'Check In', 'Check Out', 'Total Jam', 'Status', 'Keterangan']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada data absensi"
      >
        {filtered.map((record) => {
          const totalHours = record.checkIn !== '-' && record.checkOut !== '-'
            ? `${parseInt(record.checkOut) - parseInt(record.checkIn)}j`
            : '-';
          return (
            <tr key={record.id} className="hover:bg-slate-50 transition">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {record.employeeName.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-800 truncate">{record.employeeName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{record.date}</td>
              <td className="px-4 py-3 text-slate-600 font-mono">{record.checkIn}</td>
              <td className="px-4 py-3 text-slate-600 font-mono">{record.checkOut}</td>
              <td className="px-4 py-3 text-slate-700 font-medium">{totalHours}</td>
              <td className="px-4 py-3">
                <StatusBadge status={record.status} type="attendance" />
              </td>
              <td className="px-4 py-3 text-slate-500 text-xs">{record.notes || '-'}</td>
            </tr>
          );
        })}
      </Table>

      {/* Input Absensi Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Input Absensi" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Karyawan *</label>
            <select
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">Pilih Karyawan</option>
              {store.employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} - {emp.nik}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check In</label>
              <input
                type="time"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Check Out</label>
              <input
                type="time"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpha">Alpha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Catatan tambahan (opsional)"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              onClick={handleAddAttendance}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Simpan Absensi
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
