import { api } from "@/config/api";
import { Cart } from "@/entities/cart";
import { Product } from "@/entities/product";

import { z } from "zod";

export const schema = z.object({
  id: z.string(),
  products: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      slug: z.string(),
      id: z.string(),
      imageUrl: z.string(),
      price: z.number(),
    }),
  ),
});

type ApiResponse = z.infer<typeof schema>;

type UpdateCartProps = {
  cartId: string;
  products: Product[];
};

export async function updateCart({
  cartId,
  products,
}: UpdateCartProps): Promise<Cart> {
  const { data } = await api.put<ApiResponse>(`/cart`, {
    cartId,
    slugs: products.map((product) => product.slug),
  });

  return data;
}
