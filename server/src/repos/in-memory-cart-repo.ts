import { Cart } from "../entities/cart";
import { ICartRepo } from "./models/cart-repo";

export class InMemoryCartRepo implements ICartRepo {
  items = new Map<Cart["id"], Cart>()

  async exists(id: string): Promise<boolean> {
    return this.items.has(id)
  }

  async getCartByCartId(id: string): Promise<Cart | null> {
    return this.items.get(id) ?? null
  }

  async save(cart: Cart): Promise<void> {
    if(cart.isDeleted) {
      this.items.delete(cart.id)
      return
    }

    this.items.set(cart.id, cart)
  }
}
