import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Building,
  CreditCard,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // ✅ useAuth instead of UserContext
import Topbar from "../Topbar";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const { user, logout } = useAuth(); // ✅ get user & logout from AuthContext

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navItemsByRole = {
    tenant: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/tenant" },
      { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/tenant" },
      { name: "Support", icon: <MessageCircle size={20} />, path: "/dashboard/tenant" },
      { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/tenant" },
    ],
    landlord: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/landlord" },
      {
        name: "Tenants",
        icon: <Users size={20} />,
        children: [
          { name: "Add Tenant", path: "/dashboard/landlord/add-tenant" },
          { name: "Manage Tenants", path: "/dashboard/landlord/manage-tenants" },
        ],
      },
      {
        name: "Properties",
        icon: <Building size={20} />,
        children: [
          { name: "Add Property", path: "/dashboard/landlord/add-property" },
          { name: "Manage Properties", path: "/dashboard/landlord/manage-properties" },
        ],
      },
      { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/landlord" },
      { name: "Support", icon: <MessageCircle size={20} />, path: "/dashboard/landlord" },
      { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/landlord" },
    ],
    admin: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/admin" },
      { name: "Tenants", icon: <Users size={20} />, path: "/dashboard/admin" },
      { name: "Properties", icon: <Building size={20} />, path: "/dashboard/admin" },
      { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/admin" },
      { name: "Support", icon: <MessageCircle size={20} />, path: "/dashboard/admin" },
      { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/admin" },
    ],
    support: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard/support" },
      { name: "Support", icon: <MessageCircle size={20} />, path: "/dashboard/support" },
      { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/support" },
    ],
  };

  const navItems = navItemsByRole[user.role] || [];

  return (
    <div className="flex h-screen bg-gray-50 text-slate-800">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 240 }}
        className="bg-gradient-to-b from-blue-700 to-sky-600 text-white shadow-xl flex flex-col justify-between"
      >
        <div>
          <div className="p-4 text-center font-extrabold text-2xl tracking-wide border-b border-white/20">
            {isCollapsed ? "P" : "Paynoma"}
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map((item, index) =>
              item.children ? (
                <div key={index}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center justify-between w-full py-2 px-4 hover:bg-white/10 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon} {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed &&
                      (openMenus[item.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </button>
                  {openMenus[item.name] &&
                    !isCollapsed &&
                    item.children.map((child, idx) => (
                      <Link
                        key={idx}
                        to={child.path}
                        className="flex items-center gap-3 py-2 px-8 hover:bg-white/10 rounded-md text-sm"
                      >
                        {child.name}
                      </Link>
                    ))}
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 py-2 px-4 hover:bg-white/10 rounded-md transition-colors"
                >
                  {item.icon} {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-white/20 flex flex-col gap-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md py-2 px-3 transition-all"
          >
            {isCollapsed ? "»" : "«"} {!isCollapsed && "Collapse"}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 bg-white/10 hover:bg-red-500/80 rounded-md py-2 px-3 transition-all"
          >
            <LogOut size={18} /> {!isCollapsed && "Logout"}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Topbar />
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}