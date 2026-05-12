"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";
import type { PlanDuration } from "@/lib/consultation";

const plans: Array<{
  title: PlanDuration;
  description: string;
}> = [
  {
    title: "1 Month",
    description: "Best for getting started, short-term guidance, and habit reset",
  },
  {
    title: "3 Months",
    description: "Best for consistent progress and routine building",
  },
  {
    title: "6 Months",
    description: "Best for long-term lifestyle change and deeper habit correction",
  },
];

interface PlansSectionProps {
  selectedDuration?: PlanDuration | null;
  onSelectPlan: (plan: PlanDuration) => void;
}

export function PlansSection({ selectedDuration, onSelectPlan }: PlansSectionProps) {
  return (
    <section id="plans" className="section-shell section-pad">
      <SectionHeading
        eyebrow="Plans"
        title="Choose the consultation duration"
        description="Pick a plan length that matches your current goal. Pricing is intentionally omitted until you decide the final offer structure."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid gap-5 md:grid-cols-3"
      >
        {plans.map((plan) => {
          const active = selectedDuration === plan.title;
          return (
            <div
              key={plan.title}
              className={`card-lift rounded-[1.8rem] border p-6 shadow-soft ${
                active
                  ? "border-sage-300 bg-white/88"
                  : "border-sage-100 bg-white/72 glass-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">
                    Consultation plan
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-forest-900">{plan.title}</h3>
                </div>
                {active ? (
                  <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-900">
                    Selected
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-forest-700/85">{plan.description}</p>

              <ul className="mt-5 space-y-3 text-sm text-forest-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-sage-500" />
                  Personalized support around your chosen duration
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-sage-500" />
                  Practical guidance aligned with your goals and routine
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onSelectPlan(plan.title)}
                className="mt-6 w-full rounded-full bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-forest-800 focus-ring"
              >
                Select this plan
              </button>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
