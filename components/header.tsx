"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { inventoryData } from "@/lib/inventory-data"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<
    Array<{
      partNumber: string
      manufacturer: string
    }>
  >([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.length < 1) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results = inventoryData
      .filter(
        (item) =>
          item.partNumber.toLowerCase().includes(query.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 10)

    setSearchResults(results)
    setShowResults(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showResults) {
        setShowResults(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showResults])

  return (
    <header className="bg-white shadow-md">
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <p className="hidden md:block">Contact KR International to discuss your controls support requirements</p>
          <div className="flex items-center gap-4">
            <a href="mailto:sales@krinternational.in" className="hover:text-yellow-400 transition-colors">
              sales@krinternational.in
            </a>
            <a href="tel:+919625168205" className="hover:text-yellow-400 transition-colors">
              +919625168205
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fo0cUSjzaZ3XeTILIoYYJRtUz49ulc.png"
              alt="KR International"
              width={300}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "About", "Catalogue", "Inventory", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : item === "Contact" ? "/request-quote" : `/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by Part Number or Brand Name"
                className="pl-10 w-[300px] rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border shadow-lg z-50 max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={`/inventory/${result.manufacturer.toLowerCase()}/${result.partNumber
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setShowResults(false)
                        setSearchQuery("")
                      }}
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Search className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{result.partNumber}</div>
                        <div className="text-sm text-gray-500">{result.manufacturer}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/request-quote">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold hidden md:inline-flex"
              >
                REQUEST A QUOTE
              </Button>
            </Link>
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col py-4">
            {["Home", "About", "Catalogue", "Inventory", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : item === "Contact" ? "/request-quote" : `/${item.toLowerCase()}`}
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/request-quote"
              className="px-4 py-2 mt-2 bg-yellow-500 text-blue-900 font-semibold hover:bg-yellow-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              REQUEST A QUOTE
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

