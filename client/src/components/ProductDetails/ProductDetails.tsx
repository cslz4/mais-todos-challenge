import { Product } from "@/entities/product"
import { useCart } from "@/store"
import { formatCurrency } from "@/utils/format-currency/format-currency"

type ProductDetailsProps = {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { add, remove, exists } = useCart()

  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="w-full bg-slate-100 h-[40rem] p-16">
        <img className="w-full h-full object-scale-down" src={product.imageUrl} alt={product.name} />
      </div>

      <div>
        <h1 className="text-gray-600 text-6xl uppercase font-bold tracking-widest">{product.name}</h1>
        <p className="pt-8 text-gray-400">
          {product.description}
        </p>
        <div className="text-gray-400 text-4xl pt-8">
          {formatCurrency(product.price)}
        </div>

        <div className="pt-8">
          {exists(product.id) ? (
            <button type="button" className="bg-white hover:bg-red-100 text-red-500 text-xl font-semibold py-4 px-6 border border-red-500 rounded shadow" onClick={() => remove(product.id)}>
              Remover do carrinho
            </button>
          ) : (
              <button className="bg-white hover:bg-gray-100 text-gray-600 text-xl font-semibold py-4 px-6 border border-gray-400 rounded shadow" onClick={() => add(product)}>
                Adicionar ao carrinho
              </button>
            )}
        </div>
      </div>
    </div>
  )
}
