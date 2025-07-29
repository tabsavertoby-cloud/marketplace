import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const categories = [
  'Vehicles',
  'Property Rentals',
  'Apparel',
  'Classifieds',
  'Electronics',
  'Entertainment',
  'Family',
  'Free Stuff',
  'Garden & Outdoor',
  'Hobbies',
  'Home Goods',
  'Home Improvement',
  'Home Sales',
  'Musical Instruments',
  'Office Supplies',
  'Pet Supplies',
  'Sporting Goods',
  'Toys & Games',
  'Buy and sell groups'
];

export function CategorySidebar() {
  return (
    <div className="w-64 h-full bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={category}>
            <Link 
              href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
            >
              {category}
            </Link>
            {index < categories.length - 1 && (
              <Separator className="my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
