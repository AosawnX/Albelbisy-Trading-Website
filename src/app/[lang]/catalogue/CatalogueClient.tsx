"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, PackageX, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function CatalogueContent({ dict, lang, initialProducts }: { dict: any, lang: string, initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  
  // Pagination State
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleCategoryChange = (slug: string | null) => {
    // We update the category instantly
    setSelectedCategory(slug);
    setCurrentPage(1);
    
    // We use an instant scroll instead of smooth. 
    // Smooth scrolling breaks if the new category has fewer products,
    // because the browser page height instantly shrinks, which violently snaps the scroll position
    // and causes the browser to get "stuck" or jitter. An instant scroll feels like a clean page load.
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const mappedProducts = useMemo(() => {
    return initialProducts.map(p => ({
      id: p.id,
      categoryId: p.category_id,
      name: lang === 'ar' ? p.name_ar : p.name_en,
      description: lang === 'ar' ? p.description_ar : p.description_en,
      imageUrl: p.image_url,
      slug: p.slug
    }));
  }, [initialProducts, lang]);

  const filteredProducts = useMemo(() => {
    return mappedProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory ? categories.find(c => c.slug === selectedCategory)?.id === p.categoryId : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, mappedProducts]);

  const totalProducts = filteredProducts.length;
  const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalProducts / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    if (itemsPerPage === 'all') return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-dark to-primary overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/particles.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{dict.title}</h1>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-white/80 text-sm">
            <span>{dict.home}</span>
            <span>/</span>
            <span className="text-gold">{dict.title}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 transition-colors">
                <div className="flex items-center mb-6">
                  <SlidersHorizontal size={20} className="text-primary me-2" />
                  <h2 className="font-bold text-lg text-dark">{dict.filters}</h2>
                </div>
                
                {/* Search */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-muted mb-2">{dict.searchProducts}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={dict.searchPlaceholder}
                      className="w-full ps-10 pe-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-3">{dict.categories}</label>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleCategoryChange(null)}
                      className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === null ? 'bg-primary/10 text-primary font-medium' : 'text-dark hover:bg-gray-50'}`}
                    >
                      {dict.allCategories}
                    </button>
                    {categories.map((c) => (
                      <button 
                        key={c.id}
                        onClick={() => handleCategoryChange(c.slug)}
                        className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === c.slug ? 'bg-primary/10 text-primary font-medium' : 'text-dark hover:bg-gray-50'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedCategory) && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="w-full mt-6 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    {dict.clearAllFilters}
                  </button>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-sm p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                      {dict.showing} <span className="font-bold text-dark">{itemsPerPage === 'all' ? 1 : (currentPage - 1) * itemsPerPage + 1}-{itemsPerPage === 'all' ? totalProducts : Math.min(currentPage * itemsPerPage, totalProducts)}</span> {dict.of} <span className="font-bold text-dark">{totalProducts}</span> {dict.products}
                    </p>
                    <div className="flex items-center gap-3 relative">
                      <span className="text-sm text-gray-500">{dict.viewPerPage}</span>
                      <div className="relative">
                        <button 
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                          {itemsPerPage === 'all' ? dict.all : itemsPerPage}
                          <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute end-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden"
                            >
                              {[12, 24, 48, 'all'].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => {
                                    setItemsPerPage(num as number | 'all');
                                    setCurrentPage(1);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full text-start px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${itemsPerPage === num ? "text-primary font-bold bg-primary/5" : "text-gray-600"}`}
                                >
                                  {num === 'all' ? dict.all : num}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        category={categories.find(c => c.id === product.categoryId)} 
                        lang={lang}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPage(prev => Math.max(prev - 1, 1));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title={dict.previous}
                      >
                        <ChevronLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                      </button>
                      
                      <div className="flex items-center gap-1 flex-wrap justify-center">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              window.scrollTo({ top: 0, behavior: 'auto' });
                            }}
                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${currentPage === i + 1 ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          setCurrentPage(prev => Math.min(prev + 1, totalPages));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title={dict.next}
                      >
                        <ChevronRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <PackageX size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-2">{dict.noProductsFound}</h3>
                  <p className="text-muted mb-6">{dict.noProductsDesc}</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    {dict.clearFiltersBtn}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function CatalogueClient({ dict, lang, initialProducts }: { dict: any, lang: string, initialProducts: any[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CatalogueContent dict={dict} lang={lang} initialProducts={initialProducts} />
    </Suspense>
  );
}
