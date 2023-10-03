import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { getProduct } from "@/services/get-product";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export function ProductPage() {
  const { slug } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ slug: slug as string }),
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="pb-6">
        <Link
          className="underline text-lg text-gray-800 hover:text-gray-400"
          to="/"
        >
          Voltar
        </Link>
      </div>
      <ProductDetails product={data!} />
    </div>
  );
}
