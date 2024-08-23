import { GroupFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForGroupState {
  filter: GroupFilterRequest
  update: (Filter: GroupFilterRequest) => void
  reset: () => void
}

export const useFilterForGroupStore = create<FilterForGroupState>((set) => ({
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
