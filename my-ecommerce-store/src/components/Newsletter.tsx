"use client";

import { useState, useRef } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string | null>(null);
    const liveRef = useRef<HTMLDivElement | null>(null);

    async function subscribe(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);

        const trimmed = email.trim();
        if (!/\S+@\S+\.\S+/.test(trimmed)) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        try {
            setStatus("loading");
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmed }),
            });

            const json = await res.json();
            if (!res.ok) {
                setStatus("error");
                setMessage(json?.error || "Subscription failed. Try again.");
                return;
            }

            setStatus("success");
            setMessage("Thanks for subscribing! Check your inbox.");
            setEmail("");
        } catch (err) {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <section className="my-8 rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
            <h3 className="text-xl font-semibold">Join our newsletter</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Get updates about new arrivals and exclusive offers.</p>

            <form onSubmit={subscribe} className="mt-4 flex gap-2" aria-describedby="newsletter-status">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-md border px-3 py-2"
                    aria-invalid={status === "error"}
                    aria-required
                />
                <button type="submit" disabled={status === "loading"} className="rounded-md bg-black/90 px-4 py-2 text-white">
                    {status === "loading" ? "Sending..." : "Subscribe"}
                </button>
            </form>

                    <div id="newsletter-status" ref={liveRef} aria-live="polite" className="mt-2 min-h-5">
                {message && (
                    <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</p>
                )}
            </div>
        </section>
    );
}
