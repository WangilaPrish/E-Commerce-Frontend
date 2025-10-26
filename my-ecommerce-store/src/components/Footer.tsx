export default function Footer() {
    return (
        <footer className="mt-12 border-t border-gray-200 bg-white py-12 dark:bg-[#0b1020] dark:border-white/6">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h4 className="mb-3 text-lg font-semibold text-indigo-700">NovaThreads</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Quality pieces, thoughtfully designed. Shop modern essentials with sustainable practices.</p>
                    </div>

                    <div>
                        <h5 className="mb-2 text-sm font-semibold text-gray-700">Shop</h5>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/products" className="hover:text-indigo-600">All products</a></li>
                            <li><a href="/products?cat=men" className="hover:text-indigo-600">Men</a></li>
                            <li><a href="/products?cat=women" className="hover:text-indigo-600">Women</a></li>
                            <li><a href="/products?cat=accessories" className="hover:text-indigo-600">Accessories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="mb-2 text-sm font-semibold text-gray-700">Company</h5>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/about" className="hover:text-indigo-600">About</a></li>
                            <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-indigo-600">Privacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="mb-2 text-sm font-semibold text-gray-700">Stay in touch</h5>
                        <p className="mb-3 text-sm text-gray-600">Subscribe to get updates, deals, and early access.</p>
                        <form action="/api/subscribe" method="post" className="flex max-w-xs gap-2">
                            <label htmlFor="foot-email" className="sr-only">Email</label>
                            <input id="foot-email" name="email" type="email" required placeholder="you@company.com" className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                            <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Join</button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6 text-sm text-gray-500 dark:border-white/6">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                        <div>© {new Date().getFullYear()} NovaThreads. All rights reserved.</div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-indigo-600">Terms</a>
                            <a href="#" className="hover:text-indigo-600">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
