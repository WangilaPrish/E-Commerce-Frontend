import { NextResponse } from "next/server";
import products from "../../../lib/sample-products.json";

async function fetchAliItem(itemId: string, rapidKey: string) {
  const target = `https://aliexpress-datahub.p.rapidapi.com/item_detail_2?itemId=${encodeURIComponent(
    itemId
  )}`;
  const res = await fetch(target, {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidKey,
      "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
    },
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    return { data: text };
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.toLowerCase() || undefined;
  const cat = url.searchParams.get("cat")?.toLowerCase() || undefined;
  const maxPriceParam = url.searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "12");

  // If itemIds is present, fetch those items from AliExpress via RapidAPI and return them.
  const itemIdsParam = url.searchParams.get("itemIds");
  if (itemIdsParam) {
    const ids = itemIdsParam.split(",").map((s) => s.trim()).filter(Boolean);
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    if (!RAPIDAPI_KEY) {
      return NextResponse.json({ error: "RAPIDAPI_KEY not configured on server" }, { status: 500 });
    }

    const results = [] as any[];
    for (const id of ids) {
      try {
        const data = await fetchAliItem(id, RAPIDAPI_KEY);
        const title = data?.title || data?.itemTitle || data?.name || data?.productTitle || data?.data?.title || null;
        const priceRaw = data?.price || data?.productPrice || data?.price_value || data?.data?.price || null;
        const price = priceRaw ? Number(priceRaw) : 0;
        const image = data?.image || data?.image_url || (data?.images && data.images[0]) || data?.data?.image || "https://source.unsplash.com/400x400/?product";

        results.push({ id, name: title || `External product ${id}`, price: isNaN(price) ? 0 : price, image });
      } catch (err) {
        // skip failed items
      }
    }

    return NextResponse.json({ items: results, total: results.length, page: 1, limit: results.length });
  }

  // Fallback: serve local sample products with filtering/pagination
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
