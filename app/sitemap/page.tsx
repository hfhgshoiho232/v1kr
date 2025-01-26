"use client"

import Link from "next/link"

export default function SitemapPage() {
  const sitemap = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Catalogue", url: "/catalogue" },
    { title: "Inventory", url: "/inventory" },
    { title: "Request a Quote", url: "/request-quote" },
    // Add more pages here...
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sitemap.map((item) => (
          <li key={item.url} className="p-4 rounded-lg bg-white hover:shadow-md transition-shadow">
            <Link href={item.url} className="text-blue-600 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

