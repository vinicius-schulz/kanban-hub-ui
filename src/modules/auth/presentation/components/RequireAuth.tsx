import { Navigate, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { routePaths } from "@/app/routes/routePaths";
import { useAppSelector } from "@/app/store/typedHooks";
import { selectIsAuthenticated } from "@/modules/auth/application/selectors";

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={routePaths.login}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};
