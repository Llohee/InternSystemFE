import { create } from "zustand";

export interface SalaryPickerState {
  data: { salary_min: string; salary_max: string }
  updateDateRange: (salary_min: string, salary_max: string) => void
  resetDateRange: () => void
}

export const useSalaryPickerState = create<SalaryPickerState>((set) => ({
  data: {
    salary_min: '',
    salary_max: '',
  },
  updateDateRange: (salary_min: string, salary_max: string) => {
    set({ data: { salary_min, salary_max } })
  },
  resetDateRange: () => {
    set({
      data: {
        salary_min: '',
        salary_max: '',
      },
    })
  },
}))