import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { RequireAuth } from "@/modules/auth/presentation/guards/RequireAuth";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { ModuleDetailPage } from "@/modules/modules/presentation/pages/ModuleDetailPage";
import { ModulesPage } from "@/modules/modules/presentation/pages/ModulesPage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingState message="Carregando rota..." />}>
      <Routes>
        <Route path={routePaths.login} element={<LoginPage />} />
        <Route
          path={routePaths.modules}
          element={
            <RequireAuth>
              <ModulesPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.moduleDetail}
          element={
            <RequireAuth>
              <ModuleDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={<Navigate to={routePaths.login} replace />}
        />
      </Routes>
    </Suspense>
  );
};
