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
import type { BoardId, IngressSource, IngressSourceId } from "@/modules/_shared/domain/domain.contracts";
import {
  adminBoardFixtures,
  adminIngressSourceFixtures,
} from "@/modules/admin/infra/admin.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId, formatJson, parseJsonField } from "@/modules/admin/presentation/utils/adminUtils";

export const AdminIngressSourcesPage = () => {
  const [ingressSources, setIngressSources] = useState<IngressSource[]>(() =>
    adminIngressSourceFixtures.map((item) => ({ ...item }))
  );
  const [schemaJsonById, setSchemaJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      adminIngressSourceFixtures.map((item) => [item.id, formatJson(item.schema ?? {})])
    )
  );
  const [mappingJsonById, setMappingJsonById] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      adminIngressSourceFixtures.map((item) => [item.id, formatJson(item.mapping ?? {})])
    )
  );
  const [errorsById, setErrorsById] = useState<Record<string, string>>({});

  const boardOptions = useMemo(() => adminBoardFixtures, []);

  const handleUpdate = (id: IngressSourceId, updates: Partial<IngressSource>) => {
    setIngressSources((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleJsonBlur = (id: IngressSourceId, field: "schema" | "mapping", value: string) => {
    const result = parseJsonField(value);
    if (result.error) {
      setErrorsById((prev) => ({ ...prev, [id]: result.error }));
      return;
    }

    setErrorsById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });

    handleUpdate(id, { [field]: result.value } as Partial<IngressSource>);
  };

  const handleAdd = () => {
    const newId = createAdminId("ingress") as IngressSourceId;
    const newBoardId = boardOptions[0]?.id as BoardId;
    setIngressSources((prev) => [
      ...prev,
      {
        id: newId,
        boardId: newBoardId,
        alias: "novo-ingress",
        externalObjectIdPath: "$.id",
        schema: {},
        mapping: {},
      },
    ]);
    setSchemaJsonById((prev) => ({ ...prev, [newId]: formatJson({}) }));
    setMappingJsonById((prev) => ({ ...prev, [newId]: formatJson({}) }));
  };

  const handleRemove = (id: IngressSourceId) => {
    setIngressSources((prev) => prev.filter((item) => item.id !== id));
    setSchemaJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
    setMappingJsonById((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <AdminPageLayout
      title="Administração de Ingress Sources"
      subtitle="Configure fontes de entrada externas. Persistência mock em memória."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {ingressSources.map((item) => (
            <Stack key={item.id} spacing={2}>
              {errorsById[item.id] ? <Alert severity="error">{errorsById[item.id]}</Alert> : null}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "2fr 2fr 1fr auto" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Alias"
                  value={item.alias ?? ""}
                  onChange={(event) => handleUpdate(item.id, { alias: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="External Object ID Path"
                  value={item.externalObjectIdPath ?? ""}
                  onChange={(event) => handleUpdate(item.id, { externalObjectIdPath: event.target.value })}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id={`board-label-${item.id}`}>Board</InputLabel>
                  <Select
                    labelId={`board-label-${item.id}`}
                    label="Board"
                    value={item.boardId ?? ""}
                    onChange={(event) => handleUpdate(item.id, { boardId: event.target.value as BoardId })}
                  >
                    {boardOptions.map((board) => (
                      <MenuItem key={board.id} value={board.id}>
                        {board.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="Remover ingress" onClick={() => handleRemove(item.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
              <TextField
                label="Schema (JSON)"
                value={schemaJsonById[item.id] ?? ""}
                onChange={(event) => setSchemaJsonById((prev) => ({ ...prev, [item.id]: event.target.value }))}
                onBlur={() => handleJsonBlur(item.id, "schema", schemaJsonById[item.id] ?? "")}
                multiline
                minRows={3}
                fullWidth
              />
              <TextField
                label="Mapping (JSON)"
                value={mappingJsonById[item.id] ?? ""}
                onChange={(event) => setMappingJsonById((prev) => ({ ...prev, [item.id]: event.target.value }))}
                onBlur={() => handleJsonBlur(item.id, "mapping", mappingJsonById[item.id] ?? "")}
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          ))}
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar ingress source
          </Button>
        </Stack>
      </Paper>
    </AdminPageLayout>
  );
};
