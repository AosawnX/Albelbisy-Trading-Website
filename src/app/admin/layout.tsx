import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Package, LayoutDashboard, Globe } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white flex flex-col flex-shrink-0 shadow-2xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#1A1A2E] font-black text-xs">AB</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wider">ALBELBISY</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-white/20 text-[10px] uppercase tracking-widest px-3 mb-3">Navigation</p>

          <Link href="/admin" className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group text-sm text-white/70 hover:text-white">
            <div className="flex items-center gap-3">
              <LayoutDashboard size={16} className="text-[#D4AF37]" />
              <span>Dashboard</span>
            </div>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link href="/admin/products" className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group text-sm text-white/70 hover:text-white">
            <div className="flex items-center gap-3">
              <Package size={16} className="text-[#D4AF37]" />
              <span>Products</span>
            </div>
            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <div className="pt-4 mt-2 border-t border-white/5">
            <Link href="/en" target="_blank" className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group text-sm text-white/70 hover:text-white">
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                <span>Go to Website</span>
              </div>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="text-sm text-gray-400">
            <span className="text-gray-600 font-medium">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1E3799] flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
