import Image from "next/image";

interface AboutSectionProps {
  aboutLabel: string;
  aboutP1: string;
  aboutP2: string;
}

export default function AboutSection({ aboutLabel, aboutP1, aboutP2 }: AboutSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-6">
              {aboutLabel}
            </h2>
            <div className="w-20 h-1 bg-gold mb-8 rounded-full" />
            <p className="text-muted leading-relaxed mb-8 text-base">
              {aboutP1}
            </p>

            {/* Partnership highlight callout */}
            <div className="flex items-start gap-4 p-5 rounded-xl bg-gold/10 border-s-4 border-gold mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" style={{ color: "#D4AF37" }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <p className="text-dark font-semibold text-base leading-relaxed" style={{ color: "#1A1A2E" }}>
                {aboutP2}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/projects/current-power/page9_img0.jpeg"
                alt="Green EV - Sustainable Transport"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
