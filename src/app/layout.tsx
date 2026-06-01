import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Albelbisy Trading",
  description: "Premium industrial tools and materials.",
  icons: { icon: "/faviconn.png" },
};

// True root layout — must contain <html> and <body>.
// [lang]/layout.tsx handles localization-specific wrapping (nav, footer, dir).
// /admin routes use this layout directly for their html/body context.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
