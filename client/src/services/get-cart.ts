import { api } from "@/config/api";
import { Cart } from "@/entities/cart";

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

type GetCartProps = {
  cartId: string;
};

export async function getCart({ cartId }: GetCartProps): Promise<Cart> {
  const { data } = await api.get<ApiResponse>(`/cart/${cartId}`);

  return data;
}
