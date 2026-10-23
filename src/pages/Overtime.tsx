import { useState } from 'react';
import { Timer } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, ActionButtons, Table } from '../components/ui';
import Modal from '../components/Modal';

export default function Overtime() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '17:00',
    endTime: '20:00',
    hours: 3,
    reason: '',
  });

  const filtered = store.overtime.filter(r => !filterStatus || r.status === filterStatus);
  const totalHours = store.overtime.filter(o => o.status === 'Approved').reduce((sum, o) => sum + o.hours, 0);
  const totalCost = totalHours * 25000;

  const handleAddOvertime = () => {
    if (!formData.employeeId || !formData.date || !formData.reason) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const newOvertime = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: employee.name,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      hours: formData.hours,
      reason: formData.reason,
      status: 'Pending' as const,
    };

    store.addOvertime(newOvertime);
    showToast('success', 'Pengajuan Lembur Dibuat', `${employee.name} - ${formData.hours} jam`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '17:00',
      endTime: '20:00',
      hours: 3,
      reason: '',
    });
  };

  return (
    <div>
      <PageHeader
        title="Lembur Karyawan"
        subtitle="Kelola pengajuan dan approval lembur"
        icon={<Timer size={20} />}
        actionLabel="Ajukan Lembur"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total Pengajuan" value={store.overtime.length} color="indigo" />
        <StatCard label="Pending" value={store.overtime.filter(o => o.status === 'Pending').length} color="amber" />
        <StatCard label="Total Jam (Approved)" value={`${totalHours} jam`} color="emerald" />
        <StatCard label="Estimasi Biaya" value={`Rp ${(totalCost / 1000).toFixed(0)}K`} color="emerald" />
      </div>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        filters={[
          {
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ],
            placeholder: 'Semua Status',
          },
        ]}
        onClear={() => setFilterStatus('')}
      />

      <Table
        headers={['Karyawan', 'Tanggal', 'Waktu', 'Durasi', 'Alasan', 'Status', 'Aksi']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada data lembur"
      >
        {filtered.map((record) => (
          <tr key={record.id} className="hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium text-slate-800">{record.employeeName}</td>
            <td className="px-4 py-3 text-slate-600">{record.date}</td>
            <td className="px-4 py-3 text-slate-600 font-mono">{record.startTime} - {record.endTime}</td>
            <td className="px-4 py-3 text-slate-700 font-medium">{record.hours} jam</td>
            <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{record.reason}</td>
            <td className="px-4 py-3">
              <StatusBadge status={record.status} />
            </td>
            <td className="px-4 py-3">
              {record.status === 'Pending' ? (
                <ActionButtons
                  showApproveReject
                  onApprove={() => {
                    store.approveOvertime(record.id);
                    showToast('success', 'Lembur Disetujui', `${record.employeeName} - ${record.hours} jam`);
                  }}
                  onReject={() => {
                    store.rejectOvertime(record.id);
                    showToast('error', 'Lembur Ditolak', `${record.employeeName} - ${record.hours} jam`);
                  }}
                />
              ) : <span className="text-xs text-slate-400">-</span>}
            </td>
          </tr>
        ))}
      </Table>

      {/* Ajukan Lembur Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajukan Lembur" size="md">
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Jam Mulai</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Durasi (jam)</label>
            <input
              type="number"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 0 })}
              min="0.5"
              step="0.5"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alasan *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Jelaskan alasan lembur..."
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
              onClick={handleAddOvertime}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Ajukan Lembur
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
