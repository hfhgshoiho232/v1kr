"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { inventoryData, type Part, manufacturers } from "@/lib/inventory-data"
import { inventoryCache } from "@/lib/inventory-cache"

interface InventoryTableProps {
  manufacturer?: string
  brand?: string
  searchTerm: string
}

export default function InventoryTable({ manufacturer, brand, searchTerm }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)

  const filteredParts = useMemo(() => {
    let partsToFilter = inventoryData

    if (brand) {
      partsToFilter = partsToFilter.filter((part) => part.manufacturer === brand)
    } else if (manufacturer) {
      partsToFilter = partsToFilter.filter((part) => part.manufacturer === manufacturer)
    }

    if (searchTerm.length > 1) {
      partsToFilter = partsToFilter.filter((part) => part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return partsToFilter
  }, [manufacturer, brand, searchTerm])

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const visibleParts = filteredParts.slice(startIndex, endIndex)

  const maxPageButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value))
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select entries per page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value} entries per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredParts.length)} of {filteredParts.length} entries
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] bg-blue-700 text-white">S.NO.</TableHead>
              <TableHead className="bg-blue-700 text-white">PART NUMBER</TableHead>
              <TableHead className="bg-blue-700 text-white text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleParts.map((part, index) => (
              <TableRow key={part.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/inventory/${part.manufacturer.toLowerCase()}/${part.partNumber.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {part.partNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/inventory/${part.manufacturer.toLowerCase()}/${part.partNumber.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center text-gray-600 hover:text-blue-600"
                  >
                    More Info <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredParts.length)} of {filteredParts.length} entries
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

