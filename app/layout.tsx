import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
})

export const metadata: Metadata = {
  title: "textura.eu — Technology that redefines interaction",
  description:
    "We build systems at the intersection of data, design, and intelligence — where seemingly disconnected fundamentals come to life.",
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
