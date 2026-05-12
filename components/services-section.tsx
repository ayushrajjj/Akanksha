"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";

const services = [
  "Weight management",
  "Personalized diet plans",
  "Fitness and gym nutrition",
  "Vegetarian and non-vegetarian diet guidance",
  "Lifestyle nutrition",
  "Goal-based meal planning",
  "Medical-condition-aware planning",
];

export function ServicesSection() {
  return (
    <section id="services" className="section-shell section-pad">
      <SectionHeading
        eyebrow="Services"
        title="Diet guidance built around real life"
        description="A simple service set that stays practical, supportive, and adjustable to different goals."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {services.map((service) => (
          <div key={service} className="glass-card card-lift rounded-[1.7rem] p-5 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-11 w-11 shrink-0 rounded-2xl bg-[linear-gradient(135deg,rgba(95,139,103,0.18),rgba(255,255,255,0.9))] shadow-sm" />
              <div>
                <h3 className="text-base font-semibold text-forest-900">{service}</h3>
                {service === "Medical-condition-aware planning" ? (
                  <p className="mt-2 text-sm leading-6 text-forest-700/80">
                    This consultation supports wellness guidance and does not replace a doctor's
                    advice or treatment plan.
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-forest-700/80">
                    Structured, realistic guidance with room for your food preferences and routine.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
