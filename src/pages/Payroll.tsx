import { useState } from 'react';
import { DollarSign, Download, FileText, CheckCircle, Clock, Printer } from 'lucide-react';
import { payrollRecords } from '../data/mockData';

export default function Payroll() {
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPeriod] = useState('Januari 2024');

  const filtered = payrollRecords.filter(r => !filterStatus || r.status === filterStatus);

  const totalPayroll = payrollRecords.reduce((sum, r) => sum + r.netSalary, 0);
  const totalBasic = payrollRecords.reduce((sum, r) => sum + r.basicSalary, 0);
  const totalAllowances = payrollRecords.reduce((sum, r) => sum + r.allowances, 0);
  const totalDeductions = payrollRecords.reduce((sum, r) => sum + r.deductions, 0);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Approved': return 'bg-blue-100 text-blue-700';
      case 'Paid': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Payroll</h1>
          <p className="text-sm text-gray-500">Kelola penggajian karyawan - Periode: {selectedPeriod}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Printer size={16} /> Cetak
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <FileText size={16} /> Buat Payroll
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
          <DollarSign size={20} className="mb-2 opacity-80" />
          <p className="text-lg font-bold">{formatCurrency(totalPayroll)}</p>
          <p className="text-xs text-emerald-100 mt-1">Total Payroll</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-lg font-bold text-gray-800">{formatCurrency(totalBasic)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Gaji Pokok</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-lg font-bold text-blue-600">{formatCurrency(totalAllowances)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Tunjangan</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-lg font-bold text-red-600">{formatCurrency(totalDeductions)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Potongan</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg"><Clock size={16} className="text-gray-600" /></div>
          <div>
            <p className="font-bold text-gray-800">{payrollRecords.filter(r => r.status === 'Draft').length}</p>
            <p className="text-xs text-gray-500">Draft</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg"><FileText size={16} className="text-blue-600" /></div>
          <div>
            <p className="font-bold text-gray-800">{payrollRecords.filter(r => r.status === 'Approved').length}</p>
            <p className="text-xs text-gray-500">Approved</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={16} className="text-emerald-600" /></div>
          <div>
            <p className="font-bold text-gray-800">{payrollRecords.filter(r => r.status === 'Paid').length}</p>
            <p className="text-xs text-gray-500">Dibayar</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Detail Payroll - {selectedPeriod}</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Semua Status</option>
            <option value="Draft">Draft</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Gaji Pokok</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Tunjangan</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Lembur</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Potongan</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Pajak</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Gaji Bersih</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{record.employeeName}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(record.basicSalary)}</td>
                  <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(record.allowances)}</td>
                  <td className="px-4 py-3 text-right text-indigo-600">{formatCurrency(record.overtime)}</td>
                  <td className="px-4 py-3 text-right text-red-600">{formatCurrency(record.deductions)}</td>
                  <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(record.tax)}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatCurrency(record.netSalary)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr>
                <td className="px-4 py-3 font-bold text-gray-800">TOTAL</td>
                <td className="px-4 py-3 text-right font-bold text-gray-800">{formatCurrency(totalBasic)}</td>
                <td className="px-4 py-3 text-right font-bold text-blue-600">{formatCurrency(totalAllowances)}</td>
                <td className="px-4 py-3 text-right font-bold text-indigo-600">{formatCurrency(payrollRecords.reduce((s, r) => s + r.overtime, 0))}</td>
                <td className="px-4 py-3 text-right font-bold text-red-600">{formatCurrency(totalDeductions)}</td>
                <td className="px-4 py-3 text-right font-bold text-orange-600">{formatCurrency(payrollRecords.reduce((s, r) => s + r.tax, 0))}</td>
                <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatCurrency(totalPayroll)}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
