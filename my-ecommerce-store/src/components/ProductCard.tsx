"use client";

import Link from "next/link";
import { useState } from "react";
import { addItem } from "../lib/cart";

type Props = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function ProductCard({ id, name, price, image }: Props) {
    const [added, setAdded] = useState(false);

    function onAdd(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, image, quantity: 1 });
        setAdded(true);
        setTimeout(() => setAdded(false), 1300);
    }

    return (
        <article className="group relative overflow-hidden rounded-lg border border-transparent bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] dark:bg-[#07111a]">
            <Link href={`/products/${id}`} className="block">
                <div className="mb-3 overflow-hidden rounded-md bg-gray-100">
                    <div className="relative h-56 w-full">
                        {/* plain img so remote images render even if next/image loader is not configured */}
                        <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                </div>

                <h4 className="truncate text-sm font-medium">{name}</h4>
                <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-base font-semibold text-indigo-600">${price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">In stock</div>
                </div>
            </Link>

            {/* Hover actions */}
            <div className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-end opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <button onClick={onAdd} className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow">{added ? "Added" : "Add"}</button>
            </div>
        </article>
    );
}
