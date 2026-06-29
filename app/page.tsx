import { ParticleField } from "@/components/particle-field"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Metrics } from "@/components/metrics"
import { Closing } from "@/components/closing"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <ParticleField />
      <Navbar />
      <Hero />
      <Metrics />
      <Closing />
    </main>
  )
}
