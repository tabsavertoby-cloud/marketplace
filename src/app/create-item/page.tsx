"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

export default function CreateItemPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-[#f5f6f7] rounded-2xl border-2 border-gray-400 w-full max-w-5xl flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-10" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, var(--font-geist-sans), sans-serif' }}>
        {/* Sidebar/Form */}
        <div className="w-full md:w-80 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 w-full">
            <div className="rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold text-xl border-2 border-black">F</div>
            <span className="font-bold text-lg">Marketplace</span>
          </div>
          <form className="flex flex-col gap-4 w-full">
            <div
              className="rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%23bcd6f6\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%23bcd6f6\' stroke-width=\'2\'/></svg>')] bg-repeat w-full h-32 flex items-center justify-center text-xl text-gray-700 font-bold cursor-pointer select-none transition hover:bg-blue-50"
              style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              tabIndex={0}
              aria-label="Add photos"
            >
              {photoUrl ? (
                <img src={photoUrl} alt="Preview" className="object-cover w-full h-full rounded-xl" />
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
            <input className="rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/></svg>')] bg-repeat w-full h-12 px-4 text-lg font-bold" placeholder="Title" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} />
            <input className="rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/></svg>')] bg-repeat w-full h-12 px-4 text-lg font-bold" placeholder="Price" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} />
            <input className="rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/></svg>')] bg-repeat w-full h-12 px-4 text-lg font-bold" placeholder="Email" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} />
            <textarea className="rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%23e5e7eb\' stroke-width=\'2\'/></svg>')] bg-repeat w-full h-24 px-4 py-2 text-lg font-bold" placeholder="Description" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} />
            <button type="button" className="rounded-xl bg-blue-500 text-white font-extrabold text-lg py-2 mt-2 border-2 border-blue-700 shadow hover:bg-blue-600 transition" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Next
            </button>
          </form>
        </div>
        {/* Preview */}
        <div className="flex-1 flex flex-col items-center justify-start mt-8 md:mt-0">
          <div className="text-lg font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
            Preview
          </div>
          <div className="w-full max-w-md h-96 rounded-xl border-2 border-gray-400 bg-[url('data:image/svg+xml;utf8,<svg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'0\' x2=\'100%25\' y2=\'100%25\' stroke=\'%2399c2f2\' stroke-width=\'2\'/><line x1=\'100%25\' y1=\'0\' x2=\'0\' y2=\'100%25\' stroke=\'%2399c2f2\' stroke-width=\'2\'/></svg>')] bg-repeat mb-4 flex items-center justify-center overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt="Preview" className="object-cover w-full h-full rounded-xl" />
            ) : null}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-md pl-2">
            <div className="font-extrabold text-xl" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Title<br />Price
            </div>
            <div className="text-base mt-2" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Listed 1 hour ago<br />in Palo Alto, CA
            </div>
            <div className="mt-4 text-base" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
              Seller Information<br />Greg Wientjes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 