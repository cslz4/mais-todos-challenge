import { Product } from '@/entities/product'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CartState {
  products: Product[]
  exists: (productId: string) => boolean
  add: (product: Product) => void
  remove: (productId: string) => void
  getTotalAmmount: () => number
}

const useCart = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        exists: (productId) => get().products.some(p => p.id === productId),
        add: (product) => set((state) => ({
          products: get().exists(product.id) ? state.products : [...state.products.filter(p => p.id !== product.id), product]
        })),
        remove: (productId) => set((state => ({
          products: [...state.products.filter(p => p.id !== productId)]
        }))),
        getTotalAmmount() {
          return get().products.reduce((acc, curr) => acc + curr.price, 0)
        }
      }),
      {
        name: 'cart-storage',
      }
    )
  )
)

export { useCart }
