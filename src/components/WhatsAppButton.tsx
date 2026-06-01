"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+966567236986";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -inset-2 rounded-full border-2 border-[#25D366] opacity-0 animate-ping group-hover:opacity-100"></span>
    </a>
  );
}
