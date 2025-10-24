import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: 'buyer' | 'creator';
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9E0B61] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!user || !profile) {
    return <Navigate to="/signin" replace />;
  }

  // Check if user type matches required type
  if (requiredUserType && profile.user_type !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    if (profile.user_type === 'buyer') {
      return <Navigate to="/buyer-dashboard" replace />;
    } else {
      return <Navigate to="/creator/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

