import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Location } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppDispatch, useAppSelector } from "@/app/store/typedHooks";
import type { AuthCredentials } from "@/modules/auth/domain/auth.contracts";
import { loginMock } from "@/modules/auth/presentation/state/authSlice";
import { selectIsAuthenticated } from "@/modules/auth/presentation/state/selectors";

interface LocationState {
  from?: Location;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: "operacional@kanbanhub.local",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routePaths.modules, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginMock(credentials));

    const state = location.state as LocationState | null;
    const destination = state?.from?.pathname ?? routePaths.modules;
    navigate(destination, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Box>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Kanban Hub
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Faça login para acessar seus módulos.
              </Typography>
            </Box>
            <TextField
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(event) =>
                setCredentials((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              fullWidth
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              fullWidth
              required
            />
            <Button type="submit" variant="contained" size="large">
              Entrar
            </Button>
            <Typography variant="caption" color="text.secondary">
              Ambiente mock: qualquer credencial é aceita.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
