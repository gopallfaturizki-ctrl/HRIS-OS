import { useState } from 'react';
import { GraduationCap, Users, Calendar, Clock, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useStore, TrainingProgram } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';
import Modal from '../components/Modal';

export default function Training() {
  const store = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Internal' as TrainingProgram['type'],
    startDate: '',
    endDate: '',
    participants: 0,
    maxParticipants: 10,
    trainer: '',
    status: 'Upcoming' as TrainingProgram['status'],
  });

  const openAddModal = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      type: 'Internal',
      startDate: '',
      endDate: '',
      participants: 0,
      maxParticipants: 10,
      trainer: '',
      status: 'Upcoming',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (program: TrainingProgram) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      type: program.type,
      startDate: program.startDate,
      endDate: program.endDate,
      participants: program.participants,
      maxParticipants: program.maxParticipants,
      trainer: program.trainer,
      status: program.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startDate || !formData.endDate || !formData.trainer) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    if (editingProgram) {
      store.updateTraining(editingProgram.id, formData);
      showToast('success', 'Program Diperbarui', `${formData.title} berhasil diperbarui`);
    } else {
      const newProgram: TrainingProgram = {
        id: String(Date.now()),
        ...formData,
      };
      store.addTraining(newProgram);
      showToast('success', 'Program Ditambahkan', `${formData.title} berhasil ditambahkan`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (program: TrainingProgram) => {
    if (confirm(`Hapus program ${program.title}?`)) {
      store.deleteTraining(program.id);
      showToast('success', 'Program Dihapus', `${program.title} telah dihapus`);
    }
  };

  const handleStatusChange = (program: TrainingProgram, newStatus: TrainingProgram['status']) => {
    store.updateTraining(program.id, { status: newStatus });
    showToast('success', 'Status Diperbarui', `${program.title} → ${newStatus}`);
  };

  return (
    <div>
      <PageHeader
        title="Training & Development"
        subtitle="Kelola program pelatihan dan pengembangan karyawan"
        icon={<GraduationCap size={20} />}
        actionLabel="Buat Program"
        onAction={openAddModal}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Upcoming" value={store.training.filter(t => t.status === 'Upcoming').length} icon={<Calendar size={16} />} color="blue" />
        <StatCard label="Ongoing" value={store.training.filter(t => t.status === 'Ongoing').length} icon={<Clock size={16} />} color="amber" />
        <StatCard label="Completed" value={store.training.filter(t => t.status === 'Completed').length} icon={<CheckCircle size={16} />} color="emerald" />
        <StatCard label="Total Peserta" value={store.training.reduce((s, t) => s + t.participants, 0)} icon={<Users size={16} />} color="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.training.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <GraduationCap size={20} className="text-emerald-600" />
              </div>
              <div className="flex gap-1">
                <StatusBadge status={program.type} type="training" />
                <StatusBadge status={program.status} type="training" />
              </div>
            </div>

            <h4 className="font-semibold text-slate-800 mb-2">{program.title}</h4>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={12} />
                <span>{program.startDate} - {program.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users size={12} />
                <span>{program.participants}/{program.maxParticipants} peserta</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium">Trainer:</span>
                <span>{program.trainer}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Kuota Peserta</span>
                <span>{Math.round((program.participants / program.maxParticipants) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${Math.min((program.participants / program.maxParticipants) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex gap-1 mb-3">
              {(['Upcoming', 'Ongoing', 'Completed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(program, status)}
                  className={`flex-1 py-1 text-xs font-medium rounded transition ${
                    program.status === status
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(program)}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <Edit size={12} /> Edit
              </button>
              <button
                onClick={() => handleDelete(program)}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 size={12} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProgram ? 'Edit Program Training' : 'Buat Program Training'} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Judul Program *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Contoh: Barista Fundamentals"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipe *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TrainingProgram['type'] })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trainer *</label>
              <input
                type="text"
                value={formData.trainer}
                onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Nama trainer"
              />
            </div>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Peserta Saat Ini</label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Maks. Peserta</label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || 10 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
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
              {editingProgram ? 'Simpan Perubahan' : 'Buat Program'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
