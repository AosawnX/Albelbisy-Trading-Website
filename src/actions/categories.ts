"use server";

import { getSupabaseAdmin } from "@/utils/supabase";
import { getSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const key = (formData.get("key") as string)?.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_");
  const name_en = (formData.get("name_en") as string)?.trim();
  const name_ar = ((formData.get("name_ar") as string) ?? "").trim();

  if (!key) throw new Error("Category key is required");
  if (!name_en) throw new Error("English name is required");

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("categories").insert({ key, name_en, name_ar });

  if (error) {
    console.error("DB Error:", error);
    throw new Error(error.code === "23505" ? "A category with this key already exists." : "Failed to create category");
  }

  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/admin", "layout");

  redirect("/admin/categories");
}

export async function updateCategory(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const key = formData.get("key") as string;
  const name_en = (formData.get("name_en") as string)?.trim();
  const name_ar = ((formData.get("name_ar") as string) ?? "").trim();

  if (!key) throw new Error("Category key is missing");
  if (!name_en) throw new Error("English name is required");

  const supabase = getSupabaseAdmin();

  // Only update display names — key is never modified
  const { error } = await supabase
    .from("categories")
    .update({ name_en, name_ar })
    .eq("key", key);

  if (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to update category");
  }

  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/admin", "layout");

  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const key = formData.get("key") as string;
  if (!key) throw new Error("Category key is required");

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("categories").delete().eq("key", key);

  if (error) {
    // FK violation — products still reference this category
    if (error.code === "23503") {
      return {
        error: "Cannot delete this category because products are assigned to it. Reassign or delete those products first."
      };
    }
    console.error("DB Error:", error);
    return { error: "Failed to delete category" };
  }

  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/en");
  revalidatePath("/ar");
  revalidatePath("/admin", "layout");

  redirect("/admin/categories");
}
