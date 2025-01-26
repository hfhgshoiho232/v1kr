"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { manufacturers } from "@/lib/inventory-data"
import { X } from "lucide-react"

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

const logos = manufacturers.map((manufacturer) => ({
  name: manufacturer,
  logo: manufacturerLogos[manufacturer],
}))

export default function CompanyTicker() {
  const [selectedLogo, setSelectedLogo] = useState<{ name: string; logo: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const velocity = -0.2 // Adjusted velocity

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial calculation
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return
    x.set(x.get() + velocity * (delta / 1000) * containerWidth) // Adjust movement based on container width

    if (x.get() <= -containerWidth * 2) {
      x.set(0)
    }
  })

  const handleLogoClick = (logo: { name: string; logo: string }) => {
    setSelectedLogo(logo)
    setIsModalOpen(true)
  }

  return (
    <div className="overflow-hidden bg-gray-100 py-6 relative">
      <motion.div ref={containerRef} className="inline-flex" style={{ x }}>
        {logos.concat(logos).map((logoObj, index) => (
          <motion.div
            key={index}
            className="mx-8 w-24 h-16 relative cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleLogoClick(logoObj)}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image src={logoObj.logo || "/placeholder.svg"} alt={logoObj.name} fill className="object-contain" />
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 rounded-lg">
          <DialogClose asChild>
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
          {selectedLogo && (
            <div className="relative w-full h-[400px]">
              <Image
                src={selectedLogo.logo || "/placeholder.svg"}
                alt={`Zoomed ${selectedLogo.name} Logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

