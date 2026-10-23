import { useState } from 'react';
import { Plus, CheckCircle, Clock, Timer } from 'lucide-react';
import { overtimeRecords } from '../data/mockData';
import { useToast } from '../components/Toast';

export default function Overtime() {
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = overtimeRecords.filter(r => !filterStatus || r.status === filterStatus);

  const totalHours = overtimeRecords.filter(o => o.status === 'Approved').reduce((sum, o) => sum + o.hours, 0);
  const totalCost = totalHours * 25000; // Rp 25.000/jam

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Lembur Karyawan</h1>
          <p className="text-sm text-gray-500">Kelola pengajuan dan approval lembur</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Ajukan Lembur
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg"><Timer size={16} className="text-indigo-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{overtimeRecords.length}</p>
              <p className="text-xs text-gray-500">Total Pengajuan</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg"><Clock size={16} className="text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{overtimeRecords.filter(o => o.status === 'Pending').length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={16} className="text-emerald-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{totalHours} jam</p>
              <p className="text-xs text-gray-500">Total Jam (Approved)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg"><span className="text-green-600 text-xs font-bold">Rp</span></div>
            <div>
              <p className="text-lg font-bold text-gray-800">Rp {(totalCost / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500">Estimasi Biaya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
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
      </div>

      {/* Table */}
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {record.status === 'Pending' ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => showToast('success', 'Lembur Disetujui', `${record.employeeName} - ${record.hours} jam`)}
                          className="px-2 py-1 text-xs bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => showToast('error', 'Lembur Ditolak', `${record.employeeName} - ${record.hours} jam`)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
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
