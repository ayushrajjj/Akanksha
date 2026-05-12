"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Share basic details",
    text: "Begin with the short consultation form so Akanksha understands your requirement and contact preference.",
  },
  {
    title: "Complete detailed assessment",
    text: "Add health, food, and lifestyle details to help shape a better recommendation.",
  },
  {
    title: "Review and planning",
    text: "Akanksha reviews your health, lifestyle, and food preferences before preparing your plan.",
  },
  {
    title: "Receive your personalized plan",
    text: "You receive a practical diet plan and guidance that is easier to follow consistently.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell section-pad">
      <SectionHeading
        eyebrow="Process"
        title="How It Works"
        description="A simple four-step journey that keeps the consultation easy to understand."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-card relative rounded-[1.7rem] p-5 shadow-soft"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 text-sm font-semibold text-white shadow-soft">
                0{index + 1}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-sage-200 to-transparent" />
            </div>
            <h3 className="text-lg font-semibold text-forest-900">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-forest-700/85">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
