import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import QuoteRequestForm from "@/components/quote-request-form"

export default function RequestQuotePage() {
  return (
    <div>
      <div className="relative h-[300px] bg-gray-900">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WcKxastdU3elxwXXkMyNsMwX4fNtfw.png"
          alt="Request a Quote"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white container mx-auto px-4">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="before:content-['>'] before:mx-2">Request a Quote</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold">Request a Quote</h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <QuoteRequestForm />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+919625168205</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>sales@krinternational.in</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-6">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>PiyushCity Bhiwadi</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

