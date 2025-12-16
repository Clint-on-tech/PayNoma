import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, Building2, Wallet, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [tenantMenuOpen, setTenantMenuOpen] = useState(false);
  const [propertyMenuOpen, setPropertyMenuOpen] = useState(false);
  const [reportsMenuOpen, setReportsMenuOpen] = useState(false);

  return (
    <motion.aside
      className="w-64 bg-slate-900 text-white h-screen p-6 flex flex-col gap-4 shadow-xl"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h1 className="text-2xl font-bold tracking-wide mb-4">PAYNOMA</h1>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard/landlord" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
          <Home size={20} /> <span>Dashboard</span>
        </Link>

        {/* Tenant Menu */}
        <div>
          <button
            onClick={() => setTenantMenuOpen(!tenantMenuOpen)}
            className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <Users size={20} /> <span>Tenants</span>
            </div>
            {tenantMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {tenantMenuOpen && (
            <div className="flex flex-col ml-6 mt-2 gap-1">
              <Link to="/dashboard/landlord/tenants/all" className="p-2 rounded hover:bg-slate-700">All Tenants</Link>
              <Link to="/dashboard/landlord/tenants/add" className="p-2 rounded hover:bg-slate-700">Add Tenant</Link>
              <Link to="/dashboard/landlord/tenants/assign-unit" className="p-2 rounded hover:bg-slate-700">Assign Unit</Link>
            </div>
          )}
        </div>

        {/* Property Menu */}
        <div>
          <button
            onClick={() => setPropertyMenuOpen(!propertyMenuOpen)}
            className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <Building2 size={20} /> <span>Properties</span>
            </div>
            {propertyMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {propertyMenuOpen && (
            <div className="flex flex-col ml-6 mt-2 gap-1">
              <Link to="/dashboard/landlord/properties/all" className="p-2 rounded hover:bg-slate-700">All Properties</Link>
              <Link to="/dashboard/landlord/properties/add" className="p-2 rounded hover:bg-slate-700">Add Property</Link>
            </div>
          )}
        </div>

        {/* Payments */}
        <Link to="/dashboard/landlord/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800">
          <Wallet size={20} /> <span>Payments</span>
        </Link>

        {/* Reports */}
        <div>
          <button
            onClick={() => setReportsMenuOpen(!reportsMenuOpen)}
            className="w-full flex justify-between items-center p-3 rounded-lg hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} /> <span>Reports</span>
            </div>
            {reportsMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {reportsMenuOpen && (
            <div className="flex flex-col ml-6 mt-2 gap-1">
              <Link to="/dashboard/landlord/reports/revenue" className="p-2 rounded hover:bg-slate-700">Revenue Report</Link>
              <Link to="/dashboard/landlord/reports/tax" className="p-2 rounded hover:bg-slate-700">Tax Reminder</Link>
              <Link to="/dashboard/landlord/reports/tenants" className="p-2 rounded hover:bg-slate-700">Tenant Report</Link>
            </div>
          )}
        </div>
      </nav>
    </motion.aside>
  );
}
