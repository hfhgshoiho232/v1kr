'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Factory, FlaskRoundIcon as Flask, Fuel, Truck, Anchor, Building2, Construction, StarIcon as Industry, Pickaxe, Sprout, Car, Wine, Beaker, Tv, Scissors, UtensilsCrossed, HardHat, Ship, CircuitBoard, Mountain, Newspaper, Building2Icon as Factory2, ScrollText, MicroscopeIcon as Microchip, Timer, Droplets, Package2, Hammer, Lightbulb, Wrench, Laptop, Warehouse, Zap, ConeIcon as Crane, PaintBucket, StickerIcon as Stadium, Clapperboard, Box, Disc, Cookie, BotIcon as Robot } from 'lucide-react'

interface IndustryType {
  name: string
  icon: any
  image: string
  slug: string
  description: string
}

const industries: IndustryType[] = [
  { 
    name: 'Power Generation', 
    icon: Factory, 
    image: 'https://sjc.microlink.io/88Ljy8Lv_uB7Gy1hkMB1fDJ_sNwRsGRK4UdR8S_OO-_-qJ9C9ZS3B5OSVhZgx830M3XNvLFGq5m-LaAe9JDAxg.jpeg', 
    slug: 'power-generation',
    description: 'Advanced control solutions for power generation facilities'
  },
  { 
    name: 'Process', 
    icon: Factory2, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Abandoned_Industrial_Process_Equipment_0436_%2847036287792%29.jpg', 
    slug: 'process',
    description: 'Automation solutions for process industries'
  },
  { 
    name: 'Petrochemicals', 
    icon: Flask, 
    image: 'https://www.constructionworld.in/assets/uploads/f08552f976e24745b753f4d8bff7b54a.jpg', 
    slug: 'petrochemicals',
    description: 'Control systems for petrochemical processing plants'
  },
  { 
    name: 'Oil And Gas', 
    icon: Fuel, 
    image: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmwzNjAxMjA3Mjk1NS1pbWFnZS1rcHhnMTYxcy5qcGc.jpg', 
    slug: 'oil-and-gas',
    description: 'Automation solutions for oil and gas facilities'
  },
  { 
    name: 'Transport', 
    icon: Truck, 
    image: 'https://rethinkingvaluechains.com/wp-content/uploads/2022/07/shipping-e1657234412848.jpeg', 
    slug: 'transport',
    description: 'Control systems for transportation infrastructure'
  },
  { 
    name: 'Semiconductor & Electronics', 
    icon: Microchip, 
    image: 'https://sjc.microlink.io/cMUQhRQeyrZBELScGIaJ_hZGehhgnpRScNcpmEfzItZbh-IJGzGVmdf-eOIVN_Q1ph_KgwKAO_U9v4DWNSWWZA.jpeg', 
    slug: 'semiconductor',
    description: 'Automation solutions for semiconductor manufacturing'
  },
  { 
    name: 'Tyre & Rubber', 
    icon: Timer, 
    image: 'https://www.tyreandrubberrecycling.com/wp-content/uploads/2022/05/26112949/elt.jpg', 
    slug: 'tyre-rubber',
    description: 'Control systems for tyre and rubber manufacturing'
  },
  { 
    name: 'Ports', 
    icon: Anchor, 
    image: 'https://www.constructionworld.in/assets/uploads/b4ed188dc1755132008ebc5c5dca1f10.jpg', 
    slug: 'ports',
    description: 'Automation solutions for port operations'
  },
  { 
    name: 'Water & Wastewater', 
    icon: Droplets, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/%C4%8CBu%2C_wastewater_treatment_plant_05.jpg', 
    slug: 'water',
    description: 'Automation solutions for water and wastewater treatment'
  },
  { 
    name: 'Steel Plants', 
    icon: Building2, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bahrain_Steel_Plant.jpg', 
    slug: 'steel-plants',
    description: 'Control systems for steel manufacturing'
  },
  { 
    name: 'Cement Plants', 
    icon: Construction, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Cement-plant.jpg', 
    slug: 'cement-plants',
    description: 'Automation for cement production facilities'
  },
  { 
    name: 'Pulp & Paper', 
    icon: ScrollText, 
    image: 'https://compote.slate.com/images/f4181d74-3ad7-4ef5-ba66-76f115ea2205.jpeg?crop=1560%2C1040%2Cx0%2Cy0&width=1200', 
    slug: 'pulp-paper',
    description: 'Control systems for pulp and paper mills'
  },
  { 
    name: 'Processing Plants', 
    icon: Industry, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-8tkTm99PgLh4uvjK7dMblODzD41HoSVVg&s', 
    slug: 'processing-plants',
    description: 'Control solutions for processing facilities'
  },
  { 
    name: 'Mines', 
    icon: Pickaxe, 
    image: 'https://www.constructionworld.in/assets/uploads/8f7ca328930e94e3565e5a6c55e9dc4d.jpg', 
    slug: 'mines',
    description: 'Automation systems for mining operations'
  },
  { 
    name: 'Fertilizer Plant', 
    icon: Sprout, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/MatixFertilizerPanagarh.jpg', 
    slug: 'fertilizer-plant',
    description: 'Control systems for fertilizer production'
  },
  { name: 'Automotive', icon: Car, image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/002_Production_line_-_car_assembly_line_in_General_Motors_Manufacturing_Poland_-_Gliwice%2C_Poland.jpg', slug: 'automotive', description: 'Automation solutions for automotive manufacturing' },
  { name: 'Beverage', icon: Wine, image: 'https://live.staticflickr.com/8372/8543954469_a3d23c413e_b.jpg', slug: 'beverage', description: 'Control systems for beverage production' },
  { name: 'Chemicals', icon: Beaker, image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL3B4MTA4OTMyMy1pbWFnZS1rd3Z3ZDdxei5qcGc.jpg', slug: 'chemicals', description: 'Automation solutions for chemical processing' },
  { name: 'Entertainment', icon: Tv, image: 'https://www.indiabusinessguide.in/ibg-blog-image/8208382729f38ee6ab1724f062f1298f.jpg?v=1693385609', slug: 'entertainment', description: 'Control systems for entertainment venues' },
  { name: 'Fibres & Textiles', icon: Scissors, image: 'https://images.pexels.com/photos/6525848/pexels-photo-6525848.jpeg', slug: 'textiles', description: 'Automation solutions for textile manufacturing' },
  { name: 'Food', icon: UtensilsCrossed, image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2ZsNTA0MDg2NDU5NDYtaW1hZ2UuanBn.jpg', slug: 'food', description: 'Control systems for food processing' },
  { name: 'Infrastructure', icon: HardHat, image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Infrastructure.jpg', slug: 'infrastructure', description: 'Automation solutions for infrastructure projects' },
  { name: 'Marine', icon: Ship, image: 'https://www.ellona.io/wp-content/uploads/2022/07/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQxOS0zLTQ1MzY2YS5qcGc.webp', slug: 'marine', description: 'Control systems for marine vessels' },
  { name: 'Metals', icon: Hammer, image: 'https://lh7-us.googleusercontent.com/7fLBP6PFxmpp7Dyryxh4b8oh_C3VMzrreoW8ddFg_9AXVbE4dup6Is-6zXToi_aFp7qmgUgeCn8frFpJJbVaWDOVNURFWVmKMIb3aJ7L2wYta_S7uiab8Y7qpsgm-GuvJAu_03jORvZkaYJQKP5mWb0', slug: 'metals', description: 'Automation solutions for metal processing' },
  { name: 'Print & Publishing', icon: Newspaper, image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2ZsMzQ0NDM1ODEwMzQtcHVibGljLWltYWdlLWtvd3M4ZGNoLmpwZw.jpg', slug: 'print-publishing', description: 'Control systems for printing and publishing' },
  { name: 'Packaging', icon: Package2, image: 'https://boxesvietnam.com/wp-content/uploads/2023/05/carton-manufacturing-line-3.jpg', slug: 'packaging', description: 'Control systems for packaging facilities' },
  { name: 'Breweries', icon: Wine, image: 'https://images.pexels.com/photos/6366897/pexels-photo-6366897.jpeg', slug: 'breweries', description: 'Automation solutions for breweries' },
  { name: 'Forging/Casting', icon: Hammer, image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Iran_Tractor_forging_-_Die_casting.jpg', slug: 'forging', description: 'Control systems for forging and casting' },
  { name: 'Plastic/Moulding', icon: Box, image: 'https://live.staticflickr.com/3261/5706445602_e64e414fd0.jpg', slug: 'plastic', description: 'Automation solutions for plastic moulding' },
  { name: 'Glass', icon: Wine, image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Glass_factory_in_Qatar.jpg', slug: 'glass', description: 'Control systems for glass manufacturing' },
  { name: 'IT Equipment', icon: Laptop, image: 'https://freerangestock.com/sample/164340/technician-working-on-network-server-equipment.jpg', slug: 'it-equipment', description: 'Automation solutions for IT equipment manufacturing' },
  { name: 'Military/Defence', icon: Warehouse, image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/MT-LB_being_renovated_inside_Tatarstan_military-industrial_complex_-_July_2023_02.jpg', slug: 'military', description: 'Control systems for military and defence applications' },
  { name: 'Electrical', icon: Zap, image: 'https://www.constructionworld.in/assets/uploads/0c04cb96e6581c222f9cefe917957d5e.jpg', slug: 'electrical', description: 'Automation solutions for electrical equipment manufacturing' },
  { name: 'Cranes', icon: Crane, image: 'https://images.pexels.com/photos/29224605/pexels-photo-29224605.jpeg', slug: 'cranes', description: 'Control systems for cranes' },
  { name: 'Paint', icon: PaintBucket, image: 'https://images.stockcake.com/public/3/c/6/3c622666-6600-4b2e-8c48-7b261a0f07fc/colorful-industrial-workshop-stockcake.jpg', slug: 'paint', description: 'Automation solutions for paint manufacturing' },
  { name: 'Large Football Stadiums', icon: Stadium, image: 'https://images.pexels.com/photos/9946854/pexels-photo-9946854.jpeg', slug: 'stadiums', description: 'Control systems for large football stadiums' },
  { name: 'Cinema Projector Rooms', icon: Clapperboard, image: 'https://live.staticflickr.com/4153/5041650913_527092123e_b.jpg', slug: 'cinema', description: 'Automation solutions for cinema projector rooms' },
  { name: 'Fruit Packaging', icon: Box, image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Graaff_Fruit-Ceres_packing.jpg', slug: 'fruit-packaging', description: 'Control systems for fruit packaging' },
  { name: 'Bearing Manufacturers', icon: Disc, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVp9c8fO3sJNveL38QSZMXJ4lRpOLpqz-MtA&s', slug: 'bearing', description: 'Automation solutions for bearing manufacturers' },
  { 
    name: 'Robotics', 
    icon: Robot, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Industrial-robots-21.jpg', 
    slug: 'robotics', 
    description: 'Industrial robotics and automation' 
  }
]

export default function IndustrySolutions() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>(industries[0])
  const [isVisible, setIsVisible] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const IndustryCard = useMemo(() => ({ industry, isSelected, onClick }) => (
    <Card 
      key={industry.slug}
      className={`hover:border-blue-600 transition-colors cursor-pointer ${
        isSelected ? 'border-blue-600 bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <industry.icon className="h-6 w-6 text-blue-600" />
        <span className="font-semibold">{industry.name}</span>
      </CardContent>
    </Card>
  ), [])

  const handleSelectIndustry = useCallback((industry) => {
    setSelectedIndustry(industry)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const scrollPercentage = Math.max(0, Math.min(1, (windowHeight - top) / (windowHeight + height)))
        const newIndex = Math.min(Math.floor(scrollPercentage * industries.length), industries.length - 1);
        setScrollIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (industries[scrollIndex]) {
      setSelectedIndustry(industries[scrollIndex]);
    }
  }, [scrollIndex])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isVisible) {
      let index = scrollIndex
      interval = setInterval(() => {
        if (industries[index]) {
          setSelectedIndustry(industries[index]);
        }
        index = (index + 1) % industries.length
      }, 3000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isVisible, scrollIndex])

  return (
    <div className="container mx-auto px-4" ref={containerRef}>
      <h2 className="text-3xl font-bold text-center mb-12">
        Industry Solutions from KR International
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          {industries.map((industry, index) => {
            if (index % 2 === 0) {
              return (
                <IndustryCard
                  key={industry.slug}
                  industry={industry}
                  isSelected={selectedIndustry.slug === industry.slug}
                  onClick={() => handleSelectIndustry(industry)}
                />
              )
            }
            return null
          })}
        </div>

        {/* Center Image */}
        <div className="lg:col-span-1">
          {selectedIndustry && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="sticky top-24"
              >
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={selectedIndustry.image || "/placeholder.svg"}
                    alt={selectedIndustry.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-blue-600">{selectedIndustry.name}</h3>
                  <p className="text-gray-600 mt-2">{selectedIndustry.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {industries.map((industry, index) => {
            if (index % 2 !== 0) {
              return (
                <IndustryCard
                  key={industry.slug}
                  industry={industry}
                  isSelected={selectedIndustry.slug === industry.slug}
                  onClick={() => handleSelectIndustry(industry)}
                />
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

