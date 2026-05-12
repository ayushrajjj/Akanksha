"use client";

import { SectionHeading } from "./section-heading";
import { motion } from "framer-motion";

interface ContactSectionProps {
  whatsappUrl: string;
}

export function ContactSection({ whatsappUrl }: ContactSectionProps) {
  return (
    <section id="contact" className="section-shell section-pad">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Start your diet consultation today"
            description="Reach out through WhatsApp or submit the consultation form. Akanksha works with online clients."
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-card card-lift rounded-[1.7rem] p-5 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">
                WhatsApp
              </p>
              <p className="mt-2 text-lg font-semibold text-forest-900">Chat instantly</p>
              <p className="mt-2 text-sm leading-6 text-forest-700/85">
                Use WhatsApp for quick consultation follow-up and basic questions.
              </p>
            </a>

            <div className="glass-card rounded-[1.7rem] p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">
                Email
              </p>
              <p className="mt-2 text-lg font-semibold text-forest-900">Email can be added here</p>
              <p className="mt-2 text-sm leading-6 text-forest-700/85">
                If you want email support later, update this line without changing the form flow.
              </p>
            </div>

            <div className="glass-card rounded-[1.7rem] p-5 shadow-soft sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">
                Location
              </p>
              <p className="mt-2 text-lg font-semibold text-forest-900">Available for online consultations</p>
              <p className="mt-2 text-sm leading-6 text-forest-700/85">
                Sessions are designed for remote clients and work well across locations.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-[2rem] p-6 shadow-soft"
        >
          <div className="rounded-[1.6rem] border border-sage-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(240,246,236,0.96))] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage-700">
              Simple next step
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-forest-900">
              Keep the consultation calm, clear, and personal.
            </p>
            <p className="mt-4 text-sm leading-7 text-forest-700/85">
              Akanksha Nutrition is built to help visitors understand the consultation process and
              move into the form without friction.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-forest-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-800 focus-ring"
            >
              Start your diet consultation today
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
