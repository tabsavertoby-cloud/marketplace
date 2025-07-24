"use client";

import React, { useContext, useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import { CategoryContext } from "./layout";

const allListings = [
  { id: "1", price: "$2,300", title: "Lorem ipsum dolor sit", location: "Palo Alto, CA", category: "Electronics" },
  { id: "2", price: "$1,500", title: "Bike for sale", location: "Palo Alto, CA", category: "Vehicles" },
  { id: "3", price: "$800", title: "Sofa", location: "Palo Alto, CA", category: "Home Goods" },
  // ...add more mock listings with various categories
  ...Array.from({ length: 13 }).map((_, i) => ({
    id: (i + 4).toString(),
    price: "$2,300",
    title: "Lorem ipsum dolor sit",
    location: "Palo Alto, CA",
    category: "Electronics",
  })),
];

export default function Home() {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const [filteredListings, setFilteredListings] = useState(allListings);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setFilteredListings(
        !selectedCategory || selectedCategory === "All"
          ? allListings
          : allListings.filter((l) => l.category === selectedCategory)
      );
      setLoading(false);
    }, 600); // Simulate loading
    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  return (
    <main className="flex-1 flex flex-col bg-gray-50 p-4 sm:p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-2">{selectedCategory || "All"}</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <span className="text-3xl mb-2">😕</span>
          <span>No listings found for this category.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredListings.map((item) => (
            <ListingCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  );
}
