# MR VAPOR HRIS - Fullstack Deployment Guide

Sistem HRIS terintegrasi dengan **Supabase** (backend) dan siap deploy ke **Vercel** (frontend).

## 🚀 Quick Start

### 1. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Copy **Project URL** dan **Anon Key** dari Settings → API
4. Buka **SQL Editor**
5. Jalankan file `supabase/schema.sql` untuk membuat tabel
6. (Opsional) Jalankan `supabase/seed.sql` untuk data dummy

### 2. Setup Environment Variables

Copy file `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Isi dengan credentials Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Local Development

```bash
npm install
npm run dev
```

### 4. Deploy ke Vercel

#### Option A: Via Vercel Dashboard
1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

#### Option B: Via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📊 Database Schema

### Tabel Utama:
- `employees` - Data karyawan
- `attendance` - Absensi harian
- `leaves` - Pengajuan cuti
- `overtime` - Lembur
- `payroll` - Penggajian
- `recruitment` - Kandidat rekrutmen
- `kpi` - Penilaian KPI
- `training` - Program training
- `discipline` - Catatan pelanggaran
- `contracts` - Kontrak kerja
- `shifts` - Jadwal shift

### Fitur Database:
- ✅ UUID primary keys
- ✅ Foreign key relationships
- ✅ Row Level Security (RLS)
- ✅ Auto-updated timestamps
- ✅ Performance indexes
- ✅ Realtime subscriptions

## 🔐 Authentication

Login menggunakan Supabase Auth:
- Email/Password authentication
- Session management
- Protected routes

**Demo credentials** (jika Supabase belum di-setup):
- Email: `admin@mrvapor.com`
- Password: `admin123`

## 🎨 Features

### Modul HRIS:
1. **Dashboard** - Overview metrics & quick actions
2. **Data Karyawan** - CRUD employees
3. **Absensi** - Attendance tracking
4. **Shift** - Shift management
5. **Cuti & Izin** - Leave requests & approval
6. **Lembur** - Overtime management
7. **Payroll** - Salary calculation
8. **Recruitment** - Candidate pipeline
9. **KPI & Performance** - Performance metrics
10. **Training** - Training programs
11. **Disiplin** - Discipline records
12. **Kontrak** - Contract management
13. **Resign** - Exit process

### Tech Stack:
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Hosting**: Vercel
- **Icons**: Lucide React

## 🔄 Realtime Features

Aplikasi menggunakan Supabase Realtime untuk:
- Auto-refresh data saat ada perubahan
- Live updates untuk approval status
- Collaborative editing

## 📱 Responsive Design

- Mobile-first approach
- Optimized untuk tablet & desktop
- Sidebar navigation yang collapsible

## 🔧 Development Tips

### Menambah Fitur Baru:
1. Buat tabel di Supabase SQL Editor
2. Update `src/types/database.ts`
3. Buat hook di `src/hooks/`
4. Implementasi di component

### Testing:
```bash
npm run build    # Build untuk production
npm run preview  # Preview build
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |

## 🐛 Troubleshooting

### Data tidak muncul dari Supabase?
- Cek environment variables sudah benar
- Pastikan RLS policies sudah di-setup
- Cek browser console untuk error

### Build error di Vercel?
- Pastikan semua environment variables sudah di-set
- Cek Node version compatibility

## 📞 Support

Untuk bantuan lebih lanjut, hubungi tim development MR VAPOR.

---

**Built with ❤️ for MR VAPOR**
