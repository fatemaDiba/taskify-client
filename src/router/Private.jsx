import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const Private = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/sign-in" />;
};

export default Private;
