import { ShoppingCart } from "@phosphor-icons/react";
import { Link, Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div>
      <div className="flex items-center fixed w-full inset-y-0 top-0 z-20 bg-white border-b-2 border-b-gray-100 h-20">
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <div>
            <Link to="/"><h1 className="uppercase font-black text-2xl">Planet Store</h1></Link>
          </div>
          <div>
            <button type="button" className="relative">
              <ShoppingCart size={24} className="text-gray-800" />
              <span className="flex items-center justify-center absolute w-5 h-5 bottom-[-10px] right-[-8px] bg-gray-600 rounded-full text-white text-xs">0</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl pt-28 pb-16">
        <Outlet /> 
      </div>
    </div>
  )
}
