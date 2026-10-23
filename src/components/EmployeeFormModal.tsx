import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useToast } from './Toast';
import { useStore, Employee } from '../store/StoreProvider';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
}

export default function EmployeeFormModal({ isOpen, onClose, employee }: EmployeeFormModalProps) {
  const store = useStore();
  const { showToast } = useToast();
  const isEdit = !!employee;

  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Probation' as Employee['status'],
    gender: 'L' as Employee['gender'],
    address: '',
    birthDate: '',
    bankAccount: '',
    salary: 0,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        nik: employee.nik,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        joinDate: employee.joinDate,
        status: employee.status,
        gender: employee.gender,
        address: employee.address,
        birthDate: employee.birthDate,
        bankAccount: employee.bankAccount,
        salary: employee.salary,
      });
    } else {
      setFormData({
        name: '',
        nik: `MRV-${String(store.employees.length + 1).padStart(3, '0')}`,
        email: '',
        phone: '',
        department: '',
        position: '',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Probation',
        gender: 'L',
        address: '',
        birthDate: '',
        bankAccount: '',
        salary: 0,
      });
    }
  }, [employee, isOpen, store.employees.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit && employee) {
      store.updateEmployee(employee.id, formData);
      showToast('success', 'Karyawan Diperbarui', `${formData.name} - ${formData.position}`);
    } else {
      const newEmployee: Employee = {
        id: String(Date.now()),
        ...formData,
      };
      store.addEmployee(newEmployee);
      showToast('success', 'Karyawan Ditambahkan', `${formData.name} - ${formData.position}`);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Karyawan' : 'Tambah Karyawan Baru'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIK *</label>
              <input type="text" name="nik" value={formData.nik} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Informasi Pekerjaan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departemen *</label>
              <select name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required>
                <option value="">Pilih Departemen</option>
                <option value="Operasional">Operasional</option>
                <option value="Finance">Finance</option>
                <option value="HRD">HRD</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Warehouse">Warehouse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan *</label>
              <input type="text" name="position" value={formData.position} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Bergabung *</label>
              <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Karyawan *</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required>
                <option value="Probation">Probation</option>
                <option value="Kontrak">Kontrak</option>
                <option value="Tetap">Tetap</option>
                <option value="Magang">Magang</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Informasi Keuangan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Rekening Bank</label>
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Pokok (Rp) *</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" required />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition shadow-sm">
            {isEdit ? 'Simpan Perubahan' : 'Tambah Karyawan'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
