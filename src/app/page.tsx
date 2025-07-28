"use client";
import React, { useContext, useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import { CategoryContext } from "../context/CategoryContext";
import { supabase } from "../lib/supabase";
import { Search } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  photo_url?: string;
  email: string;
  description: string;
  created_at: string;
}

export default function Home() {
  const { selectedCategory } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  // Fetch listings from Supabase
  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
        // Fallback to mock data if Supabase is not configured
        setListings([
          { id: "1", price: 2300, title: "Lorem ipsum dolor sit", location: "Palo Alto, CA", category: "Electronics", email: "seller@example.com", description: "Sample description", created_at: new Date().toISOString() },
          { id: "2", price: 1500, title: "Bike for sale", location: "Palo Alto, CA", category: "Vehicles", email: "seller@example.com", description: "Sample description", created_at: new Date().toISOString() },
          { id: "3", price: 800, title: "Sofa", location: "Palo Alto, CA", category: "Home Goods", email: "seller@example.com", description: "Sample description", created_at: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // Filter listings by category and search term
  useEffect(() => {
    let filtered = listings;

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(term) ||
        listing.description.toLowerCase().includes(term) ||
        listing.category.toLowerCase().includes(term)
      );
    }

    setFilteredListings(filtered);
  }, [listings, selectedCategory, searchTerm]);

  return (
    <main className="flex-1 flex flex-col bg-gray-50 p-4 sm:p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{selectedCategory || "All"}</h2>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search listings..."
            className="facebook-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-[#1877f2] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <span className="text-3xl mb-2">😕</span>
          <span>
            {searchTerm 
              ? `No listings found for "${searchTerm}"`
              : "No listings found for this category."
            }
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredListings.map((item) => (
            <ListingCard 
              key={item.id} 
              id={item.id}
              title={item.title}
              price={`$${item.price}`}
              location={item.location}
              imageUrl={item.photo_url}
            />
          ))}
        </div>
      )}
    </main>
  );
}
