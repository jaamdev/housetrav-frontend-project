import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';

export default function ProtectedRoute() {
  const {
    state: { authenticated, loading },
  } = useAuth();

  if (loading) return <h2 className="loading-ctn">Cargando...</h2>;
  if (!authenticated && !loading) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
