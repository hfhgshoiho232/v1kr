import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { manufacturers } from "@/lib/inventory-data"

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

const placeholderImageUrl = "/placeholder.svg"

export default function InventoryPage() {
  manufacturers.sort((a, b) => a.localeCompare(b))
  return (
    <div>
      <div className="relative h-[300px] bg-gray-900">
        <Image
          src="https://i.pinimg.com/736x/cd/94/96/cd9496ca72d92ff92ee298cca0fd69fe.jpg"
          alt="Control Systems"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">Multi-Brand Control Inventory</h1>
          <nav className="text-sm breadcrumbs">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li className="before:content-['>'] before:mx-2">Inventory</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">Inventory</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">EXPLORE BY MANUFACTURERS :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {manufacturers.map((manufacturer) => (
              <Link key={manufacturer} href={`/inventory/${manufacturer.toLowerCase()}`} className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-[3/2] relative mb-4">
                      <Image
                        src={manufacturerLogos[manufacturer] || placeholderImageUrl}
                        alt={manufacturer}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h4 className="text-center font-semibold text-blue-600">{manufacturer}</h4>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

