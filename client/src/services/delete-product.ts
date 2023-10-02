import { api } from "@/config/api";

type DeleteProductProps = {
  slug: string
}

export async function deleteProduct({ slug }: DeleteProductProps): Promise<void> {
  await api.delete(`/product/${slug}`)
}
