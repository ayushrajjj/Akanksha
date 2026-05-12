"use client";

import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/consultation";

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

export function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(whatsappNumber, buildGeneralWhatsAppMessage());

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-forest-800 focus-ring"
      aria-label="Chat on WhatsApp"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-sage-300" />
      WhatsApp
    </a>
  );
}
