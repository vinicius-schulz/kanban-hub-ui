import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import type { Module, ModuleId } from "@/modules/_shared/domain/domain.contracts";
import { adminModuleFixtures } from "@/modules/admin/infra/admin.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId } from "@/modules/admin/presentation/utils/adminUtils";

export const AdminModulesPage = () => {
  const [modules, setModules] = useState<Module[]>(() => adminModuleFixtures.map((item) => ({ ...item })));

  const handleUpdate = (id: ModuleId, name: string) => {
    setModules((prev) => prev.map((module) => (module.id === id ? { ...module, name } : module)));
  };

  const handleAdd = () => {
    setModules((prev) => [
      ...prev,
      {
        id: createAdminId("module") as ModuleId,
        name: "Novo módulo",
      },
    ]);
  };

  const handleRemove = (id: ModuleId) => {
    setModules((prev) => prev.filter((module) => module.id !== id));
  };

  return (
    <AdminPageLayout
      title="Administração de módulos"
      subtitle="Cadastre módulos para a navegação principal. Persistência mock em memória."
    >
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {modules.map((module) => (
            <Box
              key={module.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr auto" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                label="Nome do módulo"
                value={module.name ?? ""}
                onChange={(event) => handleUpdate(module.id, event.target.value)}
                fullWidth
              />
              <Typography variant="body2" color="text.secondary">
                {module.id}
              </Typography>
              <IconButton aria-label="Remover módulo" onClick={() => handleRemove(module.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar módulo
          </Button>
        </Stack>
      </Paper>
    </AdminPageLayout>
  );
};
