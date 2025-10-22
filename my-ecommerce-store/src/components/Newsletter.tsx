"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    function subscribe(e: React.FormEvent) {
        e.preventDefault();
        if (!email.includes("@")) {
            setStatus("error");
            return;
        }
        setStatus("success");
        setEmail("");
    }

    return (
        <section className="my-8 rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
            <h3 className="text-xl font-semibold">Join our newsletter</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Get updates about new arrivals and exclusive offers.</p>
            <form onSubmit={subscribe} className="mt-4 flex gap-2">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 rounded-md border px-3 py-2" />
                <button type="submit" className="rounded-md bg-black/90 px-4 py-2 text-white">Subscribe</button>
            </form>
            {status === "success" && <p className="mt-2 text-sm text-green-600">Thanks for subscribing!</p>}
            {status === "error" && <p className="mt-2 text-sm text-red-600">Please enter a valid email.</p>}
        </section>
    );
}
