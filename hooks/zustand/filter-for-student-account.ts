import { StudentAccountFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForStudentAccountState {
  filter: StudentAccountFilterRequest
  update: (Filter: StudentAccountFilterRequest) => void
  reset: () => void
}

export const useFilterForStudentAccountStore = create<FilterForStudentAccountState>((set) => ({
  filter: {
    name: '',
    limit: 10,
    page: 0,
    sort: [],
    query: [],
  },
  update: (filter) => {
    set({ filter: filter })
  },
  reset: () => {
    set({
      filter: {
        name: '',
        limit: 10,
        page: 0,
        sort: [],
        query: [],
      },
    })
  },
}))
