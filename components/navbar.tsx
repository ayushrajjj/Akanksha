"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = [
  ["About", "#about"],
  ["Services", "#services"],
  ["How It Works", "#how-it-works"],
  ["Plans", "#plans"],
  ["Consultation Form", "#consultation"],
  ["Contact", "#contact"],
] as const;

interface NavbarProps {
  onStartConsultation: () => void;
}

export function Navbar({ onStartConsultation }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-100/70 bg-cream-50/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-forest-900 focus-ring rounded-full px-1 py-1"
        >
          Akanksha Nutrition
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-forest-700 transition hover:bg-sage-50 hover:text-forest-900 focus-ring"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={onStartConsultation}
            className="ml-2 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-forest-800 focus-ring"
          >
            Start Consultation
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-100 bg-white text-forest-900 shadow-sm lg:hidden focus-ring"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-sage-100 bg-cream-50 lg:hidden"
          >
            <div className="section-shell flex flex-col gap-2 py-3">
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-forest-700 transition hover:bg-sage-50 hover:text-forest-900 focus-ring"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onStartConsultation();
                }}
                className="mt-2 rounded-2xl bg-forest-900 px-4 py-3 text-sm font-semibold text-white focus-ring"
              >
                Start Consultation
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
