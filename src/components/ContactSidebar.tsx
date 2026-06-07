"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, MessageCircle, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSidebar({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      const sentinel = document.getElementById("hero-bottom");
      if (sentinel) {
        // sentinel.getBoundingClientRect().top = the hero's bottom edge in viewport coords
        // Button sits 80px from the viewport bottom (bottom-6=24px + h-14=56px)
        const heroBottomInViewport = sentinel.getBoundingClientRect().top;
        const buttonTopInViewport = window.innerHeight - 80;
        setScrolledPastHero(heroBottomInViewport < buttonTopInViewport);
      } else {
        // No hero on this page (e.g. About, Contact) — always blue
        setScrolledPastHero(true);
      }
    };

    // Run on mount (with a small delay to ensure DOM is ready)
    requestAnimationFrame(checkPosition);

    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);
  const riyadhPhone = "+966567236986";
  const buraydahPhone = "+966566720955";
  const whatsappUrl = `https://wa.me/${riyadhPhone.replace(/[^0-9]/g, "")}`;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 end-0 h-full w-[340px] max-w-[90vw] bg-dark text-white z-[70] shadow-2xl flex flex-col overflow-y-auto"
            style={{ right: 0 }} // Fallback for logical property issues with Framer Motion x translation
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold/30">
              <h2 className="font-serif text-xl font-bold text-gold">{dict.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col gap-8">

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-xl p-4 transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <p className="font-bold text-sm">{dict.chatOnWhatsapp}</p>
                  <p className="text-xs text-white/80">{dict.quickResponse}</p>
                </div>
              </a>

              {/* Email */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">{dict.email}</h3>
                <a
                  href="mailto:info@albelbisy.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-accent" />
                  </div>
                  <span className="text-sm">info@albelbisy.com</span>
                </a>
              </div>

              {/* Riyadh Branch */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">{dict.mainBranchRiyadh}</h3>
                <div className="space-y-3">
                  <a
                    href="https://maps.app.goo.gl/giHBmff5KziWUJGD7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={16} className="text-accent" />
                    </div>
                    <span className="text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: dict.riyadhAddress?.replace('،', '،<br />').replace(',', ',<br />') || ''}}></span>
                  </a>
                  <a
                    href={`tel:${riyadhPhone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-accent" />
                    </div>
                    <span className="text-sm" dir="ltr">+966 56 723 6986</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-accent" />
                    </div>
                    <div className="text-sm leading-relaxed">
                      <p>{dict.riyadhHours}</p>
                      <p className="text-accent text-xs">{dict.fridayClosed}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buraydah Branch */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">{dict.buraydahBranch}</h3>
                <div className="space-y-3">
                  <a
                    href="https://maps.app.goo.gl/LMGdUFDHaXMCkMG29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={16} className="text-accent" />
                    </div>
                    <span className="text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: dict.buraydahAddress?.replace('،', '،<br />').replace(',', ',<br />') || ''}}></span>
                  </a>
                  <a
                    href={`tel:${buraydahPhone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-accent" />
                    </div>
                    <span className="text-sm" dir="ltr">+966 56 672 0955</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-accent" />
                    </div>
                    <div className="text-sm leading-relaxed">
                      <p>{dict.buraydahHours}</p>
                      <p className="text-accent text-xs">{dict.fridayClosed}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gold/30 text-center">
              <p className="text-xs text-muted">Omar Khattab AlBelbisy Trading Est.</p>
              <p className="text-xs text-muted mt-1">CR: 1010040351 | VAT: 311295543800003</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 end-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl ${
          isOpen
            ? "bg-white/20 text-white rotate-0"
            : scrolledPastHero
              ? "bg-[#1B2D6B] text-white shadow-[0_8px_25px_rgba(27,45,107,0.3)]"
              : "bg-white text-gold"
        }`}
        title="Contact us"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-7 w-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-7 w-7" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -inset-2 rounded-full border-2 border-primary opacity-0 animate-ping"></span>
        )}
      </button>
    </>
  );
}
