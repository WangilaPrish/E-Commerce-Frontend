import { NextResponse } from "next/server";
import products from "../../../lib/sample-products.json";

// Simple in-memory cache for AliExpress lookups (dev-only). TTL = 5 minutes.
const aliCache = new Map<string, { ts: number; data: any }>();
const CACHE_TTL = 1000 * 60 * 5;

async function fetchAliItem(itemId: string, rapidKey: string) {
  const now = Date.now();
  const cached = aliCache.get(itemId);
  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data;
  }

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
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    parsed = { data: text };
  }

  aliCache.set(itemId, { ts: now, data: parsed });
  return parsed;
}

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return null;
  // some responses use protocol-relative URLs: //ae01.alicdn.com/...
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("http://")) return url.replace(/^http:\/\//, "https://");
  return url;
}

function mapAliResponseToProduct(itemId: string, data: any) {
  // data can be several shapes: a full search response with resultList,
  // an item-detail response with nested item/data, or a single-item object.

  // 1) Search-style response with resultList (your provided sample)
  if (data?.resultList && Array.isArray(data.resultList)) {
    const match = data.resultList.find((r: any) => String(r?.item?.itemId) === String(itemId));
    if (match) {
      const it = match.item || {};
      const price = it?.sku?.def?.promotionPrice ?? it?.sku?.def?.prices?.pc ?? null;
      const image = it?.image ?? (it?.images && it.images[0]) ?? null;
      return {
        id: String(it.itemId ?? itemId),
        name: it.title ?? it.itemTitle ?? `Ali item ${itemId}`,
        price: price ? Number(price) : 0,
        image: normalizeImageUrl(image) || "https://source.unsplash.com/400x400/?product",
        rating: it.averageStarRate ?? null,
        shipping: match.delivery ?? null,
        raw: it,
      };
    }
  }

  // 2) Detail-style responses that may include `item` or `data.item`
  const possible = data?.item ?? data?.data ?? data;
  if (possible) {
    const it = possible.item ?? possible;
    const price = it?.sku?.def?.promotionPrice ?? it?.sku?.def?.prices?.pc ?? it?.price ?? it?.productPrice ?? null;
    const image = it?.image || it?.image_url || (it?.images && it.images[0]) || it?.thumb || null;
    return {
      id: String(it.itemId ?? itemId),
      name: it.title ?? it.itemTitle ?? it.name ?? `Ali item ${itemId}`,
      price: price ? Number(price) : 0,
      image: normalizeImageUrl(image) || "https://source.unsplash.com/400x400/?product",
      rating: it.averageStarRate ?? null,
      shipping: it.delivery ?? null,
      raw: it,
    };
  }

  // 3) Fallback best-effort mapping from top-level fields
  const title = data?.title ?? data?.name ?? data?.productTitle ?? null;
  const priceRaw = data?.price ?? data?.promotionPrice ?? data?.productPrice ?? null;
  const image = data?.image ?? (data?.images && data.images[0]) ?? null;
  return {
    id: String(itemId),
    name: title || `External product ${itemId}`,
    price: priceRaw ? Number(priceRaw) : 0,
    image: normalizeImageUrl(image) || "https://source.unsplash.com/400x400/?product",
    rating: data?.averageStarRate ?? null,
    shipping: data?.delivery ?? null,
    raw: data,
  };
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
        const mapped = mapAliResponseToProduct(id, data);
        results.push(mapped);
      } catch (err) {
        // if one item fails, push a minimal placeholder so UI can show something
        results.push({ id, name: `External product ${id}`, price: 0, image: "https://source.unsplash.com/400x400/?product" });
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
