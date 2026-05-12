"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

export function AboutSection() {
  return (
    <section id="about" className="section-shell section-pad">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Meet Akanksha"
            description="Akanksha is a freelance diet consultant with a B.Sc. in Dietetics & Nutrition from Amity University Gurgaon. She has guided 5+ clients with practical, personalized diet consultation and helps people build realistic eating habits based on their lifestyle, food preferences, health background, and fitness goals."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55 }}
          className="glass-card relative overflow-hidden rounded-[2rem] border border-sage-100 p-6 shadow-soft"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,181,146,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(160,190,150,0.18),transparent_34%)]" />
          <div className="relative grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="flex aspect-square items-center justify-center rounded-[1.7rem] border border-dashed border-sage-200 bg-white/70 p-6">
              <div className="text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(95,139,103,0.18),rgba(248,181,146,0.24))] shadow-soft">
                  <div className="h-20 w-20 rounded-full border border-white/70 bg-[radial-gradient(circle_at_35%_35%,#ffffff,#d6e5cb_62%,#a4c08e)]" />
                </div>
                <p className="mt-4 text-sm font-semibold text-forest-800">Profile placeholder</p>
                <p className="mt-1 text-xs leading-5 text-forest-700/80">
                  Add a real photo later if desired. This layout is ready without one.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white/75 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">
                  Approach
                </p>
                <p className="mt-2 text-base leading-7 text-forest-700">
                  Warm, professional, and beginner-friendly guidance designed to fit real daily
                  routines instead of forcing generic diet charts.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Practical meal planning",
                  "Lifestyle and routine fit",
                  "Food preference aware",
                  "Goal-led guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-sage-100 bg-white/70 px-4 py-3 text-sm font-medium text-forest-800 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
