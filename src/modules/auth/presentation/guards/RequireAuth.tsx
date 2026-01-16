import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppSelector } from "@/app/store/typedHooks";
import { selectIsAuthenticated } from "@/modules/auth/presentation/state/selectors";

interface RequireAuthProps {
  children: React.ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={routePaths.login} state={{ from: location }} replace />
    );
  }

  return children;
};
