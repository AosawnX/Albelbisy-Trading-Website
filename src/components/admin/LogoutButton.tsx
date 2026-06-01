"use client";

import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/actions/admin-auth";

export default function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors text-left"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </form>
  );
}
