"use client"

import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export function Closing() {
  return (
    <section
      id="closing"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-3xl flex-col items-center"
      >
        <h2
          className="text-gradient-silver text-pretty text-4xl font-bold leading-[1.08] sm:text-6xl md:text-7xl"
          style={{ letterSpacing: "-2px" }}
        >
          A universe of possibilities —
          <br className="hidden sm:block" /> already in motion.
        </h2>

        <p className="mt-7 max-w-[640px] text-balance text-base leading-relaxed text-white/50 md:text-lg">
          Our system architecture is a complete, fluid ecosystem engineered to integrate flawlessly with your ongoing
          creative production pipelines.
        </p>

        <motion.a
          href="tel:9474603635"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              "0 0 30px 0px rgba(139,92,246,0.35)",
              "0 0 55px 6px rgba(34,211,238,0.35)",
              "0 0 30px 0px rgba(139,92,246,0.35)",
            ],
          }}
          transition={{ boxShadow: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }}
          className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black md:text-base"
        >
          Initiate Deployment
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </motion.div>

      <footer className="absolute bottom-6 left-0 right-0 px-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} textura.eu — Built at the intersection of data, design & intelligence.
      </footer>
    </section>
  )
}
