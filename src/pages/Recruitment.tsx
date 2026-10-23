import { useState } from 'react';
import { UserPlus, Search, Star, Mail, Phone, ArrowRight } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatusBadge, SearchFilter } from '../components/ui';

const stages = ['Lamaran', 'Screening', 'Interview HR', 'Interview User', 'Medical', 'Offering', 'Diterima', 'Ditolak'];

export default function Recruitment() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStage, setFilterStage] = useState('');
  const [search, setSearch] = useState('');

  const filtered = store.recruitment.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStage = !filterStage || c.stage === filterStage;
    return matchSearch && matchStage;
  });

  return (
    <div>
      <PageHeader
        title="Recruitment"
        subtitle="Kelola proses rekrutmen dan kandidat"
        icon={<UserPlus size={20} />}
        actionLabel="Tambah Kandidat"
        onAction={() => showToast('info', 'Tambah Kandidat', 'Form tambah kandidat akan segera tersedia')}
      />

      {/* Pipeline Summary */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Pipeline Rekrutmen</h3>
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => {
            const count = store.recruitment.filter(c => c.stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-2">
                <StatusBadge status={stage} type="candidate" size="md" />
                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama kandidat..."
        filters={[
          {
            value: filterStage,
            onChange: setFilterStage,
            options: stages.map(s => ({ label: s, value: s })),
            placeholder: 'Semua Tahap',
          },
        ]}
        onClear={() => {
          setSearch('');
          setFilterStage('');
        }}
      />

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
              <StatusBadge status={candidate.stage} type="candidate" />
              <button
                onClick={() => showToast('info', 'Detail Kandidat', `Melihat detail ${candidate.name}`)}
                className="text-xs text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
              >
                Detail <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
