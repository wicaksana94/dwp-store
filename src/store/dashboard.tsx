import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DashboardData {
  program_terselesaikan: number;
  program_berjalan: number;
  total_waktu_kursus_dijalani: number;
  hak_student: string[];
  profile_percentage: number;
}

type DashboardDataStore = {
  studentDashboardData: DashboardData;
  setDashboardData: (data: DashboardData) => void;
  emptyDashboardData: () => void;
};

const useDashboardDataStore = create<DashboardDataStore>()(
  persist(
    (set) => ({
      studentDashboardData: {} as DashboardData,
      setDashboardData: (data) => set(() => ({ studentDashboardData: data })),
      emptyDashboardData: () =>
        set(() => ({ studentDashboardData: {} as DashboardData })),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDashboardDataStore;
