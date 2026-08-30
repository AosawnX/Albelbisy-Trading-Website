import Link from "next/link";

interface ProjectCTAProps {
  contactLabel: string;
  lang: string;
}

export default function ProjectCTA({ contactLabel, lang }: ProjectCTAProps) {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
          {contactLabel}
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          AlBelbisy Trading is your trusted partner for industrial supply and infrastructure projects across Saudi Arabia.
        </p>

        <Link
          href={`/${lang}/contact`}
          className="group relative inline-flex items-center justify-center px-10 py-3.5 rounded-full overflow-hidden bg-gold text-dark font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(212,175,55,0.3)]"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10" />
          <span className="relative z-10 tracking-wide">{contactLabel}</span>
        </Link>
      </div>
    </section>
  );
}
