import { useState } from 'react';
import { Timer } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, ActionButtons, Table } from '../components/ui';

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

      <Table
        headers={['Karyawan', 'Tanggal', 'Waktu', 'Durasi', 'Alasan', 'Status', 'Aksi']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada data lembur"
      >
        {filtered.map((record) => (
          <tr key={record.id} className="hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium text-slate-800">{record.employeeName}</td>
            <td className="px-4 py-3 text-slate-600">{record.date}</td>
            <td className="px-4 py-3 text-slate-600 font-mono">{record.startTime} - {record.endTime}</td>
            <td className="px-4 py-3 text-slate-700 font-medium">{record.hours} jam</td>
            <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{record.reason}</td>
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
              ) : <span className="text-xs text-slate-400">-</span>}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
