import { UniversityAccountFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForUniverSityAccountState {
  filter: UniversityAccountFilterRequest
  update: (Filter: UniversityAccountFilterRequest) => void
  reset: () => void
}

export const useFilterForUniverSityAccountStore = create<FilterForUniverSityAccountState>((set) => ({
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
