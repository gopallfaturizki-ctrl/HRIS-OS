-- MR VAPOR HRIS Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nik VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(50) NOT NULL,
  position VARCHAR(100) NOT NULL,
  join_date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Tetap', 'Kontrak', 'Probation', 'Magang')) NOT NULL,
  gender CHAR(1) CHECK (gender IN ('L', 'P')) NOT NULL,
  address TEXT,
  birth_date DATE,
  bank_account VARCHAR(50),
  salary DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status VARCHAR(20) CHECK (status IN ('Hadir', 'Terlambat', 'Izin', 'Sakit', 'Alpha')) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Leaves table
CREATE TABLE leaves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  type VARCHAR(30) CHECK (type IN ('Cuti Tahunan', 'Cuti Sakit', 'Cuti Melahirkan', 'Cuti Menikah', 'Izin Khusus')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
  approved_by VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Overtime table
CREATE TABLE overtime (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  hours DECIMAL(4, 2) NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll table
CREATE TABLE payroll (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  period VARCHAR(20) NOT NULL,
  basic_salary DECIMAL(12, 2) NOT NULL,
  allowances DECIMAL(12, 2) DEFAULT 0,
  overtime_pay DECIMAL(12, 2) DEFAULT 0,
  deductions DECIMAL(12, 2) DEFAULT 0,
  tax DECIMAL(12, 2) DEFAULT 0,
  net_salary DECIMAL(12, 2) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Draft', 'Approved', 'Paid')) DEFAULT 'Draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, period)
);

-- Recruitment table
CREATE TABLE recruitment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  applied_date DATE NOT NULL,
  stage VARCHAR(30) CHECK (stage IN ('Lamaran', 'Screening', 'Interview HR', 'Interview User', 'Medical', 'Offering', 'Diterima', 'Ditolak')) DEFAULT 'Lamaran',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KPI table
CREATE TABLE kpi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  period VARCHAR(20) NOT NULL,
  kpi_items JSONB NOT NULL,
  final_score DECIMAL(5, 2) NOT NULL,
  grade VARCHAR(5) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training table
CREATE TABLE training (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('Internal', 'External', 'Online')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  participants INTEGER DEFAULT 0,
  max_participants INTEGER NOT NULL,
  trainer VARCHAR(100) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')) DEFAULT 'Upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discipline table
CREATE TABLE discipline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  violation TEXT NOT NULL,
  category VARCHAR(20) CHECK (category IN ('Ringan', 'Sedang', 'Berat')) NOT NULL,
  sanction VARCHAR(100) NOT NULL,
  status VARCHAR(10) CHECK (status IN ('SP1', 'SP2', 'SP3', 'PHK')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contracts table
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  type VARCHAR(10) CHECK (type IN ('PKWT', 'PKWTT', 'Magang')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) CHECK (status IN ('Aktif', 'Akan Berakhir', 'Berakhir', 'Diperpanjang')) DEFAULT 'Aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shifts table
CREATE TABLE shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  color VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX idx_leaves_employee_status ON leaves(employee_id, status);
CREATE INDEX idx_overtime_employee_date ON overtime(employee_id, date);
CREATE INDEX idx_payroll_employee_period ON payroll(employee_id, period);
CREATE INDEX idx_recruitment_stage ON recruitment(stage);
CREATE INDEX idx_contracts_employee_status ON contracts(employee_id, status);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE overtime ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi ENABLE ROW LEVEL SECURITY;
ALTER TABLE training ENABLE ROW LEVEL SECURITY;
ALTER TABLE discipline ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read and write
CREATE POLICY "Authenticated users can view employees" ON employees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert employees" ON employees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update employees" ON employees FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete employees" ON employees FOR DELETE TO authenticated USING (true);

-- Similar policies for other tables
CREATE POLICY "Enable all access for authenticated users" ON attendance TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON leaves TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON overtime TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON payroll TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON recruitment TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON kpi TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON training TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON discipline TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON contracts TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for authenticated users" ON shifts TO authenticated USING (true) WITH CHECK (true);
