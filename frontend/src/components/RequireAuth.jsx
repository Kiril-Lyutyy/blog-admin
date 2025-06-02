import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ children, permission }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // TODO: implement 403 page
  if (permission && !user.permissions?.includes(permission)) {
    return <div>Access Denied: Missing permission "{permission}"</div>;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;
