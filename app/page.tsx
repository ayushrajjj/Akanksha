"use client";

import { useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustCards } from "@/components/trust-cards";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ServicesSection } from "@/components/services-section";
import { HowItWorks } from "@/components/how-it-works";
import { PlansSection } from "@/components/plans-section";
import { ConsultationForm } from "@/components/consultation-form";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { PlanDuration } from "@/lib/consultation";

export default function HomePage() {
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration | null>(null);
  const consultationRef = useRef<HTMLDivElement | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919006344687";
  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi Akanksha, I am interested in a diet consultation.",
    )}`;
  }, [whatsappNumber]);

  function scrollToConsultation(plan?: PlanDuration) {
    if (plan) {
      setSelectedDuration(plan);
    }
    consultationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar onStartConsultation={() => scrollToConsultation()} />
      <main>
        <Hero onStartConsultation={() => scrollToConsultation()} whatsappUrl={whatsappUrl} />
        <TrustCards />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <HowItWorks />
        <PlansSection
          selectedDuration={selectedDuration}
          onSelectPlan={(plan) => scrollToConsultation(plan)}
        />
        <div ref={consultationRef}>
          <ConsultationForm
            selectedDuration={selectedDuration}
            whatsappNumber={whatsappNumber}
          />
        </div>
        <FAQSection />
        <ContactSection whatsappUrl={whatsappUrl} />
      </main>
      <Footer />
      <WhatsAppButton whatsappNumber={whatsappNumber} />
    </div>
  );
}
