"use server";

import { getSupabaseAdmin } from "@/utils/supabase";
import { getSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const supabase = getSupabaseAdmin();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('catalogue_images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload image");
  }

  const { data: { publicUrl } } = supabase.storage
    .from('catalogue_images')
    .getPublicUrl(fileName);
    
  return publicUrl;
}

export async function addProduct(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const name_en = formData.get("name_en") as string;
  const name_ar = formData.get("name_ar") as string;
  const category_id = formData.get("category_id") as string;
  const description_en = formData.get("description_en") as string;
  const description_ar = formData.get("description_ar") as string;
  const imageFile = formData.get("image") as File;

  let image_url = null;
  if (imageFile && imageFile.size > 0) {
    image_url = await uploadImage(imageFile);
  }

  const supabase = getSupabaseAdmin();
  
  // ensure unique slug
  let slug = generateSlug(name_en);
  
  const { error } = await supabase.from("products").insert({
    name_en,
    name_ar,
    category_id,
    description_en,
    description_ar,
    slug,
    image_url
  });

  if (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to save product to database");
  }

  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/admin/products");
  
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  
  if (error) throw new Error("Failed to delete product");
  
  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const name_en    = formData.get("name_en")    as string;
  const name_ar    = formData.get("name_ar")    as string;
  const category_id = formData.get("category_id") as string;
  const description_en = formData.get("description_en") as string;
  const description_ar = formData.get("description_ar") as string;
  const imageFile  = formData.get("image")      as File;

  const updates: Record<string, unknown> = {
    name_en,
    name_ar,
    category_id,
    description_en,
    description_ar,
    slug: generateSlug(name_en),
  };

  // Only upload a new image if the admin chose one
  if (imageFile && imageFile.size > 0) {
    updates.image_url = await uploadImage(imageFile);
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to update product");
  }

  revalidatePath("/en/catalogue");
  revalidatePath("/ar/catalogue");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}

