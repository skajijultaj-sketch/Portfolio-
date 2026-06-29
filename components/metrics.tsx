"use client"

import { motion } from "motion/react"

const cards = [
  {
    value: "3X",
    label: "increased customer interaction & cross-platform conversion rate.",
  },
  {
    value: "63%",
    label: "reduced infrastructure overhead & operational hosting costs.",
  },
]

export function Metrics() {
  return (
    <section
      id="metrics"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-24 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl text-center"
      >
        <h2
          className="text-gradient-silver text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-1px" }}
        >
          Measurable impact, by design.
        </h2>
        <p className="mt-4 text-balance text-white/50">
          Outcomes that compound across every layer of your product stack.
        </p>
      </motion.div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <motion.div
            key={card.value}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.985 }}
            className={`glass group relative overflow-hidden rounded-3xl p-8 md:p-10 ${
              i === 0 ? "md:mt-10" : ""
            }`}
          >
            {/* glow accent */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-accent-violet)]/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

            <span
              className="text-gradient-violet block text-7xl font-extrabold leading-none drop-shadow-[0_0_30px_rgba(139,92,246,0.45)] sm:text-8xl md:text-9xl"
              style={{ letterSpacing: "-3px" }}
            >
              {card.value}
            </span>
            <p className="mt-6 max-w-sm text-pretty text-base leading-relaxed text-white/65 md:text-lg">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
