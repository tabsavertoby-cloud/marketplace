// lib/api/messages.ts
import { supabase } from "@/lib/supabase"

export async function sendMessage({
  listing_id,
  buyer_email,
  seller_email,
  message,
}: {
  listing_id: string
  buyer_email: string
  seller_email: string
  message: string
}) {
  const { data, error } = await supabase.from("messages").insert({
    listing_id,
    buyer_email,
    seller_email,
    message,
  })

  if (error) throw error
  return data
}
