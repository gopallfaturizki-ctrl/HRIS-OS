import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  employees as initialEmployees,
  attendanceRecords as initialAttendance,
  leaveRequests as initialLeave,
  overtimeRecords as initialOvertime,
  payrollRecords as initialPayroll,
  recruitmentCandidates as initialRecruitment,
  kpiRecords as initialKpi,
  trainingPrograms as initialTraining,
  disciplineRecords as initialDiscipline,
  contractRecords as initialContracts,
  shiftSchedules as initialShifts,
  resignRecords as initialResign,
} from '../data/mockData';

export type Employee = typeof initialEmployees[0];
export type AttendanceRecord = typeof initialAttendance[0];
export type LeaveRequest = typeof initialLeave[0];
export type OvertimeRecord = typeof initialOvertime[0];
export type PayrollRecord = typeof initialPayroll[0];
export type RecruitmentCandidate = typeof initialRecruitment[0];
export type KPIRecord = typeof initialKpi[0];
export type TrainingProgram = typeof initialTraining[0];
export type DisciplineRecord = typeof initialDiscipline[0];
export type ContractRecord = typeof initialContracts[0];
export type ShiftSchedule = typeof initialShifts[0];
export type ResignRecord = typeof initialResign[0];

interface StoreState {
  employees: Employee[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  overtime: OvertimeRecord[];
  payroll: PayrollRecord[];
  recruitment: RecruitmentCandidate[];
  kpi: KPIRecord[];
  training: TrainingProgram[];
  discipline: DisciplineRecord[];
  contracts: ContractRecord[];
  shifts: ShiftSchedule[];
  resign: ResignRecord[];
}

interface StoreActions {
  // Employee actions
  addEmployee: (emp: Employee) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;

  // Leave actions
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  addLeave: (leave: LeaveRequest) => void;

  // Overtime actions
  approveOvertime: (id: string) => void;
  rejectOvertime: (id: string) => void;
  addOvertime: (ot: OvertimeRecord) => void;

  // Recruitment actions
  updateCandidateStage: (id: string, stage: RecruitmentCandidate['stage']) => void;
  addCandidate: (candidate: RecruitmentCandidate) => void;

  // Payroll actions
  addPayroll: (payroll: PayrollRecord) => void;
  updatePayrollStatus: (id: string, status: PayrollRecord['status']) => void;

  // Contract actions
  extendContract: (id: string) => void;

  // Discipline actions
  addDiscipline: (record: DisciplineRecord) => void;
  deleteDiscipline: (id: string) => void;

  // Training actions
  addTraining: (program: TrainingProgram) => void;
  updateTraining: (id: string, data: Partial<TrainingProgram>) => void;
  deleteTraining: (id: string) => void;

  // Recruitment actions
  deleteCandidate: (id: string) => void;

  // Attendance actions
  addAttendance: (record: AttendanceRecord) => void;
  updateAttendance: (id: string, data: Partial<AttendanceRecord>) => void;

  // Contract actions
  addContract: (contract: ContractRecord) => void;
  deleteContract: (id: string) => void;

  // Resign actions
  addResign: (record: ResignRecord) => void;
  updateResign: (id: string, data: Partial<ResignRecord>) => void;
  deleteResign: (id: string) => void;

  // Computed stats
  getStats: () => {
    totalEmployees: number;
    presentToday: number;
    onLeave: number;
    lateToday: number;
    absentToday: number;
    pendingLeaves: number;
    pendingOvertime: number;
    expiringContracts: number;
    openPositions: number;
    totalPayroll: number;
    attendanceRate: number;
  };
}

type Store = StoreState & StoreActions;

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({
    employees: initialEmployees,
    attendance: initialAttendance,
    leaves: initialLeave,
    overtime: initialOvertime,
    payroll: initialPayroll,
    recruitment: initialRecruitment,
    kpi: initialKpi,
    training: initialTraining,
    discipline: initialDiscipline,
    contracts: initialContracts,
    shifts: initialShifts,
    resign: initialResign,
  });

  const addEmployee = useCallback((emp: Employee) => {
    setState(s => ({ ...s, employees: [...s.employees, emp] }));
  }, []);

  const updateEmployee = useCallback((id: string, data: Partial<Employee>) => {
    setState(s => ({
      ...s,
      employees: s.employees.map(e => e.id === id ? { ...e, ...data } : e),
    }));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setState(s => ({ ...s, employees: s.employees.filter(e => e.id !== id) }));
  }, []);

  const getEmployeeById = useCallback((id: string) => {
    return state.employees.find(e => e.id === id);
  }, [state.employees]);

  const approveLeave = useCallback((id: string) => {
    setState(s => ({
      ...s,
      leaves: s.leaves.map(l => l.id === id ? { ...l, status: 'Approved' as const, approvedBy: 'Admin HRD' } : l),
    }));
  }, []);

  const rejectLeave = useCallback((id: string) => {
    setState(s => ({
      ...s,
      leaves: s.leaves.map(l => l.id === id ? { ...l, status: 'Rejected' as const, approvedBy: 'Admin HRD' } : l),
    }));
  }, []);

  const addLeave = useCallback((leave: LeaveRequest) => {
    setState(s => ({ ...s, leaves: [...s.leaves, leave] }));
  }, []);

  const approveOvertime = useCallback((id: string) => {
    setState(s => ({
      ...s,
      overtime: s.overtime.map(o => o.id === id ? { ...o, status: 'Approved' as const } : o),
    }));
  }, []);

  const rejectOvertime = useCallback((id: string) => {
    setState(s => ({
      ...s,
      overtime: s.overtime.map(o => o.id === id ? { ...o, status: 'Rejected' as const } : o),
    }));
  }, []);

  const addOvertime = useCallback((ot: OvertimeRecord) => {
    setState(s => ({ ...s, overtime: [...s.overtime, ot] }));
  }, []);

  const updateCandidateStage = useCallback((id: string, stage: RecruitmentCandidate['stage']) => {
    setState(s => ({
      ...s,
      recruitment: s.recruitment.map(c => c.id === id ? { ...c, stage } : c),
    }));
  }, []);

  const addCandidate = useCallback((candidate: RecruitmentCandidate) => {
    setState(s => ({ ...s, recruitment: [...s.recruitment, candidate] }));
  }, []);

  const addPayroll = useCallback((payroll: PayrollRecord) => {
    setState(s => ({ ...s, payroll: [...s.payroll, payroll] }));
  }, []);

  const updatePayrollStatus = useCallback((id: string, status: PayrollRecord['status']) => {
    setState(s => ({
      ...s,
      payroll: s.payroll.map(p => p.id === id ? { ...p, status } : p),
    }));
  }, []);

  const extendContract = useCallback((id: string) => {
    setState(s => ({
      ...s,
      contracts: s.contracts.map(c => c.id === id ? { ...c, status: 'Diperpanjang' as const } : c),
    }));
  }, []);

  const addDiscipline = useCallback((record: DisciplineRecord) => {
    setState(s => ({ ...s, discipline: [...s.discipline, record] }));
  }, []);

  const addTraining = useCallback((program: TrainingProgram) => {
    setState(s => ({ ...s, training: [...s.training, program] }));
  }, []);

  const updateTraining = useCallback((id: string, data: Partial<TrainingProgram>) => {
    setState(s => ({
      ...s,
      training: s.training.map(t => t.id === id ? { ...t, ...data } : t),
    }));
  }, []);

  const deleteTraining = useCallback((id: string) => {
    setState(s => ({ ...s, training: s.training.filter(t => t.id !== id) }));
  }, []);

  const deleteDiscipline = useCallback((id: string) => {
    setState(s => ({ ...s, discipline: s.discipline.filter(d => d.id !== id) }));
  }, []);

  const deleteCandidate = useCallback((id: string) => {
    setState(s => ({ ...s, recruitment: s.recruitment.filter(c => c.id !== id) }));
  }, []);

  const addAttendance = useCallback((record: AttendanceRecord) => {
    setState(s => ({ ...s, attendance: [...s.attendance, record] }));
  }, []);

  const updateAttendance = useCallback((id: string, data: Partial<AttendanceRecord>) => {
    setState(s => ({
      ...s,
      attendance: s.attendance.map(a => a.id === id ? { ...a, ...data } : a),
    }));
  }, []);

  const addContract = useCallback((contract: ContractRecord) => {
    setState(s => ({ ...s, contracts: [...s.contracts, contract] }));
  }, []);

  const deleteContract = useCallback((id: string) => {
    setState(s => ({ ...s, contracts: s.contracts.filter(c => c.id !== id) }));
  }, []);

  const addResign = useCallback((record: ResignRecord) => {
    setState(s => ({ ...s, resign: [...s.resign, record] }));
  }, []);

  const updateResign = useCallback((id: string, data: Partial<ResignRecord>) => {
    setState(s => ({
      ...s,
      resign: s.resign.map(r => r.id === id ? { ...r, ...data } : r),
    }));
  }, []);

  const deleteResign = useCallback((id: string) => {
    setState(s => ({ ...s, resign: s.resign.filter(r => r.id !== id) }));
  }, []);

  const getStats = useCallback(() => {
    const totalEmployees = state.employees.length;
    const presentToday = state.attendance.filter(a => a.status === 'Hadir' || a.status === 'Terlambat').length;
    const onLeave = state.attendance.filter(a => a.status === 'Izin' || a.status === 'Sakit').length;
    const lateToday = state.attendance.filter(a => a.status === 'Terlambat').length;
    const absentToday = state.attendance.filter(a => a.status === 'Alpha').length;
    const pendingLeaves = state.leaves.filter(l => l.status === 'Pending').length;
    const pendingOvertime = state.overtime.filter(o => o.status === 'Pending').length;
    const expiringContracts = state.contracts.filter(c => c.status === 'Akan Berakhir').length;
    const openPositions = state.recruitment.filter(r => !['Diterima', 'Ditolak'].includes(r.stage)).length;
    const totalPayroll = state.payroll.reduce((sum, p) => sum + p.netSalary, 0);
    const attendanceRate = totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0;

    return {
      totalEmployees,
      presentToday,
      onLeave,
      lateToday,
      absentToday,
      pendingLeaves,
      pendingOvertime,
      expiringContracts,
      openPositions,
      totalPayroll,
      attendanceRate,
    };
  }, [state]);

  const store: Store = {
    ...state,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    approveLeave,
    rejectLeave,
    addLeave,
    approveOvertime,
    rejectOvertime,
    addOvertime,
    updateCandidateStage,
    addCandidate,
    deleteCandidate,
    addPayroll,
    updatePayrollStatus,
    extendContract,
    addContract,
    deleteContract,
    addDiscipline,
    deleteDiscipline,
    addTraining,
    updateTraining,
    deleteTraining,
    addAttendance,
    updateAttendance,
    addResign,
    updateResign,
    deleteResign,
    getStats,
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
