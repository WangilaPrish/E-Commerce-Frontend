import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden rounded-lg bg-linear-to-r from-amber-400 via-orange-400 to-pink-500 p-8 text-white">
            <div className="mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-1">
                    <h2 className="text-4xl font-extrabold leading-tight">Discover your next favorite outfit</h2>
                    <p className="mt-3 max-w-xl">Trending picks curated by stylists. Free shipping on orders over $75.</p>
                    <div className="mt-6 flex gap-4">
                        <Link href="/products" className="rounded-md bg-black/90 px-5 py-3 font-semibold text-white">
                            Shop Now
                        </Link>
                        <Link href="/products" className="rounded-md border border-white/30 px-5 py-3">
                            Browse
                        </Link>
                    </div>
                </div>
                <div className="relative hidden h-52 w-52 flex-0 md:block">
                    <Image src="/hero-sample.jpg" alt="Hero image" fill className="object-cover rounded-md" />
                </div>
            </div>
        </section>
    );
}
