import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");

// Client for public read access (uses Anon Key)
// Binds queries strictly to the 'api' schema as requested.
export const getSupabaseClient = () => {
  if (!supabaseAnonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: "api" },
  });
};

// Client for Server Actions (uses Service Role Key to bypass RLS for mutations)
// NEVER expose this to the client side.
export const getSupabaseAdmin = () => {
  if (!supabaseServiceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    db: { schema: "api" },
  });
};
