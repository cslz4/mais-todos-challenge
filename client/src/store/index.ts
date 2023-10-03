import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreState {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      isCartOpen: false,
      openCart: () => set(() => ({ isCartOpen: true })),
      closeCart: () => set(() => ({ isCartOpen: false })),
    }),
  )
)

export { useStore }
