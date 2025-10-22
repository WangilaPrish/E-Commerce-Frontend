"use client";

import Link from "next/link";
import Image from "next/image";

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
        <div className="relative mb-3 h-48 w-full overflow-hidden rounded-md bg-gray-100">
          {/* Uses next/image when images exist in public/ */}
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="mt-2 text-sm font-semibold">${price.toFixed(2)}</div>
      </Link>
    </article>
  );
}
