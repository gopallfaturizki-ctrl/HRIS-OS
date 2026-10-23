import { useState } from 'react';
import { UserPlus, Search, Star, Mail, Phone, ArrowRight } from 'lucide-react';
import { recruitmentCandidates } from '../data/mockData';

const stages = ['Lamaran', 'Screening', 'Interview HR', 'Interview User', 'Medical', 'Offering', 'Diterima', 'Ditolak'];

export default function Recruitment() {
  const [filterStage, setFilterStage] = useState('');
  const [search, setSearch] = useState('');

  const filtered = recruitmentCandidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStage = !filterStage || c.stage === filterStage;
    return matchSearch && matchStage;
  });

  const stageColor = (stage: string) => {
    switch (stage) {
      case 'Lamaran': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Screening': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Interview HR': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Interview User': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Medical': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Offering': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'Diterima': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Ditolak': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Recruitment</h1>
          <p className="text-sm text-gray-500">Kelola proses rekrutmen dan kandidat</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <UserPlus size={16} /> Tambah Kandidat
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Pipeline Rekrutmen</h3>
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => {
            const count = recruitmentCandidates.filter(c => c.stage === stage).length;
            return (
              <div key={stage} className={`px-3 py-2 rounded-lg border ${stageColor(stage)} flex items-center gap-2`}>
                <span className="text-xs font-medium">{stage}</span>
                <span className="text-xs font-bold bg-white/50 px-1.5 py-0.5 rounded">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama kandidat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Semua Tahap</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{candidate.name}</h4>
                  <p className="text-xs text-gray-500">{candidate.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < candidate.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail size={12} /> {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone size={12} /> {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Melamar: {new Date(candidate.appliedDate).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${stageColor(candidate.stage)}`}>
                {candidate.stage}
              </span>
              <button className="text-xs text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700">
                Detail <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
