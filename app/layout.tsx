import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "KR International - Industrial Control Repairs & Parts",
  description:
    "Premier procurement company specializing in industrial control repairs and replacement parts for leading brands worldwide.  Serving Power Generation, Oil & Gas, Petrochemicals, and more.",
  keywords:
    "industrial control, repairs, replacement parts, automation, SIEMENS, ABB, ALLEN-BRADLEY, drives, controllers, sensors, PLCs, HMIs, industrial automation parts, obsolete controls support, industrial parts procurement",
  openGraph: {
    title: "KR International - Industrial Control Solutions",
    description: "Expert industrial control repairs and parts for global brands",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cTH7z0ChLslMnbx4me09CeLYv7OJBF.png",
        width: 1200,
        height: 630,
        alt: "KR International Industrial Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KR International - Industrial Control Solutions",
    description: "Expert industrial control repairs and parts for global brands",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cTH7z0ChLslMnbx4me09CeLYv7OJBF.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PCLYTgVTb5iQ0axxAmdxA0rY2aYUjm.png"
        />
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fo0cUSjzaZ3XeTILIoYYJRtUz49ulc.png"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness", // More specific type
            name: "KR International",
            url: "https://kr-international.com",
            logo: "https://kr-international.com/logo.png",
            description: "Premier procurement company specializing in industrial control repairs and replacement parts",
            address: {
              "@type": "PostalAddress",
              streetAddress: "PiyushCity Bhiwadi",
              addressLocality: "Bhiwadi",
              addressRegion: "Rajasthan",
              postalCode: "301019",
              addressCountry: "IN",
            },
            telephone: "+919625168205",
            email: "sales@krinternational.in", // Updated email
            sameAs: [
              // Added social media links (replace with your actual links)
              "https://www.facebook.com/yourcompany",
              "https://twitter.com/yourcompany",
              "https://www.linkedin.com/company/yourcompany",
            ],
          })}
        </script>
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

