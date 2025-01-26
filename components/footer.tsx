"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch("https://formspree.io/f/xzzzqnbp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setIsSuccess(true)
        e.currentTarget.reset()
      }
    } catch (err) {
      console.error("Newsletter submission failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm text-gray-300">
              KR International specializes in industrial control repairs and replacement parts, serving various
              industries worldwide.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inventory" className="hover:text-yellow-400 transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-yellow-400 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-yellow-400 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:sales@krinternational.in" className="hover:text-yellow-400 transition-colors">
                  sales@krinternational.in
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+919625168205" className="hover:text-yellow-400 transition-colors">
                  +919625168205
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>PiyushCity Bhiwadi</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe to Newsletter</h3>
            {isSuccess ? (
              <div className="text-green-400">Thank you for subscribing! We'll keep you updated.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm">Get the latest news and updates about our services.</p>
                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your E-mail address"
                    className="flex-1 px-4 py-2 rounded-l-md text-gray-900"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-900 rounded-r-md disabled:opacity-50"
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? "..." : "→"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-sm text-gray-300">
          <p className="mb-4">
            <strong>Disclaimer:</strong> KR International is not affiliated with nor an authorized distributor of any
            manufacturers, brands or products we sell. Designated trademarks, brand names, and brands appearing herein
            are the property of the respective manufacturer.
          </p>
          <p>&copy; {new Date().getFullYear()} KR International. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

