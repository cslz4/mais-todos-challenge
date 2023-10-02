import { ProductDTO } from "./product-dto"

export type CartDTO = {
  id: string
  products: ProductDTO[]
}
