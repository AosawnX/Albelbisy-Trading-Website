"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = [
  "/lathe machine 1.jpg",
  "/welding.jpg",
  "/grinding wheels.jpg",
  "/milling.jpg",
];

import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["700"] });

export default function HeroSection({ dict, lang }: { dict: any, lang: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featureKeys = ["premiumMetals", "engineeringPlastics", "precisionTools", "cuttingGrinding"];
  const features = featureKeys.map(key => ({
    title: dict.features[key].title,
    description: dict.features[key].description,
    link: `/${lang}/catalogue`,
  }));

  return (
    <section id="hero" className="relative min-h-[100dvh] lg:h-screen lg:min-h-[700px] w-full flex flex-col justify-end pb-8 md:pb-12 pt-28 overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={backgroundImages[currentImageIndex]} 
              alt="Industrial Equipment" 
              fill 
              className="object-cover"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlays to darken the image to medium brightness and make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/60 to-dark/95" />
      </div>

      {/* Main Title Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-auto mt-12 md:mt-24 lg:mt-40 flex justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`text-center ${oswald.className} uppercase tracking-wider text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-white max-w-6xl leading-[1.2] lg:leading-[1.1]`}
        >
          {dict.titleLine1} <br /> {dict.titleLine2}
        </motion.h1>
      </div>

      {/* Bottom Content Group (Line + Columns) */}
      <div className="relative z-10 w-full mt-auto">
        {/* Thin Line Separator */}
        <div className="w-full border-t border-white/30 mb-10" />

        {/* 4-Column Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10 md:overflow-visible text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="flex flex-col min-w-[260px] sm:min-w-[300px] md:min-w-0 snap-start"
            >
            <h3 className="font-serif text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow pe-4">
              {feature.description}
            </p>
            <Link 
              href={feature.link}
              className="text-xs font-semibold uppercase tracking-wider text-white hover:text-accent transition-colors flex items-center gap-2 group w-fit"
            >
              {dict.readMore}
              <span className="w-6 h-[1px] bg-white group-hover:bg-accent transition-colors"></span>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
      {/* Sentinel for scroll detection */}
      <div id="hero-bottom" className="absolute bottom-0 start-0 w-full h-0" />
    </section>
  );
}
