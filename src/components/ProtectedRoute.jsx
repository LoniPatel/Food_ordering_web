import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login/Login';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-emerald-400">Loading Configuration...</div>;
  if (!user) return <Login />;
  if (allowedRole && user.role !== allowedRole) {
    return <div className="p-8 text-center text-red-400 font-medium">Access Denied: Unauthorized Domain Profile</div>;
  }

  return children;
};
