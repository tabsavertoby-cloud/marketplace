"use client";

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation";

//UI Imports
import { Home, Tag, ShoppingBag, HelpCircle, Store, Settings, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"; // Assuming you have Card component from Shadcn UI
import { Button } from "@/components/ui/button"; // Assuming you have Button component from Shadcn UI
import React,{useCallback} from "react";


// Define your category list
const categories = [
  "Vehicles", "Property Rentals", "Apparel", "Classifieds", "Electronics", "Entertainment",
  "Family", "Free Stuff", "Garden & Outdoor", "Hobbies", "Home Goods", "Home Improvement",
  "Home Sales", "Musical Instruments", "Office Supplies", "Pet Supplies", "Sporting Goods",
  "Toys & Games", "Buy and sell groups",
];


export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";

  const handleClick = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", category);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );


  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[360px] border-r bg-background overflow-y-auto">
      <div className="py-2">
        <div className="px-2">
          <div className="space-y-1">
            
            <nav className="space-y-1">
              <Link 
                href="/listings/options" 
                className="flex items-center px-2 py-3 text-sm font-medium hover:bg-accent rounded-md group"
              >
                <ShoppingBag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                Create new listing
              </Link>

              <Link 
                href="/listings" 
                className="flex items-center px-2 py-3 text-sm font-medium hover:bg-accent rounded-md group"
              >
                <Tag className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                Your listings
              </Link>


              <Link 
                href="/" 
                className="flex items-center px-2 py-3 text-sm font-medium hover:bg-accent rounded-md group"
              >
                <Store className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100" />
                Browse All
              </Link>
            </nav>
            
            

            {/* Categories */}
            <div className="space">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <ul className="space-y-1">
                 <li
                    onClick={() => router.push("/")}
                    className={`px-2 py-1 rounded-md cursor-pointer ${
                      activeCategory === ""
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  > All</li>
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleClick(category)}
                    className={`px-2 py-1 rounded-md cursor-pointer ${
                      activeCategory === category
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
