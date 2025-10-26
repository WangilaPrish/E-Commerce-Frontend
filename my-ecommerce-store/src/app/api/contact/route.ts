import { NextResponse } from "next/server";

type ContactMsg = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

const store: ContactMsg[] = [];

// Simple per-IP rate limiter (in-memory, dev only)
const ipRate = new Map<string, { ts: number; count: number }>();
const RATE_WINDOW = 1000 * 60; // 1 minute
const RATE_LIMIT = 10; // max 10 submissions per IP per window

export async function GET(request: Request) {
  const url = new URL(request.url);
  const debug = url.searchParams.get("debug");
  // Expose stored messages only when explicitly requested via ?debug=1
  // or when CONTACT_DEBUG env var is set to '1' (for local/dev use).
  if (debug === "1" || process.env.CONTACT_DEBUG === "1") {
    return NextResponse.json({ items: store, total: store.length });
  }
  return NextResponse.json({ error: "Not allowed" }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim();
    const subject = (body?.subject || "").toString().trim();
    const message = (body?.message || "").toString().trim();
    const honeypot = (body?.website || "").toString().trim();

    // Honeypot filled -> silently accept but don't store (detected bot)
    if (honeypot) return NextResponse.json({ success: true });

    // Rate limit by IP (best-effort; in serverless environments this may not be accurate)
    const addr = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "local";
    const now = Date.now();
    const entry = ipRate.get(addr) || { ts: now, count: 0 };
    if (now - entry.ts < RATE_WINDOW) {
      entry.count++;
    } else {
      entry.ts = now;
      entry.count = 1;
    }
    ipRate.set(addr, entry);
    if (entry.count > RATE_LIMIT) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 });

    const entry: ContactMsg = { name, email, subject, message, createdAt: new Date().toISOString() };
    store.push(entry);

    // For demo, we simply store in-memory. In production, forward to email service or DB.
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
