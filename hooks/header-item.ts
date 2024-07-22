import { create } from 'zustand'

interface HeaderSelectedItem {
  index: number
  update: (index: number) => void
}

export const useHeaderSelectedItem = create<HeaderSelectedItem>((set) => ({
  index: 0,
  update: (index) => {
    set({ index })
  },
}))
