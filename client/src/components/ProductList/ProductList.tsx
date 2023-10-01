import { Product } from "@/entities/product"
import { ProductListItem } from "../ProductListItem"

type ProductListProps = {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-3 gap-16 py-8">
      {products?.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
}
