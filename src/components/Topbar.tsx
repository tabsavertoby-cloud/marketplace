import React from "react";
import { Mail, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="facebook-topbar flex justify-end items-center gap-4 p-4">
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <Mail size={20} className="text-gray-600" />
      </button>
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <Bell size={20} className="text-gray-600" />
      </button>
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <User size={20} className="text-gray-600" />
      </button>
    </header>
  );
} 