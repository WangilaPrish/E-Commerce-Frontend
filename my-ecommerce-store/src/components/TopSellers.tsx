import ProductCard from "./ProductCard";
import products from "../lib/sample-products.json";

export default function TopSellers() {
  const top = (products as any[]).slice(0, 3);

  return (
    <section className="my-10">
      <h3 className="mb-4 text-2xl font-semibold">Top Sellers</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {top.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
        ))}
      </div>
    </section>
  );
}
