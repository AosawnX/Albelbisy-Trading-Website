import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer({ dict, lang }: { dict: any, lang: string }) {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t-[4px] border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold font-serif mb-6 text-gold">{dict.companyName}</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              {dict.description}
              <br />{dict.cr}
              <br />{dict.vat}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{dict.quickLinks}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${lang}`} className="text-muted hover:text-white transition-colors">{dict.quickLinks_home || "Home"}</Link></li>
              <li><Link href={`/${lang}/catalogue`} className="text-muted hover:text-white transition-colors">{dict.quickLinks_catalogue || "Catalogue"}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-muted hover:text-white transition-colors">{dict.quickLinks_about || "About Us"}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-muted hover:text-white transition-colors">{dict.quickLinks_contact || "Contact"}</Link></li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="text-lg font-bold mb-6">{dict.branches}</h4>
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Riyadh Branch */}
              <div>
                <h5 className="text-sm font-semibold text-gold mb-3">{dict.riyadhBranch}</h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin size={18} className="text-accent me-2 mt-0.5 flex-shrink-0" />
                    <a href="https://maps.app.goo.gl/giHBmff5KziWUJGD7" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">
                      {dict.riyadhAddress}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone size={18} className="text-accent me-2 flex-shrink-0" />
                    <a href="tel:+966567236986" className="text-gray-400 text-sm hover:text-white transition-colors" dir="ltr">+966 56 723 6986</a>
                  </li>
                </ul>
              </div>

              {/* Buraydah Branch */}
              <div>
                <h5 className="text-sm font-semibold text-gold mb-3">{dict.buraydahBranch}</h5>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin size={18} className="text-accent me-2 mt-0.5 flex-shrink-0" />
                    <a href="https://maps.app.goo.gl/LMGdUFDHaXMCkMG29" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">
                      {dict.buraydahAddress}
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone size={18} className="text-accent me-2 flex-shrink-0" />
                    <a href="tel:+966566720955" className="text-gray-400 text-sm hover:text-white transition-colors" dir="ltr">+966 56 672 0955</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Shared Email */}
            <div className="flex items-center mt-5 pt-4 border-t border-gray-700/50">
              <Mail size={18} className="text-accent me-2 flex-shrink-0" />
              <a href="mailto:info@albelbisy.com" className="text-gray-400 text-sm hover:text-white transition-colors">info@albelbisy.com</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/30 pt-8 flex justify-between items-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} {dict.rights}</p>
          <Link href="/admin/login" className="text-gray-600 hover:text-white transition-colors opacity-50 hover:opacity-100" title="Admin Login">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
