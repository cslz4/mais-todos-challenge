import { ShoppingCart, X } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <button type="button" className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart size={24} className="text-gray-800" />
        <span className="flex items-center justify-center absolute w-5 h-5 bottom-[-10px] right-[-8px] bg-gray-600 rounded-full text-white text-xs">0</span>
      </button>

      <div className={`fixed z-30 right-0 top-0 w-96 h-screen bg-white border-l-2 border-l-gray-400 p-8 transition-all ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end">
          <button type="button" className="" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
      </div>
    </>
  )
}
