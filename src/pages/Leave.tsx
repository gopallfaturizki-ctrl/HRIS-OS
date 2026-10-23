import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, ActionButtons, Table } from '../components/ui';

export default function Leave() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const filtered = store.leaves.filter(r => {
    const matchStatus = !filterStatus || r.status === filterStatus;
    const matchType = !filterType || r.type === filterType;
    return matchStatus && matchType;
  });

  return (
    <div>
      <PageHeader
        title="Cuti & Izin"
        subtitle="Kelola pengajuan cuti dan izin karyawan"
        icon={<Calendar size={20} />}
        actionLabel="Ajukan Cuti"
        onAction={() => showToast('info', 'Ajukan Cuti', 'Form pengajuan cuti akan segera tersedia')}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Pending" value={store.leaves.filter(l => l.status === 'Pending').length} color="amber" />
        <StatCard label="Disetujui" value={store.leaves.filter(l => l.status === 'Approved').length} color="emerald" />
        <StatCard label="Ditolak" value={store.leaves.filter(l => l.status === 'Rejected').length} color="red" />
        <StatCard label="Total Hari" value={store.leaves.reduce((sum, l) => sum + l.days, 0)} color="blue" />
      </div>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Cari karyawan..."
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
          {
            value: filterType,
            onChange: setFilterType,
            options: [
              { label: 'Cuti Tahunan', value: 'Cuti Tahunan' },
              { label: 'Cuti Sakit', value: 'Cuti Sakit' },
              { label: 'Cuti Melahirkan', value: 'Cuti Melahirkan' },
              { label: 'Cuti Menikah', value: 'Cuti Menikah' },
              { label: 'Izin Khusus', value: 'Izin Khusus' },
            ],
            placeholder: 'Semua Tipe',
          },
        ]}
        onClear={() => {
          setFilterStatus('');
          setFilterType('');
        }}
      />

      {/* Table */}
      <Table
        headers={['Karyawan', 'Tipe Cuti', 'Periode', 'Durasi', 'Alasan', 'Status', 'Disetujui', 'Aksi']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada pengajuan cuti"
      >
        {filtered.map((leave) => (
          <tr key={leave.id} className="hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium text-slate-800">{leave.employeeName}</td>
            <td className="px-4 py-3">
              <StatusBadge status={leave.type} type="leave" />
            </td>
            <td className="px-4 py-3 text-slate-600">{leave.startDate} - {leave.endDate}</td>
            <td className="px-4 py-3 text-slate-600">{leave.days} hari</td>
            <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">{leave.reason}</td>
            <td className="px-4 py-3">
              <StatusBadge status={leave.status} />
            </td>
            <td className="px-4 py-3 text-slate-600">{leave.approvedBy || '-'}</td>
            <td className="px-4 py-3">
              {leave.status === 'Pending' ? (
                <ActionButtons
                  showApproveReject
                  onApprove={() => {
                    store.approveLeave(leave.id);
                    showToast('success', 'Cuti Disetujui', `${leave.employeeName} - ${leave.type}`);
                  }}
                  onReject={() => {
                    store.rejectLeave(leave.id);
                    showToast('error', 'Cuti Ditolak', `${leave.employeeName} - ${leave.type}`);
                  }}
                />
              ) : (
                <span className="text-xs text-slate-400">-</span>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
