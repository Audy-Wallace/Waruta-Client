import { Navigate } from "react-router-dom";
const Navguard = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    return <Navigate to={-1} replace />;
  }

  return children;
};

export default Navguard;
