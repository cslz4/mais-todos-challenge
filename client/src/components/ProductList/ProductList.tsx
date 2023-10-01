import { Product } from "@/entities/product"
import { ProductListItem } from "../ProductListItem"

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products?.map(product => (
        <ProductListItem product={product} />
      ))}
    </div>
  )
}
