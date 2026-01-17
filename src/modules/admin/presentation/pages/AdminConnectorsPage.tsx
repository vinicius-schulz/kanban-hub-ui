import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import type {
  JsonValue,
  WebhookConnector,
  WebhookConnectorId,
  WebhookConnectorMethod
} from "@/core/domain/domain.contracts";
import { fixtures } from "@/core/domain/domain.fixtures";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { AdminNav } from "@/modules/admin/presentation/components/AdminNav";
import { AdminPageHeader } from "@/modules/admin/presentation/components/AdminPageHeader";
import { routePaths } from "@/app/routes/routePaths";

const asId = <T,>(value: string) => value as T;

const methods: WebhookConnectorMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const parseJsonValue = (value: string): { parsed: JsonValue | null; error: string | null } => {
  if (!value.trim()) {
    return { parsed: null, error: null };
  }

  try {
    return { parsed: JSON.parse(value) as JsonValue, error: null };
  } catch {
    return { parsed: null, error: "JSON inválido" };
  }
};

export const AdminConnectorsPage = () => {
  const [connectors, setConnectors] = useState<WebhookConnector[]>(fixtures.webhookConnectors);
  const [editingId, setEditingId] = useState<WebhookConnectorId | null>(null);

  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<WebhookConnectorMethod>(methods[1]);
  const [headers, setHeaders] = useState("");
  const [auth, setAuth] = useState("");
  const [bodyTemplate, setBodyTemplate] = useState("");
  const [headersError, setHeadersError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setUrl("");
    setMethod(methods[1]);
    setHeaders("");
    setAuth("");
    setBodyTemplate("");
    setHeadersError(null);
    setAuthError(null);
    setBodyError(null);
  };

  const handleSave = () => {
    if (!url.trim()) {
      return;
    }

    const headersParsed = parseJsonValue(headers);
    const authParsed = parseJsonValue(auth);
    const bodyParsed = parseJsonValue(bodyTemplate);
    setHeadersError(headersParsed.error);
    setAuthError(authParsed.error);
    setBodyError(bodyParsed.error);

    if (headersParsed.error || authParsed.error || bodyParsed.error) {
      return;
    }

    if (editingId) {
      setConnectors((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                url: url.trim(),
                method,
                headers: headersParsed.parsed,
                auth: authParsed.parsed,
                bodyTemplate: bodyParsed.parsed
              }
            : item
        )
      );
      resetForm();
      return;
    }

    const newConnector: WebhookConnector = {
      id: asId<WebhookConnectorId>(`wh-${Date.now()}`),
      url: url.trim(),
      method,
      headers: headersParsed.parsed,
      auth: authParsed.parsed,
      bodyTemplate: bodyParsed.parsed
    };

    setConnectors((prev) => [...prev, newConnector]);
    resetForm();
  };

  const handleEdit = (item: WebhookConnector) => {
    setEditingId(item.id);
    setUrl(item.url);
    setMethod(item.method);
    setHeaders(item.headers ? JSON.stringify(item.headers, null, 2) : "");
    setAuth(item.auth ? JSON.stringify(item.auth, null, 2) : "");
    setBodyTemplate(item.bodyTemplate ? JSON.stringify(item.bodyTemplate, null, 2) : "");
  };

  const handleDelete = (id: WebhookConnectorId) => {
    setConnectors((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const header = <AdminPageHeader title="Administração de Conectores" />;

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Conectores Webhook
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cadastre URLs, métodos e templates para execução manual nos cards.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", padding: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{editingId ? "Editar conector" : "Novo conector"}</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="method-select">Método</InputLabel>
              <Select
                labelId="method-select"
                label="Método"
                value={method}
                onChange={(event) => setMethod(event.target.value as WebhookConnectorMethod)}
              >
                {methods.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Headers (JSON)"
              value={headers}
              onChange={(event) => setHeaders(event.target.value)}
              error={Boolean(headersError)}
              helperText={headersError ?? "Opcional"}
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              label="Auth (JSON)"
              value={auth}
              onChange={(event) => setAuth(event.target.value)}
              error={Boolean(authError)}
              helperText={authError ?? "Opcional"}
              multiline
              minRows={3}
              fullWidth
            />
          </Stack>
          <TextField
            label="Body Template (JSON)"
            value={bodyTemplate}
            onChange={(event) => setBodyTemplate(event.target.value)}
            error={Boolean(bodyError)}
            helperText={bodyError ?? "Opcional"}
            multiline
            minRows={3}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave}>
              {editingId ? "Salvar" : "Criar"}
            </Button>
            <Button variant="text" onClick={resetForm}>
              Limpar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Conectores cadastrados</Typography>
            {connectors.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum conector cadastrado.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {connectors.map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ padding: 2 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
                      <Box flex={1}>
                        <Typography variant="subtitle1">{item.url}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.method} • Headers: {item.headers ? "configurado" : "-"} • Auth:{" "}
                          {item.auth ? "configurado" : "-"}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Button variant="text" onClick={() => handleEdit(item)}>
                          Editar
                        </Button>
                        <Button variant="text" color="error" onClick={() => handleDelete(item.id)}>
                          Excluir
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );

  return (
    <PageLayout
      header={header}
      nav={<AdminNav activePath={routePaths.adminConnectors} />}
      content={content}
    />
  );
};
