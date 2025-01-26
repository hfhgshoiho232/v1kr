"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import InventoryTable from "@/components/inventory-table"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface BrandDetails {
  name: string
  description: string
  fullDescription: string
  products: {
    id: number
    partNumber: string
    status: "In Stock" | "Available" | "Processing" | "Contact for Details"
    description?: string
    specifications?: string[]
    features?: string[]
  }[]
}

const mockProducts = [
  {
    id: 1,
    partNumber: "6ES7 315-2EH14-0AB0",
    status: "In Stock",
    description: "CPU 315-2 PN/DP - Advanced PLC for demanding applications",
    specifications: ["High processing speed", "Large memory capacity", "Integrated interfaces"],
    features: ["Robust design", "Efficient communication", "Easy integration"],
  },
  {
    id: 2,
    partNumber: "6ES7 214-1HG40-0XB0",
    status: "Available",
    description: "CPU 214-1 PN - Compact and versatile PLC",
    specifications: ["Cost-effective", "Easy to program", "Reliable operation"],
    features: ["Modular design", "Scalable for various applications", "Compact footprint"],
  },
  {
    id: 3,
    partNumber: "6ES7 417-4XT05-0AB0",
    status: "Processing",
    description: "CPU 417-4H - High-end PLC for complex automation",
    specifications: ["High performance", "Advanced functionalities", "Redundancy options"],
    features: ["Fault tolerance", "Enhanced security", "High availability"],
  },
  {
    id: 4,
    partNumber: "6ES5 454-4UA13",
    status: "Contact for Details",
    description: "IM 460-4H - Advanced interface module",
    specifications: ["Multiple interfaces", "Flexible communication", "Easy installation"],
    features: ["High data transfer rates", "Seamless integration", "Enhanced communication capabilities"],
  },
  {
    id: 5,
    partNumber: "6ES5 848-7NA22-0KL1",
    status: "In Stock",
    description: "CP 848-7 - Powerful communication processor",
    specifications: ["Fast communication", "High-performance processing", "Enhanced security"],
    features: ["Reliable operation", "Scalable for various applications", "Easy configuration"],
  },
  {
    id: 6,
    partNumber: "6ES7 953-8LJ20-0AA0",
    status: "Available",
    description: "FM 953 - Advanced function module",
    specifications: ["High-speed processing", "Multiple functionalities", "Easy configuration"],
    features: ["Modular design", "Scalable for various applications", "Compact footprint"],
  },
  {
    id: 7,
    partNumber: "6ES5 998-0MA12",
    status: "Processing",
    description: "PM 998 - High-end process module",
    specifications: ["Advanced functionalities", "High-precision control", "Enhanced communication"],
    features: ["Robust design", "Reliable operation", "Easy integration"],
  },
  {
    id: 8,
    partNumber: "6ES7 972-0BA12-0XA0",
    status: "Contact for Details",
    description: "DM 972 - Versatile data module",
    specifications: ["Flexible data management", "Easy configuration", "Reliable operation"],
    features: ["High data transfer rates", "Enhanced security", "Seamless integration"],
  },
]

function generateBrandDetails(slug: string): BrandDetails {
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return {
    name,
    description: `Industrial spares and equipment of ${name} - from trusted KR International reseller. To find out prices and delivery times, please fill out the feedback form or send a request to sales@krinternational.in`,
    fullDescription: `This is a much longer and more detailed description of the ${name} brand.  It includes information about their history, manufacturing processes, and commitment to quality.  This detailed description provides a comprehensive overview of the brand and its products, allowing customers to make informed purchasing decisions.  It also highlights key features and benefits of choosing ${name} products.`,
    products: mockProducts,
  }
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const brand = generateBrandDetails(params.slug)

  if (!brand) {
    notFound()
  }

  const handleReset = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400 select-none">&gt;</li>
            <li>
              <Link href="/catalogue" className="text-gray-600 hover:text-blue-600">
                Brands
              </Link>
            </li>
            <li className="text-gray-400 select-none">&gt;</li>
            <li className="text-gray-900">{brand.name}</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{brand.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{brand.description}</p>
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center text-gray-700">
              The site contains only a small part of the catalog items. If you have not found the article you need, send
              a request to{" "}
              <a href="mailto:sales@krinternational.in" className="text-blue-600 hover:underline">
                sales@krinternational.in
              </a>{" "}
              and we will definitely send you a commercial proposal.
            </p>
          </div>
          <div className="relative">
            <p className="text-gray-600 mb-4">{brand.fullDescription}</p>
            <Button variant="outline" className="mt-4">
              Show more
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="search"
              placeholder="Search By Part or Model Number"
              className="flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button>Search Brand's Products</Button>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Request Price Quote</h2>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Send us a request and we'll help you source the right product.
                </p>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="firstName">
                      First name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="firstName" required />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      E-mail <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="company">
                      Your company <span className="text-red-500">*</span>
                    </Label>
                    <Input id="company" required />
                  </div>

                  <div>
                    <Label htmlFor="questions">
                      Questions <span className="text-red-500">*</span>
                    </Label>
                    <Textarea id="questions" required />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      By filling out the form I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        terms
                      </Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Send Request
                  </Button>

                  <p className="text-sm text-gray-500">* - required fields</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <InventoryTable brand={brand.name} searchTerm={searchTerm} />
      </div>
    </div>
  )
}

