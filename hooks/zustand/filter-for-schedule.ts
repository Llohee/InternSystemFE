import { ScheduleFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForScheduleState {
  filter: ScheduleFilterRequest
  update: (Filter: ScheduleFilterRequest) => void
  reset: () => void
}

export const useFilterForScheduleStore = create<FilterForScheduleState>((set) => ({
  filter: {
    name: '',
    query: [],
    limit: 10,
    page: 0,
    sort: [],
  },
  update: (filter) => {
    set({ filter: filter })
  },
  reset: () => {
    set({
      filter: {
        name: '',
        query: [],
        limit: 10,
        page: 0,
        sort: [],
      },
    })
  },
}))
