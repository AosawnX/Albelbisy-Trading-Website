interface Service {
  n: string;
  t: string;
  d: string;
}

interface ServicePipelineProps {
  label: string;
  services: Service[];
}

export default function ServicePipeline({ label, services }: ServicePipelineProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-dark mb-4">{label}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 start-[calc(100%/14)] end-[calc(100%/14)] h-0.5 bg-gray-200" />

            <div className="grid grid-cols-7 gap-4">
              {services.map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-full bg-dark text-gold font-bold text-lg flex items-center justify-center mb-4 relative z-10 group-hover:bg-primary transition-colors duration-300 shadow-md">
                    {s.n}
                  </div>
                  <h4 className="text-sm font-bold text-dark mb-2 leading-tight">{s.t}</h4>
                  <p className="text-xs text-muted leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative border-s-2 border-gray-200 ms-4 ps-8">
            {services.map((s, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                {/* Dot on timeline */}
                <div className="absolute -start-[41px] w-6 h-6 rounded-full bg-dark text-gold text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {s.n}
                </div>
                <h4 className="text-base font-bold text-dark mb-1">{s.t}</h4>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
