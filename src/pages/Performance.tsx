import { Target, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { kpiRecords } from '../data/mockData';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function Performance() {
  const gradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-100 text-emerald-700';
      case 'A-': return 'bg-emerald-50 text-emerald-600';
      case 'B+': return 'bg-blue-100 text-blue-700';
      case 'B': return 'bg-blue-50 text-blue-600';
      case 'C+': return 'bg-amber-100 text-amber-700';
      case 'C': return 'bg-amber-50 text-amber-600';
      default: return 'bg-red-100 text-red-700';
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">KPI & Performance</h1>
            <p className="text-sm text-gray-500">Monitoring Key Performance Indicator dan evaluasi karyawan</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <Target size={16} /> Buat Penilaian
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg"><Award size={16} className="text-emerald-600" /></div>
              <div>
                <p className="text-lg font-bold text-gray-800">{kpiRecords.filter(k => k.grade === 'A').length}</p>
                <p className="text-xs text-gray-500">Grade A</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg"><TrendingUp size={16} className="text-blue-600" /></div>
              <div>
                <p className="text-lg font-bold text-gray-800">{(kpiRecords.reduce((s, k) => s + k.finalScore, 0) / kpiRecords.length).toFixed(1)}</p>
                <p className="text-xs text-gray-500">Rata-rata Score</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg"><BarChart3 size={16} className="text-purple-600" /></div>
              <div>
                <p className="text-lg font-bold text-gray-800">{kpiRecords.length}</p>
                <p className="text-xs text-gray-500">Dinilai</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg"><Target size={16} className="text-amber-600" /></div>
              <div>
                <p className="text-lg font-bold text-gray-800">Q4 2023</p>
                <p className="text-xs text-gray-500">Periode</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Score Visualization */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Skor KPI per Karyawan</h3>
          <div className="space-y-4">
            {kpiRecords.map((kpi) => (
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
                {kpiRecords.map((kpi) => (
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
    </ErrorBoundary>
  );
}
