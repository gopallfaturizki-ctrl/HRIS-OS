import { useState } from 'react';
import { AlertTriangle, FileWarning, Shield, Trash2 } from 'lucide-react';
import { useStore, DisciplineRecord } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';
import Modal from '../components/Modal';

export default function Discipline() {
  const store = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    violation: '',
    category: 'Ringan' as DisciplineRecord['category'],
    sanction: '',
    status: 'SP1' as DisciplineRecord['status'],
  });

  const handleAdd = () => {
    if (!formData.employeeId || !formData.violation || !formData.sanction) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const newRecord: DisciplineRecord = {
      id: String(Date.now()),
      ...formData,
      employeeName: employee.name,
    };

    store.addDiscipline(newRecord);
    showToast('success', 'Pelanggaran Dicatat', `${employee.name} - ${formData.violation}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      violation: '',
      category: 'Ringan',
      sanction: '',
      status: 'SP1',
    });
  };

  const handleDelete = (record: DisciplineRecord) => {
    if (confirm(`Hapus catatan pelanggaran ${record.employeeName}?`)) {
      store.deleteDiscipline(record.id);
      showToast('success', 'Catatan Dihapus', `${record.employeeName} telah dihapus`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Disiplin & Sanksi"
        subtitle="Kelola pelanggaran dan tindakan disipliner karyawan"
        icon={<AlertTriangle size={20} />}
        actionLabel="Catat Pelanggaran"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Ringan" value={store.discipline.filter(d => d.category === 'Ringan').length} icon={<AlertTriangle size={16} />} color="amber" />
        <StatCard label="Sedang" value={store.discipline.filter(d => d.category === 'Sedang').length} icon={<FileWarning size={16} />} color="orange" />
        <StatCard label="Berat" value={store.discipline.filter(d => d.category === 'Berat').length} icon={<Shield size={16} />} color="red" />
        <StatCard label="Total Kasus" value={store.discipline.length} icon={<FileWarning size={16} />} color="purple" />
      </div>

      <div className="space-y-4 mb-6">
        {store.discipline.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <AlertTriangle size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Belum ada catatan pelanggaran</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
            >
              Catat Pelanggaran Pertama
            </button>
          </div>
        ) : (
          store.discipline.map((record) => (
            <div key={record.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${
                    record.category === 'Ringan' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    record.category === 'Sedang' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    'bg-red-100 text-red-700 border-red-200'
                  }`}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-800">{record.employeeName}</h4>
                      <StatusBadge status={record.status} type="discipline" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{record.violation}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>📅 {new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <StatusBadge status={record.category} type="discipline" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Sanksi</p>
                    <p className="text-sm font-medium text-slate-800">{record.sanction}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(record)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Regulation Reference */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Referensi Peraturan Perusahaan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">Pelanggaran Ringan</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Terlambat &gt; 3x dalam sebulan</li>
              <li>• Tidak menggunakan seragam</li>
              <li>• Meninggalkan area kerja tanpa izin</li>
            </ul>
            <p className="text-xs text-amber-600 mt-2 font-medium">Sanksi: Teguran Lisan / SP1</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
            <h4 className="text-sm font-semibold text-orange-800 mb-2">Pelanggaran Sedang</h4>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Alpha tanpa keterangan &gt; 2 hari</li>
              <li>• Melanggar SOP operasional</li>
              <li>• Tidak sopan kepada pelanggan</li>
            </ul>
            <p className="text-xs text-orange-600 mt-2 font-medium">Sanksi: SP1 - SP2</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 mb-2">Pelanggaran Berat</h4>
            <ul className="text-xs text-red-700 space-y-1">
              <li>• Pencurian / penggelapan</li>
              <li>• Kekerasan di tempat kerja</li>
              <li>• Membocorkan rahasia perusahaan</li>
            </ul>
            <p className="text-xs text-red-600 mt-2 font-medium">Sanksi: SP3 / PHK</p>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Catat Pelanggaran Baru" size="md">
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
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pelanggaran *</label>
            <textarea
              value={formData.violation}
              onChange={(e) => setFormData({ ...formData, violation: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Deskripsikan pelanggaran..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as DisciplineRecord['category'] })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Ringan">Ringan</option>
                <option value="Sedang">Sedang</option>
                <option value="Berat">Berat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DisciplineRecord['status'] })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="SP1">SP1</option>
                <option value="SP2">SP2</option>
                <option value="SP3">SP3</option>
                <option value="PHK">PHK</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sanksi *</label>
            <input
              type="text"
              value={formData.sanction}
              onChange={(e) => setFormData({ ...formData, sanction: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Contoh: Surat Peringatan 1"
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
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Catat Pelanggaran
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
