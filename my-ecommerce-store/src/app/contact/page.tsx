import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background px-6 py-12">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-2 text-3xl font-bold">Contact Us</h1>
                <p className="mb-6 text-sm text-zinc-600">Have a question or need help? Send us a message and we'll get back to you within 1-2 business days.</p>

                <div className="grid gap-8 md:grid-cols-2">
                    <div>
                        <h2 className="mb-3 text-lg font-semibold">Send a message</h2>
                        <ContactForm />
                    </div>

                    <aside className="rounded-2xl overflow-hidden bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    {/* phone icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l2 5-1 2a10 10 0 005 5l2-1 5 2v2a1 1 0 01-1 1h-2a16 16 0 01-16-16V4a1 1 0 011-1z" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold">Contact</h3>
                                    <p className="mt-2 text-sm opacity-90">Questions, partnerships or support — we’re here to help.</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3">
                                <a href="mailto:hello@example.com" className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm hover:bg-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
                                    </svg>
                                    <span>hello@example.com</span>
                                </a>

                                <a href="tel:+1234567890" className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm hover:bg-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.5a1 1 0 01.98.8l.5 3a1 1 0 01-.26.9L7.6 9.6a12.05 12.05 0 005.8 5.8l1.9-1.3a1 1 0 01.9-.26l3 .5a1 1 0 01.8.98V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 6V5z" />
                                    </svg>
                                    <span>+1 (234) 567-890</span>
                                </a>
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-4 text-sm opacity-95">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs font-medium uppercase">Office</div>
                                        <div className="mt-1">123 Market St, Suite 100<br />City, Country</div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-xs font-medium uppercase">Hours</div>
                                    <div className="mt-1">Mon — Fri: 9:00 — 18:00</div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30" href="#" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.273 8.273 0 01-2.357.637 4.07 4.07 0 001.804-2.235 8.19 8.19 0 01-2.605.981 4.093 4.093 0 00-6.993 3.732A11.605 11.605 0 013.112 4.9a4.013 4.013 0 00-.553 2.057 4.086 4.086 0 001.818 3.406 4.07 4.07 0 01-1.853-.506v.05a4.097 4.097 0 003.283 4.01 4.1 4.1 0 01-1.847.07 4.094 4.094 0 003.822 2.82A8.218 8.218 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30" href="#" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.505 4.505 0 0012 8.5zM18.5 6a1 1 0 11-1 1 1 1 0 011-1z" />
                                    </svg>
                                </a>
                                <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30" href="#" aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.14h-1.1c-1.1 0-1.44.68-1.44 1.38V12h2.47l-.4 2.9h-2.07v7A10 10 0 0022 12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="h-40 bg-white/10" aria-hidden>
                            {/* In production, embed a small map iframe or static image */}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
