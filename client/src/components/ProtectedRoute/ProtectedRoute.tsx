import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  return (allowedRoles.length === 0 && auth.accessToken) ||
    auth.roles?.some((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
