import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandlordDashboard from './pages/dashboards/landlord/LandlordDashboard';
import AddTenant from './pages/dashboards/landlord/AddTenant';
import ManageTenants from './pages/dashboards/landlord/ManageTenants';
import AddProperty from './pages/dashboards/landlord/AddProperty';
import ManageProperties from './pages/dashboards/landlord/ManageProperties';
import ETIMS from './pages/dashboards/landlord/ETIMS';
import TenantDashboard from './pages/dashboards/TenantDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import SupportDashboard from './pages/dashboards/SupportDashboard';
import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Home';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* Landlord */}
        <Route path="landlord" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <LandlordDashboard />
          </ProtectedRoute>
        } />
        <Route path="landlord/add-tenant" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <AddTenant />
          </ProtectedRoute>
        } />
        <Route path="landlord/manage-tenants" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <ManageTenants />
          </ProtectedRoute>
        } />
        <Route path="landlord/add-property" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <AddProperty />
          </ProtectedRoute>
        } />
        <Route path="landlord/manage-properties" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <ManageProperties />
          </ProtectedRoute>
        } />
        <Route path="landlord/etims" element={
          <ProtectedRoute allowedRoles={['landlord']}>
            <ETIMS />
          </ProtectedRoute>
        } />

        {/* Tenant */}
        <Route path="tenant" element={
          <ProtectedRoute allowedRoles={['tenant']}>
            <TenantDashboard />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Support */}
        <Route path="support" element={
          <ProtectedRoute allowedRoles={['support']}>
            <SupportDashboard />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<div className="p-8">404 — not found</div>} />
    </Routes>
  );
}
