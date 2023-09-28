import { Product } from "../../entities/product"

export interface IProductRepo {
  exists(slug: Product["slug"]): Promise<boolean>
  getProducts(): Promise<Product[]>
  getProductByProductSlug(slug: Product["slug"]): Promise<Product | null>
  save(product: Product): Promise<void>
}
