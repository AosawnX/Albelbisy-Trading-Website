import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import CEOMessage from "@/components/CEOMessage";
import ProductGrid from "@/components/ProductGrid";
import ClientsMarquee from "@/components/ClientsMarquee";
import BrandsMarquee from "@/components/BrandsMarquee";
import QueryForm from "@/components/QueryForm";
import { getDictionary, Locale } from "@/dictionaries";

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <>
      <HeroSection dict={dict.hero} lang={params.lang} />
      <ClientsMarquee title={dict.marquee.clients} />
      <CEOMessage dict={dict.ceoMessage} lang={params.lang} />
      <StatsCounter dict={dict.stats} />
      <BrandsMarquee title={dict.marquee.brands} />
      <ProductGrid dict={dict.productGrid} lang={params.lang} />
      
      <section className="py-24 bg-dark text-white relative overflow-hidden" id="query">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">{dict.query.title}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {dict.query.description}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <QueryForm dict={dict.queryForm} />
          </div>
        </div>
      </section>
    </>
  );
}
