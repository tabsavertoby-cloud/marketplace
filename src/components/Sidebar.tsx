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
  { href: "/", label: "Marketplace", icon: <Home size={20} /> },
  { href: "/your-listings", label: "Your listings", icon: <List size={20} /> },
  { href: "/listing-type", label: "Seller help", icon: <HelpCircle size={20} /> },
];

interface SidebarProps {
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

export default function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-72 facebook-sidebar p-4 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">f</span>
        </div>
        <span className="text-xl font-bold text-gray-900">Marketplace</span>
      </div>
      <nav className="mb-8 flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
              pathname === link.href ? "bg-gray-100 font-semibold text-gray-900" : ""
            }`}
          >
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mb-8">
        <span className="text-lg font-semibold text-gray-900 mb-3 block">Categories</span>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-[#e7f3ff] text-[#1877f2] font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
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