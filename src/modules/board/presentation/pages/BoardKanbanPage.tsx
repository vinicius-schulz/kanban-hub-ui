import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";
import { ModulesNav } from "@/modules/modules/presentation/components/ModulesNav";
import { APP_NAME } from "@/app/config/constants";
import { fixtures } from "@/core/domain/domain.fixtures";
import { routePaths } from "@/app/routes/routePaths";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";
import { LoadingState } from "@/modules/_shared/ui/LoadingState";
import { CardDetailsModal } from "@/modules/card/presentation/components/CardDetailsModal";
import type {
  Card as CardEntity,
  CardHistoryEvent,
  CardId,
  ColumnId,
  JsonValue,
} from "@/core/domain/domain.contracts";

const isRecord = (value: JsonValue | null | undefined): value is Record<string, JsonValue> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const summarizeInputs = (card: CardEntity) => {
  const inputs = card.cardData?.inputs;
  if (!isRecord(inputs)) {
    return "Sem inputs definidos";
  }
  const entries = Object.entries(inputs).slice(0, 2);
  if (entries.length === 0) {
    return "Sem inputs definidos";
  }
  return entries
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" • ");
};

export const BoardKanbanPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const sessionSnapshot = useMemo(() => getStoredSession(), []);
  const [draggingCardId, setDraggingCardId] = useState<CardId | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<ColumnId | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<CardId | null>(null);
  const [cards, setCards] = useState<CardEntity[]>(() =>
    fixtures.cards.map((card) => ({
      ...card,
      cardData: card.cardData ? { ...card.cardData } : card.cardData,
    }))
  );
  const [historyEvents, setHistoryEvents] = useState<CardHistoryEvent[]>(() =>
    fixtures.historyEvents.map((event) => ({ ...event }))
  );

  useEffect(() => {
    setIsSessionChecked(true);
  }, []);

  useEffect(() => {
    if (isSessionChecked && !sessionSnapshot) {
      navigate(routePaths.login, { replace: true });
    }
  }, [isSessionChecked, navigate, sessionSnapshot]);

  const board = useMemo(
    () => fixtures.boards.find((item) => item.id === boardId),
    [boardId]
  );

  const moduleNode = useMemo(
    () => fixtures.moduleNodes.find((node) => node.boardId === boardId),
    [boardId]
  );

  const moduleInfo = useMemo(
    () => fixtures.modules.find((module) => module.id === moduleNode?.moduleId),
    [moduleNode]
  );

  const columns = useMemo(
    () => fixtures.columns.filter((column) => column.boardId === boardId),
    [boardId]
  );

  const boardCards = useMemo(
    () => cards.filter((card) => card.boardId === boardId),
    [boardId, cards]
  );

  const labelsById = useMemo(() => {
    const map = new Map(fixtures.labels.map((label) => [label.id, label]));
    return map;
  }, []);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) ?? null,
    [cards, selectedCardId]
  );

  const cardTypeFields = useMemo(() => {
    if (!selectedCard?.cardTypeId) {
      return [];
    }
    return fixtures.cardTypeFields.filter(
      (field) => field.cardTypeId === selectedCard.cardTypeId
    );
  }, [selectedCard]);

  const selectedCardHistory = useMemo(() => {
    if (!selectedCard) {
      return [];
    }
    return historyEvents.filter((event) => event.cardId === selectedCard.id);
  }, [historyEvents, selectedCard]);

  const handleDragStart = (cardId: CardId) => () => {
    setDraggingCardId(cardId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggingCardId(null);
    setDragOverColumnId(null);
    setIsDragging(false);
  };

  const handleDrop = (columnId: ColumnId) => {
    if (!draggingCardId) {
      return;
    }
    setCards((prev) =>
      prev.map((card) =>
        card.id === draggingCardId && card.columnId !== columnId
          ? { ...card, columnId }
          : card
      )
    );
    const movedCard = cards.find((card) => card.id === draggingCardId);
    if (movedCard && movedCard.columnId !== columnId) {
      const originColumn = fixtures.columns.find((col) => col.id === movedCard.columnId);
      const targetColumn = fixtures.columns.find((col) => col.id === columnId);
      setHistoryEvents((prev) => [
        ...prev,
        {
          id: (`evt-${Date.now()}` as CardHistoryEvent["id"]),
          cardId: movedCard.id,
          type: "card.moved",
          summary: `Card movido de ${originColumn?.name ?? "coluna"} para ${
            targetColumn?.name ?? "coluna"
          }`,
          payload: { from: movedCard.columnId, to: columnId },
          createdAt: new Date().toISOString(),
          createdBy: sessionSnapshot?.userId ?? fixtures.users[0].id,
        },
      ]);
    }
    handleDragEnd();
  };

  const handleOpenCard = (cardId: CardId) => () => {
    if (isDragging) {
      return;
    }
    setSelectedCardId(cardId);
  };

  const handleCloseCard = () => {
    setSelectedCardId(null);
  };

  const handleSaveCard = (updatedCard: CardEntity, summary: string) => {
    setCards((prev) => prev.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
    setHistoryEvents((prev) => [
      ...prev,
      {
        id: (`evt-${Date.now()}` as CardHistoryEvent["id"]),
        cardId: updatedCard.id,
        type: "card.updated",
        summary,
        payload: updatedCard.cardData ?? null,
        createdAt: new Date().toISOString(),
        createdBy: sessionSnapshot?.userId ?? fixtures.users[0].id,
      },
    ]);
    setSelectedCardId(updatedCard.id);
  };

  const header = (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="baseline">
      <Box>
        <Typography variant="h2" component="span">
          {APP_NAME}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {moduleInfo?.name ?? "Módulo"} &bull; {board?.name ?? "Board"}
        </Typography>
      </Box>
      <Box marginLeft="auto">
        <Typography variant="body2" color="text.secondary">
          Arraste cards entre colunas ou clique para editar detalhes.
        </Typography>
      </Box>
    </Stack>
  );

  const content = (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {board?.name ?? "Board"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {board?.description ?? "Resumo das colunas e cards disponíveis no fluxo."}
        </Typography>
      </Box>

      {columns.length === 0 ? (
        <Box padding={3} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="body1">Nenhuma coluna configurada para este board.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3} alignItems="flex-start">
          {columns.map((column) => {
            const columnCards = boardCards.filter((card) => card.columnId === column.id);
            const isDragTarget = dragOverColumnId === column.id;
            return (
              <Grid item xs={12} md={4} key={column.id}>
                <Card
                  elevation={0}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOverColumnId(column.id);
                  }}
                  onDragLeave={() => setDragOverColumnId(null)}
                  onDrop={() => handleDrop(column.id)}
                  sx={{
                    border: "1px solid",
                    borderColor: isDragTarget ? "primary.main" : "divider",
                    bgcolor: isDragTarget ? "action.hover" : "background.paper",
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="h6">{column.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {columnCards.length} card(s)
                        </Typography>
                      </Box>
                      {columnCards.length === 0 ? (
                        <Box padding={2} bgcolor="background.default" borderRadius={2}>
                          <Typography variant="body2" color="text.secondary">
                            Sem cards nesta coluna.
                          </Typography>
                        </Box>
                      ) : (
                        <Stack spacing={2}>
                          {columnCards.map((card) => (
                            <Card
                              key={card.id}
                              elevation={0}
                              draggable
                              onDragStart={handleDragStart(card.id)}
                              onDragEnd={handleDragEnd}
                              onClick={handleOpenCard(card.id)}
                              sx={{ border: "1px solid", borderColor: "divider" }}
                            >
                              <CardContent>
                                <Stack spacing={1}>
                                  <Typography variant="subtitle1">Card {card.id}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {summarizeInputs(card)}
                                  </Typography>
                                  {card.labels && card.labels.length > 0 ? (
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                      {card.labels.map((labelId) => {
                                        const label = labelsById.get(labelId);
                                        return label ? (
                                          <Chip key={label.id} label={label.name} size="small" />
                                        ) : null;
                                      })}
                                    </Stack>
                                  ) : (
                                    <Typography variant="caption" color="text.secondary">
                                      Sem labels atribuídas
                                    </Typography>
                                  )}
                                </Stack>
                              </CardContent>
                            </Card>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );

  if (!isSessionChecked) {
    return <LoadingState />;
  }

  return (
    <>
      <PageLayout
        header={header}
        nav={<ModulesNav activePath={routePaths.modules} />}
        content={content}
      />
      <CardDetailsModal
        open={Boolean(selectedCard)}
        card={selectedCard}
        cardTypeFields={cardTypeFields}
        labels={fixtures.labels}
        historyEvents={selectedCardHistory}
        onClose={handleCloseCard}
        onSave={handleSaveCard}
      />
    </>
  );
};
