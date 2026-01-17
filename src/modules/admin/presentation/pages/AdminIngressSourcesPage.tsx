import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import type { IngressSource, IngressSourceId, JsonValue } from "@/core/domain/domain.contracts";
import { fixtures } from "@/core/domain/domain.fixtures";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { AdminNav } from "@/modules/admin/presentation/components/AdminNav";
import { AdminPageHeader } from "@/modules/admin/presentation/components/AdminPageHeader";
import { routePaths } from "@/app/routes/routePaths";

const asId = <T,>(value: string) => value as T;

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

export const AdminIngressSourcesPage = () => {
  const [ingressSources, setIngressSources] = useState<IngressSource[]>(fixtures.ingressSources);
  const [editingId, setEditingId] = useState<IngressSourceId | null>(null);

  const [alias, setAlias] = useState("");
  const [boardId, setBoardId] = useState("");
  const [externalPath, setExternalPath] = useState("");
  const [payloadSchema, setPayloadSchema] = useState("");
  const [mapping, setMapping] = useState("");
  const [payloadSchemaError, setPayloadSchemaError] = useState<string | null>(null);
  const [mappingError, setMappingError] = useState<string | null>(null);

  const ingressCount = ingressSources.length;

  const resetForm = () => {
    setEditingId(null);
    setAlias("");
    setBoardId("");
    setExternalPath("");
    setPayloadSchema("");
    setMapping("");
    setPayloadSchemaError(null);
    setMappingError(null);
  };

  const handleSave = () => {
    if (!alias.trim()) {
      return;
    }

    const payloadParsed = parseJsonValue(payloadSchema);
    const mappingParsed = parseJsonValue(mapping);
    setPayloadSchemaError(payloadParsed.error);
    setMappingError(mappingParsed.error);

    if (payloadParsed.error || mappingParsed.error) {
      return;
    }

    if (editingId) {
      setIngressSources((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                alias: alias.trim(),
                boardId: boardId.trim() ? (boardId.trim() as IngressSource["boardId"]) : null,
                externalObjectIdPath: externalPath.trim() || null,
                payloadSchema: payloadParsed.parsed,
                mapping: mappingParsed.parsed
              }
            : item
        )
      );
      resetForm();
      return;
    }

    const newIngressSource: IngressSource = {
      id: asId<IngressSourceId>(`ing-${Date.now()}`),
      alias: alias.trim(),
      boardId: boardId.trim() ? (boardId.trim() as IngressSource["boardId"]) : null,
      externalObjectIdPath: externalPath.trim() || null,
      payloadSchema: payloadParsed.parsed,
      mapping: mappingParsed.parsed
    };

    setIngressSources((prev) => [...prev, newIngressSource]);
    resetForm();
  };

  const handleEdit = (item: IngressSource) => {
    setEditingId(item.id);
    setAlias(item.alias);
    setBoardId(item.boardId ?? "");
    setExternalPath(item.externalObjectIdPath ?? "");
    setPayloadSchema(item.payloadSchema ? JSON.stringify(item.payloadSchema, null, 2) : "");
    setMapping(item.mapping ? JSON.stringify(item.mapping, null, 2) : "");
  };

  const handleDelete = (id: IngressSourceId) => {
    setIngressSources((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const header = <AdminPageHeader title="Administração de IngressSources" />;

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          IngressSources
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure fontes de entrada, mapeamentos e schema do payload para ingestão de eventos.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", padding: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{editingId ? "Editar IngressSource" : "Nova IngressSource"}</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Alias"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              fullWidth
            />
            <TextField
              label="Board ID (opcional)"
              value={boardId}
              onChange={(event) => setBoardId(event.target.value)}
              helperText="Associe a um board específico"
              fullWidth
            />
          </Stack>
          <TextField
            label="External Object ID Path"
            value={externalPath}
            onChange={(event) => setExternalPath(event.target.value)}
            helperText="Ex: $.id"
            fullWidth
          />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Payload Schema (JSON)"
              value={payloadSchema}
              onChange={(event) => setPayloadSchema(event.target.value)}
              error={Boolean(payloadSchemaError)}
              helperText={payloadSchemaError ?? "Defina o schema esperado."}
              multiline
              minRows={4}
              fullWidth
            />
            <TextField
              label="Mapping (JSON)"
              value={mapping}
              onChange={(event) => setMapping(event.target.value)}
              error={Boolean(mappingError)}
              helperText={mappingError ?? "Mapeie campos do payload para inputs."}
              multiline
              minRows={4}
              fullWidth
            />
          </Stack>
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
            <Typography variant="h6">Lista de IngressSources ({ingressCount})</Typography>
            {ingressSources.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhuma IngressSource cadastrada.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {ingressSources.map((item) => (
                  <Paper key={item.id} variant="outlined" sx={{ padding: 2 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
                      <Box flex={1}>
                        <Typography variant="subtitle1">{item.alias}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Board: {item.boardId ?? "global"} • External ID: {item.externalObjectIdPath ?? "-"}
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
      nav={<AdminNav activePath={routePaths.adminIngressSources} />}
      content={content}
    />
  );
};
