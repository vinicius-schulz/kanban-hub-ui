import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppDispatch, useAppSelector } from "@/app/store/typedHooks";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { userFixture } from "@/modules/_shared/domain/domain.fixtures";
import { login } from "@/modules/auth/presentation/state/authSlice";
import { selectIsAuthenticated } from "@/modules/auth/presentation/state/selectors";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(
    () => email.trim() !== "" && password.trim() !== "",
    [email, password],
  );

  if (isAuthenticated) {
    return <Navigate to={routePaths.modules} replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(userFixture));
    navigate(routePaths.modules);
  };

  return (
    <PageLayout
      title="Entrar no Kanban Hub"
      subtitle="Use suas credenciais para acessar os módulos disponíveis."
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Acesso do usuário
              </Typography>
              <TextField
                label="E-mail"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <Button type="submit" variant="contained" disabled={!canSubmit}>
                Entrar
              </Button>
              <Typography variant="caption" color="text.secondary">
                Sessão mockada para o MVP — qualquer credencial válida será aceita.
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};
