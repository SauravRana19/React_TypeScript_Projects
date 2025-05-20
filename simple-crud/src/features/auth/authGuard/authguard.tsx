import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../core/CommonInterface";
import { getUserRole } from "../../../core/Common";

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
  const dispatch = useDispatch();
  dispatch(getUserRole())
  const role = useSelector((state: State) => state?.commonMethods?.role);
  
  if (!role) return <Navigate to={redirectTo} replace />;

  if (allowedRoles.includes(role))
    return <>{children}</>;

  return <Navigate to="/forbidden" replace />;
};

