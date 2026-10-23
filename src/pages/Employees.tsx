import { useState } from 'react';
import { Users, Download, Upload } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatusBadge, SearchFilter, ActionButtons, Table } from '../components/ui';
import EmployeeFormModal from '../components/EmployeeFormModal';

export default function Employees() {
  const store = useStore();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const departments = [...new Set(store.employees.map(e => e.department))];

  const filtered = store.employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.nik.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || e.department === filterDept;
    const matchStatus = !filterStatus || e.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const handleEdit = (emp: any) => {
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  const handleDelete = (emp: any) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${emp.name}?`)) {
      store.deleteEmployee(emp.id);
      showToast('success', 'Karyawan Dihapus', `${emp.name} telah dihapus dari sistem`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Data Karyawan"
        subtitle="Kelola seluruh data karyawan MR VAPOR"
        icon={<Users size={20} />}
        actionLabel="Tambah Karyawan"
        onAction={() => {
          setSelectedEmployee(null);
          setIsModalOpen(true);
        }}
      >
        <button
          onClick={() => showToast('info', 'Import', 'Fitur import CSV akan segera tersedia')}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Upload size={16} /> Import
        </button>
        <button
          onClick={() => showToast('info', 'Export', 'Fitur export akan segera tersedia')}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Download size={16} /> Export
        </button>
      </PageHeader>

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama atau NIK..."
        filters={[
          {
            value: filterDept,
            onChange: setFilterDept,
            options: departments.map(d => ({ label: d, value: d })),
            placeholder: 'Semua Departemen',
          },
          {
            value: filterStatus,
            onChange: setFilterStatus,
            options: [
              { label: 'Tetap', value: 'Tetap' },
              { label: 'Kontrak', value: 'Kontrak' },
              { label: 'Probation', value: 'Probation' },
              { label: 'Magang', value: 'Magang' },
            ],
            placeholder: 'Semua Status',
          },
        ]}
        onClear={() => {
          setSearch('');
          setFilterDept('');
          setFilterStatus('');
        }}
      />

      {/* View Mode Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 text-sm transition ${viewMode === 'table' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Tabel
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`px-3 py-1.5 text-sm transition ${viewMode === 'card' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Kartu
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <>
          <Table
            headers={['Karyawan', 'NIK', 'Departemen', 'Jabatan', 'Status', 'Tgl Bergabung', 'Aksi']}
            isEmpty={filtered.length === 0}
            emptyMessage="Tidak ada karyawan yang ditemukan"
          >
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate">{emp.name}</p>
                      <p className="text-xs text-slate-500 truncate">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 font-mono text-xs">{emp.nik}</td>
                <td className="px-4 py-3 text-slate-600">{emp.department}</td>
                <td className="px-4 py-3 text-slate-600">{emp.position}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={emp.status} type="employee" />
                </td>
                <td className="px-4 py-3 text-slate-600">{new Date(emp.joinDate).toLocaleDateString('id-ID')}</td>
                <td className="px-4 py-3">
                  <ActionButtons
                    onView={() => showToast('info', 'Detail Karyawan', `Melihat detail ${emp.name}`)}
                    onEdit={() => handleEdit(emp)}
                    onDelete={() => handleDelete(emp)}
                  />
                </td>
              </tr>
            ))}
          </Table>
          <div className="mt-3 px-4 py-2 text-sm text-slate-500">
            Menampilkan {filtered.length} dari {store.employees.length} karyawan
          </div>
        </>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp) => (
            <div key={emp.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.nik}</p>
                  </div>
                </div>
                <StatusBadge status={emp.status} type="employee" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Departemen</span>
                  <span className="text-gray-700 font-medium">{emp.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Jabatan</span>
                  <span className="text-gray-700 font-medium">{emp.position}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bergabung</span>
                  <span className="text-gray-700">{new Date(emp.joinDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="flex-1 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp)}
                  className="flex-1 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
}
