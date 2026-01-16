import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { LoginPage } from "@/modules/auth/presentation/pages/LoginPage";
import { BoardKanbanPage } from "@/modules/board/presentation/pages/BoardKanbanPage";
import { ModuleDetailPage } from "@/modules/modules/presentation/pages/ModuleDetailPage";
import { ModulesPage } from "@/modules/modules/presentation/pages/ModulesPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routePaths.root} element={<Navigate to={routePaths.login} replace />} />
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path={routePaths.modules} element={<ModulesPage />} />
      <Route path={routePaths.moduleDetail} element={<ModuleDetailPage />} />
      <Route path={routePaths.boardKanban} element={<BoardKanbanPage />} />
      <Route path="*" element={<Navigate to={routePaths.login} replace />} />
    </Routes>
  );
};
