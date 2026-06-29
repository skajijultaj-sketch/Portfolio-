"use client"

import { useEffect, useState } from "react"
import { Phone, Menu, X } from "lucide-react"

const LINKS = [
  { label: "Achievements", href: "#achievements" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#services" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass" : "bg-white/[0.02] backdrop-blur-md"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 text-sm font-bold tracking-tight sm:text-base">
          <span className="text-gradient-silver">Sekh Anorul Haque</span>
          <span className="rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-cyan">
            SAH
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919474603635"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-accent-cyan/40 hover:bg-white/10 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            +91 9474603635
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-20 z-50 flex flex-col gap-1 rounded-2xl glass p-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+919474603635"
            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-base font-semibold text-black"
          >
            <Phone className="h-4 w-4" />
            +91 9474603635
          </a>
        </div>
      )}
    </header>
  )
}
