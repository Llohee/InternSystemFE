import { ReportLecturerFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForReportLecturerState {
  filter: ReportLecturerFilterRequest
  update: (Filter: ReportLecturerFilterRequest) => void
  reset: () => void
}

export const useFilterForReportLecturerStore = create<FilterForReportLecturerState>((set) => ({
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
export const useFilterForReportStore = create<FilterForReportLecturerState>((set) => ({
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
