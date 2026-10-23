import { UserX, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';

const resignRecords = [
  { id: '1', name: 'Rudi Hermawan', position: 'Barista', department: 'Operasional', resignDate: '2024-01-10', lastDay: '2024-02-10', reason: 'Pindah domisili', status: 'Proses', handover: 'Belum', notice: '30 hari' },
  { id: '2', name: 'Diana Putri', position: 'Admin', department: 'Finance', resignDate: '2023-12-15', lastDay: '2024-01-15', reason: 'Menikah', status: 'Selesai', handover: 'Sudah', notice: '30 hari' },
  { id: '3', name: 'Agus Setiawan', position: 'Driver', department: 'Operasional', resignDate: '2023-11-20', lastDay: '2023-12-20', reason: 'Alasan pribadi', status: 'Selesai', handover: 'Sudah', notice: '30 hari' },
];

export default function Resign() {
  const { showToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Resign & Exit"
        subtitle="Kelola proses pengunduran diri karyawan"
        icon={<UserX size={20} />}
        actionLabel="Proses Resign"
        onAction={() => showToast('info', 'Proses Resign', 'Form proses resign akan segera tersedia')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Dalam Proses" value={resignRecords.filter(r => r.status === 'Proses').length} icon={<AlertTriangle size={16} />} color="amber" />
        <StatCard label="Selesai" value={resignRecords.filter(r => r.status === 'Selesai').length} icon={<CheckCircle size={16} />} color="emerald" />
        <StatCard label="Handover Pending" value={resignRecords.filter(r => r.handover === 'Belum').length} icon={<FileText size={16} />} color="blue" />
        <StatCard label="Total (6 bulan)" value={resignRecords.length} icon={<UserX size={16} />} color="red" />
      </div>

      {/* Exit Checklist */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Exit Checklist</h3>
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
            <div key={item.step} className={`p-3 rounded-lg border ${item.done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-white'}`}>
                  {item.done ? '✓' : item.step}
                </span>
                <h4 className="text-xs font-semibold text-gray-800">{item.title}</h4>
              </div>
              <p className="text-[10px] text-gray-500 ml-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resign Records */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Riwayat Resign</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Jabatan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tgl Resign</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Hari Terakhir</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Alasan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Handover</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {resignRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{record.name}</p>
                      <p className="text-xs text-gray-500">{record.department}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{record.position}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(record.resignDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3 text-gray-600">{new Date(record.lastDay).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3 text-gray-600">{record.reason}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.handover} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
