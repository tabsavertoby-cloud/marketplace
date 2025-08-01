"use client"

import { Card } from "@/components/ui/card"
import { Building2, Car, ShoppingBag, Tags } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const listingTypes = [
    {
      title: "Item for sale",
      description: "List individual items you want to sell",
      icon: ShoppingBag,
      href: "/listings/create-listing"
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
    
    <div className="max-w-[950px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Choose listing type</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4">
        {listingTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card 
              key={type.title}
              className=" items-center p-4 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => router.push(type.href)}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold">{type.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{type.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}