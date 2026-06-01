export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  imageUrl: string;
};

export const categories: Category[] = [
  { id: "1", name: "Threading Taps", slug: "threading-taps", imageUrl: "/handtaps.png" },
  { id: "2", name: "Lathe Tools", slug: "lathe-tools", imageUrl: "/pafana tools.png" },
  { id: "3", name: "Nylon Rods & Sheets", slug: "nylon-rods-sheets", imageUrl: "/nylon pa6 rods sh.jpeg" },
  { id: "4", name: "Milling Tools", slug: "milling-tools", imageUrl: "/emcut.png" },
  { id: "5", name: "Drilling Solutions", slug: "drilling", imageUrl: "/drill.png" },
  { id: "6", name: "Cutting/Grinding", slug: "cutting-grinding", imageUrl: "/gw.png" },
  { id: "7", name: "Precision Tools", slug: "precision-tools", imageUrl: "/vernier.jpg" },
  { id: "8", name: "Metals", slug: "metals", imageUrl: "/ss rods.jpg" },
  { id: "9", name: "Insulation", slug: "insulation", imageUrl: "/fiberrod.avif" },
];

export const products: Product[] = [
  { id: "p1", name: "Hand Taps & Dies", categoryId: "1", description: "Premium hand taps and dies for precise threading.", imageUrl: "/handtaps.png" },
  { id: "p2", name: "Lathe Tools", categoryId: "2", description: "Premium lathe machine tools, white square tools and cut off blades.", imageUrl: "/pafana tools.png" },
  { id: "p3", name: "Nylon PA6 Cast & PTFE", categoryId: "3", description: "Nylon PA6 Cast and PTFE grade round bars and sheets.", imageUrl: "/nylone pa6 cast y b.jpeg" },
  { id: "p4", name: "Milling Cutters", categoryId: "4", description: "High-quality milling cutters for various applications.", imageUrl: "/emcut.png" },
  { id: "p5", name: "Drill Bits", categoryId: "5", description: "Industrial drill bits, drill chucks and arbors.", imageUrl: "/drill.png" },
  { id: "p6", name: "Cutting Discs & Grinding Wheels", categoryId: "6", description: "Durable cutting discs, grinding wheels, and hacksaw blades.", imageUrl: "/gw.png" },
  { id: "p7", name: "Vernier Calipers & Micrometers", categoryId: "7", description: "Vernier calipers, micrometers, dial gauges, and dial test indicators.", imageUrl: "/vernier2.jpg" },
  { id: "p8", name: "Brass & Copper Metals", categoryId: "8", description: "Brass, copper, bronze, mild steel and stainless steel rods & sheets.", imageUrl: "/ss rods 2.jpg" },
  { id: "p9", name: "Fiber Insulation", categoryId: "9", description: "Fiber insulation rods and sheets for industrial applications.", imageUrl: "/fiberrod.avif" },
];
