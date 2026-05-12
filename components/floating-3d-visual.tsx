"use client";

import { motion } from "framer-motion";

const orbitItems = [
  { label: "Personalized Plans", top: "10%", left: "8%" },
  { label: "Lifestyle Based", top: "4%", right: "10%" },
  { label: "Goal Focused", bottom: "15%", left: "5%" },
  { label: "5+ Clients Guided", bottom: "8%", right: "6%" },
];

export function Floating3DVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[620px] items-center justify-center py-6 lg:py-0">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78),rgba(214,227,210,0.18)_44%,transparent_75%)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-soft backdrop-blur-xl sm:p-8"
      >
        <div className="soft-grid absolute inset-0 rounded-[2rem] opacity-20" />
        <div className="relative aspect-[1.08] min-h-[420px] overflow-hidden rounded-[1.7rem] border border-sage-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(243,239,229,0.94))] p-4 shadow-depth sm:min-h-[520px] sm:p-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[52%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.98),rgba(224,235,217,0.95)_40%,rgba(154,179,146,0.95)_100%)] shadow-[0_35px_80px_rgba(59,90,63,0.18)] sm:h-[280px] sm:w-[280px]"
          />
          <div className="absolute left-1/2 top-[48%] h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/65 bg-white/20 shadow-[inset_0_12px_35px_rgba(255,255,255,0.35)] sm:h-[225px] sm:w-[225px]" />
          <div className="absolute left-1/2 top-[58%] h-[30px] w-[280px] -translate-x-1/2 rounded-full bg-forest-900/12 blur-2xl sm:w-[360px]" />

          <motion.div
            animate={{ rotate: [0, 2, 0], y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[18%] top-[26%] h-16 w-16 rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(248,219,198,0.95),rgba(255,255,255,0.95))] shadow-soft"
          >
            <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#f4c49d_65%,#e9a36e)]" />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -3, 0], y: [0, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[15%] top-[22%] h-14 w-14 rounded-full bg-[linear-gradient(135deg,rgba(190,219,182,0.95),rgba(255,255,255,0.92))] shadow-soft"
          >
            <div className="absolute left-1/2 top-2 h-8 w-1 -translate-x-1/2 rounded-full bg-sage-700/80" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[18%] right-[14%] h-12 w-12 rounded-[1.1rem] bg-[linear-gradient(135deg,rgba(235,202,171,0.95),rgba(255,255,255,0.92))] shadow-soft"
          />

          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[15%] h-10 w-16 rounded-full bg-[linear-gradient(135deg,rgba(223,235,213,0.95),rgba(255,255,255,0.92))] shadow-soft"
          />

          {orbitItems.map((item, index) => (
            <motion.div
              key={item.label}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5.4 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute"
              style={item}
            >
              <div className="glass-card shadow-depth rounded-2xl px-4 py-3 text-sm font-semibold text-forest-800">
                {item.label}
              </div>
            </motion.div>
          ))}

          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sage-700 shadow-soft"
          >
            Nutrition Flow
          </motion.div>

          <div className="absolute inset-x-6 bottom-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              "Balanced bowl",
              "Practical guidance",
              "Sustainable habits",
              "Warm support",
            ].map((label, index) => (
              <motion.div
                key={label}
                animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 5.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card rounded-2xl px-3 py-3 text-center text-xs font-medium text-forest-700 shadow-soft"
              >
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
