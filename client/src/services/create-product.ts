import { api } from "@/config/api";

export type CreateProductProps = {
  description: string
  slug: string
  name: string
  price: number
  image: FileList
}

export async function createProduct({ image, ...props }: CreateProductProps): Promise<void> {
  const data = new FormData()

  Object.entries(props).forEach(([key, value]) => {
    data.append(key, String(value))
  })

  data.append("image", image.item(0) as File)

  await api.post(`/product`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
