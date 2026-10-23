export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          nik: string;
          name: string;
          email: string;
          phone: string;
          department: string;
          position: string;
          join_date: string;
          status: 'Tetap' | 'Kontrak' | 'Probation' | 'Magang';
          gender: 'L' | 'P';
          address: string;
          birth_date: string;
          bank_account: string;
          salary: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['employees']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['employees']['Insert']>;
      };
      attendance: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          check_in: string;
          check_out: string;
          status: 'Hadir' | 'Terlambat' | 'Izin' | 'Sakit' | 'Alpha';
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['attendance']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['attendance']['Insert']>;
      };
      leaves: {
        Row: {
          id: string;
          employee_id: string;
          type: 'Cuti Tahunan' | 'Cuti Sakit' | 'Cuti Melahirkan' | 'Cuti Menikah' | 'Izin Khusus';
          start_date: string;
          end_date: string;
          days: number;
          reason: string;
          status: 'Pending' | 'Approved' | 'Rejected';
          approved_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leaves']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leaves']['Insert']>;
      };
      overtime: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          start_time: string;
          end_time: string;
          hours: number;
          reason: string;
          status: 'Pending' | 'Approved' | 'Rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['overtime']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['overtime']['Insert']>;
      };
      payroll: {
        Row: {
          id: string;
          employee_id: string;
          period: string;
          basic_salary: number;
          allowances: number;
          overtime_pay: number;
          deductions: number;
          tax: number;
          net_salary: number;
          status: 'Draft' | 'Approved' | 'Paid';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payroll']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['payroll']['Insert']>;
      };
      recruitment: {
        Row: {
          id: string;
          name: string;
          position: string;
          email: string;
          phone: string;
          applied_date: string;
          stage: 'Lamaran' | 'Screening' | 'Interview HR' | 'Interview User' | 'Medical' | 'Offering' | 'Diterima' | 'Ditolak';
          rating: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['recruitment']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['recruitment']['Insert']>;
      };
      kpi: {
        Row: {
          id: string;
          employee_id: string;
          period: string;
          kpi_items: Json;
          final_score: number;
          grade: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['kpi']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['kpi']['Insert']>;
      };
      training: {
        Row: {
          id: string;
          title: string;
          type: 'Internal' | 'External' | 'Online';
          start_date: string;
          end_date: string;
          participants: number;
          max_participants: number;
          trainer: string;
          status: 'Upcoming' | 'Ongoing' | 'Completed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['training']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['training']['Insert']>;
      };
      discipline: {
        Row: {
          id: string;
          employee_id: string;
          date: string;
          violation: string;
          category: 'Ringan' | 'Sedang' | 'Berat';
          sanction: string;
          status: 'SP1' | 'SP2' | 'SP3' | 'PHK';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['discipline']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['discipline']['Insert']>;
      };
      contracts: {
        Row: {
          id: string;
          employee_id: string;
          type: 'PKWT' | 'PKWTT' | 'Magang';
          start_date: string;
          end_date: string;
          status: 'Aktif' | 'Akan Berakhir' | 'Berakhir' | 'Diperpanjang';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contracts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contracts']['Insert']>;
      };
      shifts: {
        Row: {
          id: string;
          name: string;
          start_time: string;
          end_time: string;
          color: string;
          description: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shifts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['shifts']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
