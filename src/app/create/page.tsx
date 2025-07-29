import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const listingTypes = [
  {
    id: 'item-for-sale',
    title: 'Item for sale',
    description: 'Lorem ipsum dolor sit'
  },
  {
    id: 'multiple-items',
    title: 'Create multiple listings',
    description: 'Lorem ipsum dolor sit'
  },
  {
    id: 'vehicle',
    title: 'Vehicle for sale',
    description: 'Lorem ipsum dolor sit'
  },
  {
    id: 'home',
    title: 'Home for sale or rent',
    description: 'Lorem ipsum dolor sit'
  }
];

export default function CreateListing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create new listing</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Your listings</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/">Seller help</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Choose listing type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {listingTypes.map((type) => (
              <Link key={type.id} href={`/create/${type.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mb-4" />
                    <h3 className="font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
