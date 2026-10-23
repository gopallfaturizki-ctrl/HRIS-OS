import { Clock, Edit, Trash2 } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatusBadge } from '../components/ui';

export default function Shifts() {
  const store = useStore();
  const { showToast } = useToast();

  const weeklySchedule = [
    { day: 'Senin', shifts: [{ emp: 'Ahmad Rizki', shift: 'Shift Pagi' }, { emp: 'Budi Santoso', shift: 'Shift Siang' }, { emp: 'Rina Wulandari', shift: 'Shift Pagi' }] },
    { day: 'Selasa', shifts: [{ emp: 'Ahmad Rizki', shift: 'Shift Pagi' }, { emp: 'Budi Santoso', shift: 'Shift Malam' }, { emp: 'Rina Wulandari', shift: 'Shift Siang' }] },
    { day: 'Rabu', shifts: [{ emp: 'Ahmad Rizki', shift: 'Shift Siang' }, { emp: 'Budi Santoso', shift: 'Shift Pagi' }, { emp: 'Rina Wulandari', shift: 'Shift Pagi' }] },
    { day: 'Kamis', shifts: [{ emp: 'Ahmad Rizki', shift: 'Shift Pagi' }, { emp: 'Budi Santoso', shift: 'Shift Siang' }, { emp: 'Rina Wulandari', shift: 'Shift Malam' }] },
    { day: 'Jumat', shifts: [{ emp: 'Ahmad Rizki', shift: 'Shift Siang' }, { emp: 'Budi Santoso', shift: 'Shift Pagi' }, { emp: 'Rina Wulandari', shift: 'Shift Pagi' }] },
    { day: 'Sabtu', shifts: [{ emp: 'Budi Santoso', shift: 'Shift Pagi' }, { emp: 'Maya Sari', shift: 'Shift Siang' }] },
    { day: 'Minggu', shifts: [{ emp: 'Budi Santoso', shift: 'Libur' }, { emp: 'Maya Sari', shift: 'Libur' }] },
  ];

  const getShiftColor = (shiftName: string) => {
    const shift = store.shifts.find(s => s.name === shiftName);
    return shift?.color || 'bg-gray-100 text-gray-600';
  };

  return (
    <div>
      <PageHeader
        title="Manajemen Shift"
        subtitle="Kelola jadwal shift karyawan"
        icon={<Clock size={20} />}
        actionLabel="Buat Jadwal"
        onAction={() => showToast('info', 'Buat Jadwal', 'Form buat jadwal akan segera tersedia')}
      />

      {/* Shift Definitions */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Definisi Shift</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {store.shifts.map((shift) => (
            <div key={shift.id} className={`rounded-xl p-4 border ${shift.color.split(' ')[0]} border-opacity-30`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-semibold ${shift.color.split(' ')[1]}`}>{shift.name}</h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => showToast('info', 'Edit Shift', `Mengedit ${shift.name}`)}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => showToast('warning', 'Hapus Shift', `Menghapus ${shift.name}`)}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Clock size={14} className={shift.color.split(' ')[1]} />
                <span className={`text-sm font-medium ${shift.color.split(' ')[1]}`}>
                  {shift.startTime} - {shift.endTime}
                </span>
              </div>
              <p className={`text-xs mt-2 ${shift.color.split(' ')[1]} opacity-75`}>{shift.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Jadwal Mingguan - Operasional</h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[700px]">
            {weeklySchedule.map((day) => (
              <div key={day.day} className="border border-gray-100 rounded-lg p-3">
                <h4 className="text-xs font-bold text-gray-700 mb-2 text-center pb-2 border-b border-gray-100">
                  {day.day}
                </h4>
                <div className="space-y-2">
                  {day.shifts.map((s, idx) => (
                    <div key={idx} className={`px-2 py-1.5 rounded text-xs font-medium ${getShiftColor(s.shift)}`}>
                      <p className="font-semibold truncate">{s.emp.split(' ')[0]}</p>
                      <p className="opacity-75 text-[10px]">{s.shift}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Shift Summary */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Ringkasan Shift Karyawan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Departemen</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Shift Default</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Jam Kerja/Minggu</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {store.employees.filter(e => e.department === 'Operasional').map((emp) => (
                <tr key={emp.id} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{emp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={store.shifts[0]?.name || 'Shift Pagi'} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">40 jam</td>
                  <td className="px-4 py-3">
                    <StatusBadge status="Aktif" />
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
