import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Download, Package, ShieldCheck, Truck } from "lucide-react"

interface ProductDetails {
  name: string
  brand: string
  partNumber: string
  category: string
  description: string
  price: number
  stock: number
  features: string[]
  specifications: { [key: string]: string }
  relatedProducts: string[]
}

// This function will generate mock data for any product
function generateProductDetails(brand: string, product: string): ProductDetails {
  const mockProducts = {
    siemens: {
      category: "PLC",
      partNumber: "6ES7314-1AG14-0AB0",
      name: "SIMATIC S7-300 CPU 314 CPU with MPI interface",
      price: 1299.99,
      stock: 50,
    },
    "allen-bradley": {
      category: "PLC",
      partNumber: "1756-L73",
      name: "ControlLogix 5570 Controller",
      price: 8495,
      stock: 25,
    },
    "abb-motor": {
      category: "Motor",
      partNumber: "3GAA082001-BDE",
      name: "ABB Industrial Motor",
      price: 2499.99,
      stock: 15,
    },
    "sanyo-denki": {
      category: "Motor",
      partNumber: "103-845-67S41",
      name: "Sanyo Denki Servo Motor",
      price: 1899.99,
      stock: 30,
    },
  }

  const defaultProduct = {
    category: "Industrial Component",
    partNumber: product.toUpperCase(),
    name: `${brand} Industrial Component`,
    price: 999.99,
    stock: 10,
  }

  const productKey = brand.toLowerCase()
  const productData = mockProducts[productKey] || defaultProduct

  return {
    ...productData,
    brand: brand
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    description: `High-quality ${productData.name} from ${brand}. Designed for industrial applications with superior performance and reliability.`,
    features: [
      "High efficiency",
      "Durable construction",
      "Easy installation",
      "Low maintenance",
      "Compliant with industry standards",
    ],
    specifications: {
      Category: productData.category,
      "Part Number": productData.partNumber,
      Dimensions: "10 x 15 x 5 cm",
      Weight: "500g",
      Power: "240V, 50/60Hz",
      Material: "Industrial Grade",
      Warranty: "2 years",
    },
    relatedProducts: ["R2AA06020FCH11M", "SGDV-2R8A01A002000", "SGMGH-09ACA61"],
  }
}

export default function ProductPage({ params }: { params: { slug: string; product: string } }) {
  const productDetails = generateProductDetails(params.slug, params.product)

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
            <li>
              <Link href={`/catalogue/${params.slug}`} className="text-gray-600 hover:text-blue-600">
                {productDetails.brand}
              </Link>
            </li>
            <li className="text-gray-400 select-none">&gt;</li>
            <li className="text-gray-900">{productDetails.partNumber}</li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image and Details */}
            <div className="space-y-6">
              {/* Brand and Part Number */}
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">{productDetails.brand}</h1>
                <p className="text-xl text-gray-600">P/N: {productDetails.partNumber}</p>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50 rounded-lg">
                <Image
                  src="https://i.pinimg.com/736x/cd/94/96/cd9496ca72d92ff92ee298cca0fd69fe.jpg"
                  alt={`${productDetails.brand} ${productDetails.partNumber}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product Name Below Image */}
              <div className="text-center">
                <p className="text-lg">{productDetails.name}</p>
              </div>
            </div>

            {/* Product Info and Actions */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {productDetails.category}
                </span>
              </div>

              {/* Price and Stock */}
              <div className="space-y-2">
                <div className="text-3xl font-bold">${productDetails.price.toLocaleString()}</div>
                <div className="text-gray-600">Stock: {productDetails.stock}</div>
              </div>

              {/* Description */}
              <p className="text-gray-600">{productDetails.description}</p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/request-quote">Request a Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Datasheet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(productDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                {productDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Package className="h-6 w-6 text-blue-600 mr-3" />
                <span>In stock - Ready to ship</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-6 w-6 text-blue-600 mr-3" />
                <span>Fast worldwide shipping</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 text-blue-600 mr-3" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h3 className="text-xl font-bold mb-6">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productDetails.relatedProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-4">
                    <Image
                      src="https://i.pinimg.com/736x/cd/94/96/cd9496ca72d92ff92ee298cca0fd69fe.jpg"
                      alt={product}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{product}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/catalogue/${params.slug}/${product.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="flex items-center"
                      >
                        Details <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

