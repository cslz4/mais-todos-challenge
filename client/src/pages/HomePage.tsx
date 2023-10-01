import { ProductList } from "@/components/ProductList";
import { getProducts } from "@/services/get-products";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  if(isLoading) return <div>Carregando...</div>
  
  return <ProductList products={data!} />
}
