import React from "react";
import Link from "next/link";

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
      <div className="bg-white rounded-xl border border-gray-300 p-2 flex flex-col items-center w-40 h-56 shadow-sm hover:shadow-md transition group-hover:scale-105">
        <div className="w-full h-28 bg-blue-100 rounded-lg mb-2 flex items-center justify-center">
          {/* Image placeholder */}
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-lg" />
          ) : (
            <div className="w-full h-full bg-blue-200 rounded-lg" />
          )}
        </div>
        <div className="font-bold text-lg">{price}</div>
        <div className="font-semibold text-sm leading-tight text-center mt-1">{title}</div>
        <div className="text-xs text-gray-500 mt-1 text-center">{location}</div>
      </div>
    </Link>
  );
} 