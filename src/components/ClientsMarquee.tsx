"use client";

import Image from "next/image";

export default function ClientsMarquee({ title = "Trusted By Industry Leaders" }: { title?: string }) {
  const clients = [
    { name: "Al-Babtain Power & Telecom", img: "/business partners/Al-Babtain Power & Telecom الباطين للطاقة و الاتصالات.jpg" },
    { name: "Alaryaf", img: "/business partners/Alaryaf الارياف.jpg" },
    { name: "Aljawdah Group", img: "/business partners/Aljawdah Group مجموعة الجودة.jpg" },
    { name: "Alkhoraiyf", img: "/business partners/Alkhoraiyf الخريف.png" },
    { name: "Alwatania Poultry", img: "/business partners/Alwatania Poultry دواجن الوطنية.jpg" },
    { name: "Atayeb Altomor", img: "/business partners/Atayeb Altomor أطايب التمور.jpg" },
    { name: "First Mills", img: "/business partners/First Mills المطاحن الأولى.png" },
    { name: "Hana Food Industires", img: "/business partners/Hana Food Industires  شركة هنا.jpg" },
    { name: "Qassim University", img: "/business partners/Qassim University جامعة القصيم.jpg" },
    { name: "Rajhi Steel", img: "/business partners/Rajhi Steel حديد الراجحي.png" },
    { name: "Riyadh Cables Group", img: "/business partners/Riyadh Cables Groupمجموعة كابلات الرياض.jpg" },
    { name: "Spimaco", img: "/business partners/Spimaco الدوائية.jpg" },
    { name: "Watania Steel", img: "/business partners/Watania Steel حديد الوطنية.jpg" },
    { name: "Alfanar", img: "/business partners/alfnar-2.png" },
    { name: "Riyadh Metro", img: "/business partners/bacs RIYADH METRO.jpg" },
  ];

  return (
    <section className="py-12 bg-light border-y border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h3 className="text-center text-muted uppercase tracking-widest text-sm font-semibold">
          {title}
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={idx} 
              className="mx-8 flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-32 h-20 bg-white rounded-xl shadow-sm relative overflow-hidden flex items-center justify-center">
                <Image 
                  src={client.img} 
                  alt={client.name} 
                  fill 
                  className="object-contain p-2" 
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, idx) => (
            <div 
              key={idx + 'b'} 
              className="mx-8 flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-32 h-20 bg-white rounded-xl shadow-sm relative overflow-hidden flex items-center justify-center">
                <Image 
                  src={client.img} 
                  alt={client.name} 
                  fill 
                  className="object-contain p-2" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
