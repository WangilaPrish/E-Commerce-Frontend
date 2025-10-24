"use client";

import { useEffect, useState } from "react";

export default function ProductDetailClient({ itemId }: { itemId: string }) {
    const [item, setItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!itemId) return;
        setLoading(true);
        setError(null);
        fetch(`/api/products?itemIds=${encodeURIComponent(itemId)}`)
            .then((r) => r.json())
            .then((json) => {
                const first = Array.isArray(json.items) ? json.items[0] : null;
                setItem(first);
            })
            .catch((err) => setError(String(err)))
            .finally(() => setLoading(false));
    }, [itemId]);

    if (loading) return <div className="p-8">Loading product...</div>;
    if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
    if (!item) return <div className="p-8">Product not found.</div>;

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="h-96 w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <div className="mt-4 text-xl font-semibold">${Number(item.price).toFixed(2)}</div>
                    <p className="mt-6 text-sm text-zinc-600">{item.description || item.name}</p>
                    <div className="mt-6">
                        <button className="rounded-md bg-black/90 px-4 py-2 text-white">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
