
'use client'

import { useState } from 'react'
import { createListing } from '@/lib/db/listings'
import { supabase } from '@/lib/supabase'

export default function ListingForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    seller_email: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file: File) => {
    const filePath = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('listing-images')
      .upload(filePath, file)
    if (error) throw error
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${filePath}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let imageUrl
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }
      await createListing({
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        seller_email: form.seller_email,
        image_url: imageUrl
      })
      alert('Listing created!')
      setForm({ title: '', description: '', price: '', category: '', seller_email: '' })
      setImageFile(null)
      setImagePreview(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['title', 'description', 'price', 'category', 'seller_email'].map(field => (
        <div key={field}>
          <label className="block text-sm font-medium capitalize">{field.replace('_', ' ')}</label>
          {field === 'description' ? (
            <textarea name={field} value={form[field]} onChange={handleChange} className="w-full border p-2 rounded" />
          ) : (
            <input name={field} value={form[field]} onChange={handleChange} className="w-full border p-2 rounded" />
          )}
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-40 object-cover rounded" />}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Listing'}
      </button>
    </form>
  )
}
