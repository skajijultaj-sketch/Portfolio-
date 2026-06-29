"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* ---------------------------------------------------------------- */
/* Shared scroll progress (0 = top, 1 = bottom of document)          */
/* Updated outside React's render loop for zero re-render overhead.   */
/* ---------------------------------------------------------------- */
const scroll = { progress: 0, pointerX: 0, pointerY: 0 }

if (typeof window !== "undefined") {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scroll.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update, { passive: true })
  window.addEventListener(
    "pointermove",
    (e) => {
      scroll.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      scroll.pointerY = (e.clientY / window.innerHeight) * 2 - 1
    },
    { passive: true },
  )
  update()
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function Particles({ count, isMobile }: { count: number; isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Precompute the two target shapes + colors once.
  const { galaxy, helix, colors, current } = useMemo(() => {
    const galaxy = new Float32Array(count * 3)
    const helix = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const current = new Float32Array(count * 3)

    const insideColor = new THREE.Color("#ff7a3d") // hot orange core
    const cyan = new THREE.Color("#22d3ee")
    const purple = new THREE.Color("#a855f7")

    const branches = 5
    const galaxyRadius = 9
    const spin = 1.1

    const helixRadius = 2.2
    const helixHeight = 18
    const turns = 5

    const c = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      /* ---------- Galaxy (flat spiral disk) ---------- */
      const r = Math.pow(Math.random(), 1.6) * galaxyRadius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = r * spin
      const rand = () => (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.18 + 0.2))

      galaxy[i3] = Math.cos(branchAngle + spinAngle) * r + rand()
      galaxy[i3 + 1] = rand() * 0.6
      galaxy[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand()

      /* ---------- DNA double helix ---------- */
      const u = i / count
      const strand = i % 3 // 0,1 = strands, 2 = base-pair rungs
      const angle = u * turns * Math.PI * 2
      const y = u * helixHeight - helixHeight / 2
      if (strand === 2) {
        // rung: interpolate across the two strands
        const t = Math.random()
        const a1 = angle
        const a2 = angle + Math.PI
        helix[i3] = THREE.MathUtils.lerp(Math.cos(a1), Math.cos(a2), t) * helixRadius
        helix[i3 + 1] = y
        helix[i3 + 2] = THREE.MathUtils.lerp(Math.sin(a1), Math.sin(a2), t) * helixRadius
      } else {
        const phase = strand === 0 ? 0 : Math.PI
        helix[i3] = Math.cos(angle + phase) * helixRadius
        helix[i3 + 1] = y
        helix[i3 + 2] = Math.sin(angle + phase) * helixRadius
      }

      /* ---------- Color: orange core -> cyan/purple edges ---------- */
      const mixOuter = Math.random() < 0.5 ? cyan : purple
      c.copy(insideColor).lerp(mixOuter, Math.min(1, r / galaxyRadius + Math.random() * 0.2))
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b

      // start in galaxy formation
      current[i3] = galaxy[i3]
      current[i3 + 1] = galaxy[i3 + 1]
      current[i3 + 2] = galaxy[i3 + 2]
    }

    return { galaxy, helix, colors, current }
  }, [count])

  useFrame((state, delta) => {
    const points = pointsRef.current
    const group = groupRef.current
    if (!points || !group) return

    // morph: 0 at top -> 1 fully DNA by ~30% scroll
    const morph = smoothstep(0.02, 0.3, scroll.progress)
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    // Lerp toward the blended target. Cheap and stutter-free.
    const lerpSpeed = Math.min(1, delta * 4)
    for (let i = 0; i < arr.length; i++) {
      const target = galaxy[i] + (helix[i] - galaxy[i]) * morph
      arr[i] += (target - arr[i]) * lerpSpeed
    }
    posAttr.needsUpdate = true

    // Continuous Y rotation; gentle while galaxy, steady as helix
    group.rotation.y += delta * (0.12 + morph * 0.25)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, morph * -0.15, lerpSpeed)

    // Float helix to the side on desktop as content scrolls in; stay centered on mobile
    const sideShift = isMobile ? 0 : smoothstep(0.32, 0.6, scroll.progress) * 4.5
    const targetX = sideShift + scroll.pointerX * 0.4
    const targetY = -scroll.progress * 1.5 + scroll.pointerY * -0.25
    group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, lerpSpeed)
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, lerpSpeed)

    // Grow particles a touch as they coalesce into the helix
    if (materialRef.current) {
      const size = (isMobile ? 0.05 : 0.045) + morph * 0.03
      materialRef.current.size = size
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[current, 3]} count={count} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.05}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function GalaxyDnaScene() {
  // Lower particle counts + capped DPR keep mobile GPUs smooth.
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const count = isMobile ? 4500 : 9000

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 60 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Particles count={count} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
