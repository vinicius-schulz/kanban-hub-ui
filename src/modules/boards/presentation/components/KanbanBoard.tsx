import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import type { Board, Card, ColumnId } from "@/modules/_shared/domain/domain.contracts";
import {
  BOARD_CARDS_PAGE_SIZE,
  getCardHistoryByCardId,
  getCardsPage,
  getColumnsByBoardId,
} from "@/modules/boards/application/kanbanState";
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

  useEffect(() => {
    setPagesByColumn(
      columns.reduce<Record<ColumnId, number>>((acc, column) => {
        acc[column.id] = 1;
        return acc;
      }, {})
    );
    setSelectedCard(null);
  }, [columns]);

  const selectedCardHistory = selectedCard ? getCardHistoryByCardId(selectedCard.id) : [];

  const handleLoadMore = (columnId: ColumnId) => {
    setPagesByColumn((prev) => ({
      ...prev,
      [columnId]: (prev[columnId] ?? 1) + 1,
    }));
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
          });

          return (
            <Paper key={column.id} variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {column.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cards.length} de {total} cards visíveis
                    </Typography>
                  </Box>
                  <Chip label={total} size="small" />
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
        onClose={() => setSelectedCard(null)}
      />
    </Stack>
  );
};
