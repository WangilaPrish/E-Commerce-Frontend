"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b border-black/5 bg-transparent py-4 dark:border-white/10">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    NovaThreads
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/products" className="hover:underline">
                        Products
                    </Link>
                    <Link href="/cart" className="rounded-full bg-black/90 px-4 py-2 text-white">
                        Cart
                    </Link>
                    <Link href="/about" className="hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        Contact
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setOpen((s) => !s)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-sm"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu panel */}
            {open && (
                <div className="md:hidden border-t border-black/5 bg-white dark:bg-[#07070b]">
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4">
                        <Link href="/products" className="py-2">Products</Link>
                        <Link href="/cart" className="py-2">Cart</Link>
                        <Link href="/about" className="py-2">About</Link>
                        <Link href="/contact" className="py-2">Contact</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
