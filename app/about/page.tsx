import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Package, Truck, Search, Award, HeartHandshake } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lzFSccNau6aowCE5laxK3taI48nyG9.png"
          alt="KR International Facility"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/60">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About KR International</h1>
            <p className="text-xl max-w-3xl">
              Your premier procurement partner for Industrial, Chemical, Mechanical, Safety, Electronics and robotic
              automation requirements
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Commitment</h2>
            <p className="text-lg text-gray-600">
              At KR International, we pride ourselves on our unmatched product portfolio and exceptional sourcing
              capabilities. We are dedicated to providing your business with world-class service. Trust KR International
              to deliver the products you need, exactly when and where you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Top Brands</h3>
                <p className="text-gray-600">Curated inventory from trusted global manufacturers</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Endless Options</h3>
                <p className="text-gray-600">Over 750,000 products across various categories</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Exceptional Shipping</h3>
                <p className="text-gray-600">Reliable delivery when and where you need it</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Product Search</h3>
                <p className="text-gray-600">User-friendly website for quick product finding</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dependable Quality</h3>
                <p className="text-gray-600">Reliable, high-quality items for your business</p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartHandshake className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">World-Class Service</h3>
                <p className="text-gray-600">Dedicated to exceeding your expectations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About KR International Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">About KR International</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6">
                  KR International is a premier procurement company headquartered in Gurgaon, Haryana. Renowned for its
                  expertise in industrial supply, KR International has established itself as a trusted partner for
                  businesses across diverse sectors. With a commitment to providing comprehensive procurement solutions,
                  we cater to industries ranging from manufacturing and automation to electronics, power, and beyond.
                </p>
                <p>
                  Our team is dedicated to simplifying the sourcing process by offering a vast range of products,
                  streamlined logistics, and personalized service. By partnering with global manufacturers, KR
                  International ensures its customers have access to the highest quality products at competitive prices,
                  all under one roof.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Our Philosophy</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  At KR International, our "Customer First" philosophy guides everything we do. We prioritize
                  first-class quality, fair pricing, and exceptional service to build long-term partnerships with our
                  clients. Our goal is to enhance customer profitability while fostering mutual success through
                  collaborative efforts and tailored solutions.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">750,000 Parts, One Solution</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  KR International stands as your comprehensive procurement partner, offering an extensive range of over
                  750,000 products sourced from more than 8,000 globally recognized manufacturers. Our vast inventory
                  includes industrial controls, automation components, and specialized equipment. Whether you need a
                  single replacement part or complete system solutions, our experienced sales team is committed to
                  delivering reliable and competitive solutions that meet your requirements seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience our comprehensive range of industrial solutions and exceptional service.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" asChild>
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

