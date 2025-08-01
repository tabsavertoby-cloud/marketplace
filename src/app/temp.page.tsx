import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Car, ShoppingBag, Tags } from "lucide-react"

export default function Home() {
  const listingTypes = [
    {
      title: "Item for sale",
      description: "Lorem ipsum dolor sit",
      icon: ShoppingBag,
      href: "/listings/new/item"
    },
    {
      title: "Create multiple listings",
      description: "Lorem ipsum dolor sit",
      icon: Tags,
      href: "/listings/new/multiple"
    },
    {
      title: "Vehicle for sale",
      description: "Lorem ipsum dolor sit",
      icon: Car,
      href: "/listings/new/vehicle"
    },
    {
      title: "House for sale or rent",
      description: "Lorem ipsum dolor sit",
      icon: Building2,
      href: "/listings/new/property"
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Choose listing type</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listingTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card 
              key={type.title}
              className="hover:bg-accent cursor-pointer transition-colors"
              onClick={() => window.location.href = type.href}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
