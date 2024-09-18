import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ element}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}