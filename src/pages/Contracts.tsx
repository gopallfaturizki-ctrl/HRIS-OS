import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, Table } from '../components/ui';

export default function Contracts() {
  const store = useStore();
  const { showToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Manajemen Kontrak"
        subtitle="Kelola kontrak kerja karyawan"
        icon={<FileText size={20} />}
        actionLabel="Buat Kontrak"
        onAction={() => showToast('info', 'Buat Kontrak', 'Form kontrak akan segera tersedia')}
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
                  <button
                    onClick={() => showToast('info', 'Detail Kontrak', `Melihat detail kontrak ${contract.employeeName}`)}
                    className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
                  >
                    Detail
                  </button>
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
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
