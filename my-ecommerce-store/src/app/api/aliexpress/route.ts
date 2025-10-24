import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const itemId = url.searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId query parameter" }, { status: 400 });
  }

  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPIDAPI_KEY) {
    return NextResponse.json({ error: "RAPIDAPI_KEY not configured on server" }, { status: 500 });
  }

  const target = `https://aliexpress-datahub.p.rapidapi.com/item_detail_2?itemId=${encodeURIComponent(
    itemId
  )}`;

  try {
    const res = await fetch(target, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "aliexpress-datahub.p.rapidapi.com",
      },
    });

    const text = await res.text();
    // Try to parse JSON, but return raw text if not JSON
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json);
    } catch (err) {
      return NextResponse.json({ data: text });
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch remote API" }, { status: 502 });
  }
}
