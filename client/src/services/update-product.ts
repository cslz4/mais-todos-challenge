import { api } from "@/config/api";

type UpdateProductProps = {
  oldSlug: string
  description: string
  slug: string
  name: string
  price: number
  image: FileList
}

export async function updateProduct({ image, oldSlug, ...props }: UpdateProductProps): Promise<void> {
  const data = new FormData()

  Object.entries(props).forEach(([key, value]) => {
    data.append(key, String(value))
  })

  data.append("image", image.item(0) as File)

  await api.put(`/product/${oldSlug}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
