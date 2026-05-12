"use client";

import { motion } from "framer-motion";

const items = [
  "B.Sc. Dietetics & Nutrition",
  "Amity University Gurgaon",
  "5+ Clients Guided",
  "Personalized Diet Plans",
];

export function TrustCards() {
  return (
    <section className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5 }}
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {items.map((item) => (
          <div
            key={item}
            className="glass-card card-lift rounded-2xl px-5 py-4 text-center text-sm font-semibold text-forest-800 shadow-soft"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
