import { ProductForm, ProductFormValues } from "@/components/ProductForm";
import { createProduct, CreateProductProps } from "@/services/create-product";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddProductPage() {
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (values: ProductFormValues) => {
    createProduct(values as CreateProductProps)
    toast.success(`Produto adicionado.`)
    navigate('/')
  }, [])

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
