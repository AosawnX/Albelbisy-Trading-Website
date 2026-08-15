import { getDictionary, Locale } from "@/dictionaries";
import CatalogueClient from "./CatalogueClient";
import { getSupabaseClient } from "@/utils/supabase";

export const revalidate = 0; // Ensure fresh data on load

export default async function Catalogue({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);

  // Anon key — correct for public reads. RLS SELECT policy enforced. Least privilege.
  const supabase = getSupabaseClient();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("created_at", { ascending: true }),
  ]);

  return (
    <CatalogueClient
      dict={dict.catalogue}
      lang={params.lang}
      initialProducts={products || []}
      categories={categories || []}
    />
  );
}

