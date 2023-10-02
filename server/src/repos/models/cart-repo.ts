import { Cart } from "../../entities/cart"

export interface ICartRepo {
  exists(id: Cart["id"]): Promise<boolean>
  getCartByCartId(id: Cart["id"]): Promise<Cart | null>
  save(Cart: Cart): Promise<void>
}
