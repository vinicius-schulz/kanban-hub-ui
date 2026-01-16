import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Board, Card, ColumnId } from "@/modules/_shared/domain/domain.contracts";
import {
  BOARD_CARDS_PAGE_SIZE,
  buildBoardCardsState,
  createManualCard,
  getCardHistoryByCardId,
  getCardsPage,
  getColumnsByBoardId,
  moveCardToColumn,
} from "@/modules/boards/application/kanbanState";
import { getWebhooksByBoardId } from "@/modules/boards/infra/boardWebhooks.fixtures";
import { CardModal } from "@/modules/boards/presentation/components/CardModal";

interface KanbanBoardProps {
  board: Board;
}

const getCardTitle = (card: Card) => {
  const title = card.cardData?.inputs?.titulo;
  if (typeof title === "string" && title.trim()) {
    return title;
  }

  return "Card sem título";
};

export const KanbanBoard = ({ board }: KanbanBoardProps) => {
  const columns = useMemo(() => getColumnsByBoardId(board.id), [board.id]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [pagesByColumn, setPagesByColumn] = useState<Record<ColumnId, number>>({} as Record<ColumnId, number>);
  const [boardCards, setBoardCards] = useState<Card[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<ColumnId | "">("");
  const [createTitle, setCreateTitle] = useState("");
  const [createImpact, setCreateImpact] = useState("");
  const manualCardSequenceRef = useRef(1);

  useEffect(() => {
    setPagesByColumn(
      columns.reduce<Record<ColumnId, number>>((acc, column) => {
        acc[column.id] = 1;
        return acc;
      }, {})
    );
    setSelectedCard(null);
    setBoardCards(buildBoardCardsState(board.id));
    setIsCreateOpen(false);
    setCreateColumnId("");
    setCreateTitle("");
    setCreateImpact("");
  }, [columns]);

  const selectedCardHistory = selectedCard ? getCardHistoryByCardId(selectedCard.id) : [];
  const availableWebhooks = useMemo(() => getWebhooksByBoardId(board.id), [board.id]);

  const handleLoadMore = (columnId: ColumnId) => {
    setPagesByColumn((prev) => ({
      ...prev,
      [columnId]: (prev[columnId] ?? 1) + 1,
    }));
  };

  const handleDropCard = (columnId: ColumnId, cardId: string | null) => {
    if (!cardId) {
      return;
    }
    setBoardCards((prev) =>
      moveCardToColumn({ cards: prev, cardId: cardId as Card["id"], destinationColumnId: columnId })
    );
  };

  const handleStartCreate = (columnId: ColumnId) => {
    setCreateColumnId(columnId);
    setIsCreateOpen(true);
  };

  const handleConfirmCreate = () => {
    if (!createColumnId || !createTitle.trim()) {
      return;
    }
    const newCard = createManualCard({
      boardId: board.id,
      columnId: createColumnId,
      title: createTitle.trim(),
      description: createImpact.trim() || undefined,
      sequence: manualCardSequenceRef.current,
    });
    manualCardSequenceRef.current += 1;
    setBoardCards((prev) => [...prev, newCard]);
    setIsCreateOpen(false);
    setCreateTitle("");
    setCreateImpact("");
  };

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {board.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {board.description}
              </Typography>
            </Box>
            <Chip label="Kanban mock" color="primary" size="small" />
            <Chip label={`Lazy load: ${BOARD_CARDS_PAGE_SIZE} cards`} size="small" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: `repeat(${Math.max(columns.length, 1)}, minmax(0, 1fr))`,
          },
          gap: 2,
          alignItems: "start",
        }}
      >
        {columns.map((column) => {
          const page = pagesByColumn[column.id] ?? 1;
          const { cards, total, hasMore } = getCardsPage({
            boardId: board.id,
            columnId: column.id,
            page,
            cardsOverride: boardCards,
          });

          return (
            <Paper
              key={column.id}
              variant="outlined"
              sx={{ p: 2, bgcolor: "grey.50" }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                const cardId = event.dataTransfer.getData("text/plain");
                handleDropCard(column.id, cardId);
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {column.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cards.length} de {total} cards visíveis
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={total} size="small" />
                    <Button variant="text" size="small" onClick={() => handleStartCreate(column.id)}>
                      Criar card
                    </Button>
                  </Stack>
                </Stack>

                <Stack spacing={1.5}>
                  {cards.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Nenhum card nesta coluna.
                    </Typography>
                  ) : (
                    cards.map((card) => (
                      <Paper
                        key={card.id}
                        variant="outlined"
                        sx={{ p: 2, cursor: "pointer" }}
                        onClick={() => setSelectedCard(card)}
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData("text/plain", card.id);
                          event.dataTransfer.effectAllowed = "move";
                        }}
                      >
                        <Stack spacing={1}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {getCardTitle(card)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {card.cardData?.inputs?.impacto ?? "Sem descrição"}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip label={card.props?.prioridade ?? "Sem prioridade"} size="small" />
                            <Chip label={card.props?.sla ?? "Sem SLA"} size="small" variant="outlined" />
                          </Stack>
                        </Stack>
                      </Paper>
                    ))
                  )}
                </Stack>

                {hasMore ? (
                  <Button variant="text" size="small" onClick={() => handleLoadMore(column.id)}>
                    Carregar mais
                  </Button>
                ) : null}
              </Stack>
            </Paper>
          );
        })}
      </Box>

      <CardModal
        open={Boolean(selectedCard)}
        card={selectedCard}
        historyEntries={selectedCardHistory}
        webhooks={availableWebhooks}
        onClose={() => setSelectedCard(null)}
      />

      <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Novo card manual</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              TODO(POA-005): Definir ordenação definitiva dos cards no board.
            </Typography>
            <TextField
              label="Título"
              value={createTitle}
              onChange={(event) => setCreateTitle(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Impacto"
              value={createImpact}
              onChange={(event) => setCreateImpact(event.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleConfirmCreate} disabled={!createTitle.trim()}>
            Criar card
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
