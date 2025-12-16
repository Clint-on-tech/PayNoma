import React from "react";
import { Search, UserCircle, Bell } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // using AuthContext

export default function Topbar() {
  const { user } = useAuth(); // get logged-in user

  if (!user) return null; // avoid flicker or crash when user isn't loaded yet

  return (
    <div className="w-full bg-white shadow-sm border-b border-slate-200 p-4 flex items-center justify-between">
      
      {/* Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search size={22} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent text-slate-700 w-full"
        />
      </div>

      {/* Notifications & User */}
      <div className="flex items-center gap-4">
        <Bell size={22} className="text-slate-600 cursor-pointer relative" />

        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={28} className="text-slate-700" />
          <span className="text-slate-800 font-medium">{user.name}</span>
        </div>
      </div>
    </div>
  );
}
