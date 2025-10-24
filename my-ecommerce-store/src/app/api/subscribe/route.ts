import { NextResponse } from "next/server";

// Simple in-memory store for demo purposes
const subscribers: string[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body?.email || "").toString().trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!subscribers.includes(email)) subscribers.push(email);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
