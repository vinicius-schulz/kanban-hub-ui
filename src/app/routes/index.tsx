import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppSelector } from "@/app/store/typedHooks";
import { selectIsAuthenticated } from "@/modules/auth/application/selectors";
import { RequireAuth } from "@/modules/auth/presentation/components/RequireAuth";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { HealthPage } from "@/modules/healthcheck/presentation/pages/HealthPage";
import { ModulesPage } from "@/modules/modules/presentation/pages/ModulesPage";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";

const RootRedirect = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return (
    <Navigate
      to={isAuthenticated ? routePaths.modules : routePaths.login}
      replace
    />
  );
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingState message="Carregando rota..." />}>
      <Routes>
        <Route path={routePaths.root} element={<RootRedirect />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route
          path={routePaths.modules}
          element={
            <RequireAuth>
              <ModulesPage />
            </RequireAuth>
          }
        />
        <Route path={routePaths.health} element={<HealthPage />} />
      </Routes>
    </Suspense>
  );
};
