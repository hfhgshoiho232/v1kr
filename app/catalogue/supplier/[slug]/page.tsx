import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download, Phone, Mail } from "lucide-react"

interface SupplierDetails {
  name: string
  logo: string
  description: string
  products: Product[]
  contact: {
    phone: string
    email: string
  }
  catalogueUrl?: string
}

interface Product {
  name: string
  description: string
  image: string
  categories: string[]
}

// This function will generate mock data for any supplier
function generateSupplierDetails(slug: string): SupplierDetails {
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return {
    name,
    logo: "/placeholder.svg",
    description: `Leading manufacturer of ${name.toLowerCase()} solutions for industrial applications.`,
    products: [
      {
        name: "Product 1",
        description: "High-performance industrial solution",
        image: "/placeholder.svg",
        categories: ["Category A", "Category B"],
      },
      {
        name: "Product 2",
        description: "Reliable industrial application",
        image: "/placeholder.svg",
        categories: ["Category B", "Category C"],
      },
      {
        name: "Product 3",
        description: "Advanced control system",
        image: "/placeholder.svg",
        categories: ["Category A", "Category C"],
      },
    ],
    contact: {
      phone: "+1 234 567 8900",
      email: `info@${slug.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`,
    },
    catalogueUrl: "#",
  }
}

export default function SupplierPage({ params }: { params: { slug: string } }) {
  const supplier = generateSupplierDetails(params.slug)

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
                Catalogue
              </Link>
            </li>
            <li className="text-gray-400 select-none">&gt;</li>
            <li className="text-gray-900">{supplier.name}</li>
          </ol>
        </nav>

        {/* Supplier Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-32 relative flex-shrink-0">
              <Image
                src="https://i.pinimg.com/736x/cd/94/96/cd9496ca72d92ff92ee298cca0fd69fe.jpg" // Updated image source
                alt={supplier.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{supplier.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{supplier.description}</p>
              <div className="flex flex-wrap gap-4">
                {supplier.catalogueUrl && (
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Catalogue
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="/request-quote" className="flex items-center gap-2">
                    Request Quote
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a href={`tel:${supplier.contact.phone}`} className="text-blue-600 hover:text-blue-800">
                    {supplier.contact.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Email</div>
                  <a href={`mailto:${supplier.contact.email}`} className="text-blue-600 hover:text-blue-800">
                    {supplier.contact.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supplier.products.map((product, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="aspect-[4/3] relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((category, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {category}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/request-quote" className="flex items-center justify-center">
                    Request Quote <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

