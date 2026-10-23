import { AlertTriangle, FileWarning, Shield } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';

export default function Discipline() {
  const store = useStore();
  const { showToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Disiplin & Sanksi"
        subtitle="Kelola pelanggaran dan tindakan disipliner karyawan"
        icon={<AlertTriangle size={20} />}
        actionLabel="Catat Pelanggaran"
        onAction={() => showToast('info', 'Catat Pelanggaran', 'Form pencatatan pelanggaran akan segera tersedia')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Ringan" value={store.discipline.filter(d => d.category === 'Ringan').length} icon={<AlertTriangle size={16} />} color="amber" />
        <StatCard label="Sedang" value={store.discipline.filter(d => d.category === 'Sedang').length} icon={<FileWarning size={16} />} color="orange" />
        <StatCard label="Berat" value={store.discipline.filter(d => d.category === 'Berat').length} icon={<Shield size={16} />} color="red" />
        <StatCard label="Total Kasus" value={store.discipline.length} icon={<FileWarning size={16} />} color="purple" />
      </div>

      <div className="space-y-4 mb-6">
        {store.discipline.map((record) => (
          <div key={record.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
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
                    <h4 className="font-semibold text-gray-800">{record.employeeName}</h4>
                    <StatusBadge status={record.status} type="discipline" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{record.violation}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📅 {new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <StatusBadge status={record.category} type="discipline" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Sanksi</p>
                <p className="text-sm font-medium text-gray-800">{record.sanction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regulation Reference */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Referensi Peraturan Perusahaan</h3>
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
    </div>
  );
}
