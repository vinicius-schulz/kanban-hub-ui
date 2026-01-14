import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "@/app/store/typedHooks";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { selectCurrentUser } from "@/modules/auth/presentation/state/selectors";
import { selectModules } from "@/modules/modules/presentation/state/selectors";

export const ModulesPage = () => {
  const modules = useAppSelector(selectModules);
  const user = useAppSelector(selectCurrentUser);

  return (
    <PageLayout
      title="Módulos disponíveis"
      subtitle="Selecione o módulo para acessar os boards vinculados."
    >
      <Stack spacing={3}>
        <Typography variant="subtitle1" color="text.secondary">
          Sessão ativa: {user?.role ?? "Usuário"}
        </Typography>
        <Stack spacing={2}>
          {modules.map((module) => (
            <Card key={module.id}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {module.name ?? "Módulo sem nome"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acesso liberado para operação e acompanhamento do fluxo.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </PageLayout>
  );
};
