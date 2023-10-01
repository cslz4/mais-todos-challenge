import { ProductDTO } from "../dtos/product-dto";
import { Product } from "../entities/product";

export class ProductMapper {
  static toDTO(product: Product): ProductDTO {
    return {
      name: product.name,
      description: product.description,
      slug: product.slug,
      id: product.id,
      imageUrl: product.imageUrl,
      price: product.price
    };
  }

  static toPersistence(product: Product) {
    return {
      name: product.name,
      description: product.description,
      slug: product.slug,
      id: product.id,
      imageUrl: product.imageUrl,
      price: product.price
    };
  }
}


