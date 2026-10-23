import { GraduationCap, Plus, Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { trainingPrograms } from '../data/mockData';

export default function Training() {
  const statusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      case 'Ongoing': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case 'Internal': return 'bg-purple-100 text-purple-700';
      case 'External': return 'bg-cyan-100 text-cyan-700';
      case 'Online': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Training & Development</h1>
          <p className="text-sm text-gray-500">Kelola program pelatihan dan pengembangan karyawan</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Buat Program
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg"><Calendar size={16} className="text-blue-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{trainingPrograms.filter(t => t.status === 'Upcoming').length}</p>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-lg"><Clock size={16} className="text-amber-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{trainingPrograms.filter(t => t.status === 'Ongoing').length}</p>
              <p className="text-xs text-gray-500">Ongoing</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle size={16} className="text-emerald-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{trainingPrograms.filter(t => t.status === 'Completed').length}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg"><Users size={16} className="text-purple-600" /></div>
            <div>
              <p className="text-lg font-bold text-gray-800">{trainingPrograms.reduce((s, t) => s + t.participants, 0)}</p>
              <p className="text-xs text-gray-500">Total Peserta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <GraduationCap size={20} className="text-emerald-600" />
              </div>
              <div className="flex gap-1">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeBadge(program.type)}`}>
                  {program.type}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(program.status)}`}>
                  {program.status}
                </span>
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

            {/* Progress Bar */}
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

            <button className="w-full py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition">
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
