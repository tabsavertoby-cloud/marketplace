import Link from "next/link"
import { Tag, ShoppingBag, HelpCircle, Store, Settings, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"; // Assuming you have Card component from Shadcn UI
import { Button } from "@/components/ui/button"; // Assuming you have Button component from Shadcn UI


// Your mock data for listings (ensure it includes imageUrl, description, location)
const mockListings = [
  {
    id: '1',
    imageUrl: 'https://placehold.co/600x400/E0E0E0/333333?text=Product+1',
    price: '$120.00',
    description: 'Vintage Leather Jacket, excellent condition, slight wear. Size M.',
    location: 'New York, NY',
    title: 'Vintage Leather Jacket',
    status: 'Available',
    datePosted: '2d ago',
    views: 123
  },
  {
    id: '2',
    imageUrl: 'https://placehold.co/600x400/D0D0D0/333333?text=Product+2',
    price: '$50.00',
    description: 'Brand new headphones, noise-cancelling, perfect for travel.',
    location: 'Los Angeles, CA',
    title: 'Noise Cancelling Headphones',
    status: 'Available',
    datePosted: '1d ago',
    views: 56
  },
  {
    id: '3',
    imageUrl: 'https://placehold.co/600x400/C0C0C0/333333?text=Product+3',
    price: '$350.00',
    description: 'Used mountain bike, needs minor tune-up. Great for trails.',
    location: 'Denver, CO',
    title: 'Mountain Bike',
    status: 'Available',
    datePosted: '3d ago',
    views: 200
  },
  {
    id: '4',
    imageUrl: 'https://placehold.co/600x400/B0B0B0/333333?text=Product+4',
    price: '$25.00',
    description: 'Set of classic novels, hardcover. Good for collectors.',
    location: 'Chicago, IL',
    title: 'Classic Novel Set',
    status: 'Sold',
    datePosted: '5d ago',
    views: 80
  },
  {
    id: '5',
    imageUrl: 'https://placehold.co/600x400/A0A0A0/333333?text=Product+5',
    price: '$99.99',
    description: 'Electric guitar, entry-level, perfect for beginners.',
    location: 'Austin, TX',
    title: 'Electric Guitar',
    status: 'Available',
    datePosted: '1h ago',
    views: 10
  },
  {
    id: '6',
    imageUrl: 'https://placehold.co/600x400/909090/333333?text=Product+6',
    price: '$75.00',
    description: 'Vintage camera, fully functional, great for photography enthusiasts.',
    location: 'Seattle, WA',
    title: 'Vintage Camera',
    status: 'Available',
    datePosted: '4d ago',
    views: 90
  },
  {
    id: '7',
    imageUrl: 'https://placehold.co/600x400/808080/333333?text=Product+7',
    price: '$15.00',
    description: 'Handmade ceramic mug, unique design, perfect for coffee lovers.',
    location: 'Portland, OR',
    title: 'Ceramic Mug',
    status: 'Available',
    datePosted: '6d ago',
    views: 45
  },
  {
    id: '8',
    imageUrl: 'https://placehold.co/600x400/707070/333333?text=Product+8',
    price: '$200.00',
    description: 'Gaming console, barely used, comes with two controllers.',
    location: 'Miami, FL',
    title: 'Gaming Console',
    status: 'Available',
    datePosted: '1w ago',
    views: 150
  },
  {
    id: '9',
    imageUrl: 'https://placehold.co/600x400/606060/333333?text=Product+9',
    price: '$45.00',
    description: 'Designer handbag, slightly worn, but still stylish.',
    location: 'Dallas, TX',
    title: 'Designer Handbag',
    status: 'Sold',
    datePosted: '2w ago',
    views: 70
  },
  {
    id: '10',
    imageUrl: 'https://placehold.co/600x400/505050/333333?text=Product+10',
    price: '$10.00',
    description: 'Set of gardening tools, perfect for a new gardener.',
    location: 'Boston, MA',
    title: 'Gardening Tools',
    status: 'Available',
    datePosted: '3w ago',
    views: 30
  },
];

export function Sidebar() {

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[360px] border-r bg-background overflow-y-auto">
      <div className="py-2">
        <div className="px-2">
          <div className="space-y-1">
            
            <nav className="space-y-1">
              

              <Link 
                href="/listings" 
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
            <nav className="space-y-1">
              

              <Link 
                href="/listings" 
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
