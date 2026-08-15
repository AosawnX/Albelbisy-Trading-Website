// ── Types (match DB schema) ──────────────────────────────────────────
export type Category = {
  key: string;      // immutable PK, e.g. "threading-taps" — also serves as URL slug
  name_en: string;  // editable display name
  name_ar: string;
  created_at?: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string; // references Category.key
  description: string;
  imageUrl: string;
};

// ── Homepage icon mapping (hardcoded for original 9 categories only) ──
// New categories added via admin will have no icon on the homepage grid.
export const CATEGORY_ICONS: Record<string, string> = {
  "threading-taps":    "/handtaps.png",
  "lathe-tools":       "/pafana tools.png",
  "nylon-rods-sheets": "/nylon pa6 rods sh.jpeg",
  "milling-tools":     "/emcut.png",
  "drilling":          "/drill.png",
  "cutting-grinding":  "/gw.png",
  "precision-tools":   "/vernier.jpg",
  "metals":            "/ss rods.jpg",
  "insulation":        "/fiberrod.avif",
};
