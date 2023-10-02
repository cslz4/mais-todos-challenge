import { ProductForm, ProductFormValues } from "@/components/ProductForm";
import { createProduct, CreateProductProps } from "@/services/create-product";
import { useCallback } from "react";

export function AddProductPage() {
  const handleSubmit = useCallback(async (values: ProductFormValues) => {
    createProduct(values as CreateProductProps)
  }, [])

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
