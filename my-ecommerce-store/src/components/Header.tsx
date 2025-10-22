"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full border-b border-black/5 bg-transparent py-4 dark:border-white/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    NovaThreads
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/products" className="hover:underline">
                        Products
                    </Link>
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contact
                    </Link>
                    <Link href="/cart" className="rounded-full bg-black/90 px-4 py-2 text-white">
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    );
}
