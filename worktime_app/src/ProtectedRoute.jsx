import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./services/useUser";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && requiredRoles && !requiredRoles.includes(user.rightapp)) {
      alert('Brak uprawnień');
    }
  }, [user, requiredRoles]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRoles && !requiredRoles.includes(user.rightapp)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;