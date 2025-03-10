import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return <Navigate to="/email" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
