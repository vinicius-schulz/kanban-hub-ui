import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import type { Board, BoardId, Column, Label, ModuleId } from "@/modules/_shared/domain/domain.contracts";
import {
  adminBoardFixtures,
  adminColumnFixtures,
  adminLabelFixtures,
  adminModuleFixtures,
} from "@/modules/admin/infra/admin.fixtures";
import { AdminPageLayout } from "@/modules/admin/presentation/components/AdminPageLayout";
import { createAdminId } from "@/modules/admin/presentation/utils/adminUtils";

const createBoardTemplate = (moduleId: ModuleId | null) => {
  return {
    id: createAdminId("board") as BoardId,
    name: "Novo board",
    description: "",
    moduleId,
    cardTypeId: null,
  } as Board & { moduleId: ModuleId | null };
};

export const AdminBoardsPage = () => {
  const [boards, setBoards] = useState<Array<Board & { moduleId: ModuleId }>>(() =>
    adminBoardFixtures.map((board) => ({ ...board }))
  );
  const [columns, setColumns] = useState<Column[]>(() => adminColumnFixtures.map((column) => ({ ...column })));
  const [labels, setLabels] = useState<Label[]>(() => adminLabelFixtures.map((label) => ({ ...label })));

  const [activeBoardId, setActiveBoardId] = useState<BoardId | "">(() => boards[0]?.id ?? "");

  const activeBoard = boards.find((board) => board.id === activeBoardId);

  const moduleOptions = useMemo(() => adminModuleFixtures, []);

  const handleBoardUpdate = (id: BoardId, updates: Partial<Board & { moduleId: ModuleId }>) => {
    setBoards((prev) => prev.map((board) => (board.id === id ? { ...board, ...updates } : board)));
  };

  const handleBoardAdd = () => {
    const fallbackModuleId = moduleOptions[0]?.id ?? null;
    const newBoard = createBoardTemplate(fallbackModuleId);
    setBoards((prev) => [...prev, newBoard as Board & { moduleId: ModuleId }]);
    if (!activeBoardId) {
      setActiveBoardId(newBoard.id);
    }
  };

  const handleBoardRemove = (id: BoardId) => {
    setBoards((prev) => {
      const nextBoards = prev.filter((board) => board.id !== id);
      if (activeBoardId === id) {
        setActiveBoardId(nextBoards[0]?.id ?? "");
      }
      return nextBoards;
    });
    setColumns((prev) => prev.filter((column) => column.boardId !== id));
    setLabels((prev) => prev.filter((label) => label.boardId !== id));
  };

  const activeColumns = columns.filter((column) => column.boardId === activeBoardId);
  const activeLabels = labels.filter((label) => label.boardId === activeBoardId);

  const handleColumnUpdate = (id: Column["id"], updates: Partial<Column>) => {
    setColumns((prev) => prev.map((column) => (column.id === id ? { ...column, ...updates } : column)));
  };

  const handleLabelUpdate = (id: Label["id"], updates: Partial<Label>) => {
    setLabels((prev) => prev.map((label) => (label.id === id ? { ...label, ...updates } : label)));
  };

  const handleColumnAdd = () => {
    if (!activeBoardId) {
      return;
    }
    setColumns((prev) => [
      ...prev,
      {
        id: createAdminId("column") as Column["id"],
        name: "Nova coluna",
        position: activeColumns.length + 1,
        boardId: activeBoardId as BoardId,
      },
    ]);
  };

  const handleLabelAdd = () => {
    if (!activeBoardId) {
      return;
    }
    setLabels((prev) => [
      ...prev,
      {
        id: createAdminId("label") as Label["id"],
        name: "Nova label",
        boardId: activeBoardId as BoardId,
      },
    ]);
  };

  return (
    <AdminPageLayout
      title="Administração de boards"
      subtitle="Cadastre boards, colunas e labels associadas. Persistência mock em memória."
    >
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Boards
            </Typography>
            {boards.map((board) => (
              <Box
                key={board.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "2fr 2fr 1fr auto" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Nome"
                  value={board.name ?? ""}
                  onChange={(event) => handleBoardUpdate(board.id, { name: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="Descrição"
                  value={board.description ?? ""}
                  onChange={(event) => handleBoardUpdate(board.id, { description: event.target.value })}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel id={`module-label-${board.id}`}>Módulo</InputLabel>
                  <Select
                    labelId={`module-label-${board.id}`}
                    label="Módulo"
                    value={board.moduleId}
                    onChange={(event) =>
                      handleBoardUpdate(board.id, { moduleId: event.target.value as ModuleId })
                    }
                  >
                    {moduleOptions.map((module) => (
                      <MenuItem key={module.id} value={module.id}>
                        {module.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="Remover board" onClick={() => handleBoardRemove(board.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={handleBoardAdd}>
              Adicionar board
            </Button>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Colunas e labels do board
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="board-selection-label">Board ativo</InputLabel>
              <Select
                labelId="board-selection-label"
                label="Board ativo"
                value={activeBoardId}
                onChange={(event) => setActiveBoardId(event.target.value as BoardId)}
              >
                {boards.map((board) => (
                  <MenuItem key={board.id} value={board.id}>
                    {board.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider />

            <Typography variant="subtitle1" fontWeight={600}>
              Colunas
            </Typography>
            {activeBoard ? (
              <Stack spacing={2}>
                {activeColumns.map((column) => (
                  <Box
                    key={column.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "2fr 1fr auto" },
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Nome"
                      value={column.name ?? ""}
                      onChange={(event) => handleColumnUpdate(column.id, { name: event.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Posição"
                      type="number"
                      value={column.position ?? 0}
                      onChange={(event) => handleColumnUpdate(column.id, { position: Number(event.target.value) })}
                      fullWidth
                    />
                    <IconButton
                      aria-label="Remover coluna"
                      onClick={() =>
                        setColumns((prev) => prev.filter((item) => item.id !== column.id))
                      }
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={handleColumnAdd}>
                  Adicionar coluna
                </Button>
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um board para configurar colunas.
              </Typography>
            )}

            <Divider />

            <Typography variant="subtitle1" fontWeight={600}>
              Labels
            </Typography>
            {activeBoard ? (
              <Stack spacing={2}>
                {activeLabels.map((label) => (
                  <Box
                    key={label.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "2fr auto" },
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Nome"
                      value={label.name ?? ""}
                      onChange={(event) => handleLabelUpdate(label.id, { name: event.target.value })}
                      fullWidth
                    />
                    <IconButton
                      aria-label="Remover label"
                      onClick={() =>
                        setLabels((prev) => prev.filter((item) => item.id !== label.id))
                      }
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" onClick={handleLabelAdd}>
                  Adicionar label
                </Button>
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Selecione um board para configurar labels.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Stack>
    </AdminPageLayout>
  );
};
