'use client'

import { useState } from 'react'
import { createListing } from '@/lib/db/listings'
import { supabase } from '@/lib/supabase'
import { categories } from '@/components/layout/sidebar'

export default function ListingForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: 'Palo Alto, CA',
    seller_email: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (file: File) => {
    const filePath = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('listing-images').upload(filePath, file)
    if (error) throw error
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${filePath}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await createListing({
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        seller_email: form.seller_email,
        location: form.location,
        image_url: imageUrl
      })

      alert('Listing created!')
      setForm({
        title: '',
        description: '',
        price: '',
        category: '',
        location: 'Palo Alto, CA',
        seller_email: ''
      })
      setImageFile(null)
      setImagePreview(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left column */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Photos</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer text-sm text-gray-500">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">⬆️</span>
                <span>Add photos</span>
                <span className="text-xs text-gray-400">JPEG, PNG, or WebP (max 5MB)</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What are you selling?"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Email *</label>
          <input
            type="email"
            name="seller_email"
            value={form.seller_email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Describe your item..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Listing'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Right column (Preview) */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="border rounded-lg p-4 bg-white">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="h-64 w-full object-cover rounded mb-4" />
          ) : (
            <div className="h-64 bg-gray-100 rounded mb-4" />
          )}
          <h3 className="text-xl font-bold">{form.title || 'Title'}</h3>
          <p className="text-lg font-semibold text-gray-700">
            {form.price ? `$${parseFloat(form.price).toFixed(2)}` : 'Price'}
          </p>
          <p className="text-sm text-gray-500 mt-2">Listed just now</p>
          <p className="text-sm text-gray-500">{form.location}</p>
          <p className="text-sm font-semibold mt-4">Seller Information</p>
          <p className="text-sm text-gray-600">{form.seller_email || 'seller@email.com'}</p>
        </div>
      </div>
    </form>
    </div>
    
  )
}
