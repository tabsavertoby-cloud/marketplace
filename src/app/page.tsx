"use client"

import { Button } from "@/components/ui/button"
import { Plus, ChevronDown, Filter, Search,Building2, Car, ShoppingBag, Tags } from "lucide-react"
import {  useRouter ,useSearchParams} from "next/navigation"
import {getListings} from "@/lib/db/listings"  
import { useEffect,useState } from "react"
import Image from "next/image"
import Link from "next/link"  

export default function ListingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [items, setItems] = useState<any[]>([])
  

  // State for search term
  const [searchTerm, setSearchTerm] = useState("")
  // Filtered items based on title match

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const category = searchParams.get("category") || "" // 🟦 Get selected category
  useEffect(() => {
    const fetchData = async () => {
      const listings = await getListings(category) // ✅ Pass category to API
      setItems(listings)
    }
    fetchData()
  }, [category]) // 🟦 Re-run when category changes

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marketplace</h1>
      </div>

      
      {/* Search */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Listings */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) => (
          <Link href={`/listings/${item.id}`} key={item.id}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                <div className=" overflow-hidden bg-white rounded-lg p-4">
                  <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  width={500}
                  height={500}
                />
              </div>
              <div className="p-3">
                <div className="mb-2 text-lg font-semibold text-primary">
                  ${item.price.toLocaleString()}
                </div>
                <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight">{item.title}</h3>
                <p className="mb-2 text-xs text-muted-foreground">{item.location}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.seller_email}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No listings found</h3>
          <p className="text-gray-500 mb-4">Try another category or create a listing</p>
          <Button onClick={() => router.push("/listings/create-listing")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Create New Listing
          </Button>
        </div>
      )}
    </div>
  )
}
