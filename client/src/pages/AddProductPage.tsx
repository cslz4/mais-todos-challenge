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
  }, [navigate])

  return (
    <div>
      <h2 className="text-2xl font-bold pb-4 text-gray-800">Adicionar um produto</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
