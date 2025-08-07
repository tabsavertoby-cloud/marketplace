// /app/listing/[id]/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getListings } from "@/lib/db/listings"
import Image from "next/image"
import Link from "next/link"
import { sendMessage } from "@/lib/db/messages"


export default function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

const [loading, setLoading] = useState(false)

const handleSendMessage = async () => {
  try {
    setLoading(true)
    await sendMessage({
      listing_id: id as string,
      buyer_email: email,
      seller_email: listing.seller_email,
      message,
    })
    alert("Message sent successfully!")
    setEmail("")
    setMessage("")
  } catch (err) {
    alert(err.message)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    async function fetchListing() {
      try {
        const listings = await getListings()
        const match = listings.find((item) => item.id === id)
        setListing(match)
      } catch (err) {
        console.error("Failed to load listing", err)
      }
    }
    fetchListing()
  }, [id])

  if (!listing) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex gap-10">
      <div className="flex-1">
        <Link href="/" className="text-blue-600 text-sm mb-4 inline-block">
          ← Back to Marketplace
        </Link>
        <div className="bg-white rounded-lg shadow p-4">
          {listing.image_url ? (
            <Image
              src={listing.image_url}
              alt={listing.title}
              width={800}
              height={600}
              className="rounded"
            />
          ) : (
            <div className="bg-gray-100 h-[400px] flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="text-xl text-blue-600 mt-1">${listing.price}</p>
        <p className="text-sm text-gray-600 mt-2">
          Listed on {new Date(listing.created_at).toLocaleDateString()}<br />
          in Palo Alto, CA
        </p>
        <p className="mt-2 text-sm text-gray-600">Category: {listing.category}</p>

        <div className="mt-6">
          <h2 className="text-md font-semibold">Description</h2>
          <p className="text-sm text-gray-700">{listing.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-md font-semibold">Seller Information</h2>
          <p className="text-sm text-gray-700" >{listing.seller_email}</p>
          <input type="hidden" name="seller_email" id="" value={listing.seller_email} />
        </div>

        <div className="mt-6"><h2 className="text-md font-semibold">Message Seller</h2>
          <p className="text-sm text-gray-700">Your Email</p>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full mt-1 p-2 border rounded"
          />
          <h2 className="text-md font-semibold">Message</h2>
          <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'm interested in your item!"
              className="w-full mt-2 p-2 border rounded"
              rows={3}
          />
          <button
            disabled={!email.trim() || loading}
            onClick={handleSendMessage}
            className={`mt-2 w-full px-4 py-2 rounded text-white ${
              !email.trim() || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </div>
      </div>
    </div>
  )
}
