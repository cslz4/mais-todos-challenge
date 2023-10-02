import { CartDTO } from "../dtos/cart-dto";
import { Cart } from "../entities/cart";
import { ProductMapper } from "./product-mapper";

export class CartMapper {
  static toDTO(cart: Cart): CartDTO {
    return {
      id: cart.id,
      products: cart.products.map(ProductMapper.toDTO)
    };
  }
}


