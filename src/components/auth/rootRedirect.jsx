import { useAuth } from "../../helpers/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const { user } = useAuth(); 
  if (!user) {
    return <Navigate to="/signin" replace />; 
  }
  if (user.role === "ADMIN") {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (user.role === "DOCTOR") {
    return <Navigate to="/doctor-dashboard" replace />;
  } else {
    return <Navigate to="/user-dashboard" replace />;
  }
};

export default RootRedirect;