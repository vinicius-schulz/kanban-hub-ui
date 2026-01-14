import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { HealthPage } from "@/modules/healthcheck/presentation/pages/HealthPage";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingState message="Carregando rota..." />}>
      <Routes>
        <Route path={routePaths.health} element={<HealthPage />} />
      </Routes>
    </Suspense>
  );
};
