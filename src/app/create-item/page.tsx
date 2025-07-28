"use client";

import React, { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import Image from "next/image";

const categories = [
  "Vehicles",
  "Property Rentals", 
  "Apparel",
  "Classifieds",
  "Electronics",
  "Entertainment",
  "Family",
  "Free Stuff",
  "Garden & Outdoor",
  "Hobbies",
  "Home Goods",
  "Home Improvement",
  "Home Sales",
  "Musical Instruments",
  "Office Supplies",
  "Pet Supplies",
  "Sporting Goods",
  "Toys & Games",
];

export default function CreateItemPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    email: "",
    description: "",
    category: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    } else {
      setPhotoUrl(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    } else {
      setPhotoUrl(null);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.price.trim()) newErrors.price = "Price is required.";
    else if (isNaN(Number(form.price))) newErrors.price = "Price must be a number.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email)) newErrors.email = "Email is invalid.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!photo) newErrors.photo = "Photo is required.";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Upload photo to Supabase Storage
        let photoUrl = "";
        if (photo) {
          const fileName = `${Date.now()}-${photo.name}`;
          const { error: uploadError } = await supabase.storage
            .from('listings')
            .upload(fileName, photo);
          
          if (uploadError) throw uploadError;
          
          const { data: { publicUrl } } = supabase.storage
            .from('listings')
            .getPublicUrl(fileName);
          
          photoUrl = publicUrl;
        }

        // Save listing to database
        const { error } = await supabase
          .from('listings')
          .insert([
            {
              title: form.title,
              price: parseFloat(form.price),
              email: form.email,
              description: form.description,
              category: form.category,
              photo_url: photoUrl,
              location: "Palo Alto, CA", // Default location for now
              created_at: new Date().toISOString(),
            }
          ]);

        if (error) throw error;

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        
        // Reset form
        setForm({
          title: "",
          price: "",
          email: "",
          description: "",
          category: "",
        });
        setPhoto(null);
        setPhotoUrl(null);
      } catch (error) {
        console.error('Error saving listing:', error);
        alert('Error saving listing. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row p-6 md:p-8 gap-8 md:gap-12">
        {/* Sidebar/Form */}
        <div className="w-full md:w-80 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">f</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Marketplace</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div
              className="facebook-card w-full h-32 flex items-center justify-center text-lg text-gray-600 cursor-pointer select-none transition hover:bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              tabIndex={0}
              aria-label="Add photos"
            >
              {photoUrl ? (
                <Image src={photoUrl} alt="Preview" className="object-cover w-full h-full rounded-lg" width={256} height={128} />
              ) : (
                "Add photos"
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                aria-label="Upload photo"
              />
            </div>
            {errors.photo && <div className="text-red-500 text-xs">{errors.photo}</div>}
            
            <input 
              className="facebook-input" 
              placeholder="Title" 
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            />
            {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
            
            <input 
              className="facebook-input" 
              placeholder="Price" 
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
            />
            {errors.price && <div className="text-red-500 text-xs">{errors.price}</div>}
            
            <select 
              className="facebook-input"
              value={form.category}
              onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <div className="text-red-500 text-xs">{errors.category}</div>}
            
            <input 
              className="facebook-input" 
              placeholder="Email" 
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
            
            <textarea 
              className="facebook-input min-h-[80px] resize-none" 
              placeholder="Description" 
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            />
            {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
            
            <button 
              type="submit" 
              className="facebook-button w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Listing"}
            </button>
          </form>
        </div>
        {/* Preview */}
        <div className="flex-1 flex flex-col items-center justify-start mt-8 md:mt-0">
          <div className="text-lg font-semibold mb-4 text-gray-900">
            Preview
          </div>
          <div className="w-full max-w-md h-96 facebook-card mb-6 flex items-center justify-center overflow-hidden">
            {photoUrl ? (
              <Image src={photoUrl} alt="Preview" className="object-cover w-full h-full rounded-lg" width={384} height={384} />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg" />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="font-bold text-xl text-gray-900">
              {form.title || "Title"}<br />{form.price ? `$${form.price}` : "Price"}
            </div>
            <div className="text-base text-gray-600">
              Listed just now<br />in Palo Alto, CA
            </div>
            <div className="mt-4 text-base text-gray-600">
              Seller Information<br />{form.email || "Email"}
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Listing saved successfully!
        </div>
      )}
    </div>
  );
} 