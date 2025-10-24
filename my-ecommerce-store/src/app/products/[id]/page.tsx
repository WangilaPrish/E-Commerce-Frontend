import ProductDetailClient from "@/components/ProductDetailClient";

export default function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	return <ProductDetailClient itemId={id} />;
}
