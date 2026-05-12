"use client";

import { motion } from "framer-motion";
import { Floating3DVisual } from "./floating-3d-visual";

interface HeroProps {
  onStartConsultation: () => void;
  whatsappUrl: string;
}

export function Hero({ onStartConsultation, whatsappUrl }: HeroProps) {
  return (
    <section id="top" className="section-shell pb-12 pt-10 sm:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-white/65 px-4 py-2 text-sm font-medium text-forest-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-sage-500" />
            Freelance diet consultation for Vapi and online clients
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-forest-900 sm:text-5xl lg:text-6xl">
            Personalized Diet Plans That Fit Your Lifestyle
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-forest-700/85 sm:text-lg">
            Consult with Akanksha, B.Sc. Dietetics & Nutrition from Amity University Gurgaon, for
            practical, personalized, and sustainable diet guidance for clients in Vapi and across
            India.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onStartConsultation}
              className="rounded-full bg-forest-900 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-forest-800 focus-ring"
            >
              Start Consultation
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-sage-200 bg-white/80 px-6 py-3.5 text-center text-sm font-semibold text-forest-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sage-300 hover:bg-white focus-ring"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-forest-700">
            {[
              "Lifestyle-based guidance",
              "Warm, beginner-friendly support",
              "Online consultations available",
              "Serving Vapi clients",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-sage-100 bg-white/60 px-4 py-2 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <Floating3DVisual />
      </div>
    </section>
  );
}
