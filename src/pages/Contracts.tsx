import { FileText, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { contractRecords } from '../data/mockData';

export default function Contracts() {
  const statusBadge = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-emerald-100 text-emerald-700';
      case 'Akan Berakhir': return 'bg-amber-100 text-amber-700';
      case 'Berakhir': return 'bg-gray-100 text-gray-700';
      case 'Diperpanjang': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case 'PKWT': return 'bg-blue-100 text-blue-700';
      case 'PKWTT': return 'bg-emerald-100 text-emerald-700';
      case 'Magang': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Manajemen Kontrak</h1>
          <p className="text-sm text-gray-500">Kelola kontrak kerja karyawan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Buat Kontrak
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={16} className="text-emerald-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{contractRecords.filter(c => c.status === 'Aktif').length}</p>
              <p className="text-xs text-gray-500">Kontrak Aktif</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg"><AlertCircle size={16} className="text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{contractRecords.filter(c => c.status === 'Akan Berakhir').length}</p>
              <p className="text-xs text-gray-500">Akan Berakhir</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg"><FileText size={16} className="text-blue-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{contractRecords.filter(c => c.type === 'PKWT').length}</p>
              <p className="text-xs text-gray-500">PKWT</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg"><Clock size={16} className="text-purple-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{contractRecords.filter(c => c.type === 'Magang').length}</p>
              <p className="text-xs text-gray-500">Magang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert for expiring contracts */}
      {contractRecords.filter(c => c.status === 'Akan Berakhir').length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800">Peringatan Kontrak Akan Berakhir</h4>
            <p className="text-xs text-amber-700 mt-1">
              {contractRecords.filter(c => c.status === 'Akan Berakhir').map(c => c.employeeName).join(', ')} - Segera lakukan perpanjangan atau evaluasi.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tipe Kontrak</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal Mulai</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal Berakhir</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Masa Kerja</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {contractRecords.map((contract) => {
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
                  <tr key={contract.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{contract.employeeName}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeBadge(contract.type)}`}>
                        {contract.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{new Date(contract.startDate).toLocaleDateString('id-ID')}</td>
                    <td className="px-4 py-3 text-gray-600">{contract.endDate !== '-' ? new Date(contract.endDate).toLocaleDateString('id-ID') : 'Tidak terbatas'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{masaKerja}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100">Detail</button>
                        {contract.status === 'Akan Berakhir' && (
                          <button className="px-2 py-1 text-xs text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-100">Perpanjang</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
