import React from "react";
import Link from "next/link";

const listingTypes = [
  { label: "Item for sale", description: "Lorem ipsum dolor sit" },
  { label: "Create multiple listings", description: "Lorem ipsum dolor sit" },
  { label: "Vehicle for sale", description: "Lorem ipsum dolor sit" },
  { label: "Home for sale or rent", description: "Lorem ipsum dolor sit" },
];

const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function ListingTypePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-12 font-sans" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, var(--font-geist-sans), sans-serif' }}>
        Choose listing type
      </h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {listingTypes.map((type, i) => (
          i === 0 ? (
            <Link href="/create-item" key={type.label} className="cursor-pointer">
              <div
                className={`w-60 h-72 bg-white rounded-2xl border-2 border-gray-300 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 ${rotations[i % rotations.length]} mb-6`}
                style={{ boxShadow: '4px 8px 0px 0px #e5e7eb' }}
              >
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-400 mb-7 flex items-center justify-center bg-gray-100" />
                <div className="font-extrabold text-xl text-center mb-2 font-sans" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, var(--font-geist-sans), sans-serif' }}>
                  {type.label}
                </div>
                <div className="text-base text-gray-700 text-center font-sans" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                  {type.description}
                </div>
              </div>
            </Link>
          ) : (
            <div
              key={type.label}
              className={`w-60 h-72 bg-white rounded-2xl border-2 border-gray-300 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 ${rotations[i % rotations.length]} mb-6`}
              style={{ boxShadow: '4px 8px 0px 0px #e5e7eb' }}
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-400 mb-7 flex items-center justify-center bg-gray-100" />
              <div className="font-extrabold text-xl text-center mb-2 font-sans" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, var(--font-geist-sans), sans-serif' }}>
                {type.label}
              </div>
              <div className="text-base text-gray-700 text-center font-sans" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                {type.description}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
} 