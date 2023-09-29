import { ProductDTO } from "../dtos/product-dto";
import { Product } from "../entities/product";

export class ProductMapper {
  static toDTO(product: Product): ProductDTO {
    return {
      name: product.name,
      slug: product.slug,
      id: product.id,
      imageUrl: product.imageUrl
    }
  }
}
