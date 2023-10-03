import { ProductForm, ProductFormValues } from "@/components/ProductForm";
import { deleteProduct } from "@/services/delete-product";
import { getProduct } from "@/services/get-product";
import { updateProduct } from "@/services/update-product";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
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
    navigate(`/product/${values.slug}`)
    toast.success('Produto alterado.')
  }, [navigate, productSlug])

  const handleDelete = useCallback(async () => {
    await deleteProduct({
      slug: productSlug as string
    })
    navigate("/")
    toast.success('Produto deletado.')
  }, [navigate, productSlug])


  if( isLoading ) return <div>Carregando...</div>

  if( !data ) return <div>Ocorreu um erro.</div>

  const defaultValues: Partial<ProductFormValues> = {
    ...data,
    image: undefined
  }

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} onDelete={handleDelete} defaultValues={defaultValues} />
    </div>
  )
}
