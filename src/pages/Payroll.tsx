import { useState } from 'react';
import { DollarSign, Download, FileText, Printer } from 'lucide-react';
import { useStore, PayrollRecord } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge, SearchFilter, Table } from '../components/ui';
import Modal from '../components/Modal';

export default function Payroll() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedPeriod = 'Januari 2024';

  const [formData, setFormData] = useState({
    employeeId: '',
    period: selectedPeriod,
    basicSalary: 0,
    allowances: 0,
    overtime: 0,
    deductions: 0,
    tax: 0,
  });

  const filtered = store.payroll.filter(r => !filterStatus || r.status === filterStatus);
  const totalPayroll = store.payroll.reduce((sum, r) => sum + r.netSalary, 0);
  const totalBasic = store.payroll.reduce((sum, r) => sum + r.basicSalary, 0);
  const totalAllowances = store.payroll.reduce((sum, r) => sum + r.allowances, 0);
  const totalDeductions = store.payroll.reduce((sum, r) => sum + r.deductions, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const handleAddPayroll = () => {
    if (!formData.employeeId || !formData.period) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const employee = store.employees.find(e => e.id === formData.employeeId);
    if (!employee) {
      showToast('error', 'Karyawan Tidak Ditemukan', 'Pilih karyawan yang valid');
      return;
    }

    const netSalary = formData.basicSalary + formData.allowances + formData.overtime - formData.deductions - formData.tax;

    const newPayroll: PayrollRecord = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: employee.name,
      period: formData.period,
      basicSalary: formData.basicSalary,
      allowances: formData.allowances,
      overtime: formData.overtime,
      deductions: formData.deductions,
      tax: formData.tax,
      netSalary,
      status: 'Draft',
    };

    store.addPayroll(newPayroll);
    showToast('success', 'Payroll Dibuat', `${employee.name} - ${formData.period}`);
    setIsModalOpen(false);
    setFormData({
      employeeId: '',
      period: selectedPeriod,
      basicSalary: 0,
      allowances: 0,
      overtime: 0,
      deductions: 0,
      tax: 0,
    });
  };

  const handleExportPayroll = () => {
    const headers = ['Karyawan', 'Periode', 'Gaji Pokok', 'Tunjangan', 'Lembur', 'Potongan', 'Pajak', 'Gaji Bersih', 'Status'];
    const rows = store.payroll.map(p => [
      p.employeeName,
      p.period,
      p.basicSalary.toString(),
      p.allowances.toString(),
      p.overtime.toString(),
      p.deductions.toString(),
      p.tax.toString(),
      p.netSalary.toString(),
      p.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payroll-${selectedPeriod.replace(' ', '-')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('success', 'Export Berhasil', 'File CSV telah diunduh');
  };

  return (
    <div>
      <PageHeader
        title="Payroll"
        subtitle={`Kelola penggajian karyawan - Periode: ${selectedPeriod}`}
        icon={<DollarSign size={20} />}
        actionLabel="Buat Payroll"
        onAction={() => setIsModalOpen(true)}
      >
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Printer size={16} /> Cetak
        </button>
        <button
          onClick={handleExportPayroll}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Download size={16} /> Export
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
          <DollarSign size={20} className="mb-2 opacity-80" />
          <p className="text-lg font-bold">{formatCurrency(totalPayroll)}</p>
          <p className="text-xs text-emerald-100 mt-1">Total Payroll</p>
        </div>
        <StatCard label="Total Gaji Pokok" value={formatCurrency(totalBasic)} color="blue" />
        <StatCard label="Total Tunjangan" value={formatCurrency(totalAllowances)} color="cyan" />
        <StatCard label="Total Potongan" value={formatCurrency(totalDeductions)} color="red" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard label="Draft" value={store.payroll.filter(r => r.status === 'Draft').length} color="amber" />
        <StatCard label="Approved" value={store.payroll.filter(r => r.status === 'Approved').length} color="blue" />
        <StatCard label="Dibayar" value={store.payroll.filter(r => r.status === 'Paid').length} color="emerald" />
      </div>

      <SearchFilter
        searchValue=""
        onSearchChange={() => {}}
        filters={[
          {
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: 'Draft', value: 'Draft' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Paid', value: 'Paid' },
            ],
            placeholder: 'Semua Status',
          },
        ]}
        onClear={() => setFilterStatus('')}
      />

      <Table
        headers={['Karyawan', 'Gaji Pokok', 'Tunjangan', 'Lembur', 'Potongan', 'Pajak', 'Gaji Bersih', 'Status', 'Aksi']}
        isEmpty={filtered.length === 0}
        emptyMessage="Tidak ada data payroll"
      >
        {filtered.map((record) => (
          <tr key={record.id} className="hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium text-slate-800">{record.employeeName}</td>
            <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(record.basicSalary)}</td>
            <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(record.allowances)}</td>
            <td className="px-4 py-3 text-right text-indigo-600">{formatCurrency(record.overtime)}</td>
            <td className="px-4 py-3 text-right text-red-600">{formatCurrency(record.deductions)}</td>
            <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(record.tax)}</td>
            <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatCurrency(record.netSalary)}</td>
            <td className="px-4 py-3">
              <StatusBadge status={record.status} type="payroll" />
            </td>
            <td className="px-4 py-3">
              <button
                onClick={() => {
                  const nextStatus = record.status === 'Draft' ? 'Approved' : record.status === 'Approved' ? 'Paid' : 'Paid';
                  store.updatePayrollStatus(record.id, nextStatus);
                  showToast('success', 'Status Diperbarui', `${record.employeeName} - ${nextStatus}`);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-sm"
              >
                {record.status === 'Draft' ? 'Approve' : record.status === 'Approved' ? 'Bayar' : 'Selesai'}
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Total Summary */}
      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs">Total Gaji Pokok</p>
            <p className="font-bold text-slate-800">{formatCurrency(totalBasic)}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Total Tunjangan</p>
            <p className="font-bold text-blue-600">{formatCurrency(totalAllowances)}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Total Potongan</p>
            <p className="font-bold text-red-600">{formatCurrency(totalDeductions)}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Total Payroll</p>
            <p className="font-bold text-emerald-700">{formatCurrency(totalPayroll)}</p>
          </div>
        </div>
      </div>

      {/* Buat Payroll Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Buat Payroll Baru" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Karyawan *</label>
            <select
              value={formData.employeeId}
              onChange={(e) => {
                const emp = store.employees.find(emp => emp.id === e.target.value);
                setFormData({ 
                  ...formData, 
                  employeeId: e.target.value,
                  basicSalary: emp?.salary || 0
                });
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">Pilih Karyawan</option>
              {store.employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} - {emp.nik}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Periode *</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Contoh: Januari 2024"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gaji Pokok (Rp)</label>
              <input
                type="number"
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tunjangan (Rp)</label>
              <input
                type="number"
                value={formData.allowances}
                onChange={(e) => setFormData({ ...formData, allowances: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lembur (Rp)</label>
              <input
                type="number"
                value={formData.overtime}
                onChange={(e) => setFormData({ ...formData, overtime: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Potongan (Rp)</label>
              <input
                type="number"
                value={formData.deductions}
                onChange={(e) => setFormData({ ...formData, deductions: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pajak (Rp)</label>
              <input
                type="number"
                value={formData.tax}
                onChange={(e) => setFormData({ ...formData, tax: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gaji Bersih (Rp)</label>
              <input
                type="number"
                value={formData.basicSalary + formData.allowances + formData.overtime - formData.deductions - formData.tax}
                readOnly
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-semibold"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              onClick={handleAddPayroll}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Buat Payroll
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
