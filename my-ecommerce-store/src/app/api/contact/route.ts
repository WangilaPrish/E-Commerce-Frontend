import { NextResponse } from "next/server";

type ContactMsg = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

const store: ContactMsg[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name || "").toString().trim();
    const email = (body?.email || "").toString().trim();
    const subject = (body?.subject || "").toString().trim();
    const message = (body?.message || "").toString().trim();

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
