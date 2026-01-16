import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import type { BoardId, WebhookMethod } from "@/modules/_shared/domain/domain.contracts";
import {
  adminBoardFixtures,
  adminWebhookFixtures,
} from "@/modules/admin/infra/admin.fixtures";
import type { BoardWebhook } from "@/modules/boards/infra/boardWebhooks.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId, formatJson, parseJsonField } from "@/modules/admin/presentation/utils/adminUtils";

const webhookMethods: WebhookMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export const AdminConnectorsPage = () => {
  const [webhooks, setWebhooks] = useState<BoardWebhook[]>(() =>
    adminWebhookFixtures.map((item) => ({ ...item }))
  );
  const [headersJsonById, setHeadersJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(adminWebhookFixtures.map((item) => [item.id, formatJson(item.headers ?? {})]))
  );
  const [authJsonById, setAuthJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(adminWebhookFixtures.map((item) => [item.id, formatJson(item.auth ?? {})]))
  );
  const [templateJsonById, setTemplateJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(adminWebhookFixtures.map((item) => [item.id, formatJson(item.bodyTemplate ?? {})]))
  );
  const [errorsById, setErrorsById] = useState<Record<string, string>>({});

  const boardOptions = useMemo(() => adminBoardFixtures, []);

  const handleUpdate = (id: BoardWebhook["id"], updates: Partial<BoardWebhook>) => {
    setWebhooks((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleJsonBlur = (id: BoardWebhook["id"], field: "headers" | "auth" | "bodyTemplate", value: string) => {
    const result = parseJsonField(value);
    if (result.error) {
      setErrorsById((prev) => ({ ...prev, [id]: result.error }));
      return;
    }

    setErrorsById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });

    handleUpdate(id, { [field]: result.value } as Partial<BoardWebhook>);
  };

  const handleAdd = () => {
    const newId = createAdminId("webhook") as BoardWebhook["id"];
    const newBoardId = boardOptions[0]?.id as BoardId;
    setWebhooks((prev) => [
      ...prev,
      {
        id: newId,
        boardId: newBoardId,
        name: "Novo conector",
        url: "https://",
        method: "POST",
        headers: {},
        auth: {},
        bodyTemplate: {},
      },
    ]);
    setHeadersJsonById((prev) => ({ ...prev, [newId]: formatJson({}) }));
    setAuthJsonById((prev) => ({ ...prev, [newId]: formatJson({}) }));
    setTemplateJsonById((prev) => ({ ...prev, [newId]: formatJson({}) }));
  };

  const handleRemove = (id: BoardWebhook["id"]) => {
    setWebhooks((prev) => prev.filter((item) => item.id !== id));
    setHeadersJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setAuthJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setTemplateJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AdminPageLayout
      title="Administração de conectores webhook"
      subtitle="Cadastre conectores de saída para ações manuais. Persistência mock em memória."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {webhooks.map((item) => (
            <Stack key={item.id} spacing={2}>
              {errorsById[item.id] ? <Alert severity="error">{errorsById[item.id]}</Alert> : null}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.5fr 1.5fr 1fr 1fr auto" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Nome"
                  value={item.name ?? ""}
                  onChange={(event) => handleUpdate(item.id, { name: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="URL"
                  value={item.url ?? ""}
                  onChange={(event) => handleUpdate(item.id, { url: event.target.value })}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id={`method-label-${item.id}`}>Método</InputLabel>
                  <Select
                    labelId={`method-label-${item.id}`}
                    label="Método"
                    value={item.method ?? "POST"}
                    onChange={(event) => handleUpdate(item.id, { method: event.target.value as WebhookMethod })}
                  >
                    {webhookMethods.map((method) => (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id={`board-label-${item.id}`}>Board</InputLabel>
                  <Select
                    labelId={`board-label-${item.id}`}
                    label="Board"
                    value={item.boardId}
                    onChange={(event) => handleUpdate(item.id, { boardId: event.target.value as BoardId })}
                  >
                    {boardOptions.map((board) => (
                      <MenuItem key={board.id} value={board.id}>
                        {board.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="Remover conector" onClick={() => handleRemove(item.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              <TextField
                label="Headers (JSON)"
                value={headersJsonById[item.id] ?? ""}
                onChange={(event) => setHeadersJsonById((prev) => ({ ...prev, [item.id]: event.target.value }))}
                onBlur={() => handleJsonBlur(item.id, "headers", headersJsonById[item.id] ?? "")}
                multiline
                minRows={3}
                fullWidth
              />
              <TextField
                label="Auth (JSON)"
                value={authJsonById[item.id] ?? ""}
                onChange={(event) => setAuthJsonById((prev) => ({ ...prev, [item.id]: event.target.value }))}
                onBlur={() => handleJsonBlur(item.id, "auth", authJsonById[item.id] ?? "")}
                multiline
                minRows={3}
                fullWidth
              />
              <TextField
                label="Body Template (JSON)"
                value={templateJsonById[item.id] ?? ""}
                onChange={(event) => setTemplateJsonById((prev) => ({ ...prev, [item.id]: event.target.value }))}
                onBlur={() => handleJsonBlur(item.id, "bodyTemplate", templateJsonById[item.id] ?? "")}
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          ))}
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar conector
          </Button>
        </Stack>
      </Paper>
    </AdminPageLayout>
  );
};
