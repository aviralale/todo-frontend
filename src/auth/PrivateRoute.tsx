import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  // Redirect non-logged-in users to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Allow access to private routes for logged-in users
  return <Outlet />;
};

export default PrivateRoute;
