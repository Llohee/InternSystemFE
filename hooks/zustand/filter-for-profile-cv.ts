import { CVFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForCVState {
  filter: CVFilterRequest
  update: (Filter: CVFilterRequest) => void
  reset: () => void
}

export const useFilterForCVStore = create<FilterForCVState>((set) => ({
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
