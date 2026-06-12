import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getEmailTemplate(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A1A2E; padding: 20px; text-align: center;">
        <h2 style="color: #D4AF37; margin: 0; font-family: Georgia, serif;">New Website Inquiry</h2>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="margin-top: 0; color: #333; font-size: 16px;">You have received a new inquiry from the Albelbisy Trading website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 140px; color: #666; font-weight: bold;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${data.company || '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;"><a href="mailto:${data.email}" style="color: #1E3799; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;"><a href="tel:${data.phone}" style="color: #1E3799; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Interest:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #111;">${data.interest || '<em>Not specified</em>'}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 30px; background-color: #f9f9f9; padding: 20px; border-left: 4px solid #D4AF37; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message Details</h3>
          <p style="white-space: pre-wrap; color: #444; line-height: 1.6; margin-bottom: 0;">${data.message}</p>
        </div>
      </div>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        &copy; ${new Date().getFullYear()} Albelbisy Trading Co. Automated System.
      </div>
    </div>
  `;
}

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

    // Concurrent tasks queue
    const tasks: Promise<any>[] = [];

    // 1. Forward to Google Sheets Webhook
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      tasks.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
        }).then((res) => {
          if (!res.ok) console.error("Google Sheets webhook failed");
        }).catch((err) => console.error("Webhook Error:", err))
      );
    } else {
      console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    }

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      tasks.push(
        resend.emails.send({
          from: "Albelbisy Website <inquiries@albelbisy.com>", // Update to your verified domain e.g. inquiries@albelbisy.com
          to: "sales@albelbisy.com",
          replyTo: sanitizedData.email,
          subject: `New Website Inquiry from ${sanitizedData.name}`,
          html: getEmailTemplate(sanitizedData),
        }).catch((err) => console.error("Resend Error:", err))
      );
    } else {
      console.warn("RESEND_API_KEY is not set. Email will not be sent.");
    }

    // Execute all external API calls concurrently
    await Promise.all(tasks);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Query submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
