import { Product } from "../entities/product";
import { IProductRepo } from "./models/product-repo";

export class InMemoryProductRepo implements IProductRepo {
  items = new Map<Product["slug"], Product>()

  async exists(slug: string): Promise<boolean> {
    return this.items.has(slug)
  }
  async getProducts(): Promise<Product[]> {
    return [...this.items.values()]
  }
  async getProductByProductSlug(slug: string): Promise<Product | null> {
    return this.items.get(slug) ?? null
  }
  async save(product: Product): Promise<void> {
    if(product.isDeleted) {
      this.items.delete(product.slug)
      return
    }

    this.items.set(product.slug, product)
  }
}
