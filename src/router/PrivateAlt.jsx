import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const PrivateAlt = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/" />;
};

export default PrivateAlt;
