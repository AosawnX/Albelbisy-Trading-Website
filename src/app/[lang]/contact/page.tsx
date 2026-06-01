import { getDictionary, Locale } from "@/dictionaries";
import ContactClient from "./ContactClient";

export default async function Contact({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  return <ContactClient dict={dict.contact} queryDict={dict.queryForm} />;
}
