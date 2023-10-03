import { ButtonIcon } from "@/components/ButtonIcon";
import { Cart } from "@/components/Cart";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "@phosphor-icons/react"
import { Toaster } from "react-hot-toast";

export function RootLayout() {
  return (
    <div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'rgb(31, 41, 55)',
            color: '#fff',
            padding: '2rem',
          },
          success: {
            duration: 3000,
          },
        }} />
      <div className="flex items-center fixed w-full inset-y-0 top-0 z-20 bg-white border-b-2 border-b-gray-100 h-20">
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl px-16">
          <div>
            <Link to="/"><h1 className="uppercase font-black text-sm sm:text-xl lg:text-2xl">Mais Todos Store</h1></Link>
          </div>
          <div className="flex gap-4">
            <ButtonIcon as={Link} to="/admin/add-product">
              <Plus size={24} />
            </ButtonIcon>
            <Cart />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-16 pt-28 pb-16">
        <Outlet /> 
      </div>
    </div>
  )
}
