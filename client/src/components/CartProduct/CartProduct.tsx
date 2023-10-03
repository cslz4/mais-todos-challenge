import { Product } from "@/entities/product"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/utils/format-currency/format-currency"
import { Trash } from "@phosphor-icons/react"

type CartProductProps = {
  product: Product
}

export function CartProduct({ product }: CartProductProps) {
  const { remove } = useCart()

  return (
    <div className="flex items-center gap-8">
      <div className="w-20 h-20 flex">
        <img className="w-full object-scale-down" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="flex-1">
        <div className="uppercase text-xs">{product.name}</div>
        <div className="uppercase text-xs pt-2">{formatCurrency(product.price)}</div>
      </div>
      <div>
        <button type="button" onClick={() => remove(product.id)} data-testid="remove-button">
          <Trash size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}
