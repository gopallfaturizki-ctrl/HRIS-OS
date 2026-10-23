# MR VAPOR HRIS - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi dengan Supabase credentials (atau biarkan kosong untuk mode demo).

### 3. Run Development Server
```bash
npm run dev
```

Buka `http://localhost:5173`

### 4. Login
- **Demo Mode**: `admin@mrvapor.com` / `admin123`
- **Supabase Mode**: Gunakan akun yang sudah terdaftar

## 📦 Deployment

### Deploy ke Vercel

1. Push ke GitHub
2. Import di Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap.

## 🗄️ Supabase Setup

1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan `supabase/schema.sql` di SQL Editor
3. (Opsional) Jalankan `supabase/seed.sql` untuk sample data
4. Copy credentials ke `.env.local`

## 📱 Features

- ✅ 13 modul HRIS terintegrasi
- ✅ Real-time data sync (Supabase)
- ✅ Responsive design
- ✅ Authentication (Supabase Auth)
- ✅ Role-based access (coming soon)
- ✅ Export to PDF/Excel (coming soon)
- ✅ Email notifications (coming soon)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Hosting**: Vercel
- **Icons**: Lucide React

## 📚 Documentation

- [README.md](./README.md) - Overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [QUICKSTART.md](./QUICKSTART.md) - This file

## 🆘 Support

Untuk bantuan, hubungi tim development MR VAPOR.

---

**Built with ❤️ for MR VAPOR**
