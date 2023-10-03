import { ProductList } from "@/components/ProductList";
import { getProducts } from "@/services/get-products";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-gray-950">Clothes</h2>
      </div>
      {data && data.length === 0 ? (
        <div className="pt-8">
          Nada por aqui, adicione um produto para começar.
        </div>
      ) : (
        <ProductList products={data!} />
      )}
    </div>
  );
}
