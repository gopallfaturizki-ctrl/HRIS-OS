import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Database, Save } from 'lucide-react';
import { useToast } from '../components/Toast';
import { PageHeader } from '../components/ui';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Settings() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      leaveApproval: true,
      overtimeApproval: true,
      contractExpiry: true,
    },
    appearance: {
      language: 'id',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const handleSave = () => {
    showToast('success', 'Pengaturan Disimpan', 'Pengaturan berhasil diperbarui');
  };

  return (
    <div>
      <PageHeader
        title="Pengaturan"
        subtitle="Kelola preferensi dan konfigurasi sistem"
        icon={<SettingsIcon size={20} />}
      />

      <div className="space-y-6">
        {/* Connection Status */}
        <div className={`rounded-xl p-5 border ${isSupabaseConfigured() ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-start gap-3">
            <Database size={20} className={isSupabaseConfigured() ? 'text-emerald-600' : 'text-amber-600'} />
            <div className="flex-1">
              <h3 className={`text-sm font-semibold ${isSupabaseConfigured() ? 'text-emerald-800' : 'text-amber-800'}`}>
                Status Koneksi Supabase
              </h3>
              <p className={`text-xs mt-1 ${isSupabaseConfigured() ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isSupabaseConfigured()
                  ? 'Terhubung ke Supabase. Data akan disinkronkan secara realtime.'
                  : 'Mode Demo aktif. Konfigurasikan Supabase untuk menyimpan data secara permanen.'}
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bell size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Notifikasi</h3>
                <p className="text-xs text-slate-500">Kelola preferensi notifikasi Anda</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {[
              { key: 'email', label: 'Notifikasi Email', desc: 'Terima notifikasi via email' },
              { key: 'push', label: 'Push Notification', desc: 'Notifikasi browser' },
              { key: 'leaveApproval', label: 'Persetujuan Cuti', desc: 'Notifikasi saat ada pengajuan cuti' },
              { key: 'overtimeApproval', label: 'Persetujuan Lembur', desc: 'Notifikasi saat ada pengajuan lembur' },
              { key: 'contractExpiry', label: 'Kontrak Akan Berakhir', desc: 'Peringatan kontrak即将 berakhir' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [item.key]: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Palette size={18} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Tampilan</h3>
                <p className="text-xs text-slate-500">Kustomisasi tampilan aplikasi</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bahasa</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => setSettings({
                  ...settings,
                  appearance: { ...settings.appearance, language: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Zona Waktu</label>
              <select
                value={settings.appearance.timezone}
                onChange={(e) => setSettings({
                  ...settings,
                  appearance: { ...settings.appearance, timezone: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Asia/Jakarta">WIB (Jakarta)</option>
                <option value="Asia/Makassar">WITA (Makassar)</option>
                <option value="Asia/Jayapura">WIT (Jayapura)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Keamanan</h3>
                <p className="text-xs text-slate-500">Pengaturan keamanan akun</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Tambahkan lapisan keamanan ekstra</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactor}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactor: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout (menit)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm"
          >
            <Save size={16} />
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
}
