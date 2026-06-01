import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/utils/auth";

export async function GET() {
  const cookieStore = cookies();
  const raw = cookieStore.get("admin_session")?.value;
  const session = await getSession();
  return NextResponse.json({
    hasCookie: !!raw,
    sessionValid: !!session,
    cookiePreview: raw ? raw.substring(0, 30) + "..." : null,
  });
}
