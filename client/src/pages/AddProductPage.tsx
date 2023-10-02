import { ProductForm, ProductFormValues } from "@/components/ProductForm";
import { createProduct } from "@/services/create-product";
import { useCallback } from "react";

export function AddProductPage() {
  const handleSubmit = useCallback(async (values: ProductFormValues) => {
    createProduct(values)
  }, [])

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
