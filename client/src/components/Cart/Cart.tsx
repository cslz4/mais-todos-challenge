import { useCart } from "@/hooks/use-cart";
import { useStore } from "@/store";
import { formatCurrency } from "@/utils/format-currency/format-currency";
import { ShoppingCart, X } from "@phosphor-icons/react";
import { CartProduct } from "../CartProduct";

export function Cart() {
  const { cartId, products, totalAmmount } = useCart();
  const { isCartOpen, openCart, closeCart } = useStore();
  const isCartEmpty = products.length === 0;

  return (
    <>
      <button
        type="button"
        className="relative"
        aria-label="Cart"
        onClick={openCart}
      >
        <ShoppingCart size={24} className="text-gray-800" />
        <span className="flex items-center justify-center absolute w-5 h-5 bottom-[-10px] right-[-8px] bg-gray-600 rounded-full text-white text-xs">
          {products.length}
        </span>
      </button>

      <div
        data-testid="cart-container"
        className={`fixed z-30 right-0 top-0 w-96 h-screen bg-white border-l-2 border-l-gray-400 p-8 transition-all overflow-auto ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button type="button" className="" onClick={closeCart}>
            <X size={24} aria-label="X" />
          </button>
        </div>

        {products && products.length > 0 ? (
          <div className="flex flex-col gap-8 py-8">
            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-8">
            Nada por aqui. Adicione produtos para começar.
          </div>
        )}

        <div className="pt-8 sticky bottom-0 bg-white border-t-2 border-t-gray-200">
          <div className="flex justify-end gap-2">
            <span>Total:</span>
            {formatCurrency(totalAmmount)}
          </div>
          <div className="pt-8">
            <form
              action={`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session?cartId=${cartId}`}
              method="POST"
            >
              <button
                disabled={isCartEmpty}
                className="bg-white hover:bg-gray-100 text-gray-600 text-xl font-semibold py-4 px-6 border border-gray-400 rounded shadow w-full disabled:bg-gray-200 disabled:text-gray-400"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
