"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is the diet plan personalized?",
    answer:
      "Yes. Every plan is designed around your goals, food preferences, health background, and daily routine.",
  },
  {
    question: "Can I get a vegetarian diet plan?",
    answer: "Yes. Vegetarian, non-vegetarian, and eggs-only preferences can all be handled.",
  },
  {
    question: "Do you work with online clients?",
    answer:
      "Yes. Akanksha offers online diet consultation for people who want a structured and personal nutrition review.",
  },
  {
    question: "Can I choose a 1-month, 3-month, or 6-month plan?",
    answer: "Yes. Those duration options are available in the consultation flow.",
  },
  {
    question: "Do I need to go to the gym?",
    answer:
      "No. Exercise guidance is adjusted to your lifestyle and comfort level rather than forced.",
  },
  {
    question: "How will I receive my plan?",
    answer:
      "The plan can be shared through your preferred contact method after the consultation is reviewed.",
  },
  {
    question: "Is this medical treatment?",
    answer:
      "This consultation is for wellness and nutrition guidance. It does not replace medical diagnosis, treatment, or advice from a doctor.",
  },
  {
    question: "Has Akanksha worked with clients before?",
    answer:
      "Yes. Akanksha has guided 5+ clients through personalized diet consultation. Her approach is focused on practical, lifestyle-based nutrition guidance rather than generic diet charts.",
  },
];

export function FAQSection() {
  return (
    <section className="section-shell section-pad">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Clear answers to help new visitors understand the consultation process."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-4"
      >
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="glass-card group rounded-[1.5rem] border border-sage-100 p-5 shadow-soft"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-forest-900">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-sage-700 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-forest-700/85">{faq.answer}</p>
          </details>
        ))}
      </motion.div>
    </section>
  );
}
