import { HumanresourceAccountFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForHumanresourceAccountState {
  filter: HumanresourceAccountFilterRequest
  update: (Filter: HumanresourceAccountFilterRequest) => void
  reset: () => void
}

export const useFilterForHumanresourceAccountStore = create<FilterForHumanresourceAccountState>((set) => ({
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
