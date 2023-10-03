import { api } from "@/config/api";
import { Product } from "@/entities/product";

import { z } from "zod";

export const schema = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().url(),
    slug: z.string(),
    id: z.string(),
    imageUrl: z.string(),
    price: z.number(),
  }),
);

type ApiResponse = z.infer<typeof schema>;

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<ApiResponse>("/product");

  return data;
}
