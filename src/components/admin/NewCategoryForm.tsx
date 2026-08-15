"use client";

import { createCategory } from "@/actions/categories";
import Link from "next/link";
import { useState } from "react";

export default function NewCategoryForm() {
  const [nameEn, setNameEn] = useState("");
  
  // Auto-generate key: lowercase, replace spaces with dashes, remove non-alphanumeric
  const generatedKey = nameEn
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <form action={createCategory} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
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
          placeholder="e.g. Safety Equipment"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
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
          placeholder="e.g. معدات السلامة"
          dir="rtl"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3799]/30 focus:border-[#1E3799] transition-all outline-none text-sm"
        />
      </div>

      {/* Category Key (Read-only, auto-generated) */}
      <div>
        <label htmlFor="key" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Category Key
        </label>
        <input
          type="text"
          id="key"
          name="key"
          required
          readOnly
          value={generatedKey}
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 font-mono text-sm cursor-not-allowed outline-none"
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
          Create Category
        </button>
      </div>
    </form>
  );
}
