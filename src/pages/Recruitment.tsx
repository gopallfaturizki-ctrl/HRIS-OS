import { useState } from 'react';
import { UserPlus, Star, Mail, Phone, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { useStore, RecruitmentCandidate } from '../store/StoreProvider';
import { useToast } from '../components/Toast';
import { PageHeader, StatusBadge, SearchFilter, ActionButtons } from '../components/ui';
import Modal from '../components/Modal';

const stages: RecruitmentCandidate['stage'][] = ['Lamaran', 'Screening', 'Interview HR', 'Interview User', 'Medical', 'Offering', 'Diterima', 'Ditolak'];

export default function Recruitment() {
  const store = useStore();
  const { showToast } = useToast();
  const [filterStage, setFilterStage] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<RecruitmentCandidate | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    rating: 3,
  });

  const filtered = store.recruitment.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStage = !filterStage || c.stage === filterStage;
    return matchSearch && matchStage;
  });

  const handleAdd = () => {
    if (!formData.name || !formData.position || !formData.email) {
      showToast('error', 'Data Tidak Lengkap', 'Harap isi semua field yang wajib');
      return;
    }

    const newCandidate: RecruitmentCandidate = {
      id: String(Date.now()),
      ...formData,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Lamaran',
    };

    store.addCandidate(newCandidate);
    showToast('success', 'Kandidat Ditambahkan', `${formData.name} berhasil ditambahkan`);
    setIsModalOpen(false);
    setFormData({ name: '', position: '', email: '', phone: '', rating: 3 });
  };

  const handleDelete = (candidate: RecruitmentCandidate) => {
    if (confirm(`Hapus kandidat ${candidate.name}?`)) {
      store.deleteCandidate(candidate.id);
      showToast('success', 'Kandidat Dihapus', `${candidate.name} telah dihapus`);
    }
  };

  const handleStageChange = (candidate: RecruitmentCandidate, newStage: RecruitmentCandidate['stage']) => {
    store.updateCandidateStage(candidate.id, newStage);
    showToast('success', 'Stage Diperbarui', `${candidate.name} → ${newStage}`);
  };

  return (
    <div>
      <PageHeader
        title="Recruitment"
        subtitle="Kelola proses rekrutmen dan kandidat"
        icon={<UserPlus size={20} />}
        actionLabel="Tambah Kandidat"
        onAction={() => setIsModalOpen(true)}
      />

      {/* Pipeline Summary */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-4">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Pipeline Rekrutmen</h3>
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => {
            const count = store.recruitment.filter(c => c.stage === stage).length;
            return (
              <div key={stage} className="flex items-center gap-2">
                <StatusBadge status={stage} type="candidate" size="md" />
                <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">{count}</span>
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
          <div key={candidate.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{candidate.name}</h4>
                  <p className="text-xs text-slate-500">{candidate.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < candidate.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail size={12} /> {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone size={12} /> {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Melamar: {new Date(candidate.appliedDate).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <StatusBadge status={candidate.stage} type="candidate" />
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setIsDetailOpen(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                >
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => handleDelete(candidate)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Stage Progress */}
            <div className="flex gap-1">
              {stages.slice(0, 4).map((stage, idx) => (
                <button
                  key={stage}
                  onClick={() => handleStageChange(candidate, stage)}
                  className={`flex-1 h-1.5 rounded-full transition ${
                    stages.indexOf(candidate.stage) >= idx ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                  title={stage}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Candidate Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Kandidat Baru" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Posisi *</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Masukkan posisi yang dilamar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1"
                >
                  <Star
                    size={24}
                    className={star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
                  />
                </button>
              ))}
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
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Tambah Kandidat
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} title="Detail Kandidat" size="md">
        {selectedCandidate && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedCandidate.name}</h3>
                <p className="text-sm text-slate-500">{selectedCandidate.position}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < selectedCandidate.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Email</label>
                <p className="text-sm text-slate-800">{selectedCandidate.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Telepon</label>
                <p className="text-sm text-slate-800">{selectedCandidate.phone}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Tanggal Melamar</label>
                <p className="text-sm text-slate-800">{new Date(selectedCandidate.appliedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-2 block">Stage Saat Ini</label>
                <StatusBadge status={selectedCandidate.stage} type="candidate" size="md" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="text-xs font-medium text-slate-500 mb-2 block">Pindahkan ke Stage</label>
              <div className="grid grid-cols-2 gap-2">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => {
                      handleStageChange(selectedCandidate, stage);
                      setSelectedCandidate({ ...selectedCandidate, stage });
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition ${
                      selectedCandidate.stage === stage
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
