import React from "react";
import { Navigate } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppSelector } from "@/app/store/typedHooks";
import { selectIsAuthenticated } from "@/modules/auth/presentation/state/selectors";

interface AuthGuardProps {
  children: React.ReactElement;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={routePaths.login} replace />;
  }

  return children;
};
