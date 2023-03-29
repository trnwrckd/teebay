import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  user,
  redirectPath = '/login',
  children,
}) {
  if (!user) return <Navigate to={redirectPath} replace />;
  return children;
}
