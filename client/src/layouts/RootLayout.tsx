import { ButtonIcon } from "@/components/ButtonIcon";
import { Cart } from "@/components/Cart";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "@phosphor-icons/react"

export function RootLayout() {
  return (
    <div>
      <div className="flex items-center fixed w-full inset-y-0 top-0 z-20 bg-white border-b-2 border-b-gray-100 h-20">
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          <div>
            <Link to="/"><h1 className="uppercase font-black text-2xl">Mais Todos Store</h1></Link>
          </div>
          <div className="flex gap-4">
            <ButtonIcon as={Link} to="/admin/add-product">
              <Plus size={24} />
            </ButtonIcon>
            <Cart />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl pt-28 pb-16">
        <Outlet /> 
      </div>
    </div>
  )
}
