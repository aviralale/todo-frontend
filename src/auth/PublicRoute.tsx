import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
  const { isLoggedIn } = useAuth();

  // Redirect logged-in users away from public routes
  if (isLoggedIn) {
    return <Navigate to="/tasks" />;
  }

  // Allow access to public routes for non-logged-in users
  return <Outlet />;
};

export default PublicRoute;
