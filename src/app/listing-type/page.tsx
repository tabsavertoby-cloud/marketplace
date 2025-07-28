import React from "react";
import Link from "next/link";

const listingTypes = [
  { label: "Item for sale", description: "Lorem ipsum dolor sit" },
  { label: "Create multiple listings", description: "Lorem ipsum dolor sit" },
  { label: "Vehicle for sale", description: "Lorem ipsum dolor sit" },
  { label: "Home for sale or rent", description: "Lorem ipsum dolor sit" },
];

const rotations = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

export default function ListingTypePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 text-center">
        Choose listing type
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {listingTypes.map((type, i) => (
          i === 0 ? (
            <Link href="/create-item" key={type.label} className="cursor-pointer">
              <div
                className={`facebook-card p-6 w-64 h-72 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-200 ${rotations[i % rotations.length]} mb-6`}
              >
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 mb-6 flex items-center justify-center bg-gray-100" />
                <div className="font-bold text-xl text-center mb-2 text-gray-900">
                  {type.label}
                </div>
                <div className="text-base text-gray-600 text-center">
                  {type.description}
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={type.label}
              className={`facebook-card p-6 w-64 h-72 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-200 ${rotations[i % rotations.length]} mb-6`}
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 mb-6 flex items-center justify-center bg-gray-100" />
              <div className="font-bold text-xl text-center mb-2 text-gray-900">
                {type.label}
              </div>
              <div className="text-base text-gray-600 text-center">
                {type.description}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
} 