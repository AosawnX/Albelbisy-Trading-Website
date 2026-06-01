import { NextResponse } from "next/server";

// Simple in-memory rate limiting (Note: resets on serverless cold starts)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // max 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    // Basic IP extraction (works well in Vercel)
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();

    // Rate Limiting Logic
    const rateLimitData = rateLimitMap.get(ip);
    if (rateLimitData) {
      if (now - rateLimitData.timestamp < RATE_LIMIT_WINDOW) {
        if (rateLimitData.count >= RATE_LIMIT) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        rateLimitData.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const data = await req.json();

    // Honeypot check
    if (data.website) {
      // Silently accept it to fool bots
      return NextResponse.json({ status: "ok" });
    }

    // Basic sanitization
    const sanitize = (str: any) => {
      if (typeof str !== "string") return "";
      return str.replace(/<[^>]*>?/gm, "").trim(); // Strip HTML tags
    };

    const sanitizedData = {
      name: sanitize(data.name).substring(0, 100),
      company: sanitize(data.company).substring(0, 100),
      email: sanitize(data.email).substring(0, 100),
      phone: sanitize(data.phone).substring(0, 50),
      interest: sanitize(data.interest).substring(0, 100),
      message: sanitize(data.message).substring(0, 1000),
    };

    // Forward to Google Sheets Webhook
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedData),
    });

    if (!response.ok) {
      throw new Error("Failed to forward to webhook");
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Query submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
