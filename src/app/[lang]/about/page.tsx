import { motion } from "framer-motion";
import { ShieldCheck, Handshake, TrendingUp } from "lucide-react";
import Image from "next/image";
import { getDictionary, Locale } from "@/dictionaries";

export default async function About({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const d = dict.about;

  const values = [
    {
      icon: <ShieldCheck size={32} className="text-accent" />,
      title: d.values.quality.title,
      desc: d.values.quality.desc
    },
    {
      icon: <Handshake size={32} className="text-accent" />,
      title: d.values.partnerships.title,
      desc: d.values.partnerships.desc
    },
    {
      icon: <TrendingUp size={32} className="text-accent" />,
      title: d.values.growth.title,
      desc: d.values.growth.desc
    }
  ];

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-dark to-primary overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/particles.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{d.title}</h1>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-white/80 text-sm">
            <span>{d.home}</span>
            <span>/</span>
            <span className="text-gold">{d.title}</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">{d.whoWeAre}</h2>
              <div className="w-20 h-1 bg-gold mb-6 rounded-full"></div>
              <p className="text-muted leading-relaxed mb-6">
                {d.whoWeAreP1}
              </p>
              <p className="text-muted leading-relaxed">
                {d.whoWeAreP2}
              </p>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl relative overflow-hidden">
                <Image src="/kharj.png" alt="Branch Office" fill className="object-cover" />
              </div>
              <div className="aspect-square bg-gradient-to-bl from-primary/20 to-accent/20 rounded-2xl mt-8 relative overflow-hidden">
                <Image src="/Buraydah.png" alt="Buraydah Branch" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-dark mb-4">{d.coreValuesTitle}</h2>
            <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{v.title}</h3>
                <p className="text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-gold text-7xl font-serif leading-none mb-6 opacity-80">"</div>
          <p className="text-xl md:text-3xl font-serif italic leading-relaxed mb-10">
            {d.quote}
          </p>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gold mb-4 overflow-hidden bg-white/10 relative">
              <Image 
                src="/bossman.jpeg" 
                alt="Omar Albelbisy" 
                fill 
                className="object-cover"
              />
            </div>
            <h4 className="font-bold text-xl mb-1">Omar Albelbisy</h4>
            <p className="text-gold uppercase tracking-wider text-sm font-semibold">Chief Executive Officer</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-dark mb-4">{d.journeyTitle}</h2>
            <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="relative border-s-2 border-primary/20 ps-8 ms-4 md:ms-0 md:ps-0 md:border-s-0">
            <div className="hidden md:block absolute start-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 rtl:translate-x-1/2"></div>
            
            <div className="space-y-12">
              {d.milestones.map((m: any, i: number) => (
                <div 
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute -start-[41px] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 w-6 h-6 bg-gold rounded-full border-4 border-white shadow-sm z-10"></div>
                  
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:ps-12' : 'md:pe-12 text-start md:text-end'}`}>
                    <div className="bg-light p-6 rounded-2xl">
                      <span className="text-primary font-bold text-xl mb-2 block" dir="ltr" style={{textAlign: "inherit"}}>{m.year}</span>
                      <h4 className="text-lg font-bold text-dark mb-2">{m.title}</h4>
                      <p className="text-muted text-sm">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
