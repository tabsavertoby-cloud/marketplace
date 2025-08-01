
// app/create-listing/page.tsx
import ListingForm from './ListingForm'

export default function CreateListingPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Create a New Listing</h1>
      <ListingForm />
    </div>
  )
}