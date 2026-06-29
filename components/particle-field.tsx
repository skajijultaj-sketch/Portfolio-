"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  color: string
  size: number
}

const COLORS = [
  "rgba(34, 211, 238, ALPHA)", // neon cyan
  "rgba(139, 92, 246, ALPHA)", // neon violet
  "rgba(251, 146, 60, ALPHA)", // hot orange
]

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    // Build a high-density mesh of micro-dots
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = width < 768
    const count = reduceMotion ? 220 : isMobile ? 520 : 1100
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        z: Math.random() * 1 + 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 1.6 + 0.4,
      })
    }

    let raf = 0
    let t = 0

    const render = () => {
      t += 0.004
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = "lighter"

      const scroll = scrollRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // morph / twist driven by time + scroll
        const twist = scroll * 0.0012 * p.z
        const angle = (p.baseX + p.baseY) * 0.002 + t + twist
        const drift = reduceMotion ? 6 : 26
        const ox = Math.cos(angle) * drift * p.z
        const oy = Math.sin(angle * 1.3) * drift * p.z

        // subtle parallax from mouse
        const px = (mx - width / 2) * 0.01 * p.z
        const py = (my - height / 2) * 0.01 * p.z

        p.x = p.baseX + ox + px
        p.y = p.baseY + oy + py - scroll * 0.04 * p.z

        // wrap vertically for continuous field on scroll
        let drawY = p.y % height
        if (drawY < 0) drawY += height

        const alpha = 0.18 + 0.5 * Math.abs(Math.sin(angle * 0.8))
        ctx.beginPath()
        ctx.fillStyle = p.color.replace("ALPHA", alpha.toFixed(3))
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color.replace("ALPHA", "0.8")
        ctx.arc(p.x, drawY, p.size * p.z, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "source-over"
      raf = requestAnimationFrame(render)
    }
    render()

    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onResize = () => {
      setSize()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* depth vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}
