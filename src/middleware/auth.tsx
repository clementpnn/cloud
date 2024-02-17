import { jwtDecode } from "jwt-decode";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: string
): React.FC<P> => {
  return (props: P) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
      try {
        jwtDecode(token as string);
      } catch (error) {
        navigate({ to: "/" });
        return;
      }

      if (!token || role !== requiredRole) {
        navigate({ to: "/" });
        setIsAuthorized(false);
      }
    }, [token, role, navigate]);

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
