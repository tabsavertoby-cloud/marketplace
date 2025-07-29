import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  imageUrl?: string;
}

export function ListingCard({
  id,
  title,
  price,
  location,
  description,
  imageUrl = '/placeholder.jpg'
}: ListingCardProps) {
  return (
    <Link href={`/${id}`}>
      <Card className="w-full h-full hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <div 
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            <p className="text-2xl font-bold">${price.toLocaleString()}</p>
          </div>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
