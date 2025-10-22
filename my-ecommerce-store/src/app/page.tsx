"use client";

import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";
import TopSellers from "../components/TopSellers";
import products from "../lib/sample-products.json";

export default function Home() {
    return (
        <div className="min-h-screen bg-background font-sans dark:bg-black">
            <main className="mx-auto max-w-6xl px-6 py-12">
                <Hero />
                <FeaturedProducts products={products as any} />
                <CategoryGrid />
                <TopSellers />
                <Testimonials />
                <Newsletter />
                <Footer />
            </main>
        </div>
    );
}
