import { Product } from "@/entities/product"

type ProductListItemProps = {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  return <div>{product.name}</div>
}
