"use server";

import { createSession, deleteSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    await createSession();
    return { success: true }; // Let client handle navigation after cookie is set
  } else {
    return { error: "Invalid username or password" };
  }
}

export async function logoutAdmin() {
  deleteSession();
  redirect("/admin/login");
}
