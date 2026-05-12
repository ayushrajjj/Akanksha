"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";

const cards = [
  {
    title: "5+ Clients Guided",
    text: "Early client experience with personal attention and thoughtful follow-up.",
  },
  {
    title: "1:1 Diet Consultation",
    text: "Each plan is shaped around the person's goals, routine, and food habits.",
  },
  {
    title: "Goal-Based Planning",
    text: "Recommendations are made to support realistic, steady progress.",
  },
];

export function ExperienceSection() {
  return (
    <section className="section-shell section-pad">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Experience"
            title="Early Experience, Personal Attention"
            description="With 5+ clients guided, Akanksha focuses on giving each person personal attention instead of generic diet charts. Every recommendation is planned around the client’s goals, food habits, preferences, and lifestyle."
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass-card card-lift rounded-[1.75rem] p-5 shadow-soft"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,rgba(95,139,103,0.16),rgba(248,181,146,0.2))]" />
              <h3 className="text-lg font-semibold text-forest-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-forest-700/85">{card.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
