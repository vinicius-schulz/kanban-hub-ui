import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { APP_NAME } from "@/app/config/constants";
import { routePaths } from "@/app/routes/routePaths";
import { mockAuthenticate, persistSession, getStoredSession } from "@/modules/auth/infra/mockAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const storedSession = useMemo(() => getStoredSession(), []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (storedSession) {
      navigate(routePaths.modules, { replace: true });
    }
  }, [navigate, storedSession]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await mockAuthenticate({ username, password });
      persistSession(result);
      navigate(routePaths.modules, { replace: true });
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Credenciais inválidas.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const header = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h2" component="span">
        {APP_NAME}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Acesso seguro
      </Typography>
    </Stack>
  );

  const content = (
    <Box display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Entrar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use o acesso mockado para continuar para seus módulos.
              </Typography>
            </Box>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <TextField
              label="Usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              fullWidth
              required
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="admin"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <Typography variant="caption" color="text.secondary">
              Mock: usuário <strong>admin</strong> com qualquer senha (somente usuário admin é válido).
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );

  return <PageLayout header={header} content={content} />;
};
