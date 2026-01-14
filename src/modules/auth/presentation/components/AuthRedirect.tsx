import React from "react";
import { Navigate } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppSelector } from "@/app/store/typedHooks";
import { selectIsAuthenticated } from "@/modules/auth/presentation/state/selectors";

export const AuthRedirect = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const destination = isAuthenticated ? routePaths.modules : routePaths.login;

  return <Navigate to={destination} replace />;
};
