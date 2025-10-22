import { NextResponse } from "next/server";
import products from "../../../lib/sample-products.json";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.toLowerCase() || undefined;
  const cat = url.searchParams.get("cat")?.toLowerCase() || undefined;
  const maxPriceParam = url.searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "12");

  let list = (products as any[]).slice();

  if (search) {
    list = list.filter((p) => p.name.toLowerCase().includes(search));
  }

  if (cat) {
    // sample data doesn't include category metadata, so do a best-effort match
    list = list.filter((p) => {
      const name = (p.name || "").toLowerCase();
      if (cat === "men") return /jacket|suit|shirt|men|classic/.test(name);
      if (cat === "women") return /dress|women|skirt|blouse/.test(name);
      if (cat === "accessories") return /watch|bag|hat|belt|accessory/.test(name);
      return name.includes(cat);
    });
  }

  if (maxPrice && !Number.isNaN(maxPrice)) {
    list = list.filter((p) => Number(p.price) <= maxPrice);
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = list.slice(start, end);

  return NextResponse.json({ items, total, page, limit });
}
