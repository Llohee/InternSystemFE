import { ReportStudentFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForReportStudentState {
  filter: ReportStudentFilterRequest
  update: (Filter: ReportStudentFilterRequest) => void
  reset: () => void
}

export const useFilterForReportStudentStore = create<FilterForReportStudentState>((set) => ({
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
