import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.ADMIN_PASSWORD;
const encodedKey = new TextEncoder().encode(secretKey || "fallback_secret_dont_use");

export async function createSession() {
  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6 hours
  const session = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("6h")
    .sign(encodedKey);

  cookies().set("admin_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(token?: string) {
  const sessionToken = token ?? cookies().get("admin_session")?.value;
  if (!sessionToken) return null;
  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export function deleteSession() {
  cookies().delete("admin_session");
}
