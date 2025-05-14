import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userRoleContext } from "../../../core/common";


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
  const role = useContext(userRoleContext);

  if (!role) {
    return <Navigate to={redirectTo} replace />;
  }
  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return <Navigate to={redirectTo} replace />;
};
