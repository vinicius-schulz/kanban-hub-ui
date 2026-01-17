import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type {
  Board,
  CardType,
  Column,
  ColumnId,
  IngressSource,
  IngressSourceId,
  Label,
  LabelId,
} from "@/core/domain/domain.contracts";

interface BoardSettingsDialogProps {
  open: boolean;
  board: Board | null;
  columns: Column[];
  labels: Label[];
  cardTypes: CardType[];
  ingressSources: IngressSource[];
  cardCountByColumn: Map<ColumnId, number>;
  cardCountByLabel: Map<LabelId, number>;
  onClose: () => void;
  onSave: (payload: { board: Board; columns: Column[]; labels: Label[] }) => void;
}

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const BoardSettingsDialog = ({
  open,
  board,
  columns,
  labels,
  cardTypes,
  ingressSources,
  cardCountByColumn,
  cardCountByLabel,
  onClose,
  onSave,
}: BoardSettingsDialogProps) => {
  const [draftBoard, setDraftBoard] = useState<Board | null>(board);
  const [draftColumns, setDraftColumns] = useState<Column[]>(columns);
  const [draftLabels, setDraftLabels] = useState<Label[]>(labels);

  useEffect(() => {
    setDraftBoard(board);
    setDraftColumns(columns);
    setDraftLabels(labels);
  }, [board, columns, labels, open]);

  const boardIngressSources = useMemo(() => {
    if (!board) {
      return [];
    }
    return ingressSources.filter((source) =>
      source.boardId ? source.boardId === board.id : true
    );
  }, [board, ingressSources]);

  if (!draftBoard) {
    return null;
  }

  const handleBoardChange = (field: keyof Board) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraftBoard((prev) => (prev ? { ...prev, [field]: event.target.value } : prev));
  };

  const handleCardTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraftBoard((prev) => (prev ? { ...prev, cardTypeId: event.target.value } : prev));
  };

  const handleIngressSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDraftBoard((prev) =>
      prev ? { ...prev, ingressSourceId: value ? (value as IngressSourceId) : null } : prev
    );
  };

  const handleColumnChange = (index: number, field: keyof Column) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDraftColumns((prev) =>
        prev.map((column, columnIndex) =>
          columnIndex === index
            ? {
                ...column,
                [field]: field === "order" ? toNumber(event.target.value) : event.target.value,
              }
            : column
        )
      );
    };

  const handleAddColumn = () => {
    const id = `col-${Date.now()}` as ColumnId;
    setDraftColumns((prev) => [
      ...prev,
      {
        id,
        boardId: draftBoard.id,
        name: "Nova coluna",
        order: prev.length + 1,
      },
    ]);
  };

  const handleRemoveColumn = (columnId: ColumnId) => () => {
    setDraftColumns((prev) => prev.filter((column) => column.id !== columnId));
  };

  const handleLabelChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraftLabels((prev) =>
      prev.map((label, labelIndex) =>
        labelIndex === index ? { ...label, name: event.target.value } : label
      )
    );
  };

  const handleAddLabel = () => {
    const id = `label-${Date.now()}` as LabelId;
    setDraftLabels((prev) => [
      ...prev,
      {
        id,
        boardId: draftBoard.id,
        name: "Nova label",
      },
    ]);
  };

  const handleRemoveLabel = (labelId: LabelId) => () => {
    setDraftLabels((prev) => prev.filter((label) => label.id !== labelId));
  };

  const handleSave = () => {
    onSave({ board: draftBoard, columns: draftColumns, labels: draftLabels });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Configuração do board</DialogTitle>
      <DialogContent>
        <Stack spacing={3} marginTop={1}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Detalhes do board
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Nome"
                value={draftBoard.name}
                onChange={handleBoardChange("name")}
                fullWidth
              />
              <TextField
                label="Descrição"
                value={draftBoard.description ?? ""}
                onChange={handleBoardChange("description")}
                fullWidth
              />
              <TextField
                label="CardType"
                select
                value={draftBoard.cardTypeId}
                onChange={handleCardTypeChange}
                fullWidth
              >
                {cardTypes.map((cardType) => (
                  <MenuItem key={cardType.id} value={cardType.id}>
                    {cardType.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="IngressSource"
                select
                value={draftBoard.ingressSourceId ?? ""}
                onChange={handleIngressSourceChange}
                fullWidth
              >
                <MenuItem value="">Nenhuma</MenuItem>
                {boardIngressSources.map((source) => (
                  <MenuItem key={source.id} value={source.id}>
                    {source.alias}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <Typography variant="subtitle1" flex={1}>
                Colunas
              </Typography>
              <Button variant="outlined" onClick={handleAddColumn}>
                Adicionar coluna
              </Button>
            </Stack>
            <Stack spacing={2} marginTop={2}>
              {draftColumns.map((column, index) => {
                const cardCount = cardCountByColumn.get(column.id) ?? 0;
                return (
                  <Stack
                    key={column.id}
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", md: "center" }}
                  >
                    <TextField
                      label="Nome"
                      value={column.name}
                      onChange={handleColumnChange(index, "name")}
                      fullWidth
                    />
                    <TextField
                      label="Ordem"
                      type="number"
                      value={column.order ?? 0}
                      onChange={handleColumnChange(index, "order")}
                      sx={{ maxWidth: 140 }}
                    />
                    <Box>
                      <Button
                        variant="text"
                        color="error"
                        onClick={handleRemoveColumn(column.id)}
                        disabled={cardCount > 0}
                      >
                        Remover
                      </Button>
                      {cardCount > 0 ? (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {cardCount} card(s) nesta coluna
                        </Typography>
                      ) : null}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <Typography variant="subtitle1" flex={1}>
                Labels
              </Typography>
              <Button variant="outlined" onClick={handleAddLabel}>
                Adicionar label
              </Button>
            </Stack>
            <Stack spacing={2} marginTop={2}>
              {draftLabels.map((label, index) => {
                const cardCount = cardCountByLabel.get(label.id) ?? 0;
                return (
                  <Stack
                    key={label.id}
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", md: "center" }}
                  >
                    <TextField
                      label="Nome"
                      value={label.name}
                      onChange={handleLabelChange(index)}
                      fullWidth
                    />
                    <Box>
                      <Button
                        variant="text"
                        color="error"
                        onClick={handleRemoveLabel(label.id)}
                        disabled={cardCount > 0}
                      >
                        Remover
                      </Button>
                      {cardCount > 0 ? (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {cardCount} card(s) usando esta label
                        </Typography>
                      ) : null}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Salvar configurações
        </Button>
      </DialogActions>
    </Dialog>
  );
};
