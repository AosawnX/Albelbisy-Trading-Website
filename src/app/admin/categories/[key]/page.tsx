import { getSupabaseAdmin } from "@/utils/supabase";
import { updateCategory } from "@/actions/categories";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: { key: string } }) {
  const supabase = getSupabaseAdmin();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("key", params.key)
    .single();

  if (!category) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/categories"
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
          <p className="text-sm text-gray-400">Update display names for this category</p>
        </div>
      </div>

      {/* Form */}
      <form action={updateCategory} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        <input type="hidden" name="key" value={category.key} />


        {/* Name EN */}
        <div>
          <label htmlFor="name_en" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name_en"
            name="name_en"
            required
            defaultValue={category.name_en}
            placeholder="e.g. Safety Equipment"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm"
          />
        </div>

        {/* Name AR */}
        <div>
          <label htmlFor="name_ar" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name (Arabic)
          </label>
          <input
            type="text"
            id="name_ar"
            name="name_ar"
            defaultValue={category.name_ar || ""}
            placeholder="e.g. معدات السلامة"
            dir="rtl"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm"
          />
        </div>

        {/* Category Key (Read-only, at the bottom) */}
        <div>
          <input
            type="text"
            value={category.key}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400 text-sm font-mono cursor-not-allowed outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50">
          <Link
            href="/admin/categories"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1E3799] text-white text-sm font-medium rounded-xl hover:bg-[#1E3799]/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
