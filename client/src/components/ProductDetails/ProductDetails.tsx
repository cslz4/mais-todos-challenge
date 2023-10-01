import { Product } from "@/entities/product"
import { formatCurrency } from "@/utils/format-currency/format-currency"

type ProductDetailsProps = {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
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
          <button className="bg-white hover:bg-gray-100 text-gray-600 text-xl font-semibold py-4 px-6 border border-gray-400 rounded shadow">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
