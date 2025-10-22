"use client";

import { useMemo, useState } from "react";
import productsData from "../../lib/sample-products.json";
import ProductCard from "../../components/ProductCard";
import ProductsFilter from "../../components/ProductsFilter";

const CATEGORIES = ["men", "women", "accessories"];

export default function ProductsPage() {
  const [filters, setFilters] = useState<{ category?: string; maxPrice?: number }>({});
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let list = productsData as any[];
    if (filters.category) {
      // simple fuzzy match on name for the sample data
      list = list.filter((p) => p.name.toLowerCase().includes(filters.category!));
    }
    if (filters.maxPrice) {
      list = list.filter((p) => p.price <= filters.maxPrice!);
    }
    return list;
  }, [filters]);

  function loadMore() {
    setVisible((v) => v + 6);
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-3xl font-bold">Products</h1>
        <ProductsFilter categories={CATEGORIES} onFilter={setFilters} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.slice(0, visible).map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-6 flex justify-center">
            <button onClick={loadMore} className="rounded-md bg-black/90 px-6 py-2 text-white">Load more</button>
          </div>
        )}
      </div>
    </div>
  );
}
