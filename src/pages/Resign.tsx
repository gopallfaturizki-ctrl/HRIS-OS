import { useState } from 'react';
import { UserX, FileText, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { useStore, ResignRecord } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';
import Modal from '../components/Modal';

export default function Resign() {
  const store = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    resignDate: new Date().toISOString().split('T')[0],
    lastDay: '',
    reason: '',
    notice: '30 hari',
  });

  const handleAdd = () => {
    if (!formData.employeeId || !formData.lastDay || !formData.reason) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const newRecord: ResignRecord = {
      id: String(Date.now()),
      ...formData,
      employeeName: employee.name,
      status: 'Proses',
      handover: 'Belum',
    };

    store.addResign(newRecord);
    showToast('success', 'Resign Dicatat', `${employee.name} - ${formData.reason}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      resignDate: new Date().toISOString().split('T')[0],
      lastDay: '',
      reason: '',
      notice: '30 hari',
    });
  };

  const handleStatusChange = (record: ResignRecord, newStatus: ResignRecord['status']) => {
    store.updateResign(record.id, { status: newStatus });
    showToast('success', 'Status Diperbarui', `${record.employeeName} → ${newStatus}`);
  };

  const handleHandover = (record: ResignRecord) => {
    store.updateResign(record.id, { handover: 'Sudah' });
    showToast('success', 'Handover Selesai', `${record.employeeName} telah menyelesaikan handover`);
  };

  const handleDelete = (record: ResignRecord) => {
    if (confirm(`Hapus catatan resign ${record.employeeName}?`)) {
      store.deleteResign(record.id);
      showToast('success', 'Catatan Dihapus', `${record.employeeName} telah dihapus`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Resign & Exit"
        subtitle="Kelola proses pengunduran diri karyawan"
        icon={<UserX size={20} />}
        actionLabel="Proses Resign"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Dalam Proses" value={store.resign.filter(r => r.status === 'Proses').length} icon={<AlertTriangle size={16} />} color="amber" />
        <StatCard label="Selesai" value={store.resign.filter(r => r.status === 'Selesai').length} icon={<CheckCircle size={16} />} color="emerald" />
        <StatCard label="Handover Pending" value={store.resign.filter(r => r.handover === 'Belum').length} icon={<FileText size={16} />} color="blue" />
        <StatCard label="Total (6 bulan)" value={store.resign.length} icon={<UserX size={16} />} color="red" />
      </div>

      {/* Exit Checklist */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Exit Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { step: '1', title: 'Surat Resign', desc: 'Karyawan mengajukan surat pengunduran diri', done: true },
            { step: '2', title: 'Interview Exit', desc: 'HR melakukan exit interview', done: true },
            { step: '3', title: 'Handover', desc: 'Serah terima tugas dan tanggung jawab', done: false },
            { step: '4', title: 'Clearance', desc: 'Pengembalian aset & clearance semua divisi', done: false },
            { step: '5', title: 'Final Pay', desc: 'Perhitungan gaji akhir & hak karyawan', done: false },
            { step: '6', title: 'Paklaring', desc: 'Penerbitan surat pengalaman kerja', done: false },
            { step: '7', title: 'Non-aktifkan Akses', desc: 'Cabut akses sistem, email, dan fasilitas', done: false },
            { step: '8', title: 'Update Data', desc: 'Update status karyawan di sistem', done: false },
          ].map((item) => (
            <div key={item.step} className={`p-3 rounded-lg border ${item.done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>
                  {item.done ? '✓' : item.step}
                </span>
                <h4 className="text-xs font-semibold text-slate-800">{item.title}</h4>
              </div>
              <p className="text-[10px] text-slate-500 ml-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resign Records */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800">Riwayat Resign</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Karyawan</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Tgl Resign</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Hari Terakhir</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Alasan</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Handover</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {store.resign.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    Belum ada data resign
                  </td>
                </tr>
              ) : (
                store.resign.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800">{record.employeeName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(record.resignDate).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 text-slate-600">{new Date(record.lastDay).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{record.reason}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={record.handover} />
                        {record.handover === 'Belum' && (
                          <button
                            onClick={() => handleHandover(record)}
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Selesai
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStatusChange(record, 'Proses')}
                          className={`px-2 py-0.5 text-xs font-medium rounded transition ${
                            record.status === 'Proses' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Proses
                        </button>
                        <button
                          onClick={() => handleStatusChange(record, 'Selesai')}
                          className={`px-2 py-0.5 text-xs font-medium rounded transition ${
                            record.status === 'Selesai' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Selesai
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(record)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Proses Resign Karyawan" size="md">
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Resign *</label>
              <input
                type="date"
                value={formData.resignDate}
                onChange={(e) => setFormData({ ...formData, resignDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hari Terakhir *</label>
              <input
                type="date"
                value={formData.lastDay}
                onChange={(e) => setFormData({ ...formData, lastDay: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alasan Resign *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Alasan pengunduran diri..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notice Period</label>
            <input
              type="text"
              value={formData.notice}
              onChange={(e) => setFormData({ ...formData, notice: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="30 hari"
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
              Proses Resign
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
