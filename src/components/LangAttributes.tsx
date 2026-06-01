"use client";

import { useEffect } from "react";

export default function LangAttributes({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
