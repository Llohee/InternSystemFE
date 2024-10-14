import { TenantFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForTenantState {
  filter: TenantFilterRequest
  update: (Filter: TenantFilterRequest) => void
  reset: () => void
}

export const useFilterForTenantStore = create<FilterForTenantState>((set) => ({
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
