import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import type { Board } from "@/modules/_shared/domain/domain.contracts";

interface BoardPlaceholderProps {
  board: Board | null;
}

export const BoardPlaceholder = ({ board }: BoardPlaceholderProps) => {
  if (!board) {
    return (
      <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Nenhum board selecionado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecione uma folha na árvore para carregar o kanban.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {board.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {board.description}
          </Typography>
        </Box>
        <Chip label="Kanban mock carregado" color="primary" size="small" />
        <Typography variant="body2">
          TODO(POA-001): Ajustar comportamento de rotas conforme decisão do PO.
        </Typography>
      </Stack>
    </Paper>
  );
};
