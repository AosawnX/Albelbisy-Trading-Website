import { addProduct } from "@/actions/products";
import { categories } from "@/data/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-400 text-sm mt-1">Fill in the details below to add a product to your catalogue.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form action={addProduct} className="space-y-8">

          {/* Names */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Product Name</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">English Name</label>
                <input
                  type="text"
                  name="name_en"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm"
                  placeholder="e.g. Hand Taps & Dies"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Arabic Name</label>
                <input
                  type="text"
                  name="name_ar"
                  required
                  dir="rtl"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm"
                  placeholder="مثال: أدوات السن اللولبي"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Category</h2>
            <select
              name="category_id"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm bg-white"
            >
              <option value="">Select a category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Descriptions */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Description</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">English Description</label>
                <textarea
                  name="description_en"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none resize-none text-sm"
                  placeholder="Describe the product in English..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Arabic Description</label>
                <textarea
                  name="description_ar"
                  rows={4}
                  dir="rtl"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none resize-none text-sm"
                  placeholder="اكتب وصف المنتج بالعربية..."
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Product Image</h2>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1E3799]/10 file:text-[#1E3799] hover:file:bg-[#1E3799]/20 transition-colors cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-2">Accepted: PNG, JPG, AVIF, SVG — max 30 MB</p>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl bg-[#1A1A2E] text-white hover:bg-[#1E3799] transition-colors text-sm font-bold"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
