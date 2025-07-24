import React from "react";

export default function SellerHelpPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Seller Help</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-700 mb-2">How can we help you?</p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>How to create a new listing</li>
          <li>How to edit or delete your listing</li>
          <li>How to communicate with buyers</li>
          <li>Marketplace rules and safety tips</li>
        </ul>
      </div>
    </div>
  );
} 