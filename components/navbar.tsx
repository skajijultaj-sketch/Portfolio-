"use client"

import { motion } from "motion/react"
import { Phone } from "lucide-react"

const LINKS = [
  { label: "Showcase", active: true },
  { label: "Products", active: false },
  { label: "Solutions", active: false },
  { label: "Pricing", active: false },
  { label: "Documentation", active: false },
]

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        {/* Logo */}
        <a
          href="#hero"
          className="text-gradient-silver text-lg font-extrabold tracking-tight md:text-xl"
          style={{ letterSpacing: "-1px" }}
        >
          textura.eu
        </a>

        {/* Center links */}
        <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] px-2 py-1.5 backdrop-blur-md lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                link.active ? "text-white" : "text-white/45 hover:text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="tel:9474603635"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] md:px-5"
        >
          <Phone className="h-3.5 w-3.5 text-white/60 transition-colors group-hover:text-white" />
          Get in touch
        </a>
      </nav>
    </motion.header>
  )
}
