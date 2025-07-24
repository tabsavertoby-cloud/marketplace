"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, HelpCircle } from "lucide-react";

const categories = [
  "All",
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
  "Buy and sell groups",
];

const navLinks = [
  { href: "/", label: "Marketplace", icon: <Home size={18} /> },
  { href: "/your-listings", label: "Your listings", icon: <List size={18} /> },
  { href: "/listing-type", label: "Seller help", icon: <HelpCircle size={18} /> },
];

interface SidebarProps {
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

export default function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="font-bold text-xl mb-8 flex items-center gap-2">
        <div className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold">F</div>
        Marketplace
      </div>
      <nav className="mb-8 flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 text-sm font-medium ${pathname === link.href ? "bg-gray-100 font-bold" : ""}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mb-8">
        <span className="font-bold text-lg">Categories</span>
        <ul className="mt-2 space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`hover:bg-gray-100 rounded px-2 py-1 cursor-pointer text-sm ${selectedCategory === cat ? "bg-blue-100 font-bold" : ""}`}
              onClick={() => onCategorySelect && onCategorySelect(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
} 