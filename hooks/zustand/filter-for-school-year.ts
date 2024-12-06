import { SchoolYearFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForSchoolYearState {
  filter: SchoolYearFilterRequest
  update: (Filter: SchoolYearFilterRequest) => void
  reset: () => void
}

export const useFilterForSchoolYearStore = create<FilterForSchoolYearState>(
  (set) => ({
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
  })
)
export const useFilterForSubServiceStore = create<FilterForSchoolYearState>(
  (set) => ({
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
  })
)
