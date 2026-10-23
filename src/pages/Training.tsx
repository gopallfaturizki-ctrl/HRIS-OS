import { GraduationCap, Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';

export default function Training() {
  const store = useStore();
  const { showToast } = useToast();

  return (
    <div>
      <PageHeader
        title="Training & Development"
        subtitle="Kelola program pelatihan dan pengembangan karyawan"
        icon={<GraduationCap size={20} />}
        actionLabel="Buat Program"
        onAction={() => showToast('info', 'Buat Program', 'Form program training akan segera tersedia')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Upcoming" value={store.training.filter(t => t.status === 'Upcoming').length} icon={<Calendar size={16} />} color="blue" />
        <StatCard label="Ongoing" value={store.training.filter(t => t.status === 'Ongoing').length} icon={<Clock size={16} />} color="amber" />
        <StatCard label="Completed" value={store.training.filter(t => t.status === 'Completed').length} icon={<CheckCircle size={16} />} color="emerald" />
        <StatCard label="Total Peserta" value={store.training.reduce((s, t) => s + t.participants, 0)} icon={<Users size={16} />} color="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.training.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <GraduationCap size={20} className="text-emerald-600" />
              </div>
              <div className="flex gap-1">
                <StatusBadge status={program.type} type="training" />
                <StatusBadge status={program.status} type="training" />
              </div>
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">{program.title}</h4>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{program.startDate} - {program.endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={12} />
                <span>{program.participants}/{program.maxParticipants} peserta</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium">Trainer:</span>
                <span>{program.trainer}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Kuota Peserta</span>
                <span>{Math.round((program.participants / program.maxParticipants) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${(program.participants / program.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => showToast('info', 'Detail Program', `Melihat detail ${program.title}`)}
              className="w-full py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
