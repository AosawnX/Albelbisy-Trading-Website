interface VisionMissionProps {
  label: string;
  visionTitle: string;
  vision: string;
  missionTitle: string;
  mission: string;
}

export default function VisionMission({
  label,
  visionTitle,
  vision,
  missionTitle,
  mission,
}: VisionMissionProps) {
  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-dark mb-4">{label}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision */}
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 start-0 w-1.5 h-full bg-primary rounded-s-2xl" />
            <div className="ps-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{visionTitle}</h3>
              <p className="text-muted leading-relaxed">{vision}</p>
            </div>
          </div>

          {/* Mission */}
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 start-0 w-1.5 h-full bg-accent rounded-s-2xl" />
            <div className="ps-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{missionTitle}</h3>
              <p className="text-muted leading-relaxed">{mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
