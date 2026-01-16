import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography
} from "@mui/material";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { HealthCard } from "@/modules/healthcheck/presentation/components/HealthCard";
import { useGetHealthQuery } from "@/modules/healthcheck/presentation/state/healthApi";
import { useAppDispatch } from "@/app/store/typedHooks";
import { setHealthStatus } from "@/modules/healthcheck/presentation/state/healthSlice";
import { APP_NAME } from "@/app/config/constants";

export const HealthPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, refetch } = useGetHealthQuery();

  useEffect(() => {
    if (data) {
      dispatch(setHealthStatus(data));
    }
  }, [data, dispatch]);

  const header = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h2" component="span">
        {APP_NAME}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Operacional
      </Typography>
    </Stack>
  );

  const nav = (
    <Stack spacing={2}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Navegação
        </Typography>
        <Typography variant="body1">Módulos</Typography>
      </Box>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Administração
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Disponível para Admin
        </Typography>
      </Box>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Healthcheck
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Verificação end-to-end da infraestrutura de API e store.
        </Typography>
      </Box>
      {isLoading ? (
        <LoadingState />
      ) : null}
      {isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível obter o status de saúde.
        </Alert>
      ) : null}
      {data ? <HealthCard data={data} /> : null}
    </Stack>
  );

  return <PageLayout header={header} nav={nav} content={content} />;
};
