"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, HelpCircle } from "lucide-react";

export default function CreateListingSidebar({ step }: { step: number }) {
  const pathname = usePathname();
  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="font-bold text-xl mb-8 flex items-center gap-2">
        <div className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-bold">F</div>
      </div>
      <div className="font-bold text-lg mb-6">Create new listing</div>
      <div className="mb-8">
        <div className={`flex items-center gap-2 mb-2 ${step === 1 ? "font-bold" : "text-gray-400"}`}>
          <span className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-gray-400 block" />
          </span>
          <span>Choose listing type</span>
        </div>
        {/* Add more steps as needed */}
      </div>
      <nav className="flex flex-col gap-2 mt-auto">
        <Link
          href="/your-listings"
          className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 ${pathname === "/your-listings" ? "bg-gray-100 font-bold" : ""}`}
        >
          <List size={20} />
          <span>Your listings</span>
        </Link>
        <Link
          href="/seller-help"
          className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 ${pathname === "/seller-help" ? "bg-gray-100 font-bold" : ""}`}
        >
          <HelpCircle size={20} />
          <span>Seller help</span>
        </Link>
      </nav>
    </aside>
  );
} 