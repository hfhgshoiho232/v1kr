import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { inventoryData } from "@/lib/inventory-data"

interface PartPageProps {
  params: {
    manufacturer: string
    part: string
  }
}

export default function PartPage({ params }: PartPageProps) {
  const part = inventoryData.find(
    (p) =>
      p.manufacturer.toLowerCase() === params.manufacturer.toLowerCase() &&
      p.partNumber.toLowerCase().replace(/\s+/g, "-") === params.part,
  )

  if (!part) {
    notFound()
  }

  return (
    <div>
      <div className="relative h-[300px] bg-gray-900">
        <Image src="/placeholder.svg" alt={part.partNumber} fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white container mx-auto px-4">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="before:content-['>'] before:mx-2">
                <Link href="/inventory">Inventory</Link>
              </li>
              <li className="before:content-['>'] before:mx-2">
                <Link href={`/inventory/${params.manufacturer}`}>{params.manufacturer.toUpperCase()}</Link>
              </li>
              <li className="before:content-['>'] before:mx-2">{part.partNumber}</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold">Part Details: {part.partNumber}</h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Part Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-semibold">Part Number</dt>
                    <dd>{part.partNumber}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Manufacturer</dt>
                    <dd>{part.manufacturer}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Status</dt>
                    <dd>{part.status}</dd>
                  </div>
                  {part.description && (
                    <div>
                      <dt className="font-semibold">Description</dt>
                      <dd>{part.description}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {part.specifications && (
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    {part.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {part.features && (
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    {part.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/request-quote">Request a Quote</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/inventory/${params.manufacturer}`}>Back to Inventory</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

