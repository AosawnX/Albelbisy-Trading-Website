"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CEOMessage({ dict, lang }: { dict: any, lang: string }) {
  return (
    <section className="py-20 bg-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/bossman.jpeg" 
                alt={dict.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 rounded-2xl" />
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -bottom-6 -start-6 w-48 h-48 bg-gold rounded-full opacity-20 blur-2xl -z-10" />
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="mb-2">
              <span className="text-accent uppercase tracking-widest text-sm font-semibold">
                {dict.subtitle}
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
              {dict.name}
            </h2>
            
            <p className="text-muted leading-relaxed mb-8 text-lg">
              {dict.content}
            </p>

            <Link 
              href={`/${lang}/about`} 
              className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors group"
            >
              {dict.readMore}
              <svg 
                className="w-5 h-5 ms-2 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
