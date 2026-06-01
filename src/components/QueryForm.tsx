"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { categories } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const mainstreamCountries = [
  { name: "Saudi Arabia", code: "+966", iso: "sa" },
  { name: "United Arab Emirates", code: "+971", iso: "ae" },
  { name: "Kuwait", code: "+965", iso: "kw" },
  { name: "Qatar", code: "+974", iso: "qa" },
  { name: "Bahrain", code: "+973", iso: "bh" },
  { name: "Oman", code: "+968", iso: "om" },
  { name: "Egypt", code: "+20", iso: "eg" },
  { name: "United Kingdom", code: "+44", iso: "gb" },
  { name: "United States", code: "+1", iso: "us" },
];

export default function QueryForm({ dict }: { dict?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCode, setSelectedCode] = useState("+966");
  const [customCode, setCustomCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("");

  const d = dict || {
    name: "Full Name",
    namePlaceholder: "John Doe",
    email: "Email Address",
    emailPlaceholder: "john@example.com",
    company: "Company Name",
    companyPlaceholder: "Acme Corp",
    phone: "Phone Number",
    phonePlaceholder: "50 123 4567",
    interest: "Product of Interest",
    selectCategory: "Select a category",
    other: "Other",
    message: "Message / Specifications",
    messagePlaceholder: "Tell us about your requirements...",
    submit: "Send Enquiry →",
    sending: "Sending...",
    successTitle: "Thank you!",
    successMsg: "We'll be in touch within 24 hours.",
    errorMsg: "Something went wrong. Please try again or WhatsApp us directly.",
    otherCountry: "Other (Custom)",
  };

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, [e.target.name]: e.target.validationMessage }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => { const next = { ...prev }; delete next[e.target.name]; return next; });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const response = await fetch("/api/submit-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-dark mb-2">{d.successTitle}</h3>
        <p className="text-muted">{d.successMsg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
          <AlertCircle className="me-3 shrink-0" size={20} />
          <p className="text-sm">{d.errorMsg}</p>
        </div>
      )}

      {/* Honeypot field */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">{d.name} *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            maxLength={100}
            onInvalid={handleInvalid}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow`} 
            placeholder={d.namePlaceholder}
          />
          {errors.name && <p className="text-red-500/70 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark mb-2">{d.company} *</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            required
            onInvalid={handleInvalid}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.company ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow`} 
            placeholder={d.companyPlaceholder}
          />
          {errors.company && <p className="text-red-500/70 text-xs mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">{d.email} *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            onInvalid={handleInvalid}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow`} 
            placeholder={d.emailPlaceholder}
          />
          {errors.email && <p className="text-red-500/70 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">{d.phone} *</label>
          <div className="flex relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-3 h-full ${selectedCode === "other" ? "rounded-none rounded-s-lg" : "rounded-s-lg"} border rtl:border-l-0 ltr:border-r-0 border-gray-200 bg-gray-50 focus:outline-none text-dark w-[120px] text-sm`}
              >
                {selectedCode === "other" ? (
                  <span>🌍 {d.other}</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/w20/${mainstreamCountries.find(c => c.code === selectedCode)?.iso}.png`} 
                      alt="" 
                      className="w-5 h-auto rounded-sm object-cover"
                    />
                    <span dir="ltr">{selectedCode}</span>
                  </div>
                )}
                <motion.svg
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ms-auto shrink-0"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </button>
              
              {/* Overlay */}
              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
              
              {/* Dropdown menu - always mounted, animated via style */}
              <motion.div 
                initial={false}
                animate={isDropdownOpen 
                  ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const } 
                  : { opacity: 0, y: -8, scale: 0.96, pointerEvents: "none" as const }
                }
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full start-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto origin-top-start"
              >
                {mainstreamCountries.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSelectedCode(c.code);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-start text-sm text-dark transition-colors"
                  >
                    <img 
                      src={`https://flagcdn.com/w20/${c.iso}.png`} 
                      alt={c.name} 
                      className="w-5 h-auto rounded-sm object-cover shadow-sm"
                    />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-gray-400 ms-auto" dir="ltr">{c.code}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCode("other");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-start text-sm text-dark border-t border-gray-100 transition-colors"
                >
                  <span className="text-lg">🌍</span>
                  <span className="font-medium">{d.otherCountry}</span>
                </button>
              </motion.div>
            </div>
            
            {/* hidden input for form submission */}
            <input type="hidden" name="countryCode" value={selectedCode === "other" ? customCode : selectedCode} />
            
            {selectedCode === "other" && (
              <input 
                type="text" 
                placeholder="+00"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="w-16 px-2 py-3 border rtl:border-l-0 ltr:border-r-0 ltr:border-l-gray-300 rtl:border-r-gray-300 border-gray-200 bg-white focus:outline-none text-sm text-center"
                required
                dir="ltr"
              />
            )}
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
              onInvalid={handleInvalid}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-e-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow`} 
              placeholder={d.phonePlaceholder}
              dir="ltr"
            />
          </div>
          {errors.phone && <p className="text-red-500/70 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2 relative">
          <label htmlFor="interest" className="block text-sm font-medium text-dark mb-2">{d.interest}</label>
          <input type="hidden" name="interest" value={selectedInterest} />
          <button
            type="button"
            onClick={() => setIsInterestOpen(!isInterestOpen)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-start text-sm flex items-center justify-between"
          >
            <span className={selectedInterest ? "text-dark" : "text-gray-400"}>
              {selectedInterest || d.selectCategory}
            </span>
            <motion.svg
              animate={{ rotate: isInterestOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </button>

          {/* Overlay */}
          {isInterestOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsInterestOpen(false)}
            />
          )}

          {/* Animated dropdown */}
          <motion.div
            initial={false}
            animate={isInterestOpen
              ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const }
              : { opacity: 0, y: -8, scale: 0.96, pointerEvents: "none" as const }
            }
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full start-0 end-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto origin-top"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedInterest(c.name);
                  setIsInterestOpen(false);
                }}
                className={`w-full px-4 py-3 text-start text-sm transition-colors ${
                  selectedInterest === c.name 
                    ? "bg-gray-50 text-[#1B2D6B] font-semibold" 
                    : "text-dark hover:bg-gray-50"
                }`}
              >
                {c.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedInterest(d.other);
                setIsInterestOpen(false);
              }}
              className={`w-full px-4 py-3 text-start text-sm border-t border-gray-100 transition-colors ${
                selectedInterest === d.other 
                  ? "bg-gray-50 text-[#1B2D6B] font-semibold" 
                  : "text-dark hover:bg-gray-50"
              }`}
            >
              {d.other}
            </button>
          </motion.div>

        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">{d.message}</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" 
            placeholder={d.messagePlaceholder}
          ></textarea>
        </div>
      </div>

      <div className="mt-8">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-4 rounded-full font-bold text-lg hover:bg-accent/90 transition-colors flex items-center justify-center disabled:opacity-70 rtl:flex-row-reverse"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin me-2" size={24} />
              {d.sending}
            </>
          ) : (
            d.submit
          )}
        </button>
      </div>
    </form>
  );
}
