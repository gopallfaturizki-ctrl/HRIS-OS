-- Seed data for MR VAPOR HRIS
-- Run this after schema.sql

-- Insert sample employees
INSERT INTO employees (nik, name, email, phone, department, position, join_date, status, gender, address, birth_date, bank_account, salary) VALUES
('MRV-001', 'Ahmad Rizki', 'ahmad@mrvapor.com', '081234567890', 'Operasional', 'Store Manager', '2020-03-15', 'Tetap', 'L', 'Jl. Merdeka No. 10', '1990-05-20', '1234567890', 8000000),
('MRV-002', 'Siti Nurhaliza', 'siti@mrvapor.com', '081234567891', 'Finance', 'Staff Finance', '2021-01-10', 'Tetap', 'P', 'Jl. Sudirman No. 25', '1992-08-15', '1234567891', 6000000),
('MRV-003', 'Budi Santoso', 'budi@mrvapor.com', '081234567892', 'Operasional', 'Barista', '2022-06-01', 'Kontrak', 'L', 'Jl. Gatot Subroto No. 5', '1995-03-10', '1234567892', 4500000),
('MRV-004', 'Dewi Lestari', 'dewi@mrvapor.com', '081234567893', 'HRD', 'HR Manager', '2019-11-20', 'Tetap', 'P', 'Jl. Diponegoro No. 15', '1988-12-05', '1234567893', 9000000),
('MRV-005', 'Fajar Nugroho', 'fajar@mrvapor.com', '081234567894', 'Marketing', 'Marketing Staff', '2023-02-14', 'Probation', 'L', 'Jl. Ahmad Yani No. 30', '1997-07-22', '1234567894', 5000000);

-- Insert sample attendance
INSERT INTO attendance (employee_id, date, check_in, check_out, status) 
SELECT id, '2024-01-15', '07:55', '17:05', 'Hadir' FROM employees WHERE nik = 'MRV-001';

INSERT INTO attendance (employee_id, date, check_in, check_out, status) 
SELECT id, '2024-01-15', '08:10', '17:00', 'Terlambat' FROM employees WHERE nik = 'MRV-002';

-- Insert sample leaves
INSERT INTO leaves (employee_id, type, start_date, end_date, days, reason, status)
SELECT id, 'Izin Khusus', '2024-01-15', '2024-01-15', 1, 'Urusan keluarga mendesak', 'Approved'
FROM employees WHERE nik = 'MRV-004';

INSERT INTO leaves (employee_id, type, start_date, end_date, days, reason, status)
SELECT id, 'Cuti Tahunan', '2024-01-22', '2024-01-24', 3, 'Liburan keluarga', 'Pending'
FROM employees WHERE nik = 'MRV-003';

-- Insert sample shifts
INSERT INTO shifts (name, start_time, end_time, color, description) VALUES
('Shift Pagi', '06:00', '14:00', 'bg-yellow-100 text-yellow-800', 'Shift pagi untuk operasional'),
('Shift Siang', '14:00', '22:00', 'bg-blue-100 text-blue-800', 'Shift siang untuk operasional'),
('Shift Malam', '22:00', '06:00', 'bg-purple-100 text-purple-800', 'Shift malam untuk operasional'),
('Shift Admin', '08:00', '17:00', 'bg-green-100 text-green-800', 'Shift normal untuk staff admin');

-- Insert sample training
INSERT INTO training (title, type, start_date, end_date, participants, max_participants, trainer, status) VALUES
('Barista Fundamentals', 'Internal', '2024-02-01', '2024-02-03', 5, 10, 'Ahmad Rizki', 'Upcoming'),
('Customer Service Excellence', 'External', '2024-01-20', '2024-01-21', 8, 15, 'External Trainer', 'Ongoing');

-- Insert sample recruitment
INSERT INTO recruitment (name, position, email, phone, applied_date, stage, rating) VALUES
('Riko Aditya', 'Barista', 'riko@email.com', '085123456780', '2024-01-10', 'Interview User', 4),
('Anisa Putri', 'Cashier', 'anisa@email.com', '085123456781', '2024-01-08', 'Interview HR', 3);
