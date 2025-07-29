import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default async function ListingPage({ params }: { params: { listingId: string } }) {
  // This would come from your API in a real application
  const listing = await getListing(params.listingId);
  
  // Mock data for now
  function getListing(id: string) {
    return Promise.resolve({
      id,
      title: "Bike 24 inch",
      price: 99,
      location: "Palo Alto, CA",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      imageUrl: "/placeholder.jpg",
      seller: {
        name: "Wei Gu",
        id: "wei-gu",
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <h1 className="text-2xl font-bold">Marketplace</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          {/* Image Section */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <div 
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${listing.imageUrl})` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Details Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h1 className="text-2xl font-bold">{listing.title}</h1>
                <p className="text-3xl font-bold">${listing.price}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{listing.description}</p>
                <p className="text-sm text-gray-500 mt-4">Listed 1 hour ago in {listing.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Seller Information</h2>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{listing.seller.name}</p>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <Textarea 
                    placeholder="I want to buy your bike!" 
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
