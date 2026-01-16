import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
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
import React, { useState } from "react";
import type { Plugin, PluginId, PluginStatus } from "@/modules/_shared/domain/domain.contracts";
import { adminPluginFixtures } from "@/modules/admin/infra/admin.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId } from "@/modules/admin/presentation/utils/adminUtils";

const pluginStatusOptions: PluginStatus[] = ["active", "inactive"];

export const AdminPluginsPage = () => {
  const [plugins, setPlugins] = useState<Plugin[]>(() => adminPluginFixtures.map((item) => ({ ...item })));

  const handleUpdate = (id: PluginId, updates: Partial<Plugin>) => {
    setPlugins((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleAdd = () => {
    setPlugins((prev) => [
      ...prev,
      {
        id: createAdminId("plugin") as PluginId,
        pluginKey: "novo-plugin",
        displayName: "Novo plugin",
        description: "",
        version: "0.1.0",
        status: "inactive",
      },
    ]);
  };

  const handleRemove = (id: PluginId) => {
    setPlugins((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AdminPageLayout
      title="Administração de plugins"
      subtitle="Registre componentes visuais habilitados. Persistência mock em memória."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {plugins.map((plugin) => (
            <Box
              key={plugin.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.5fr 1.5fr 1fr 1fr 1fr auto" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                label="Plugin Key"
                value={plugin.pluginKey ?? ""}
                onChange={(event) => handleUpdate(plugin.id, { pluginKey: event.target.value })}
                fullWidth
              />
              <TextField
                label="Nome"
                value={plugin.displayName ?? ""}
                onChange={(event) => handleUpdate(plugin.id, { displayName: event.target.value })}
                fullWidth
              />
              <TextField
                label="Versão"
                value={plugin.version ?? ""}
                onChange={(event) => handleUpdate(plugin.id, { version: event.target.value })}
                fullWidth
              />
              <TextField
                label="Descrição"
                value={plugin.description ?? ""}
                onChange={(event) => handleUpdate(plugin.id, { description: event.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id={`status-label-${plugin.id}`}>Status</InputLabel>
                <Select
                  labelId={`status-label-${plugin.id}`}
                  label="Status"
                  value={plugin.status ?? "inactive"}
                  onChange={(event) => handleUpdate(plugin.id, { status: event.target.value as PluginStatus })}
                >
                  {pluginStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton aria-label="Remover plugin" onClick={() => handleRemove(plugin.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar plugin
          </Button>
        </Stack>
      </Paper>
    </AdminPageLayout>
  );
};
