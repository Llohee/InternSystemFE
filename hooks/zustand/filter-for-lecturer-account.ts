import { LecturerAccountFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForLecturerAccountState {
  filter: LecturerAccountFilterRequest
  update: (Filter: LecturerAccountFilterRequest) => void
  reset: () => void
}

export const useFilterForLecturerAccountStore = create<FilterForLecturerAccountState>((set) => ({
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
