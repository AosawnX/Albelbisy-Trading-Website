"use client";

import { Package } from "lucide-react";
import Image from "next/image";
import type { Product, Category } from "@/data/products";
import Link from "next/link";

export default function ProductCard({ product, category, lang = 'en' }: { product: Product & { slug?: string }, category?: Category, lang?: string }) {
  return (
    <Link href={`/${lang}/products/${product.slug || product.id}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center overflow-hidden">
        {product.imageUrl && product.imageUrl !== "/placeholder" ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Package size={48} className="text-gray-400 z-10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
              {category.name}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-dark mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-muted text-sm line-clamp-2 mb-6 flex-grow">{product.description}</p>
        
        <div className="w-full text-center py-2.5 rounded-lg border-2 border-primary text-primary font-medium group-hover:bg-primary group-hover:text-white transition-colors mt-auto">
          View Details
        </div>
      </div>
    </Link>
  );
}
