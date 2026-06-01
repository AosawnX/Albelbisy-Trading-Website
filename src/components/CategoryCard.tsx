"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings } from "lucide-react";
import type { Category } from "@/data/products";

export default function CategoryCard({ category, lang }: { category: Category, lang?: string }) {
  const href = lang ? `/${lang}/catalogue?category=${category.slug}` : `/catalogue?category=${category.slug}`;

  return (
    <Link href={href} className="group relative block overflow-hidden rounded-xl aspect-[4/3] shadow-md transition-all duration-300 hover:shadow-xl will-change-transform">
      <Image 
        src={category.imageUrl} 
        alt={category.name} 
        fill 
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-bold font-serif">{category.name}</h3>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <ArrowRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
