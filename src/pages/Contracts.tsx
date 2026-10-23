import { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { useStore, ContractRecord } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, Table } from '../components/ui';
import Modal from '../components/Modal';

export default function Contracts() {
  const store = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: '',
    type: 'PKWT' as ContractRecord['type'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  const handleAddContract = () => {
    if (!formData.employeeId || !formData.startDate) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const newContract: ContractRecord = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: employee.name,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate || '-',
      status: 'Aktif',
    };

    store.addContract(newContract);
    showToast('success', 'Kontrak Dibuat', `${employee.name} - ${formData.type}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      type: 'PKWT',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
  };

  const handleDelete = (contract: ContractRecord) => {
    if (confirm(`Hapus kontrak ${contract.employeeName}?`)) {
      store.deleteContract(contract.id);
      showToast('success', 'Kontrak Dihapus', `${contract.employeeName} telah dihapus`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Manajemen Kontrak"
        subtitle="Kelola kontrak kerja karyawan"
        icon={<FileText size={20} />}
        actionLabel="Buat Kontrak"
        onAction={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Kontrak Aktif" value={store.contracts.filter(c => c.status === 'Aktif').length} icon={<CheckCircle size={16} />} color="emerald" />
        <StatCard label="Akan Berakhir" value={store.contracts.filter(c => c.status === 'Akan Berakhir').length} icon={<AlertCircle size={16} />} color="amber" />
        <StatCard label="PKWT" value={store.contracts.filter(c => c.type === 'PKWT').length} icon={<FileText size={16} />} color="blue" />
        <StatCard label="Magang" value={store.contracts.filter(c => c.type === 'Magang').length} icon={<Clock size={16} />} color="purple" />
      </div>

      {/* Alert for expiring contracts */}
      {store.contracts.filter(c => c.status === 'Akan Berakhir').length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mb-4">
          <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800">Peringatan Kontrak Akan Berakhir</h4>
            <p className="text-xs text-amber-700 mt-1">
              {store.contracts.filter(c => c.status === 'Akan Berakhir').map(c => c.employeeName).join(', ')} - Segera lakukan perpanjangan atau evaluasi.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <Table
        headers={['Karyawan', 'Tipe Kontrak', 'Tanggal Mulai', 'Tanggal Berakhir', 'Masa Kerja', 'Status', 'Aksi']}
        isEmpty={store.contracts.length === 0}
        emptyMessage="Tidak ada data kontrak"
      >
        {store.contracts.map((contract) => {
          const masaKerja = contract.endDate !== '-'
            ? (() => {
                const start = new Date(contract.startDate);
                const end = new Date(contract.endDate);
                const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                return `${months} bulan`;
              })()
            : (() => {
                const start = new Date(contract.startDate);
                const now = new Date();
                const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
                return `${months} bulan (s.d. sekarang)`;
              })();

          return (
            <tr key={contract.id} className="hover:bg-slate-50 transition">
              <td className="px-4 py-3 font-medium text-slate-800">{contract.employeeName}</td>
              <td className="px-4 py-3">
                <StatusBadge status={contract.type} type="contract" />
              </td>
              <td className="px-4 py-3 text-slate-600">{new Date(contract.startDate).toLocaleDateString('id-ID')}</td>
              <td className="px-4 py-3 text-slate-600">{contract.endDate !== '-' ? new Date(contract.endDate).toLocaleDateString('id-ID') : 'Tidak terbatas'}</td>
              <td className="px-4 py-3 text-slate-600 text-xs">{masaKerja}</td>
              <td className="px-4 py-3">
                <StatusBadge status={contract.status} type="contract" />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1.5">
                  {contract.status === 'Akan Berakhir' && (
                    <button
                      onClick={() => {
                        store.extendContract(contract.id);
                        showToast('success', 'Kontrak Diperpanjang', `${contract.employeeName}`);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition"
                    >
                      Perpanjang
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(contract)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>

      {/* Buat Kontrak Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Buat Kontrak Baru" size="md">
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Kontrak *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ContractRecord['type'] })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="PKWT">PKWT (Kontrak)</option>
              <option value="PKWTT">PKWTT (Tetap)</option>
              <option value="Magang">Magang</option>
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Berakhir</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Kosongkan jika kontrak tidak terbatas</p>
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
              onClick={handleAddContract}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Buat Kontrak
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
