import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../core/CommonInterface";
import { getAuthToken, getUserRole } from "../../../core/Common";
import { useEffect } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: State) => state?.commonMethods?.authToken);
  const role = useSelector((state: State) => state?.commonMethods?.role);

  useEffect(() => {
    dispatch(getUserRole());
    dispatch(getAuthToken());
  }, [dispatch]);

  if (authToken) {
    const homePath = role === "admin" ? "/dashboard" : "/blog";
    return <Navigate to={homePath} replace />;
  }

  return <>{children}</>;
};
