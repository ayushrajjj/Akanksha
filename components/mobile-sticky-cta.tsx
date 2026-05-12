"use client";

import { useEffect, useState } from "react";

interface MobileStickyCtaProps {
  onStartConsultation: () => void;
}

export function MobileStickyCta({ onStartConsultation }: MobileStickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 md:hidden transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onStartConsultation}
        className="rounded-full bg-forest-900 px-5 py-3.5 text-sm font-semibold text-white shadow-soft focus-ring"
      >
        Start Consultation
      </button>
    </div>
  );
}
