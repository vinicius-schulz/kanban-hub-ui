import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { RequireAuth } from "@/modules/auth/presentation/guards/RequireAuth";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { AdminBoardsPage } from "@/modules/admin/presentation/pages/AdminBoardsPage";
import { AdminCardTypesPage } from "@/modules/admin/presentation/pages/AdminCardTypesPage";
import { AdminConnectorsPage } from "@/modules/admin/presentation/pages/AdminConnectorsPage";
import { AdminIngressSourcesPage } from "@/modules/admin/presentation/pages/AdminIngressSourcesPage";
import { AdminModulesPage } from "@/modules/admin/presentation/pages/AdminModulesPage";
import { AdminPluginsPage } from "@/modules/admin/presentation/pages/AdminPluginsPage";
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
          path={routePaths.adminModules}
          element={
            <RequireAuth>
              <AdminModulesPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.adminBoards}
          element={
            <RequireAuth>
              <AdminBoardsPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.adminCardTypes}
          element={
            <RequireAuth>
              <AdminCardTypesPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.adminIngressSources}
          element={
            <RequireAuth>
              <AdminIngressSourcesPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.adminPlugins}
          element={
            <RequireAuth>
              <AdminPluginsPage />
            </RequireAuth>
          }
        />
        <Route
          path={routePaths.adminConnectors}
          element={
            <RequireAuth>
              <AdminConnectorsPage />
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
