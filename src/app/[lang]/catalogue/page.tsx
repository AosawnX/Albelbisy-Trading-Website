import { getDictionary, Locale } from "@/dictionaries";
import CatalogueClient from "./CatalogueClient";
import { getSupabaseAdmin } from "@/utils/supabase";

export const revalidate = 0; // Ensure fresh data on load

export default async function Catalogue({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  
  // Using Admin client ensures we fetch products even if public RLS SELECT policies are missing
  const supabase = getSupabaseAdmin();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  return <CatalogueClient dict={dict.catalogue} lang={params.lang} initialProducts={products || []} />;
}
