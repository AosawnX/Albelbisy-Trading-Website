import { getSupabaseClient } from "@/utils/supabase";
import { getDictionary, Locale } from "@/dictionaries";
import { categories } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { lang: string, slug: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const supabase = getSupabaseClient(); // Anon key — public read, RLS enforced
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!product) {
    notFound();
  }

  const category = categories.find(c => c.id === product.category_id);
  
  const name = params.lang === 'ar' ? product.name_ar : product.name_en;
  const description = params.lang === 'ar' ? product.description_ar : product.description_en;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link 
          href={`/${params.lang}/catalogue`} 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 relative z-10 cursor-pointer font-medium"
        >
          <ArrowLeft size={16} className={params.lang === 'ar' ? 'rotate-180' : ''} /> 
          {params.lang === 'ar' ? "العودة للكتالوج" : "Back to Catalogue"}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Image */}
            <div className="bg-gray-100 flex items-center justify-center p-6 md:p-12">
              {product.image_url ? (
                <Image 
                  src={product.image_url} 
                  alt={name}
                  width={800}
                  height={800}
                  className="w-full h-auto max-h-[600px] object-contain rounded-lg"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center text-gray-400 py-32">
                  <Package size={64} />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-12 flex flex-col">
              {category && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                    {category.name}
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">{name}</h1>
              
              <div className="prose prose-gray mb-8 flex-grow">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {description || (params.lang === 'ar' ? "لا يوجد وصف." : "No description available.")}
                </p>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>{params.lang === 'ar' ? "متوفر للطلب" : "Available for inquiry"}</span>
                </div>
                
                <Link 
                  href={`/${params.lang}/contact?product=${product.id}`}
                  className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors"
                >
                  {params.lang === 'ar' ? "طلب تسعيرة" : "Request Quote"}
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
