import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { HealthPage } from "@/modules/healthcheck/presentation/pages/HealthPage";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { AuthGuard } from "@/modules/auth/presentation/components/AuthGuard";
import { AuthRedirect } from "@/modules/auth/presentation/components/AuthRedirect";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { ModulesPage } from "@/modules/modules/presentation/pages/ModulesPage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingState message="Carregando rota..." />}>
      <Routes>
        <Route path={routePaths.root} element={<AuthRedirect />} />
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route
          path={routePaths.modules}
          element={
            <AuthGuard>
              <ModulesPage />
            </AuthGuard>
          }
        />
        <Route path={routePaths.health} element={<HealthPage />} />
        <Route
          path="*"
          element={<Navigate to={routePaths.root} replace />}
        />
      </Routes>
    </Suspense>
  );
};
