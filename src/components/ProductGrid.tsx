"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/products";

export default function ProductGrid({ dict, lang }: { dict: any, lang: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
            {dict.title}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.slice(0, 6).map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard category={category} lang={lang} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link 
            href={`/${lang}/catalogue`}
            className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-transform duration-300 hover:scale-105"
          >
            {dict.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
