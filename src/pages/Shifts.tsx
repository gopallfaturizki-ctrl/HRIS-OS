import { useState } from 'react';
import { Clock, Edit, Trash2, Plus } from 'lucide-react';
import { useStore, ShiftSchedule } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader } from '../components/ui';
import Modal from '../components/Modal';

export default function Shifts() {
  const store = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<ShiftSchedule | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    startTime: '08:00',
    endTime: '16:00',
    color: 'bg-blue-100 text-blue-800',
    description: '',
  });

  const openAddModal = () => {
    setEditingShift(null);
    setFormData({
      name: '',
      startTime: '08:00',
      endTime: '16:00',
      color: 'bg-blue-100 text-blue-800',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (shift: ShiftSchedule) => {
    setEditingShift(shift);
    setFormData({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      color: shift.color,
      description: shift.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name) {
      showToast('error', 'Data Tidak Lengkap', 'Nama shift wajib diisi');
      return;
    }

    if (editingShift) {
      // Update shift
      store.shifts = store.shifts.map(s => s.id === editingShift.id ? { ...s, ...formData } : s);
      showToast('success', 'Shift Diperbarui', `${formData.name} berhasil diperbarui`);
    } else {
      // Add new shift (we need to add this to store)
      showToast('info', 'Shift Baru', `${formData.name} akan ditambahkan (fitur dalam pengembangan)`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (shift: ShiftSchedule) => {
    if (confirm(`Hapus shift ${shift.name}?`)) {
      showToast('info', 'Shift Dihapus', `${shift.name} telah dihapus (fitur dalam pengembangan)`);
    }
  };

  // Generate weekly schedule from employees
  const operationalEmployees = store.employees.filter(e => e.department === 'Operasional');
  const weeklySchedule = [
    { day: 'Senin', shifts: operationalEmployees.slice(0, 3).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[idx % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Selasa', shifts: operationalEmployees.slice(0, 3).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[(idx + 1) % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Rabu', shifts: operationalEmployees.slice(0, 3).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[(idx + 2) % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Kamis', shifts: operationalEmployees.slice(0, 3).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[idx % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Jumat', shifts: operationalEmployees.slice(0, 3).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[(idx + 1) % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Sabtu', shifts: operationalEmployees.slice(0, 2).map((emp, idx) => ({ emp: emp.name, shift: store.shifts[idx % store.shifts.length]?.name || 'Shift Pagi' })) },
    { day: 'Minggu', shifts: [{ emp: 'Libur', shift: 'Libur' }] },
  ];

  const getShiftColor = (shiftName: string) => {
    const shift = store.shifts.find(s => s.name === shiftName);
    return shift?.color || 'bg-slate-100 text-slate-600';
  };

  return (
    <div>
      <PageHeader
        title="Manajemen Shift"
        subtitle="Kelola jadwal shift karyawan"
        icon={<Clock size={20} />}
        actionLabel="Tambah Shift"
        onAction={openAddModal}
      />

      {/* Shift Definitions */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Definisi Shift</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {store.shifts.map((shift) => (
            <div key={shift.id} className={`rounded-xl p-4 border ${shift.color.split(' ')[0]} border-opacity-30`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-semibold ${shift.color.split(' ')[1]}`}>{shift.name}</h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(shift)}
                    className="p-1 hover:bg-white/50 rounded transition"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(shift)}
                    className="p-1 hover:bg-white/50 rounded transition"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Clock size={14} className={shift.color.split(' ')[1]} />
                <span className={`text-sm font-medium ${shift.color.split(' ')[1]}`}>
                  {shift.startTime} - {shift.endTime}
                </span>
              </div>
              <p className={`text-xs mt-2 ${shift.color.split(' ')[1]} opacity-75`}>{shift.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Jadwal Mingguan - Operasional</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[700px]">
            {weeklySchedule.map((day) => (
              <div key={day.day} className="border border-slate-100 rounded-lg p-3">
                <h4 className="text-xs font-bold text-slate-700 mb-2 text-center pb-2 border-b border-slate-100">
                  {day.day}
                </h4>
                <div className="space-y-2">
                  {day.shifts.map((s, idx) => (
                    <div key={idx} className={`px-2 py-1.5 rounded text-xs font-medium ${getShiftColor(s.shift)}`}>
                      <p className="font-semibold truncate">{s.emp.split(' ')[0]}</p>
                      <p className="opacity-75 text-[10px]">{s.shift}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Shift Summary */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Ringkasan Shift Karyawan Operasional</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Karyawan</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Jabatan</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Shift Default</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Jam Kerja/Minggu</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {operationalEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-800">{emp.name}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.position}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${store.shifts[0]?.color || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {store.shifts[0]?.name || 'Shift Pagi'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">40 jam</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingShift ? 'Edit Shift' : 'Tambah Shift Baru'} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Shift *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Contoh: Shift Pagi"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jam Mulai *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Jam Selesai *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Deskripsi shift..."
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
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              {editingShift ? 'Simpan Perubahan' : 'Tambah Shift'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
