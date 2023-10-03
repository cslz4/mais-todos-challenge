import { queryClient } from '@/config/query-client'
import { Cart } from '@/entities/cart'
import { Product } from '@/entities/product'
import { createCart } from '@/services/create-cart'
import { getCart } from '@/services/get-cart'
import { updateCart as updateCartService } from '@/services/update-cart'
import { useStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo } from 'react'

const getCartQueryKey = (cartId: string) => ['cart', cartId]

const useCart = () => {
  const { isCartOpen, openCart, closeCart } = useStore()
  const [cartId, setCartId] = useLocalStorage<string>('cartId')

  const createNewCart = useCallback(() => {
    createCart().then(cart => {
      setCartId(cart.id)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const queryKey = getCartQueryKey(cartId)
  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () => getCart({ cartId }),
    enabled: !!cartId,
    retry: false,
    onError: () => {
      createNewCart()
    }
  })

  const products = useMemo(() => data?.products ?? [], [data?.products])

  useEffect(() => {
    if(!cartId) {
      createNewCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createNewCart])

  const { mutate: updateCart } = useMutation({
    mutationFn: updateCartService,
    onMutate: async (newCart) => {
      await queryClient.cancelQueries({ queryKey: queryKey })
      const previousValue = queryClient.getQueryData(queryKey)
      queryClient.setQueryData<Cart>(queryKey, (old) => ({...old!, products: newCart.products}))

      return { previousValue }
    },
    onError: (_err, _newCart, context) => {
      queryClient.setQueryData(getCartQueryKey(cartId), context?.previousValue)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })

  const add = useCallback(async (product: Product) => {
    openCart()
    updateCart({ cartId, products: [...products, product] })
  }, [cartId, products, updateCart])

  const remove = useCallback(async (productId: Product["id"]) => {
    updateCart({ cartId, products: [...products.filter(product => product.id !== productId)] })
  }, [cartId, products, updateCart])

  const reset = useCallback(async () => {
    createNewCart()
  }, [createNewCart])

  const exists = useCallback((productId: string) => {
    return products.some(product => product.id === productId)
  }, [products])

  const totalAmmount = useMemo(() => products.reduce((acc, curr) => acc + curr.price, 0), [products])

  return { cartId, totalAmmount, add, remove, reset, exists, products: data?.products ?? [] }
}

export { useCart }
