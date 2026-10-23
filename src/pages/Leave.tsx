import { useState } from 'react';
import { Search, Plus, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { leaveRequests } from '../data/mockData';
import { useToast } from '../components/Toast';

export default function Leave() {
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  const filtered = leaveRequests.filter(r => {
    const matchStatus = !filterStatus || r.status === filterStatus;
    const matchType = !filterType || r.type === filterType;
    return matchStatus && matchType;
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case 'Cuti Tahunan': return 'bg-blue-100 text-blue-700';
      case 'Cuti Sakit': return 'bg-purple-100 text-purple-700';
      case 'Cuti Melahirkan': return 'bg-pink-100 text-pink-700';
      case 'Cuti Menikah': return 'bg-rose-100 text-rose-700';
      case 'Izin Khusus': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Cuti & Izin</h1>
          <p className="text-sm text-gray-500">Kelola pengajuan cuti dan izin karyawan</p>
        </div>
        <button
          onClick={() => showToast('info', 'Form Pengajuan Cuti', 'Fitur form pengajuan cuti akan segera tersedia')}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={16} /> Ajukan Cuti
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg"><Clock size={16} className="text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{leaveRequests.filter(l => l.status === 'Pending').length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={16} className="text-emerald-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{leaveRequests.filter(l => l.status === 'Approved').length}</p>
              <p className="text-xs text-gray-500">Disetujui</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg"><XCircle size={16} className="text-red-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{leaveRequests.filter(l => l.status === 'Rejected').length}</p>
              <p className="text-xs text-gray-500">Ditolak</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg"><Calendar size={16} className="text-blue-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{leaveRequests.reduce((sum, l) => sum + l.days, 0)}</p>
              <p className="text-xs text-gray-500">Total Hari</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Semua Tipe</option>
            <option value="Cuti Tahunan">Cuti Tahunan</option>
            <option value="Cuti Sakit">Cuti Sakit</option>
            <option value="Cuti Melahirkan">Cuti Melahirkan</option>
            <option value="Cuti Menikah">Cuti Menikah</option>
            <option value="Izin Khusus">Izin Khusus</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tipe Cuti</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Periode</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Durasi</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Alasan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Disetujui</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((leave) => (
                <tr key={leave.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{leave.employeeName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeBadge(leave.type)}`}>
                      {leave.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{leave.startDate} - {leave.endDate}</td>
                  <td className="px-4 py-3 text-gray-600">{leave.days} hari</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{leave.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{leave.approvedBy || '-'}</td>
                  <td className="px-4 py-3">
                    {leave.status === 'Pending' ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => showToast('success', 'Cuti Disetujui', `${leave.employeeName} - ${leave.type} (${leave.days} hari)`)}
                          className="px-2 py-1 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => showToast('error', 'Cuti Ditolak', `${leave.employeeName} - ${leave.type}`)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
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
