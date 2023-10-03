import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function SuccessPage() {
  const { reset } = useCart()

  useEffect(() => {
    reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <div className="text-lg font-bold">
        Parabéns, compra realizada.
      </div>
      <div>
        <Link to="/" className="pt-4 underline text-gray-600 text-md">
          Voltar para loja
        </Link>
      </div>
    </div>
  )
}
