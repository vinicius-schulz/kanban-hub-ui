import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
  Button
} from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { ModulesNav } from "@/modules/modules/presentation/components/ModulesNav";
import { APP_NAME } from "@/app/config/constants";
import { routePaths } from "@/app/routes/routePaths";
import { fixtures } from "@/core/domain/domain.fixtures";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";

export const ModulesPage = () => {
  const navigate = useNavigate();
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const sessionSnapshot = useMemo(() => getStoredSession(), []);

  useEffect(() => {
    setIsSessionChecked(true);
  }, []);

  useEffect(() => {
    if (isSessionChecked && !sessionSnapshot) {
      navigate(routePaths.login, { replace: true });
    }
  }, [isSessionChecked, navigate, sessionSnapshot]);

  const header = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h2" component="span">
        {APP_NAME}
      </Typography>
      <Box textAlign="right">
        <Typography variant="body2" color="text.secondary">
          Sessão ativa
        </Typography>
        <Typography variant="subtitle2">{sessionSnapshot?.user.username ?? ""}</Typography>
      </Box>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Módulos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Selecione uma área para continuar o fluxo operacional.
        </Typography>
      </Box>

      {fixtures.modules.length === 0 ? (
        <Box padding={3} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="body1">Nenhum módulo disponível para este perfil.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {fixtures.modules.map((module) => (
            <Grid item xs={12} md={6} key={module.id}>
              <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">{module.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {module.description || "Sem descrição definida."}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button
                    variant="text"
                    onClick={() =>
                      navigate(
                        generatePath(routePaths.moduleDetail, {
                          moduleId: module.id
                        })
                      )
                    }
                  >
                    Abrir módulo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );

  if (!isSessionChecked) {
    return <LoadingState />;
  }

  return (
    <PageLayout
      header={header}
      nav={<ModulesNav activePath={routePaths.modules} />}
      content={content}
    />
  );
};
