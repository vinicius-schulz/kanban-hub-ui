import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useMemo, useState } from "react";
import type {
  Board,
  Column,
  IngressSource,
  Label,
  Webhook,
  WebhookMethod,
} from "@/modules/_shared/domain/domain.contracts";
import type { BoardConfig } from "@/modules/boards/application/boardConfigState";

interface BoardSettingsDialogProps {
  open: boolean;
  board: Board;
  config: BoardConfig;
  onClose: () => void;
  onSave: (config: BoardConfig) => void;
}

const webhookMethods: WebhookMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const formatJson = (value: unknown) => {
  return JSON.stringify(value ?? {}, null, 2);
};

const createTempId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
};

export const BoardSettingsDialog = ({ open, board, config, onClose, onSave }: BoardSettingsDialogProps) => {
  const [draftConfig, setDraftConfig] = useState<BoardConfig>(config);
  const [cardTypeFieldsJson, setCardTypeFieldsJson] = useState("");
  const [ingressSchemaById, setIngressSchemaById] = useState<Record<string, string>>({});
  const [ingressMappingById, setIngressMappingById] = useState<Record<string, string>>({});
  const [webhookTemplateById, setWebhookTemplateById] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    setDraftConfig(config);
    setCardTypeFieldsJson(formatJson(config.cardType?.fields ?? []));
    setIngressSchemaById(
      config.ingressSources.reduce<Record<string, string>>((acc, source) => {
        acc[source.id] = formatJson(source.schema ?? {});
        return acc;
      }, {})
    );
    setIngressMappingById(
      config.ingressSources.reduce<Record<string, string>>((acc, source) => {
        acc[source.id] = formatJson(source.mapping ?? {});
        return acc;
      }, {})
    );
    setWebhookTemplateById(
      config.webhooks.reduce<Record<string, string>>((acc, webhook) => {
        acc[webhook.id] = formatJson(webhook.bodyTemplate ?? {});
        return acc;
      }, {})
    );
    setErrors(null);
  }, [config, open]);

  const parseJsonValue = useMemo(() => {
    return (value: string) => {
      if (!value.trim()) {
        return {};
      }
      return JSON.parse(value);
    };
  }, []);

  const handleSave = () => {
    setErrors(null);
    try {
      const parsedFields = parseJsonValue(cardTypeFieldsJson);
      const updatedCardType = draftConfig.cardType
        ? {
            ...draftConfig.cardType,
            fields: Array.isArray(parsedFields) ? parsedFields : draftConfig.cardType.fields ?? [],
          }
        : null;

      const updatedIngress = draftConfig.ingressSources.map((source) => ({
        ...source,
        schema: parseJsonValue(ingressSchemaById[source.id] ?? "{}"),
        mapping: parseJsonValue(ingressMappingById[source.id] ?? "{}"),
      }));

      const updatedWebhooks = draftConfig.webhooks.map((webhook) => ({
        ...webhook,
        bodyTemplate: parseJsonValue(webhookTemplateById[webhook.id] ?? "{}"),
      }));

      onSave({
        ...draftConfig,
        cardType: updatedCardType,
        ingressSources: updatedIngress,
        webhooks: updatedWebhooks,
      });
      onClose();
    } catch (error) {
      setErrors("Falha ao interpretar JSON. Verifique os campos e tente novamente.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={600}>
            Configuração do board
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Editando {board.name ?? "board"} • Persistência mock em memória.
          </Typography>
        </Stack>
        <IconButton
          aria-label="Fechar"
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {errors ? <Alert severity="error">{errors}</Alert> : null}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Colunas
            </Typography>
            <Stack spacing={2}>
              {draftConfig.columns.map((column) => (
                <Stack key={column.id} direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Nome"
                    value={column.name ?? ""}
                    onChange={(event) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        columns: prev.columns.map((item) =>
                          item.id === column.id ? { ...item, name: event.target.value } : item
                        ),
                      }))
                    }
                    fullWidth
                  />
                  <TextField
                    label="Posição"
                    type="number"
                    value={column.position ?? 0}
                    onChange={(event) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        columns: prev.columns.map((item) =>
                          item.id === column.id
                            ? { ...item, position: Number(event.target.value) }
                            : item
                        ),
                      }))
                    }
                    sx={{ width: { xs: "100%", sm: 140 } }}
                  />
                </Stack>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  setDraftConfig((prev) => ({
                    ...prev,
                    columns: [
                      ...prev.columns,
                      {
                        id: createTempId("column") as Column["id"],
                        name: "Nova coluna",
                        position: (prev.columns.length ?? 0) + 1,
                        boardId: board.id,
                      },
                    ],
                  }))
                }
              >
                Adicionar coluna
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Labels
            </Typography>
            <Stack spacing={2}>
              {draftConfig.labels.map((label) => (
                <Stack key={label.id} direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Nome"
                    value={label.name ?? ""}
                    onChange={(event) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        labels: prev.labels.map((item) =>
                          item.id === label.id ? { ...item, name: event.target.value } : item
                        ),
                      }))
                    }
                    fullWidth
                  />
                  <Button
                    variant="text"
                    color="error"
                    onClick={() =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        labels: prev.labels.filter((item) => item.id !== label.id),
                      }))
                    }
                  >
                    Remover
                  </Button>
                </Stack>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  setDraftConfig((prev) => ({
                    ...prev,
                    labels: [
                      ...prev.labels,
                      {
                        id: createTempId("label") as Label["id"],
                        name: "Nova label",
                        boardId: board.id,
                      },
                    ],
                  }))
                }
              >
                Adicionar label
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              CardType
            </Typography>
            {draftConfig.cardType ? (
              <Stack spacing={2}>
                <TextField
                  label="Nome"
                  value={draftConfig.cardType.name ?? ""}
                  onChange={(event) =>
                    setDraftConfig((prev) => ({
                      ...prev,
                      cardType: prev.cardType
                        ? { ...prev.cardType, name: event.target.value }
                        : prev.cardType,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Campos (JSON)"
                  value={cardTypeFieldsJson}
                  onChange={(event) => setCardTypeFieldsJson(event.target.value)}
                  fullWidth
                  multiline
                  minRows={6}
                  helperText="TODO(POA-003): Ajustar modelo de CardType quando o formato definitivo for definido."
                />
              </Stack>
            ) : (
              <Alert severity="info">Nenhum CardType associado a este board.</Alert>
            )}
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              IngressSources
            </Typography>
            <Stack spacing={3}>
              {draftConfig.ingressSources.map((source) => (
                <Box key={source.id} sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        label="Alias"
                        value={source.alias ?? ""}
                        onChange={(event) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            ingressSources: prev.ingressSources.map((item) =>
                              item.id === source.id ? { ...item, alias: event.target.value } : item
                            ),
                          }))
                        }
                        fullWidth
                      />
                      <TextField
                        label="External Object Id Path"
                        value={source.externalObjectIdPath ?? ""}
                        onChange={(event) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            ingressSources: prev.ingressSources.map((item) =>
                              item.id === source.id
                                ? { ...item, externalObjectIdPath: event.target.value }
                                : item
                            ),
                          }))
                        }
                        fullWidth
                      />
                    </Stack>
                    <TextField
                      label="Schema (JSON)"
                      value={ingressSchemaById[source.id] ?? "{}"}
                      onChange={(event) =>
                        setIngressSchemaById((prev) => ({
                          ...prev,
                          [source.id]: event.target.value,
                        }))
                      }
                      fullWidth
                      multiline
                      minRows={4}
                    />
                    <TextField
                      label="Mapping (JSON)"
                      value={ingressMappingById[source.id] ?? "{}"}
                      onChange={(event) =>
                        setIngressMappingById((prev) => ({
                          ...prev,
                          [source.id]: event.target.value,
                        }))
                      }
                      fullWidth
                      multiline
                      minRows={4}
                    />
                  </Stack>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  setDraftConfig((prev) => ({
                    ...prev,
                    ingressSources: [
                      ...prev.ingressSources,
                      {
                        id: createTempId("ingress") as IngressSource["id"],
                        boardId: board.id,
                        alias: "novo",
                        schema: {},
                        mapping: {},
                        externalObjectIdPath: "",
                      },
                    ],
                  }))
                }
              >
                Adicionar ingress source
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Webhooks
            </Typography>
            <Stack spacing={3}>
              {draftConfig.webhooks.map((webhook) => (
                <Box key={webhook.id} sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        label="URL"
                        value={webhook.url ?? ""}
                        onChange={(event) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            webhooks: prev.webhooks.map((item) =>
                              item.id === webhook.id ? { ...item, url: event.target.value } : item
                            ),
                          }))
                        }
                        fullWidth
                      />
                      <Select
                        size="small"
                        value={webhook.method ?? "POST"}
                        onChange={(event) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            webhooks: prev.webhooks.map((item) =>
                              item.id === webhook.id
                                ? { ...item, method: event.target.value as WebhookMethod }
                                : item
                            ),
                          }))
                        }
                        sx={{ minWidth: 120 }}
                      >
                        {webhookMethods.map((method) => (
                          <MenuItem key={method} value={method}>
                            {method}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                    <TextField
                      label="Body Template (JSON)"
                      value={webhookTemplateById[webhook.id] ?? "{}"}
                      onChange={(event) =>
                        setWebhookTemplateById((prev) => ({
                          ...prev,
                          [webhook.id]: event.target.value,
                        }))
                      }
                      fullWidth
                      multiline
                      minRows={4}
                    />
                  </Stack>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  setDraftConfig((prev) => ({
                    ...prev,
                    webhooks: [
                      ...prev.webhooks,
                      {
                        id: createTempId("webhook") as Webhook["id"],
                        url: "",
                        method: "POST",
                        bodyTemplate: {},
                      },
                    ],
                  }))
                }
              >
                Adicionar webhook
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Salvar configurações
        </Button>
      </DialogActions>
    </Dialog>
  );
};
