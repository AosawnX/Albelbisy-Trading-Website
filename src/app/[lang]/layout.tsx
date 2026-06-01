import type { Metadata } from "next";
import "../globals.css";
import Layout from "@/components/Layout";
import LangAttributes from "@/components/LangAttributes";

export const metadata: Metadata = {
  title: "Albelbisy Trading | Premium Business Catalogue",
  description: "Explore our comprehensive catalogue of world-class industrial equipment and materials.",
};

export default function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <>
      <LangAttributes lang={params.lang} />
      <Layout lang={params.lang}>{children}</Layout>
    </>
  );
}
