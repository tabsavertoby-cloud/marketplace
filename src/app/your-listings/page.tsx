"use client";
import React, { useContext, useEffect, useState } from "react";
import ListingCard from "../../components/ListingCard";
import { CategoryContext } from "../layout";

const allListings = Array.from({ length: 8 }).map((_, i) => ({
  id: (i + 1).toString(),
  price: "$1,200",
  title: "Your item " + (i + 1),
  location: "Palo Alto, CA",
  category: i % 2 === 0 ? "Electronics" : "Vehicles",
}));

export default function YourListingsPage() {
  const { selectedCategory } = useContext(CategoryContext);
  const [filteredListings, setFilteredListings] = useState(
    allListings.filter((l) => l.category === selectedCategory)
  );

  useEffect(() => {
    setFilteredListings(
      selectedCategory
        ? allListings.filter((l) => l.category === selectedCategory)
        : allListings
    );
  }, [selectedCategory]);

  return (
    <main className="flex-1 flex flex-col bg-gray-50 p-4 sm:p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-2">Your Listings</h2>
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <span className="text-3xl mb-2">😕</span>
          <span>No listings found for this category.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.map((item) => (
            <ListingCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  );
} 