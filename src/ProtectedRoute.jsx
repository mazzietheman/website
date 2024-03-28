import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { checkLogin } = useAuth();

  const email = checkLogin();

  if (!email) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
