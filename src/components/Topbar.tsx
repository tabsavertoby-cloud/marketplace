import React from "react";
import { Mail, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex justify-end items-center gap-4 p-4 border-b border-gray-200 bg-white">
      <Mail size={24} className="text-gray-500" />
      <Bell size={24} className="text-gray-500" />
      <User size={24} className="text-gray-500" />
    </header>
  );
} 