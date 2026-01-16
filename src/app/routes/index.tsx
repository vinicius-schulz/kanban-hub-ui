import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { HealthPage } from "@/modules/healthcheck/presentation/pages/HealthPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routePaths.root} element={<HealthPage />} />
      <Route path="*" element={<Navigate to={routePaths.root} replace />} />
    </Routes>
  );
};
