import Link from "next/link";

export default function CategoryGrid() {
    const categories = [
        { name: "Men", href: "/products?cat=men", color: "bg-blue-100 text-blue-800" },
        { name: "Women", href: "/products?cat=women", color: "bg-pink-100 text-pink-800" },
        { name: "Accessories", href: "/products?cat=accessories", color: "bg-amber-100 text-amber-800" },
    ];

    return (
        <section className="my-8">
            <h3 className="mb-4 text-2xl font-semibold">Shop by Category</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {categories.map((c) => (
                    <Link key={c.name} href={c.href} className={`group flex items-center justify-center rounded-lg p-6 shadow-sm ${c.color}`}>
                        <div className="text-lg font-medium">{c.name}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
