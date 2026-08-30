"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductItem {
  name: string;
  spec: string;
}

interface Tier {
  label: string;
  range: string;
  items: ProductItem[];
}

interface ProductRangeProps {
  label: string;
  outputRange: string;
  tiers: {
    home: Tier;
    commercial: Tier;
    dc: Tier;
  };
}

const tierImages: Record<string, { src: string; alt: string }[]> = {
  home: [
    { src: "/projects/current-power/page12_img0.jpeg", alt: "Teltonika EVC2" },
    { src: "/projects/current-power/page14_img0.jpeg", alt: "Wallbox Pulsar Max" },
  ],
  commercial: [
    { src: "/projects/current-power/page20_img0.jpeg", alt: "Teltonika EVC2 Commercial" },
  ],
  dc: [
    { src: "/projects/current-power/page26_img1.png", alt: "Alpitronic HYC 400" },
    { src: "/projects/current-power/page28_img0.jpeg", alt: "Wallbox Supernova 2" },
  ],
};

export default function ProductRange({ label, outputRange, tiers }: ProductRangeProps) {
  const tierKeys = ["home", "commercial", "dc"] as const;
  const [active, setActive] = useState<(typeof tierKeys)[number]>("home");
  const currentTier = tiers[active];
  const currentImages = tierImages[active] || [];

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-dark mb-4">{label}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        {/* Tier tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tierKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                active === key
                  ? "bg-dark text-gold border-dark shadow-md"
                  : "bg-white text-muted border-gray-200 hover:border-gray-300 hover:text-dark"
              }`}
            >
              {tiers[key].label}
            </button>
          ))}
        </div>

        {/* Active tier content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Product list */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-muted">{outputRange}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold" dir="ltr">
                {currentTier.range}
              </span>
            </div>

            <div className="space-y-3">
              {currentTier.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-dark">{item.name}</h4>
                    <p className="text-xs text-muted mt-0.5">{item.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product images */}
          <div className="w-full lg:w-1/2">
            <div className={`grid gap-4 ${currentImages.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"}`}>
              {currentImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
