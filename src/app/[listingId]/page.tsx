import React from "react";

export default function ListingDetailsPage({ params }: { params: { listingId: string } }) {
  // Mock data for demonstration
  const listing = {
    title: "Bike 24 inch",
    price: "$99",
    location: "Palo Alto, CA",
    listedAgo: "1 hour ago",
    seller: "Wei Gu",
    imageUrl: "",
    description: "This is a great bike for city commuting. Lightweight, reliable, and in excellent condition. Includes a lock and helmet.",
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center min-w-[300px]">
        <div className="w-full max-w-md h-80 bg-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
          {/* Image placeholder */}
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt={listing.title} className="object-cover w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full bg-blue-200 rounded-xl" />
          )}
        </div>
      </div>
      {/* Details */}
      <div className="w-full md:w-96 flex flex-col gap-4">
        <div>
          <div className="font-bold text-2xl mb-1">{listing.title}</div>
          <div className="font-bold text-xl text-blue-600">{listing.price}</div>
        </div>
        <div className="text-sm text-gray-600">
          Listed {listing.listedAgo} in {listing.location}
        </div>
        <div className="text-base text-gray-800 mt-4 mb-2">
          {listing.description}
        </div>
        <div className="border-t border-gray-200 my-4" />
        <div className="text-sm font-semibold mb-1">Seller Information</div>
        <div className="mb-4">{listing.seller}</div>
        <div className="text-sm font-semibold mb-2">Send seller a message</div>
        <textarea
          className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-2 resize-none"
          placeholder="I want to buy your bike!"
        />
        <button className="bg-blue-500 text-white font-bold rounded-lg py-2 text-lg hover:bg-blue-600 transition">
          Send
        </button>
      </div>
    </div>
  );
} 