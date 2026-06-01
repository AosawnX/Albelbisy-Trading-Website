import { getSupabaseAdmin } from "@/utils/supabase";
import Link from "next/link";
import { Package, Plus, ArrowRight } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { data: recent } = await supabase
    .from("products")
    .select("id, name_en, category_id, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here&apos;s an overview of your catalogue.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[#1E3799]/10 flex items-center justify-center flex-shrink-0">
            <Package size={22} className="text-[#1E3799]" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{count ?? 0}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Total Products</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-[#D4AF37]">9</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">9</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Categories</p>
          </div>
        </div>

        <Link href="/admin/products/new" className="bg-[#1A1A2E] rounded-2xl border border-[#1A1A2E] shadow-sm p-6 flex items-center gap-4 hover:bg-[#1E3799] transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Plus size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-sm">Add Product</p>
            <p className="text-white/40 text-xs mt-0.5">Add to your catalogue</p>
          </div>
          <ArrowRight size={16} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Recent Products</h2>
          <Link href="/admin/products" className="text-xs text-[#1E3799] font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recent?.length === 0 && (
            <p className="p-6 text-sm text-gray-400">No products yet. Add your first product.</p>
          )}
          {recent?.map(p => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3799]/10 flex items-center justify-center flex-shrink-0">
                <Package size={14} className="text-[#1E3799]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{p.name_en}</p>
                <p className="text-xs text-gray-400">Category {p.category_id}</p>
              </div>
              <p className="text-xs text-gray-300 flex-shrink-0">
                {new Date(p.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
