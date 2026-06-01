"use client";

import { useSearchParams } from "next/navigation";
import QueryForm from "@/components/QueryForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Suspense, useState } from "react";

function ContactContent({ dict, queryDict }: { dict: any, queryDict: any }) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const [activeMap, setActiveMap] = useState<"riyadh" | "buraydah">("riyadh");
  const mapCoordinates = {
    riyadh: "24.6424574,46.735897",
    buraydah: "26.3405823,43.9590437"
  };

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gradient-to-br from-dark to-primary overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/particles.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{dict.title}</h1>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-white/80 text-sm">
            <span>{dict.home}</span>
            <span>/</span>
            <span className="text-gold">{dict.title}</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <QueryForm dict={queryDict} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
            {/* Contact Details */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-dark mb-8">{dict.getInTouch}</h2>
              
              <div className="space-y-6">
                {/* Main Branch */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 me-4">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-1">{dict.mainBranch}</h3>
                    <p className="text-muted mb-2">
                      <a href="https://maps.app.goo.gl/giHBmff5KziWUJGD7" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {dict.addressRiyadh}
                      </a>
                    </p>
                    <div className="flex items-center text-muted" dir="ltr">
                      <Phone size={16} className="me-2" />
                      <a href="tel:+966567236986" className="hover:text-primary transition-colors">+966 56 723 6986</a>
                    </div>
                  </div>
                </div>

                {/* Buraydah Branch */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 me-4">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-1">{dict.buraydahBranch}</h3>
                    <p className="text-muted mb-2">
                      <a href="https://maps.app.goo.gl/LMGdUFDHaXMCkMG29" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {dict.addressBuraydah}
                      </a>
                    </p>
                    <div className="flex items-center text-muted" dir="ltr">
                      <Phone size={16} className="me-2" />
                      <a href="tel:+966566720955" className="hover:text-primary transition-colors">+966 56 672 0955</a>
                    </div>
                  </div>
                </div>

                {/* Shared Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 me-4">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-1">{dict.email}</h3>
                    <a href="mailto:info@albelbisy.com" className="text-muted hover:text-primary transition-colors">info@albelbisy.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] relative border border-gray-200 shadow-sm transition-all duration-300">
                <iframe 
                  src={`https://maps.google.com/maps?q=${mapCoordinates[activeMap]}&z=15&output=embed`}
                  className="absolute inset-0 w-full h-full border-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Branch Selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveMap("riyadh")}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeMap === "riyadh" 
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-dark"
                  }`}
                >
                  {dict.mainBranch}
                </button>
                <button
                  onClick={() => setActiveMap("buraydah")}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    activeMap === "buraydah" 
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-dark"
                  }`}
                >
                  {dict.buraydahBranch}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="bg-light py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Clock className="text-accent me-3" size={28} />
            <h2 className="font-serif text-2xl font-bold text-dark">{dict.workingHours}</h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {/* Riyadh Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 max-w-sm mx-auto w-full text-center">
              <h3 className="font-bold text-lg text-primary mb-3">{dict.mainBranch}</h3>
              <p className="text-dark font-medium mb-1">{dict.satToThu}</p>
              <p className="text-muted text-sm mb-3" dir="ltr">{dict.riyadhHours}</p>
              <p className="text-accent font-medium text-sm">{dict.fridayClosed}</p>
            </div>

            {/* Buraydah Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 max-w-sm mx-auto w-full text-center">
              <h3 className="font-bold text-lg text-primary mb-3">{dict.buraydahBranch}</h3>
              <p className="text-dark font-medium mb-1">{dict.satToThu}</p>
              <p className="text-muted text-sm mb-3" dir="ltr">{dict.buraydahHours}</p>
              <p className="text-accent font-medium text-sm">{dict.fridayClosed}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactClient({ dict, queryDict }: { dict: any, queryDict: any }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactContent dict={dict} queryDict={queryDict} />
    </Suspense>
  );
}
