import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, ActionButtons, Table } from '../components/ui';
import Modal from '../components/Modal';

export default function Leave() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    type: 'Cuti Tahunan' as 'Cuti Tahunan' | 'Cuti Sakit' | 'Cuti Melahirkan' | 'Cuti Menikah' | 'Izin Khusus',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: '',
  });

  const filtered = store.leaves.filter(r => {
    const matchStatus = !filterStatus || r.status === filterStatus;
    const matchType = !filterType || r.type === filterType;
    return matchStatus && matchType;
  });

  const handleAddLeave = () => {
    if (!formData.employeeId || !formData.startDate || !formData.endDate || !formData.reason) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newLeave = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: employee.name,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days,
      reason: formData.reason,
      status: 'Pending' as const,
    };

    store.addLeave(newLeave);
    showToast('success', 'Pengajuan Cuti Dibuat', `${employee.name} - ${formData.type}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      type: 'Cuti Tahunan',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: '',
    });
  };

  return (
    <div>
      <PageHeader
        title="Cuti & Izin"
        subtitle="Kelola pengajuan cuti dan izin karyawan"
        icon={<Calendar size={20} />}
        actionLabel="Ajukan Cuti"
        onAction={() => setIsModalOpen(true)}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Pending" value={store.leaves.filter(l => l.status === 'Pending').length} color="amber" />
        <StatCard label="Disetujui" value={store.leaves.filter(l => l.status === 'Approved').length} color="emerald" />
        <StatCard label="Ditolak" value={store.leaves.filter(l => l.status === 'Rejected').length} color="red" />
        <StatCard label="Total Hari" value={store.leaves.reduce((sum, l) => sum + l.days, 0)} color="blue" />
      </div>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Cari karyawan..."
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
          {
            value: filterType,
            onChange: setFilterType,
            options: [
              { label: 'Cuti Tahunan', value: 'Cuti Tahunan' },
              { label: 'Cuti Sakit', value: 'Cuti Sakit' },
              { label: 'Cuti Melahirkan', value: 'Cuti Melahirkan' },
              { label: 'Cuti Menikah', value: 'Cuti Menikah' },
              { label: 'Izin Khusus', value: 'Izin Khusus' },
            ],
            placeholder: 'Semua Tipe',
          },
        ]}
        onClear={() => {
          setFilterStatus('');
          setFilterType('');
        }}
      />

      {/* Table */}
      <Table
        headers={['Karyawan', 'Tipe Cuti', 'Periode', 'Durasi', 'Alasan', 'Status', 'Disetujui', 'Aksi']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada pengajuan cuti"
      >
        {filtered.map((leave) => (
          <tr key={leave.id} className="hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium text-slate-800">{leave.employeeName}</td>
            <td className="px-4 py-3">
              <StatusBadge status={leave.type} type="leave" />
            </td>
            <td className="px-4 py-3 text-slate-600">{leave.startDate} - {leave.endDate}</td>
            <td className="px-4 py-3 text-slate-600">{leave.days} hari</td>
            <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{leave.reason}</td>
            <td className="px-4 py-3">
              <StatusBadge status={leave.status} />
            </td>
            <td className="px-4 py-3 text-slate-600">{leave.approvedBy || '-'}</td>
            <td className="px-4 py-3">
              {leave.status === 'Pending' ? (
                <ActionButtons
                  showApproveReject
                  onApprove={() => {
                    store.approveLeave(leave.id);
                    showToast('success', 'Cuti Disetujui', `${leave.employeeName} - ${leave.type}`);
                  }}
                  onReject={() => {
                    store.rejectLeave(leave.id);
                    showToast('error', 'Cuti Ditolak', `${leave.employeeName} - ${leave.type}`);
                  }}
                />
              ) : (
                <span className="text-xs text-slate-400">-</span>
              )}
            </td>
          </tr>
        ))}
      </Table>

      {/* Ajukan Cuti Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajukan Cuti" size="md">
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Cuti *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Melahirkan">Cuti Melahirkan</option>
              <option value="Cuti Menikah">Cuti Menikah</option>
              <option value="Izin Khusus">Izin Khusus</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Mulai *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Selesai *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alasan *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Jelaskan alasan pengajuan cuti..."
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
              onClick={handleAddLeave}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Ajukan Cuti
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
