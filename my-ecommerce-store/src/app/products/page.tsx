"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ProductsFilter from "../../components/ProductsFilter";

const CATEGORIES = ["men", "women", "accessories"];

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const cat = searchParams.get("cat") || undefined;
    const search = searchParams.get("search") || undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const externalItemId = searchParams.get("itemId") || undefined;

    useEffect(() => {
        // whenever filters or search params change, reset to page 1 and fetch
        setPage(1);
        setItems([]);
        fetchPage(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.toString()]);

    async function fetchPage(p: number, replace = false) {
        setLoading(true);
        const externalId = searchParams.get("itemId");
        if (externalId) {
            // fetch a single item from the ali express proxy API and map to our product shape
            try {
                const r = await fetch(`/api/aliexpress?itemId=${encodeURIComponent(externalId)}`);
                const data = await r.json();
                // try a few common fields for title/price/image
                const title = data?.title || data?.itemTitle || data?.name || data?.productTitle || data?.data?.title || null;
                const priceRaw = data?.price || data?.productPrice || data?.price_value || data?.data?.price || null;
                const price = priceRaw ? Number(priceRaw) : 0;
                const image = data?.image || data?.image_url || data?.images?.[0] || data?.data?.image || "https://source.unsplash.com/400x400/?product";

                const mapped = {
                    id: externalId,
                    name: title || `External product ${externalId}`,
                    price: isNaN(price) ? 0 : price,
                    image,
                };

                setTotal(1);
                setItems([mapped]);
                setLoading(false);
                return;
            } catch (err) {
                setLoading(false);
                setItems([]);
                setTotal(0);
                return;
            }
        }
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (cat) params.set("cat", cat);
        if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
        params.set("page", String(p));
        params.set("limit", "6");

        const res = await fetch(`/api/products?${params.toString()}`);
        const json = await res.json();
        setTotal(json.total || 0);
        setItems((cur) => (replace ? json.items : [...cur, ...json.items]));
        setLoading(false);
    }

    function loadMore() {
        const next = page + 1;
        setPage(next);
        fetchPage(next);
    }

    return (
        <div className="min-h-screen bg-background px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-4 text-3xl font-bold">Products</h1>
                <ProductsFilter categories={CATEGORIES} initial={{ category: cat, maxPrice }} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {items.map((p) => (
                        <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} />
                    ))}
                </div>

                {loading && <div className="mt-6 text-center">Loading...</div>}

                {items.length < total && !loading && (
                    <div className="mt-6 flex justify-center">
                        <button onClick={loadMore} className="rounded-md bg-black/90 px-6 py-2 text-white">Load more</button>
                    </div>
                )}
            </div>
        </div>
    );
}
