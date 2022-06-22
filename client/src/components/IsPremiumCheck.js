import { Navigate } from "react-router-dom";
const IsPremiumCheck = ({ children }) => {
    const premStatus = localStorage.getItem("warutapr");

    if (premStatus !== 'asdadsa') {
        return <Navigate to={-1} replace />;
    }

    return children;
};

export default IsPremiumCheck;