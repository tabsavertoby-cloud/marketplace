"use client";
import React, { useState } from "react";
import CreateListingSidebar from "../../components/CreateListingSidebar";

const listingTypes = [
  { label: "Item for sale", description: "Lorem ipsum dolor sit" },
  { label: "Create multiple listings", description: "Lorem ipsum dolor sit" },
  { label: "Vehicle for sale", description: "Lorem ipsum dolor sit" },
  { label: "Home for sale or rent", description: "Lorem ipsum dolor sit" },
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CreateListingPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    email: "",
    description: "",
    photos: [] as File[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showToast, setShowToast] = useState(false);

  // Generate preview URLs for selected images
  const photoPreviews = form.photos.map((file) => URL.createObjectURL(file));

  function validate() {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.price.trim()) newErrors.price = "Price is required.";
    else if (isNaN(Number(form.price))) newErrors.price = "Price must be a number.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email)) newErrors.email = "Email is invalid.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }

  return (
    <div className="flex min-h-[80vh]">
      <CreateListingSidebar step={step} />
      <div className="flex-1 flex items-center justify-center">
        {step === 1 ? (
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-2xl font-bold mb-8">Choose listing type</h2>
            <div className="flex gap-8 mb-8">
              {listingTypes.map((type) => (
                <div
                  key={type.label}
                  className={`w-48 h-48 bg-white rounded-xl border flex flex-col items-center justify-center shadow-sm transition cursor-pointer ${selectedType === type.label ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300 hover:shadow-md"}`}
                  onClick={() => setSelectedType(type.label)}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-gray-400 mb-4 flex items-center justify-center" />
                  <div className="font-bold text-md text-center mb-1">{type.label}</div>
                  <div className="text-xs text-gray-500 text-center">{type.description}</div>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 text-white font-bold rounded-lg py-2 px-8 text-lg disabled:opacity-50"
              disabled={!selectedType}
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex gap-8 items-center justify-center w-full">
            {/* Form */}
            <form className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl border border-gray-200 shadow-sm" onSubmit={handleSubmit} noValidate>
              <div className="text-lg font-bold mb-2">Add photos</div>
              {/* Image previews */}
              {photoPreviews.length > 0 && (
                <div className="flex gap-2 mb-2 flex-wrap">
                  {photoPreviews.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                multiple
                className="mb-2"
                accept="image/*"
                onChange={(e) => setForm(f => ({ ...f, photos: e.target.files ? Array.from(e.target.files) : [] }))}
              />
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Price"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                />
                {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>
              <div>
                <textarea
                  placeholder="Description"
                  className="border border-gray-300 rounded-lg p-2 min-h-[80px] w-full"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
              </div>
              <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg py-2 text-lg mt-2 hover:bg-blue-600 transition">
                Next
              </button>
            </form>
            {/* Preview */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-lg font-bold mb-2">Preview</div>
              <div className="w-80 h-[400px] bg-blue-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                {/* Image preview placeholder or first image */}
                {photoPreviews.length > 0 ? (
                  <img
                    src={photoPreviews[0]}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-200 rounded-xl" />
                )}
              </div>
              <div className="font-bold text-xl mb-1">{form.title || "Title"}</div>
              <div className="font-bold text-lg">{form.price || "Price"}</div>
              <div className="text-sm text-gray-600 mb-2">Listed 1 hour ago in Palo Alto, CA</div>
              <div className="text-sm font-semibold mb-1">Seller Information</div>
              <div className="mb-2">Greg Wientjes</div>
            </div>
          </div>
        )}
      </div>
      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Listing submitted successfully!
        </div>
      )}
    </div>
  );
}

// Add a simple fade-in animation
// In your globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.3s ease; } 