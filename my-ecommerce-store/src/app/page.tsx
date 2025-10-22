"use client";

import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import products from "../lib/sample-products.json";

export default function Home() {
    return (
        <div className="min-h-screen bg-background font-sans dark:bg-black">
            <Header />
            <main className="mx-auto max-w-6xl px-6 py-12">
                <Hero />
                <FeaturedProducts products={products as any} />
                <CategoryGrid />
                <Newsletter />
            </main>
        </div>
    );
}
