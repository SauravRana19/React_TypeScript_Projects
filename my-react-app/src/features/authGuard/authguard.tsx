import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userRoleContext } from "../../core/common";

interface AuthGuardProps {
  allowedRoles?: string[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export const AuthGuard = ({ 
  allowedRoles = [], 
  redirectTo = "/signup",
  children
}: AuthGuardProps) => {
  const role = useContext(userRoleContext);
  if (children) {
    if (role && (allowedRoles.length === 0 || allowedRoles.includes(role))) {
      return <>{children}</>;
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <Navigate to={redirectTo} replace />;
};