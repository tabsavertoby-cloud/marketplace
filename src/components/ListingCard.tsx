import React from "react";
import Link from "next/link";
import Image from "next/image";

type ListingCardProps = {
  id: string;
  imageUrl?: string;
  price: string;
  title: string;
  location: string;
};

export default function ListingCard({ id, imageUrl, price, title, location }: ListingCardProps) {
  return (
    <Link href={`/${id}`} className="block group">
      <div className="facebook-card p-3 flex flex-col items-center w-40 h-56 hover:shadow-md transition-shadow">
        <div className="w-full h-28 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          {/* Image placeholder */}
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={title} 
              className="object-cover w-full h-full rounded-lg" 
              width={160}
              height={112}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg" />
          )}
        </div>
        <div className="font-semibold text-lg text-gray-900">{price}</div>
        <div className="font-medium text-sm leading-tight text-center mt-1 text-gray-800">{title}</div>
        <div className="text-xs text-gray-500 mt-1 text-center">{location}</div>
      </div>
    </Link>
  );
} 