"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Image from "next/image"; 


interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  photo_url?: string;
  email: string;
  description: string;
  category: string;
  created_at: string;
}

interface PageProps {
  params: Promise<{ listingId: string }>
}

export default function Page({ params }: PageProps) {
  // Unwrap params using React.use (Next.js 15+ App Router)
  const { listingId } = React.use(params);

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', listingId)
          .single();

        if (error) throw error;
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
        // Fallback to mock data if Supabase is not configured
        setListing({
          id: listingId,
          title: "Bike 24 inch",
          price: 99,
          location: "Palo Alto, CA",
          email: "seller@example.com",
          description: "This is a great bike for city commuting. Lightweight, reliable, and in excellent condition. Includes a lock and helmet.",
          category: "Vehicles",
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [listingId]);

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    
    if (!message.trim() || !buyerEmail.trim()) {
      alert("Please fill in both message and email fields.");
      return;
    }

    setSendingMessage(true);
    try {
      // Save message to Supabase
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            listing_id: listingId,
            buyer_email: buyerEmail,
            message: message,
            seller_email: listing?.email,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      // Send email notification to seller
      try {
        const response = await fetch('/api/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sellerEmail: listing?.email,
            buyerEmail: buyerEmail,
            message: message,
            listingTitle: listing?.title,
          }),
        });

        if (!response.ok) {
          console.warn('Failed to send email notification');
        }
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't fail the whole operation if email fails
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setMessage("");
      setBuyerEmail("");
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#1877f2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <span className="text-3xl mb-2">😕</span>
        <span>Listing not found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center min-w-[300px]">
        <div className="w-full max-w-md h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {listing.photo_url ? (
            <Image src={listing.photo_url} alt={listing.title} className="object-cover w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-xl" />
          )}
        </div>
      </div>
      
      {/* Details */}
      <div className="w-full md:w-96 flex flex-col gap-4">
        <div>
          <div className="font-bold text-2xl mb-1 text-gray-900">{listing.title}</div>
          <div className="font-bold text-xl text-[#1877f2]">${listing.price}</div>
        </div>
        <div className="text-sm text-gray-600">
          Listed {formatTimeAgo(listing.created_at)} in {listing.location}
        </div>
        <div className="text-base text-gray-800 mt-4 mb-2">
          {listing.description}
        </div>
        <div className="border-t border-gray-200 my-4" />
        <div className="text-sm font-semibold mb-1 text-gray-900">Seller Information</div>
        <div className="mb-4 text-gray-700">{listing.email}</div>
        
        {/* Message Form */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="text-sm font-semibold mb-2 text-gray-900">Send seller a message</div>
          <input
            type="email"
            placeholder="Your email"
            className="facebook-input"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            required
          />
          <textarea
            className="facebook-input min-h-[80px] resize-none"
            placeholder="I want to buy your item!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="facebook-button w-full"
            disabled={sendingMessage}
          >
            {sendingMessage ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Message sent successfully!
        </div>
      )}
    </div>
  );
} 