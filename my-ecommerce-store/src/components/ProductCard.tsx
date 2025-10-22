"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function ProductCard({ id, name, price, image }: Props) {
    return (
            <article className="group rounded-lg border p-4 transition-transform hover:scale-[1.03]">
                <Link href={`/products/${id}`} className="block">
                    <div className="mb-3 h-48 w-full overflow-hidden rounded-md bg-gray-100">
                        {/* Use plain img so remote images render even if next/image loader is not configured */}
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                    </div>
                    <h4 className="text-sm font-medium">{name}</h4>
                    <div className="mt-2 text-sm font-semibold">${price.toFixed(2)}</div>
                </Link>
            </article>
    );
}
