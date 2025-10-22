"use client";

import { useState } from "react";

type Props = {
  categories: string[];
  onFilter: (filters: { category?: string; maxPrice?: number }) => void;
};

export default function ProductsFilter({ categories, onFilter }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  function apply() {
    onFilter({ category: category === "all" ? undefined : category, maxPrice });
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border px-2 py-1">
          <option value="all">All</option>
          {categories.map((c) => (
            <option value={c} key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Max price</label>
        <input type="number" placeholder="e.g. 150" onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} className="w-28 rounded-md border px-2 py-1" />
        <button onClick={apply} className="rounded-md bg-black/90 px-3 py-1 text-white">Apply</button>
      </div>
    </div>
  );
}
