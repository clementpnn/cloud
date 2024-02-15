import { jwtDecode } from "jwt-decode";

import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useConfetti from "@/hooks/useConfetti";
import useUser from "@/hooks/useUser";

interface JwtPayload {
  role: string;
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: string
): React.FC<P> => {
  return (props: P) => {
    const navigate = useNavigate();
    const { token, role } = useUser();

    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
      try {
        jwtDecode<JwtPayload>(token);
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

    useConfetti();

    return <Component {...props} />;
  };
};

export default withAuth;
