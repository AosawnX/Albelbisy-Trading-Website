import { getDictionary, Locale } from "@/dictionaries";
import ContactClient from "./ContactClient";
import { getSupabaseClient } from "@/utils/supabase";

export default async function Contact({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const supabase = getSupabaseClient();
  const { data: categories } = await supabase.from("categories").select("*").order("created_at", { ascending: true });

  return <ContactClient dict={dict.contact} queryDict={dict.queryForm} lang={params.lang} categories={categories || []} />;
}

