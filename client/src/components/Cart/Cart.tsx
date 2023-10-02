import { useCart } from "@/store";
import { formatCurrency } from "@/utils/format-currency/format-currency";
import { ShoppingCart, X } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { CartProduct } from "../CartProduct";

export function Cart() {
  const { products, getTotalAmmount } = useCart()
  const totalAmmount = getTotalAmmount()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <button type="button" className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart size={24} className="text-gray-800" />
        <span className="flex items-center justify-center absolute w-5 h-5 bottom-[-10px] right-[-8px] bg-gray-600 rounded-full text-white text-xs">{products.length}</span>
      </button>

      <div className={`fixed z-30 right-0 top-0 w-96 h-screen bg-white border-l-2 border-l-gray-400 p-8 transition-all overflow-auto ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end">
          <button type="button" className="" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-8 pt-8 pb-8">
          {products.map(product => <CartProduct product={product} />)}
        </div>
        <div className="pt-8 sticky bottom-0 bg-white border-t-2 border-t-gray-200">
          <div className="flex justify-end gap-2">
            <span>Total:</span>
            {formatCurrency(totalAmmount)}
          </div>
          <div className="pt-8">
            <button className="bg-white hover:bg-gray-100 text-gray-600 text-xl font-semibold py-4 px-6 border border-gray-400 rounded shadow w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
