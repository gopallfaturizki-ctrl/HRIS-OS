export interface Employee {
  id: string;
  name: string;
  nik: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'Tetap' | 'Kontrak' | 'Probation' | 'Magang';
  avatar?: string;
  gender: 'L' | 'P';
  address: string;
  birthDate: string;
  bankAccount: string;
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit' | 'Alpha';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Cuti Tahunan' | 'Cuti Sakit' | 'Cuti Melahirkan' | 'Cuti Menikah' | 'Izin Khusus';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
}

export interface ShiftSchedule {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  color: string;
  description: string;
}

export interface OvertimeRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: 'Draft' | 'Approved' | 'Paid';
}

export interface RecruitmentCandidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  appliedDate: string;
  stage: 'Lamaran' | 'Screening' | 'Interview HR' | 'Interview User' | 'Medical' | 'Offering' | 'Diterima' | 'Ditolak';
  rating: number;
}

export interface KPIRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  kpiItems: { name: string; weight: number; score: number }[];
  finalScore: number;
  grade: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  type: 'Internal' | 'External' | 'Online';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  trainer: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface DisciplineRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  violation: string;
  category: 'Ringan' | 'Sedang' | 'Berat';
  sanction: string;
  status: 'SP1' | 'SP2' | 'SP3' | 'PHK';
}

export interface ContractRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'PKWT' | 'PKWTT' | 'Magang';
  startDate: string;
  endDate: string;
  status: 'Aktif' | 'Akan Berakhir' | 'Berakhir' | 'Diperpanjang';
}

export const employees: Employee[] = [
  { id: '1', name: 'Ahmad Rizki', nik: 'MRV-001', email: 'ahmad@mrvapor.com', phone: '081234567890', department: 'Operasional', position: 'Store Manager', joinDate: '2020-03-15', status: 'Tetap', gender: 'L', address: 'Jl. Merdeka No. 10', birthDate: '1990-05-20', bankAccount: '1234567890', salary: 8000000 },
  { id: '2', name: 'Siti Nurhaliza', nik: 'MRV-002', email: 'siti@mrvapor.com', phone: '081234567891', department: 'Finance', position: 'Staff Finance', joinDate: '2021-01-10', status: 'Tetap', gender: 'P', address: 'Jl. Sudirman No. 25', birthDate: '1992-08-15', bankAccount: '1234567891', salary: 6000000 },
  { id: '3', name: 'Budi Santoso', nik: 'MRV-003', email: 'budi@mrvapor.com', phone: '081234567892', department: 'Operasional', position: 'Barista', joinDate: '2022-06-01', status: 'Kontrak', gender: 'L', address: 'Jl. Gatot Subroto No. 5', birthDate: '1995-03-10', bankAccount: '1234567892', salary: 4500000 },
  { id: '4', name: 'Dewi Lestari', nik: 'MRV-004', email: 'dewi@mrvapor.com', phone: '081234567893', department: 'HRD', position: 'HR Manager', joinDate: '2019-11-20', status: 'Tetap', gender: 'P', address: 'Jl. Diponegoro No. 15', birthDate: '1988-12-05', bankAccount: '1234567893', salary: 9000000 },
  { id: '5', name: 'Fajar Nugroho', nik: 'MRV-005', email: 'fajar@mrvapor.com', phone: '081234567894', department: 'Marketing', position: 'Marketing Staff', joinDate: '2023-02-14', status: 'Probation', gender: 'L', address: 'Jl. Ahmad Yani No. 30', birthDate: '1997-07-22', bankAccount: '1234567894', salary: 5000000 },
  { id: '6', name: 'Rina Wulandari', nik: 'MRV-006', email: 'rina@mrvapor.com', phone: '081234567895', department: 'Operasional', position: 'Supervisor', joinDate: '2020-08-10', status: 'Tetap', gender: 'P', address: 'Jl. Pahlawan No. 8', birthDate: '1991-04-18', bankAccount: '1234567895', salary: 7000000 },
  { id: '7', name: 'Hendra Wijaya', nik: 'MRV-007', email: 'hendra@mrvapor.com', phone: '081234567896', department: 'IT', position: 'IT Support', joinDate: '2022-09-01', status: 'Kontrak', gender: 'L', address: 'Jl. Kartini No. 12', birthDate: '1994-11-30', bankAccount: '1234567896', salary: 5500000 },
  { id: '8', name: 'Maya Sari', nik: 'MRV-008', email: 'maya@mrvapor.com', phone: '081234567897', department: 'Operasional', position: 'Barista', joinDate: '2023-07-15', status: 'Magang', gender: 'P', address: 'Jl. Veteran No. 20', birthDate: '1999-01-25', bankAccount: '1234567897', salary: 3000000 },
  { id: '9', name: 'Doni Prasetyo', nik: 'MRV-009', email: 'doni@mrvapor.com', phone: '081234567898', department: 'Warehouse', position: 'Staff Gudang', joinDate: '2021-04-20', status: 'Tetap', gender: 'L', address: 'Jl. Industri No. 7', birthDate: '1993-06-14', bankAccount: '1234567898', salary: 4800000 },
  { id: '10', name: 'Lina Marlina', nik: 'MRV-010', email: 'lina@mrvapor.com', phone: '081234567899', department: 'Finance', position: 'Accounting Staff', joinDate: '2022-01-05', status: 'Tetap', gender: 'P', address: 'Jl. Keuangan No. 3', birthDate: '1996-09-08', bankAccount: '1234567899', salary: 5500000 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Ahmad Rizki', date: '2024-01-15', checkIn: '07:55', checkOut: '17:05', status: 'Hadir' },
  { id: '2', employeeId: '2', employeeName: 'Siti Nurhaliza', date: '2024-01-15', checkIn: '08:10', checkOut: '17:00', status: 'Terlambat' },
  { id: '3', employeeId: '3', employeeName: 'Budi Santoso', date: '2024-01-15', checkIn: '07:50', checkOut: '17:10', status: 'Hadir' },
  { id: '4', employeeId: '4', employeeName: 'Dewi Lestari', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'Izin', notes: 'Urusan keluarga' },
  { id: '5', employeeId: '5', employeeName: 'Fajar Nugroho', date: '2024-01-15', checkIn: '07:45', checkOut: '17:00', status: 'Hadir' },
  { id: '6', employeeId: '6', employeeName: 'Rina Wulandari', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'Sakit', notes: 'Demam' },
  { id: '7', employeeId: '7', employeeName: 'Hendra Wijaya', date: '2024-01-15', checkIn: '08:00', checkOut: '17:00', status: 'Hadir' },
  { id: '8', employeeId: '8', employeeName: 'Maya Sari', date: '2024-01-15', checkIn: '07:58', checkOut: '17:02', status: 'Hadir' },
  { id: '9', employeeId: '9', employeeName: 'Doni Prasetyo', date: '2024-01-15', checkIn: '06:30', checkOut: '15:00', status: 'Hadir' },
  { id: '10', employeeId: '10', employeeName: 'Lina Marlina', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'Alpha' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '4', employeeName: 'Dewi Lestari', type: 'Izin Khusus', startDate: '2024-01-15', endDate: '2024-01-15', days: 1, reason: 'Urusan keluarga mendesak', status: 'Approved', approvedBy: 'Ahmad Rizki' },
  { id: '2', employeeId: '6', employeeName: 'Rina Wulandari', type: 'Cuti Sakit', startDate: '2024-01-15', endDate: '2024-01-17', days: 3, reason: 'Demam tinggi, perlu istirahat', status: 'Approved', approvedBy: 'Ahmad Rizki' },
  { id: '3', employeeId: '3', employeeName: 'Budi Santoso', type: 'Cuti Tahunan', startDate: '2024-01-22', endDate: '2024-01-24', days: 3, reason: 'Liburan keluarga', status: 'Pending' },
  { id: '4', employeeId: '5', employeeName: 'Fajar Nugroho', type: 'Cuti Tahunan', startDate: '2024-02-01', endDate: '2024-02-02', days: 2, reason: 'Acara pernikahan saudara', status: 'Pending' },
  { id: '5', employeeId: '8', employeeName: 'Maya Sari', type: 'Izin Khusus', startDate: '2024-01-20', endDate: '2024-01-20', days: 1, reason: 'Urusan kampus', status: 'Pending' },
];

export const shiftSchedules: ShiftSchedule[] = [
  { id: '1', name: 'Shift Pagi', startTime: '06:00', endTime: '14:00', color: 'bg-yellow-100 text-yellow-800', description: 'Shift pagi untuk operasional' },
  { id: '2', name: 'Shift Siang', startTime: '14:00', endTime: '22:00', color: 'bg-blue-100 text-blue-800', description: 'Shift siang untuk operasional' },
  { id: '3', name: 'Shift Malam', startTime: '22:00', endTime: '06:00', color: 'bg-purple-100 text-purple-800', description: 'Shift malam untuk operasional' },
  { id: '4', name: 'Shift Admin', startTime: '08:00', endTime: '17:00', color: 'bg-green-100 text-green-800', description: 'Shift normal untuk staff admin' },
];

export const overtimeRecords: OvertimeRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Ahmad Rizki', date: '2024-01-14', startTime: '17:00', endTime: '20:00', hours: 3, reason: 'Inventory stock opname', status: 'Approved' },
  { id: '2', employeeId: '6', employeeName: 'Rina Wulandari', date: '2024-01-13', startTime: '14:00', endTime: '18:00', hours: 4, reason: 'Training karyawan baru', status: 'Approved' },
  { id: '3', employeeId: '7', employeeName: 'Hendra Wijaya', date: '2024-01-15', startTime: '17:00', endTime: '21:00', hours: 4, reason: 'Maintenance server', status: 'Pending' },
  { id: '4', employeeId: '9', employeeName: 'Doni Prasetyo', date: '2024-01-14', startTime: '15:00', endTime: '19:00', hours: 4, reason: 'Penerimaan barang mendadak', status: 'Approved' },
];

export const payrollRecords: PayrollRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Ahmad Rizki', period: 'Januari 2024', basicSalary: 8000000, allowances: 1500000, overtime: 450000, deductions: 200000, tax: 487500, netSalary: 9262500, status: 'Paid' },
  { id: '2', employeeId: '2', employeeName: 'Siti Nurhaliza', period: 'Januari 2024', basicSalary: 6000000, allowances: 1000000, overtime: 0, deductions: 100000, tax: 345000, netSalary: 6555000, status: 'Paid' },
  { id: '3', employeeId: '3', employeeName: 'Budi Santoso', period: 'Januari 2024', basicSalary: 4500000, allowances: 750000, overtime: 300000, deductions: 50000, tax: 277500, netSalary: 5222500, status: 'Approved' },
  { id: '4', employeeId: '4', employeeName: 'Dewi Lestari', period: 'Januari 2024', basicSalary: 9000000, allowances: 2000000, overtime: 0, deductions: 300000, tax: 535000, netSalary: 10165000, status: 'Draft' },
  { id: '5', employeeId: '5', employeeName: 'Fajar Nugroho', period: 'Januari 2024', basicSalary: 5000000, allowances: 800000, overtime: 200000, deductions: 0, tax: 300000, netSalary: 5700000, status: 'Draft' },
];

export const recruitmentCandidates: RecruitmentCandidate[] = [
  { id: '1', name: 'Riko Aditya', position: 'Barista', email: 'riko@email.com', phone: '085123456780', appliedDate: '2024-01-10', stage: 'Interview User', rating: 4 },
  { id: '2', name: 'Anisa Putri', position: 'Cashier', email: 'anisa@email.com', phone: '085123456781', appliedDate: '2024-01-08', stage: 'Interview HR', rating: 3 },
  { id: '3', name: 'Dimas Prakoso', position: 'Barista', email: 'dimas@email.com', phone: '085123456782', appliedDate: '2024-01-12', stage: 'Screening', rating: 4 },
  { id: '4', name: 'Nadia Safitri', position: 'Marketing Staff', email: 'nadia@email.com', phone: '085123456783', appliedDate: '2024-01-05', stage: 'Offering', rating: 5 },
  { id: '5', name: 'Yoga Pratama', position: 'Staff Gudang', email: 'yoga@email.com', phone: '085123456784', appliedDate: '2024-01-14', stage: 'Lamaran', rating: 3 },
  { id: '6', name: 'Sari Indah', position: 'Barista', email: 'sari@email.com', phone: '085123456785', appliedDate: '2024-01-03', stage: 'Diterima', rating: 5 },
];

export const kpiRecords: KPIRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Ahmad Rizki', period: 'Q4 2023', kpiItems: [{ name: 'Target Penjualan', weight: 30, score: 90 }, { name: 'Kepuasan Pelanggan', weight: 25, score: 85 }, { name: 'Manajemen Tim', weight: 25, score: 88 }, { name: 'Efisiensi Operasional', weight: 20, score: 92 }], finalScore: 88.75, grade: 'A' },
  { id: '2', employeeId: '6', employeeName: 'Rina Wulandari', period: 'Q4 2023', kpiItems: [{ name: 'Target Penjualan', weight: 30, score: 85 }, { name: 'Quality Control', weight: 25, score: 90 }, { name: 'Team Leadership', weight: 25, score: 82 }, { name: 'Inovasi', weight: 20, score: 78 }], finalScore: 84.25, grade: 'B+' },
  { id: '3', employeeId: '2', employeeName: 'Siti Nurhaliza', period: 'Q4 2023', kpiItems: [{ name: 'Akurasi Laporan', weight: 30, score: 95 }, { name: 'Ketepatan Waktu', weight: 25, score: 88 }, { name: 'Komunikasi', weight: 25, score: 80 }, { name: 'Inisiatif', weight: 20, score: 85 }], finalScore: 87.5, grade: 'A' },
];

export const trainingPrograms: TrainingProgram[] = [
  { id: '1', title: 'Barista Fundamentals', type: 'Internal', startDate: '2024-02-01', endDate: '2024-02-03', participants: 5, maxParticipants: 10, trainer: 'Ahmad Rizki', status: 'Upcoming' },
  { id: '2', title: 'Customer Service Excellence', type: 'External', startDate: '2024-01-20', endDate: '2024-01-21', participants: 8, maxParticipants: 15, trainer: 'External Trainer', status: 'Ongoing' },
  { id: '3', title: 'Financial Management', type: 'Online', startDate: '2024-01-10', endDate: '2024-01-15', participants: 3, maxParticipants: 5, trainer: 'Lina Marlina', status: 'Completed' },
  { id: '4', title: 'Leadership Development', type: 'External', startDate: '2024-02-15', endDate: '2024-02-17', participants: 4, maxParticipants: 8, trainer: 'External Coach', status: 'Upcoming' },
  { id: '5', title: 'Product Knowledge - New Menu', type: 'Internal', startDate: '2024-01-25', endDate: '2024-01-25', participants: 12, maxParticipants: 15, trainer: 'Rina Wulandari', status: 'Upcoming' },
];

export const disciplineRecords: DisciplineRecord[] = [
  { id: '1', employeeId: '10', employeeName: 'Lina Marlina', date: '2024-01-10', violation: 'Tidak masuk kerja tanpa keterangan', category: 'Sedang', sanction: 'Surat Peringatan 1', status: 'SP1' },
  { id: '2', employeeId: '3', employeeName: 'Budi Santoso', date: '2023-12-15', violation: 'Terlambat berulang kali (>5x dalam sebulan)', category: 'Ringan', sanction: 'Teguran Lisan', status: 'SP1' },
  { id: '3', employeeId: '5', employeeName: 'Fajar Nugroho', date: '2024-01-05', violation: 'Tidak menggunakan seragam lengkap', category: 'Ringan', sanction: 'Teguran Lisan', status: 'SP1' },
];

export const contractRecords: ContractRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Ahmad Rizki', type: 'PKWTT', startDate: '2020-03-15', endDate: '-', status: 'Aktif' },
  { id: '2', employeeId: '2', employeeName: 'Siti Nurhaliza', type: 'PKWTT', startDate: '2021-01-10', endDate: '-', status: 'Aktif' },
  { id: '3', employeeId: '3', employeeName: 'Budi Santoso', type: 'PKWT', startDate: '2023-06-01', endDate: '2024-05-31', status: 'Aktif' },
  { id: '4', employeeId: '4', employeeName: 'Dewi Lestari', type: 'PKWTT', startDate: '2019-11-20', endDate: '-', status: 'Aktif' },
  { id: '5', employeeId: '7', employeeName: 'Hendra Wijaya', type: 'PKWT', startDate: '2023-09-01', endDate: '2024-02-28', status: 'Akan Berakhir' },
  { id: '6', employeeId: '8', employeeName: 'Maya Sari', type: 'Magang', startDate: '2023-07-15', endDate: '2024-01-15', status: 'Berakhir' },
];

export const dashboardStats = {
  totalEmployees: 10,
  presentToday: 7,
  onLeave: 2,
  lateToday: 1,
  openPositions: 3,
  pendingLeave: 3,
  pendingOvertime: 1,
  contractsExpiring: 1,
  monthlyPayroll: 68899500,
  attendanceRate: 92,
};
