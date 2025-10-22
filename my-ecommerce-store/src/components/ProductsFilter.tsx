"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    categories: string[];
    initial?: { category?: string; maxPrice?: number };
};

export default function ProductsFilter({ categories, initial }: Props) {
    const router = useRouter();
    const [category, setCategory] = useState<string>(initial?.category || "all");
    const [maxPrice, setMaxPrice] = useState<number | undefined>(initial?.maxPrice);

    useEffect(() => {
        // whenever filters change, update URL search params
        const params = new URLSearchParams();
        if (category && category !== "all") params.set("cat", category);
        if (maxPrice !== undefined && !Number.isNaN(maxPrice)) params.set("maxPrice", String(maxPrice));
        const qs = params.toString();
        router.replace(`/products${qs ? `?${qs}` : ""}`);
    }, [category, maxPrice, router]);

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
                <input type="number" value={maxPrice ?? ""} placeholder="e.g. 150" onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} className="w-28 rounded-md border px-2 py-1" />
            </div>
        </div>
    );
}
