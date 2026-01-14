import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppDispatch, useAppSelector } from "@/app/store/typedHooks";
import { clearSession } from "@/modules/auth/application/authSlice";
import { selectAuthSession } from "@/modules/auth/application/selectors";
import { modulesMock } from "@/modules/modules/infra/modulesMock";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";

export const ModulesPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const session = useAppSelector(selectAuthSession);

  const handleLogout = () => {
    dispatch(clearSession());
    navigate(routePaths.login);
  };

  return (
    <PageLayout
      title="Módulos disponíveis"
      subtitle="Selecione o módulo que deseja acompanhar no Kanban Hub."
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              Sessão ativa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {session?.user.name ?? "Usuário"} · {session?.user.role ?? ""}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {modulesMock.map((module) => (
            <Grid item xs={12} md={6} key={module.id}>
              <Card elevation={2}>
                <CardContent>
                  <Stack spacing={1.5}>
                    <Typography variant="h6" fontWeight={600}>
                      {module.name ?? "Módulo"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {module.id}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      disabled
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Em breve
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </PageLayout>
  );
};
