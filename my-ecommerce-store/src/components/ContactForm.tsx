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
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4" aria-live="polite">
            {/* Honeypot field for spam bots - visually hidden but included in POST body if filled */}
            <input
                name="website"
                value={""}
                onChange={() => { }}
                style={{ display: "none" }}
                tabIndex={-1}
                aria-hidden
            />
            <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Your name"
                    required
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="you@example.com"
                    required
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Subject</label>
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Subject (optional)"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    rows={6}
                    placeholder="How can we help?"
                    required
                />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white disabled:opacity-60"
                >
                    {loading ? "Sending…" : "Send message"}
                </button>
            </div>
        </form>
    );
}
