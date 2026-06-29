"use client"

import { motion } from "motion/react"
import { ArrowRight, Phone } from "lucide-react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center md:px-8"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
        <motion.div
          variants={item}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]" />
          Systems built for tomorrow
        </motion.div>

        <motion.h1
          variants={item}
          className="text-gradient-silver max-w-4xl text-pretty text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          style={{ letterSpacing: "-2px" }}
        >
          Technology that redefines
          <br className="hidden sm:block" /> the nature of interaction.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-[620px] text-balance text-base leading-relaxed text-white/50 md:text-lg"
        >
          We build systems at the intersection of data, design, and intelligence — where seemingly disconnected
          fundamentals come to life.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.a
            href="#metrics"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_0_0_rgba(255,255,255,0.5)] transition-shadow duration-500 hover:shadow-[0_0_40px_4px_rgba(255,255,255,0.35)] sm:w-auto"
          >
            Our services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="tel:9474603635"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:text-white sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
