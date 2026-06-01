"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.products, href: `/${lang}/catalogue` },
    { name: dict.about, href: `/${lang}/about` },
    { name: dict.contact, href: `/${lang}/contact` },
  ];

  const switchLocaleHref = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = lang === "en" ? "ar" : "en";
    return segments.join("/");
  };

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? "h-16 md:h-[72px] bg-white/85 backdrop-blur-md shadow-sm border-gray-200/50" 
          : "h-20 md:h-[88px] bg-white/95 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex-1 flex justify-start">
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src="/logonewest.png"
              alt="Albelbisy Trading Logo"
              width={160}
              height={80}
              className="object-contain w-36 md:w-44 h-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-[#1B2D6B]" : "text-gray-500 hover:text-[#1B2D6B]"
                }`}>
                  {link.name}
                </span>
                <span 
                  className={`absolute start-0 bottom-0 w-full h-[2px] bg-[#1B2D6B] transition-transform duration-300 origin-start rounded-full ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Side Container */}
        <div className="flex-1 flex justify-end items-center gap-4">
          
          {/* Language Switcher */}
          <Link
            href={switchLocaleHref()}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 overflow-hidden"
            title={lang === 'en' ? 'عربي' : 'English'}
          >
            {lang === 'en' ? (
              <Image src="/flags/sa.svg" alt="عربي" width={24} height={24} className="object-cover w-full h-full" />
            ) : (
              <Image src="/flags/uk.svg" alt="English" width={24} height={24} className="object-cover w-full h-full" />
            )}
          </Link>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href={`/${lang}/contact`}
              className="group relative inline-flex items-center justify-center px-7 py-2.5 rounded-full overflow-hidden bg-[#1B2D6B] text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(27,45,107,0.3)] border border-transparent hover:border-[#C9A84C]/50"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#C9A84C] rounded-full group-hover:w-64 group-hover:h-64 opacity-10"></span>
              <span className="relative z-10 tracking-wide text-sm">{dict.requestQuote}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-dark p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-full start-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-64 border-t" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-dark font-medium hover:text-[#1B2D6B]"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#1B2D6B] text-white px-6 py-2 rounded-full font-medium text-center w-full mt-2 inline-block"
          >
            {dict.requestQuote}
          </Link>
        </div>
      </div>
    </header>
  );
}
