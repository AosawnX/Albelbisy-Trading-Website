import { getSupabaseAdmin } from "@/utils/supabase";
import Link from "next/link";
import { Plus, Pencil, Tags } from "lucide-react";
import CategoryDeleteButton from "@/components/admin/CategoryDeleteButton";

export default async function AdminCategoriesPage() {
  const supabase = getSupabaseAdmin();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-400 mt-1">{categories?.length ?? 0} total categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3799] text-white text-sm font-medium rounded-xl hover:bg-[#1E3799]/90 transition-colors"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6">{error.message}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Key</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name (EN)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name (AR)</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <Tags size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No categories yet. Add one above.</p>
                </td>
              </tr>
            )}
            {categories?.map((cat) => (
              <tr key={cat.key} className="hover:bg-gray-50/70 transition-colors group">
                <td className="px-6 py-4">
                  <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-mono">
                    {cat.key}
                  </code>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{cat.name_en}</td>
                <td className="px-6 py-4 text-sm text-gray-500" dir="rtl">{cat.name_ar || "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/categories/${cat.key}`}
                      className="p-2 text-gray-400 hover:text-[#1E3799] hover:bg-[#1E3799]/5 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </Link>
                    <CategoryDeleteButton categoryKey={cat.key} categoryName={cat.name_en} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
