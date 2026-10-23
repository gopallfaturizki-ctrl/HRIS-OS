import { Target, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { useStore } from '../store/StoreProvider';
import { PageHeader, StatCard, StatusBadge } from '../components/ui';

export default function Performance() {
  const store = useStore();

  const gradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-100 text-emerald-700';
      case 'B+': return 'bg-blue-100 text-blue-700';
      case 'B': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <PageHeader
        title="KPI & Performance"
        subtitle="Monitoring Key Performance Indicator dan evaluasi karyawan"
        icon={<Target size={20} />}
        actionLabel="Buat Penilaian"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Grade A" value={store.kpi.filter(k => k.grade === 'A').length} icon={<Award size={16} />} color="emerald" />
        <StatCard label="Rata-rata Score" value={(store.kpi.reduce((s, k) => s + k.finalScore, 0) / store.kpi.length).toFixed(1)} icon={<TrendingUp size={16} />} color="blue" />
        <StatCard label="Dinilai" value={store.kpi.length} icon={<BarChart3 size={16} />} color="purple" />
        <StatCard label="Periode" value="Q4 2023" icon={<Target size={16} />} color="amber" />
      </div>

      {/* KPI Score Visualization */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Skor KPI per Karyawan</h3>
        <div className="space-y-4">
          {store.kpi.map((kpi) => (
            <div key={kpi.id} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-700">{kpi.employeeName.split(' ')[0]}</div>
              <div className="flex-1">
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${kpi.finalScore}%` }}
                  >
                    <span className="text-xs font-bold text-white">{kpi.finalScore}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${gradeColor(kpi.grade)}`}>
                {kpi.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Detail Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Detail Penilaian KPI</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Karyawan</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Periode</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Item KPI</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Skor Akhir</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Grade</th>
              </tr>
            </thead>
            <tbody>
              {store.kpi.map((kpi) => (
                <tr key={kpi.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-800">{kpi.employeeName}</td>
                  <td className="px-4 py-3 text-gray-600">{kpi.period}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {kpi.kpiItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span className="text-gray-600 w-32 truncate">{item.name}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                          </div>
                          <span className="text-gray-500 font-mono">{item.score}</span>
                          <span className="text-gray-400">({item.weight}%)</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-lg font-bold text-emerald-700">{kpi.finalScore}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${gradeColor(kpi.grade)}`}>
                      {kpi.grade}
                    </span>
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
