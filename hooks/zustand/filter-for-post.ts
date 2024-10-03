import { PostFilterRequest } from '@/models/api'
import { create } from 'zustand'

interface FilterForPostState {
  filter: PostFilterRequest
  update: (Filter: PostFilterRequest) => void
  reset: () => void
}

export const useFilterForPostStore = create<FilterForPostState>((set) => ({
  filter: {
    local: '',
    profession: '',
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
        query: [],
        limit: 10,
        page: 0,
        sort: [],
      },
    })
  },
}))