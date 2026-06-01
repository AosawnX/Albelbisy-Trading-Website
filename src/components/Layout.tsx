import Navbar from "./Navbar";
import Footer from "./Footer";
import ContactSidebar from "./ContactSidebar";
import { getDictionary, Locale } from "@/dictionaries";

export default async function Layout({ children, lang }: { children: React.ReactNode, lang: string }) {
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict.navbar} lang={lang} />
      <main className="min-h-screen bg-light">
        {children}
      </main>
      <Footer dict={dict.footer} lang={lang} />
      <ContactSidebar dict={dict.contactSidebar} />
    </>
  );
}
