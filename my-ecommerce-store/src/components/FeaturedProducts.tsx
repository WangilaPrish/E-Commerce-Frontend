"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function FeaturedProducts({ products }: { products: Product[] }) {
    const [index, setIndex] = useState(0);

    function next() {
        setIndex((i) => (i + 1) % products.length);
    }

    function prev() {
        setIndex((i) => (i - 1 + products.length) % products.length);
    }

    if (products.length === 0) return null;

    const p = products[index];

    return (
        <section className="my-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Featured</h3>
                <div className="flex gap-2">
                    <button onClick={prev} className="px-3 py-1 rounded bg-gray-100">Prev</button>
                    <button onClick={next} className="px-3 py-1 rounded bg-gray-100">Next</button>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-6">
                <div className="h-48 w-48 flex-none overflow-hidden rounded-lg bg-gray-100">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div>
                    <h4 className="text-xl font-semibold">{p.name}</h4>
                    <div className="mt-2 text-lg font-medium">${p.price.toFixed(2)}</div>
                    <Link href={`/products/${p.id}`} className="mt-4 inline-block rounded bg-black/90 px-4 py-2 text-white">
                        View
                    </Link>
                </div>
            </div>
        </section>
    );
}
