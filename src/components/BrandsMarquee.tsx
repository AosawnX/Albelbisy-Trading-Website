"use client";

import Image from "next/image";

export default function BrandsMarquee({ title = "Top Brands We Supply" }: { title?: string }) {
  const brands = [
    { name: "BOSCH", img: "/brands/BOSCH.jpg" },
    { name: "DEWALT", img: "/brands/DEWALT DRILLS.png" },
    { name: "DORMER", img: "/brands/DORMER.jpg" },
    { name: "IT DRILL", img: "/brands/IT DRILL.png" },
    { name: "MAKITA", img: "/brands/MAKITA.png" },
    { name: "MITUTOYO", img: "/brands/MITUTOYO JAPAN.png" },
    { name: "PAFANA", img: "/brands/PAFANA TOOLS POLAND.png" },
    { name: "RAIZO", img: "/brands/RAIZO.jpg" },
    { name: "Unique TOOLS", img: "/brands/Unique TOOLS INDIA.jpeg" },
    { name: "SKC", img: "/brands/skc brand handtaps.jpg" },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h3 className="text-center text-muted uppercase tracking-widest text-sm font-semibold">
          {title}
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, idx) => (
            <div 
              key={idx} 
              className="mx-8 flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-32 h-20 bg-white rounded-xl shadow-sm border border-gray-50 relative overflow-hidden flex items-center justify-center">
                <Image 
                  src={brand.img} 
                  alt={brand.name} 
                  fill 
                  className="object-contain p-2 mix-blend-multiply" 
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, idx) => (
            <div 
              key={idx + 'b'} 
              className="mx-8 flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-32 h-20 bg-white rounded-xl shadow-sm border border-gray-50 relative overflow-hidden flex items-center justify-center">
                <Image 
                  src={brand.img} 
                  alt={brand.name} 
                  fill 
                  className="object-contain p-2 mix-blend-multiply" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
