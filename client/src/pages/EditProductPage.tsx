import { ProductForm, ProductFormValues } from "@/components/ProductForm";
import { getProduct } from "@/services/get-product";
import { updateProduct } from "@/services/update-product";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditProductPage() {
  const { productSlug } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: () => getProduct({ slug: productSlug! }),
    enabled: !!productSlug
  })
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (values: ProductFormValues) => {
    await updateProduct({
      oldSlug: productSlug!,
      ...values,
    })
    navigate("/")
  }, [navigate, productSlug])

  if( isLoading ) return <div>Carregando...</div>

  if( !data ) return <div>Ocorreu um erro.</div>

  const defaultValues: Partial<ProductFormValues> = {
    ...data,
    image: undefined
  }

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} />
    </div>
  )
}
