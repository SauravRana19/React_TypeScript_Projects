import { Navigate } from "react-router-dom";
import { getUserRole } from "../../../core/common";
interface AuthGuardProps {
  allowedRoles?: string[];
  redirectTo?: string;
  children: React.ReactNode;
}

export const AuthGuard = ({
  allowedRoles = [],
  redirectTo = "/signin",
  children,
}: AuthGuardProps) => {
  const role = getUserRole();
  if (!role) return <Navigate to={redirectTo} replace />;

  if (allowedRoles.length === 0 || allowedRoles.includes(role)) return <>{children}</>
  
  return <Navigate to="/forbidden" replace />;
};
