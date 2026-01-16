import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { ModulesNav } from "@/modules/modules/presentation/components/ModulesNav";
import { APP_NAME } from "@/app/config/constants";
import { fixtures } from "@/core/domain/domain.fixtures";
import { routePaths } from "@/app/routes/routePaths";

export const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const moduleInfo = useMemo(
    () => fixtures.modules.find((module) => module.id === moduleId),
    [moduleId]
  );

  const header = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h2" component="span">
        {APP_NAME}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Detalhe do módulo
      </Typography>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {moduleInfo?.name ?? "Módulo"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moduleInfo?.description ?? "Módulo selecionado para navegação futura."}
        </Typography>
      </Box>
      <Box padding={3} bgcolor="background.paper" borderRadius={2}>
        <Typography variant="body1">
          A árvore do módulo será disponibilizada no próximo incremento.
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <PageLayout
      header={header}
      nav={<ModulesNav activePath={routePaths.modules} />}
      content={content}
    />
  );
};
