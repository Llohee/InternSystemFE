import { BusinessFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForBusinessState {
  filter: BusinessFilterRequest
  update: (Filter: BusinessFilterRequest) => void
  reset: () => void
}

export const useFilterForBusinessStore = create<FilterForBusinessState>((set) => ({
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
