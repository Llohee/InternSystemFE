import { PostFilterRequest, ProfessionsFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForPostState {
  filter: PostFilterRequest
  update: (Filter: PostFilterRequest) => void
  reset: () => void
}
interface FilterForProfessionsState {
  filter: ProfessionsFilterRequest
  update: (Filter: ProfessionsFilterRequest) => void
  reset: () => void
}

export const useFilterForPostStore = create<FilterForPostState>((set) => ({
  filter: {
    local: '',
    profession: '',
    tenant: '',
    salary_min: undefined,
    salary_max: undefined,
    query: [],
    limit: 12,
    page: 0,
    sort: [],
  },
  update: (filter) => {
    set({ filter: filter })
  },
  reset: () => {
    set({
      filter: {
        local: '',
        profession: '',
        tenant: '',
        salary_min: undefined,
        salary_max: undefined,
        query: [],
        limit: 12,
        page: 0,
        sort: [],
      },
    })
  },
}))

export const useFilterForPostBusinessStore = create<FilterForPostState>((set) => ({
  filter: {
    local: '',
    profession: '',
    tenant: '',
    salary_min: undefined,
    salary_max: undefined,
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
        local: '',
        profession: '',
        tenant: '',
        salary_min: undefined,
        salary_max: undefined,
        query: [],
        limit: 10,
        page: 0,
        sort: [],
      },
    })
  },
}))

export const useFilterForProfessionsStore = create<FilterForProfessionsState>((set) => ({
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