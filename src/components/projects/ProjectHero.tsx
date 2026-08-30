import Image from "next/image";

interface ProjectHeroProps {
  eyebrow: string;
  title: string;
  tag: string;
  blurb: string;
  location: string;
  sector: string;
  home: string;
  pageTitle: string;
}

export default function ProjectHero({
  eyebrow,
  title,
  tag,
  blurb,
  location,
  sector,
  home,
  pageTitle,
}: ProjectHeroProps) {
  return (
    <section className="relative min-h-[55vh] flex items-end pb-16 bg-dark overflow-hidden pt-28">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/projects/current-power/page3_img0.jpeg"
          alt="EV Charging"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-white/60 text-sm mb-8">
          <span>{home}</span>
          <span>/</span>
          <span className="text-gold">{pageTitle}</span>
        </div>

        {/* Eyebrow */}
        <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
          {eyebrow}
        </p>

        {/* Title + Tag */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">
            {title}
          </h1>
        </div>

        {/* Blurb */}
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
          {blurb}
        </p>

        {/* Metadata pills */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm backdrop-blur-sm border border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm backdrop-blur-sm border border-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            {sector}
          </span>
        </div>
      </div>
    </section>
  );
}
