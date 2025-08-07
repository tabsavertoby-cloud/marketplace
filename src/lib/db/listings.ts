import { supabase } from "@/lib/supabase";

export async function createListing(
  
  data: {
    id?: string // Optional, will be auto-generated if not provided
    title: string
    description: string
    price: number
    category: string
    seller_email: string
    image_url?: string
  }) 
  
  {
  const { data: result, error } = await supabase.from('listings').insert(data).select().single()
  if (error) throw error
  return result
}

export async function getListings(category?: string) {
  const query = supabase.from('listings').select('*').order('created_at', { ascending: false })
  if (category) query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function updateListing(id: string, updates: Partial<any>) {
  const { data, error } = await supabase.from('listings').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteListing(id: string) {
  const { error } = await supabase.from('listings').delete().eq('id', id)
  if (error) throw error
}
