"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
    const router = useRouter();
    const [q, setQ] = useState("");

    function onSearch(e: React.FormEvent) {
        e.preventDefault();
        const encoded = encodeURIComponent(q.trim());
        if (!encoded) return router.push(`/products`);
        router.push(`/products?search=${encoded}`);
    }

    return (
        <section className="relative w-full overflow-hidden rounded-lg bg-linear-to-r from-amber-400 via-orange-400 to-pink-500 p-8 text-white">
            <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                    <div className="inline-flex items-center gap-3">
                        <span className="rounded-full bg-black/10 px-3 py-1 text-sm font-semibold">New</span>
                        <span className="text-sm">Free shipping over $75</span>
                    </div>

                    <h1 className="mt-4 text-4xl font-extrabold leading-tight">Upgrade your wardrobe — limited time deals</h1>
                    <p className="mt-3 max-w-xl text-lg">Shop handpicked collections. Quality pieces that last — curated just for you.</p>

                    <form onSubmit={onSearch} className="mt-6 flex w-full max-w-lg gap-2">
                        <label htmlFor="hero-search" className="sr-only">Search products</label>
                        <input
                            id="hero-search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search products, e.g. 'sneakers'"
                            className="flex-1 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-white placeholder:text-white/70 focus:outline-none"
                        />
                        <button type="submit" className="rounded-md bg-black/90 px-4 py-2 font-semibold">Search</button>
                    </form>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link href="/products?cat=men" className="rounded-md bg-white/20 px-3 py-2 text-sm">Men</Link>
                        <Link href="/products?cat=women" className="rounded-md bg-white/20 px-3 py-2 text-sm">Women</Link>
                        <Link href="/products?cat=accessories" className="rounded-md bg-white/20 px-3 py-2 text-sm">Accessories</Link>
                    </div>
                </div>

                <div className="relative hidden h-64 md:block">
                    {/* Collage of two images */}
                    <div className="absolute right-0 top-0 h-64 w-64 overflow-hidden rounded-md shadow-lg">
                        <img src="https://images.unsplash.com/photo-1526178611926-1d1d6a6f0b7f?q=80&w=900&auto=format&fit=crop" alt="Sneakers" className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute -right-8 bottom-0 h-48 w-48 overflow-hidden rounded-md border-4 border-white shadow-lg">
                        <img src="https://images.unsplash.com/photo-1520975916045-3e6eb0c3b8b8?q=80&w=900&auto=format&fit=crop" alt="Jacket" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}
