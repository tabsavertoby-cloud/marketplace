"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronDown, Filter, Search,Building2, Car, ShoppingBag, Tags } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ListingsPage() {
  const router = useRouter()
  const mockListings = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/150', // Add actual image URLs
    price: '$120.00',
    description: 'Vintage Leather Jacket, excellent condition, slight wear. Size M.',
    location: 'New York, NY',
    title: 'Vintage Leather Jacket', // Added for completeness, though not directly used in the current card display
    status: 'Available',
    datePosted: '2d ago',
    views: 123
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/150',
    price: '$50.00',
    description: 'Brand new headphones, noise-cancelling, perfect for travel.',
    location: 'Los Angeles, CA',
    title: 'Noise Cancelling Headphones',
    status: 'Available',
    datePosted: '1d ago',
    views: 56
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/150',
    price: '$350.00',
    description: 'Used mountain bike, needs minor tune-up. Great for trails.',
    location: 'Denver, CO',
    title: 'Mountain Bike',
    status: 'Available',
    datePosted: '3d ago',
    views: 200
  },
  {
    id: '4',
    imageUrl: 'https://via.placeholder.com/150',
    price: '$25.00',
    description: 'Set of classic novels, hardcover. Good for collectors.',
    location: 'Chicago, IL',
    title: 'Classic Novel Set',
    status: 'Sold',
    datePosted: '5d ago',
    views: 80
  },
  {
    id: '5',
    imageUrl: 'https://via.placeholder.com/150',
    price: '$99.99',
    description: 'Electric guitar, entry-level, perfect for beginners.',
    location: 'Austin, TX',
    title: 'Electric Guitar',
    status: 'Available',
    datePosted: '1h ago',
    views: 10
  },
  ]

  const listingTypes = [
    {
      title: "Item for sale",
      description: "List individual items you want to sell",
      icon: ShoppingBag,
      href: "/listings/new/item"
    },
    {
      title: "Create multiple listings",
      description: "Create multiple listings at once",
      icon: Tags,
      href: "/listings/new/multiple"
    },
    {
      title: "Vehicle for sale",
      description: "Sell cars, motorcycles, boats, etc.",
      icon: Car,
      href: "/listings/new/vehicle"
    },
    {
      title: "House for sale or rent",
      description: "List properties for sale or rent",
      icon: Building2,
      href: "/listings/new/property"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Listings</h1>
        <Button 
          onClick={() => router.push("/listings/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Listing
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-5 gap-4">
        {mockListings.map((listing) => (
        <Card key={listing.id} className="p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="w-full h-32 bg-gray-200 rounded-md overflow-hidden">
            {/* Added img tag and object-cover for better image handling */}
            <img 
              src={listing.imageUrl} 
              alt={listing.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-2">
            {/* Adjusted font size for mobile, then scales up */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{listing.title}</h3>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{listing.price}</h2>
            <p className="text-sm text-gray-600 truncate">{listing.description}</p>
            <p className="text-xs text-gray-500 mt-1">{listing.location}</p> {/* Slightly smaller text for location on mobile */}
          </div>
        </Card>
      ))}
      </div>

      {/* Empty State */}
      {mockListings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No listings yet</h3>
          <p className="text-gray-500 mb-4">Create your first listing to start selling</p>
          <Button 
            onClick={() => router.push("/listings/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create New Listing
          </Button>
        </div>
      )}
    </div>
  )
}
