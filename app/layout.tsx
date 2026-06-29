import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "Sekh Anorul Haque (SAH) — Building the Digital Future via Code & AI",
  description:
    "Portfolio of Sekh Anorul Haque (SAH). Full-stack web & app development, high-CTR thumbnail design, and viral poster design — engineered with code and AI.",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${jakarta.variable} font-sans antialiased bg-background text-foreground`}>{children}</body>
    </html>
  )
}
