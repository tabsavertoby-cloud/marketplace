'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Home, ShoppingCart, User } from 'lucide-react'
import { Tag, ShoppingBag, HelpCircle, Store, Settings, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"; // Assuming you have Card component from Shadcn UI
import { Button } from "@/components/ui/button"; // Assuming you have Button component from Shadcn UI


export function Sidebar() {

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

            
          </div>
        </div>
      </div>
    </div>
  )
}
