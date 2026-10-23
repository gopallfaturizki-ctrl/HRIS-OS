import { useState } from 'react';
import { Timer } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, ActionButtons } from '../components/ui';

export default function Overtime() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = store.overtime.filter(r => !filterStatus || r.status === filterStatus);
  const totalHours = store.overtime.filter(o => o.status === 'Approved').reduce((sum, o) => sum + o.hours, 0);
  const totalCost = totalHours * 25000;

  return (
    <div>
      <PageHeader
        title="Lembur Karyawan"
        subtitle="Kelola pengajuan dan approval lembur"
        icon={<Timer size={20} />}
        actionLabel="Ajukan Lembur"
        onAction={() => showToast('info', 'Ajukan Lembur', 'Form pengajuan lembur akan segera tersedia')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total Pengajuan" value={store.overtime.length} color="indigo" />
        <StatCard label="Pending" value={store.overtime.filter(o => o.status === 'Pending').length} color="amber" />
        <StatCard label="Total Jam (Approved)" value={`${totalHours} jam`} color="emerald" />
        <StatCard label="Estimasi Biaya" value={`Rp ${(totalCost / 1000).toFixed(0)}K`} color="emerald" />
      </div>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        filters={[
          {
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ],
            placeholder: 'Semua Status',
          },
        ]}
        onClear={() => setFilterStatus('')}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tanggal</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Waktu</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Durasi</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Alasan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{record.employeeName}</td>
                  <td className="px-4 py-3 text-gray-600">{record.date}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono">{record.startTime} - {record.endTime}</td>
                  <td className="px-4 py-3 text-gray-600 font-medium">{record.hours} jam</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{record.reason}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3">
                    {record.status === 'Pending' ? (
                      <ActionButtons
                        showApproveReject
                        onApprove={() => {
                          store.approveOvertime(record.id);
                          showToast('success', 'Lembur Disetujui', `${record.employeeName} - ${record.hours} jam`);
                        }}
                        onReject={() => {
                          store.rejectOvertime(record.id);
                          showToast('error', 'Lembur Ditolak', `${record.employeeName} - ${record.hours} jam`);
                        }}
                      />
                    ) : '-'}
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
