import Link from "next/link"
import { Bell, Mail, User } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold">
            Marketplace
          </Link>
          <Link href="/listings" className="text-muted-foreground hover:text-foreground">
            Your Listings
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          <User className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      </div>
    </nav>
  )
}
