import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { useAppDispatch, useAppSelector } from "@/app/store/typedHooks";
import { setSession } from "@/modules/auth/application/authSlice";
import {
  selectIsAuthenticated,
  selectAuthStatus,
} from "@/modules/auth/application/selectors";
import { mockLogin } from "@/modules/auth/infra/authMock";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";

const defaultEmail = "operador@kanbanhub.local";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authStatus = useAppSelector(selectAuthStatus);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("demo");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: Location } | null;
    return state?.from?.pathname ?? routePaths.modules;
  }, [location.state]);

  if (isAuthenticated) {
    return <Navigate to={routePaths.modules} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const session = await mockLogin(email, password);
    dispatch(setSession(session));
    setSubmitting(false);
    navigate(redirectTo, { replace: true });
  };

  const isDisabled = !email || !password || submitting;

  return (
    <PageLayout
      title="Acesso ao Kanban Hub"
      subtitle="Use uma conta mock para acessar os módulos disponíveis."
    >
      <Card elevation={2} sx={{ maxWidth: 480 }}>
        <CardContent>
          <Stack component="form" spacing={3} onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              fullWidth
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isDisabled}
            >
              {authStatus === "authenticated" || submitting
                ? "Entrando..."
                : "Entrar"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </PageLayout>
  );
};
