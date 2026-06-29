"use client"

import { motion } from "motion/react"
import { Phone, ArrowDown, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
        Sekh Anorul Haque
        <span className="text-white/30">·</span>
        <span className="text-gradient-aurora font-semibold">SAH</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
        style={{ letterSpacing: "-2px" }}
      >
        <span className="text-gradient-silver">Building the Digital</span>
        <br />
        <span className="text-gradient-aurora">Future via Code &amp; AI.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-[620px] text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
      >
        Full-stack developer, designer, and creative technologist crafting scalable apps,
        high-retention thumbnails, and viral visuals — where engineering meets intelligence.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href="tel:+919474603635"
          className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:w-auto animate-pulse-glow"
        >
          <Phone className="h-4 w-4" />
          +91 9474603635
        </a>
        <a
          href="#services"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] sm:w-auto"
        >
          View services
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  )
}
