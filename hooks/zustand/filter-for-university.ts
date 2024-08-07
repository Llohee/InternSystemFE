import { UniversityFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForUniversityState {
  filter: UniversityFilterRequest
  update: (Filter: UniversityFilterRequest) => void
  reset: () => void
}

export const useFilterForUniversityStore = create<FilterForUniversityState>((set) => ({
  filter: {
    name: '',
    code: '',
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
        code: '',
        query: [],
        limit: 10,
        page: 0,
        sort: [],
      },
    })
  },
}))
