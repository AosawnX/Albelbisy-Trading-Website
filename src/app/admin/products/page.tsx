import { getSupabaseAdmin } from "@/utils/supabase";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Pencil, Package } from "lucide-react";
import { deleteProduct } from "@/actions/products";
import { categories } from "@/data/products";

export default async function AdminProductsPage() {
  const supabase = getSupabaseAdmin();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your catalogue inventory.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#1E3799] text-white px-5 py-2.5 rounded-xl transition-colors font-semibold text-sm"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {error ? (
          <div className="p-10 text-center text-red-500 text-sm">Failed to load products from database.</div>
        ) : products?.length === 0 ? (
          <div className="p-16 text-center">
            <Package size={40} className="mx-auto text-gray-200 mb-4" />
            <p className="font-semibold text-gray-500">No products yet</p>
            <p className="text-sm text-gray-400 mt-1">Click &quot;Add Product&quot; to create your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Added</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products?.map((product) => {
                const category = categories.find((c) => c.id === product.category_id);
                return (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
                          {product.image_url ? (
                            <Image src={product.image_url} alt={product.name_en} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={16} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{product.name_en}</p>
                          <p className="text-xs text-gray-400 mt-0.5" dir="rtl">{product.name_ar}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#1E3799]/8 text-[#1E3799] text-xs font-medium">
                        {category?.name ?? product.category_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(product.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit */}
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg text-gray-400 hover:text-[#1E3799] hover:bg-[#1E3799]/8 transition-colors"
                          title="Edit product"
                        >
                          <Pencil size={15} />
                        </Link>
                        {/* Delete */}
                        <form action={async () => {
                          "use server";
                          await deleteProduct(product.id);
                        }}>
                          <button
                            type="submit"
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
