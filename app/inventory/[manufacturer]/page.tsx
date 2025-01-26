"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InventoryTable from "@/components/inventory-table"
import { manufacturers, manufacturerDescriptions, inventoryData } from "@/lib/inventory-data"

interface ManufacturerInfo {
  products: string[]
  services: string[]
  features: string[]
}

const manufacturerInfo: Record<string, ManufacturerInfo> = {
  SIEMENS: {
    products: [
      "Simatic S5 Systems",
      "PCS 7 Components",
      "TXP (T2000 and SP99-T3000) Teleperm",
      "FUM Controllers",
      "Simadyn D Systems",
      "Sinamics Drives",
    ],
    services: [
      "System Repairs",
      "Component Testing",
      "Warranty Support",
      "Asset Recovery",
      "Technical Consultation",
      "Upgrade Assistance",
    ],
    features: [
      "Full warranty on all parts",
      "Unused and remanufactured options",
      "Cash offers for unwanted systems",
      "Expert technical support",
      "Fast turnaround times",
      "Global shipping available",
    ],
  },
  // Add more manufacturers here...
}

const manufacturerLogos = {
  SIEMENS: "https://logolook.net/wp-content/uploads/2023/10/Color-Siemens-Logo.jpg",
  ABB: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1024px-ABB_logo.svg.png",
  Beckhoff: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Beckhoff_Logo.svg/1200px-Beckhoff_Logo.svg.png",
  Danfoss: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Danfoss-Logo.svg/1200px-Danfoss-Logo.svg.png",
  Fanuc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Fanuc_logo.svg/2560px-Fanuc_logo.svg.png",
  Keyence: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Keyence.svg/1280px-Keyence.svg.png",
  Leuze: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Leuze_logo_in_red.png",
  Mitsubishi: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mitsubishi_Electric_logo.png",
  Omron: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/OMRON_Logo.svg/800px-OMRON_Logo.svg.png",
  Polycab: "https://www.wirecable.in/wp-content/uploads/2023/09/polycab-logo.jpg",
  SMC: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Logo_SMC_Corporation.svg/2560px-Logo_SMC_Corporation.svg.png",
  Turck: "https://fidemar.com.uy/wp-content/uploads/2018/11/turck.png",
}

export default function ManufacturerPage({ params }: { params: { manufacturer: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedManufacturer, setSelectedManufacturer] = useState(params.manufacturer)
  const manufacturer = manufacturers.find((m) => m.toLowerCase() === selectedManufacturer.toLowerCase())

  if (!manufacturer) {
    notFound()
  }

  const info = manufacturerInfo[manufacturer] || manufacturerInfo.SIEMENS

  const handleReset = () => {
    setSearchTerm("")
  }

  const placeholderImageUrl = "/placeholder.svg"

  const filteredInventoryData = useMemo(() => {
    return inventoryData.filter((item) => item.manufacturer.toLowerCase() === params.manufacturer.toLowerCase())
  }, [params.manufacturer])

  return (
    <div>
      <div className="relative h-[300px] bg-white">
        {" "}
        {/* Changed bg-gray-900 to bg-white */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={manufacturerLogos[manufacturer] || placeholderImageUrl}
            alt={manufacturer}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white container mx-auto px-4">
          <nav className="text-sm breadcrumbs mb-4">
            <ol className="flex items-center space-x-2 border border-white/50 rounded-lg bg-white/20 backdrop-blur-sm px-2 py-1 text-black">
              <li>
                <Link href="/" className="text-black">
                  Home
                </Link>
              </li>
              <li className="before:content-['>'] before:mx-2 text-black">
                <Link href="/inventory" className="text-black">
                  Inventory
                </Link>
              </li>
              <li className="before:content-['>'] before:mx-2 text-black">{manufacturer}</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold text-black border-b border-gray-300 pb-2">MANUFACTURER : {manufacturer}</h1>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="info">More Info</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <p className="text-gray-600 leading-relaxed">{manufacturerDescriptions[manufacturer]}</p>

            <div className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select defaultValue={manufacturer.toLowerCase()} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((m) => (
                      <SelectItem key={m} value={m.toLowerCase()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Button>Search Inventory</Button>
              </div>

              <InventoryTable
                manufacturer={manufacturer}
                searchTerm={searchTerm}
                filteredParts={filteredInventoryData}
              />
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Products</h3>
                <ul className="space-y-2">
                  {info.products.map((product, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Services</h3>
                <ul className="space-y-2">
                  {info.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <ul className="space-y-2">
                  {info.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href="/request-quote">Request a Quote</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

