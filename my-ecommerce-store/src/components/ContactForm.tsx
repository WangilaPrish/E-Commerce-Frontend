"use client";

import { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function validate() {
        if (!name.trim()) return "Please enter your name";
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email";
        if (!message || message.trim().length < 10) return "Please enter a message (10+ characters)";
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message, website: "" }),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json?.error || "Failed to send message");
            } else {
                setSuccess("Thanks — your message was sent.");
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl" aria-live="polite">
            {/* Card */}
            <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-md">
                {/* Honeypot (hidden) */}
                <input name="website" value={""} onChange={() => { }} style={{ display: "none" }} tabIndex={-1} aria-hidden />

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Your name</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Jane Doe"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@company.com"
                            required
                        />
                    </label>
                </div>

                <div className="mt-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Subject</span>
                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Subject (optional)"
                        />
                    </label>
                </div>

                <div className="mt-4">
                    <label className="block">
                        <span className="text-sm font-medium text-gray-700">Message</span>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={6}
                            placeholder="Hi — how can we help?"
                            required
                        />
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
                        {success && <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{success}</div>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:opacity-95 disabled:opacity-60"
                        >
                            {loading ? (
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            ) : null}
                            {loading ? "Sending…" : "Send message"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
