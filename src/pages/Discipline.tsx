import { AlertTriangle, Plus, FileWarning, Shield } from 'lucide-react';
import { disciplineRecords } from '../data/mockData';

export default function Discipline() {
  const categoryColor = (category: string) => {
    switch (category) {
      case 'Ringan': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Sedang': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Berat': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'SP1': return 'bg-amber-100 text-amber-700';
      case 'SP2': return 'bg-orange-100 text-orange-700';
      case 'SP3': return 'bg-red-100 text-red-700';
      case 'PHK': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Disiplin & Sanksi</h1>
          <p className="text-sm text-gray-500">Kelola pelanggaran dan tindakan disipliner karyawan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Catat Pelanggaran
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg"><AlertTriangle size={16} className="text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{disciplineRecords.filter(d => d.category === 'Ringan').length}</p>
              <p className="text-xs text-gray-500">Ringan</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg"><FileWarning size={16} className="text-orange-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{disciplineRecords.filter(d => d.category === 'Sedang').length}</p>
              <p className="text-xs text-gray-500">Sedang</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg"><Shield size={16} className="text-red-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{disciplineRecords.filter(d => d.category === 'Berat').length}</p>
              <p className="text-xs text-gray-500">Berat</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-lg"><FileWarning size={16} className="text-gray-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{disciplineRecords.length}</p>
              <p className="text-xs text-gray-500">Total Kasus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discipline Cards */}
      <div className="space-y-4">
        {disciplineRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${categoryColor(record.category)}`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{record.employeeName}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{record.violation}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📅 {new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className={`px-2 py-0.5 rounded-full border ${categoryColor(record.category)}`}>{record.category}</span>
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
