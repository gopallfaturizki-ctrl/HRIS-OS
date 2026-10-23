# 🚀 Deployment Guide - MR VAPOR HRIS

Panduan lengkap deployment ke Vercel dengan Supabase backend.

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun [Supabase](https://supabase.com)
- Akun [Vercel](https://vercel.com)
- Git

## 🔧 Step 1: Setup Supabase Backend

### 1.1 Buat Project Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi detail:
   - **Name**: `mr-vapor-hris`
   - **Database Password**: (simpan baik-baik!)
   - **Region**: Southeast Asia (Singapore)
   - **Pricing Plan**: Free (untuk development)
4. Klik **"Create new project"**
5. Tunggu hingga project siap (~2 menit)

### 1.2 Setup Database Schema

1. Di Supabase Dashboard, buka **SQL Editor** (icon di sidebar kiri)
2. Klik **"New query"**
3. Copy seluruh isi file `supabase/schema.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** (atau tekan Ctrl+Enter)
6. Tunggu hingga semua tabel terbuat

### 1.3 (Opsional) Load Sample Data

1. Masih di SQL Editor, buat query baru
2. Copy isi file `supabase/seed.sql`
3. Paste dan klik **"Run"**

### 1.4 Dapatkan Credentials

1. Buka **Settings** → **API**
2. Copy:
   - **Project URL** (contoh: `https://abcdefg.supabase.co`)
   - **anon public key** (panjang, dimulai dengan `eyJ...`)

### 1.5 Setup Authentication

1. Buka **Authentication** → **Providers**
2. Pastikan **Email** provider enabled
3. (Opsional) Konfigurasi email template di **Authentication** → **Email Templates**

## 🔐 Step 2: Setup Environment Variables

### 2.1 Local Development

1. Copy file `.env.example` ke `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` dan isi dengan credentials Supabase:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 2.2 Test Local

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` dan test aplikasi.

## 🌐 Step 3: Deploy ke Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push code ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mr-vapor-hris.git
   git push -u origin main
   ```

2. **Import ke Vercel**:
   - Buka [vercel.com/new](https://vercel.com/new)
   - Klik **"Import Git Repository"**
   - Pilih repository `mr-vapor-hris`
   - Klik **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**:
   - Klik **"Environment Variables"**
   - Tambahkan:
     - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `eyJhbGci...`
   
5. **Deploy**:
   - Klik **"Deploy"**
   - Tunggu ~2-3 menit
   - Aplikasi siap di `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow prompts
   - Set environment variables saat ditanya

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

## ✅ Step 4: Post-Deployment Checklist

### 4.1 Verify Deployment

- [ ] Buka URL Vercel
- [ ] Test login dengan demo credentials
- [ ] Cek semua menu berfungsi
- [ ] Test create/edit/delete data
- [ ] Cek responsive design (mobile/tablet)

### 4.2 Supabase Configuration

- [ ] Enable RLS policies (sudah ada di schema.sql)
- [ ] Setup custom domain (opsional)
- [ ] Configure email templates
- [ ] Setup backups (Settings → Database → Backups)

### 4.3 Security

- [ ] Ganti demo credentials
- [ ] Enable 2FA untuk admin
- [ ] Review RLS policies
- [ ] Setup rate limiting (jika perlu)

## 🔧 Step 5: Custom Domain (Opsional)

### 5.1 Di Vercel

1. Buka project settings
2. Klik **"Domains"**
3. Tambahkan domain (contoh: `hris.mrvapor.com`)
4. Follow instruksi DNS configuration

### 5.2 Di Supabase

1. Buka **Authentication** → **URL Configuration**
2. Update **Site URL** ke domain custom
3. Update **Redirect URLs** jika perlu

## 📊 Step 6: Monitoring & Maintenance

### 6.1 Supabase Monitoring

- **Dashboard**: Lihat usage statistics
- **Logs**: Cek API logs untuk debugging
- **Database**: Monitor query performance

### 6.2 Vercel Monitoring

- **Analytics**: Lihat traffic dan performance
- **Logs**: Cek deployment logs
- **Alerts**: Setup alerts untuk errors

### 6.3 Backup Strategy

- **Database**: Supabase auto-backup daily (free plan)
- **Code**: GitHub repository
- **Environment**: Document di `.env.example`

## 🐛 Troubleshooting

### Data tidak muncul dari Supabase

**Solusi**:
1. Cek environment variables di Vercel
2. Pastikan RLS policies sudah di-setup
3. Cek browser console untuk error
4. Verify Supabase URL dan key benar

### Build error di Vercel

**Solusi**:
1. Cek Node version (harus 18+)
2. Clear build cache di Vercel
3. Cek semua dependencies terinstall
4. Review build logs di Vercel

### Login tidak bisa

**Solusi**:
1. Cek Authentication provider enabled
2. Verify email confirmation setting
3. Cek Supabase logs untuk error
4. Reset password jika perlu

### Realtime tidak update

**Solusi**:
1. Cek RLS policies untuk realtime
2. Verify channel subscription
3. Cek browser console untuk errors
4. Restart Supabase Realtime server

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

## 🆘 Support

Untuk bantuan lebih lanjut:
1. Cek [README.md](./README.md)
2. Review Supabase logs
3. Check Vercel deployment logs
4. Contact development team

---

**Happy Deploying! 🚀**
