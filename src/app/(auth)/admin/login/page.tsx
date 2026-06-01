"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/admin-auth";
import Link from "next/link";
import { Eye, EyeOff, Globe } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAdmin(formData);
    if (result?.success) {
      router.push("/admin");
      router.refresh();
    } else if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#1A1A2E]">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#1E3799] border-r border-white/10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-48 h-48 bg-[#1E3799]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]" />
          <span className="text-white font-bold text-lg tracking-widest uppercase">Albelbisy</span>
        </div>

        <div className="relative">
          <p className="text-5xl font-serif text-white leading-tight mb-6">
            Manage your<br />
            <span className="text-[#D4AF37]">product catalogue</span><br />
            with ease.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            Secure admin panel — access restricted<br />to authorised personnel only.
          </p>
        </div>

        <p className="relative text-white/20 text-xs">
          © {new Date().getFullYear()} Albelbisy Trading Co.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Go to Home link */}
        <Link 
          href="/en" 
          className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-[#D4AF37] flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Globe size={18} /> 
          <span className="">Goto Website</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]" />
            <span className="text-white font-bold tracking-widest uppercase">Albelbisy Admin</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/50 mb-10 text-sm">Sign in to access the admin dashboard.</p>

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                autoComplete="username"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#D4AF37] hover:bg-[#c4a030] text-[#1A1A2E] rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Authenticating..." : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
