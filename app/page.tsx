import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Shield, Cpu, Award, ArrowRight } from "lucide-react"
import LazyCompanyTicker from "@/components/lazy-company-ticker"
import IndustrySolutions from "@/components/industry-solutions"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cTH7z0ChLslMnbx4me09CeLYv7OJBF.png"
          alt="Industrial Control Systems"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/60">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6 leading-tight">
              Industrial Control Repairs and Replacement Parts for Leading Brands
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Specializing in obsolete controls support, offering expert repairs and high-quality spares for various
              industry systems.
            </p>
            <Link href="/request-quote">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold">
                REQUEST A QUOTE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Package, title: "Wide Inventory", description: "Extensive range of industrial control parts" },
              { icon: Shield, title: "2 Year Warranty", description: "Guaranteed quality with extended coverage" },
              { icon: Cpu, title: "Leading Tech", description: "Advanced solutions for control systems" },
              { icon: Award, title: "Top Brands", description: "Partnerships with industry leaders" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">KR International</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-6 text-lg text-gray-700 leading-relaxed">
              KR International assists users of industrial controls by maintaining systems through means of spares and
              repairs, whether current or obsolete. KR International aims to help operators reduce costs and avoid
              unnecessary upgrades by offering repairs for AC drive, DC drive, circuit board, invertors in addition to
              Industrial PC, CNC, CPU, PLC, VFD, HMI, and SMPS power supply repair services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We also provide remanufactured parts, but with the option of still offering new spares for brands like
              ABB, Alstom, Bailey, GE, Honeywell, Rustronic, Woodward, Triconex, and many more.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center mt-8 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <IndustrySolutions />
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Companies We Work With</h2>
          <LazyCompanyTicker />
        </div>
      </section>
    </div>
  )
}

