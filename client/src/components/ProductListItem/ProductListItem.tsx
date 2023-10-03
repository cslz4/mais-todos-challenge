import { Product } from "@/entities/product"
import { useCart } from "@/hooks"
import { formatCurrency } from "@/utils/format-currency/format-currency"
import { Link } from "react-router-dom"

type ProductListItemProps = {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { add, remove, exists } = useCart()

  return (
    <div className="flex flex-col justify-center">
      <Link to={`/product/${product.slug}`} className="w-full flex justify-center align-center text-gray-800 text-center group hover:cursor-pointer">
        <div className="w-full">
          <div className="h-full w-full lg:h-96 bg-slate-100 p-14 rounded-lg">
            <img className="w-full h-full object-scale-down group-hover:scale-[1.05] transition-transform" alt={product.name} src={product.imageUrl} />
          </div>
          <div className="text-gray-400 text-md uppercase font-bold pt-8 tracking-widest">{product.name}</div>
          <div className="text-md font-md pt-2">{formatCurrency(product.price)}</div>
        </div>
      </Link>
      {exists(product.id) ? (
        <button type="button" className="pt-4 underline text-red-500 hover:text-red-400" onClick={() => remove(product.id)}>Remover do carrinho</button>
      ) : (
          <button type="button" className="pt-4 underline text-gray-600 hover:text-gray-400" onClick={() => add(product)}>Adicionar ao carrinho</button>
        )}
    </div>
  )
}
