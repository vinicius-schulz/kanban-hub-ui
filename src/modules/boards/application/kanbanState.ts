import type {
  BoardId,
  Card,
  CardHistoryEntry,
  CardId,
  Column,
  ColumnId,
} from "@/modules/_shared/domain/domain.contracts";
import { boardCardFixtures, boardColumnFixtures, cardHistoryFixtures } from "@/modules/boards/infra/kanban.fixtures";

export const BOARD_CARDS_PAGE_SIZE = 4;

export const buildBoardCardsState = (boardId: BoardId): Card[] => {
  return boardCardFixtures
    .filter((card) => card.boardId === boardId)
    .map((card) => ({ ...card }));
};

export const getColumnsByBoardId = (boardId: BoardId): Column[] => {
  return boardColumnFixtures
    .filter((column) => column.boardId === boardId)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
};

export const getCardsByBoardAndColumn = (boardId: BoardId, columnId: ColumnId): Card[] => {
  return boardCardFixtures
    .filter((card) => card.boardId === boardId && card.columnId === columnId)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
};

export const getCardsPage = ({
  boardId,
  columnId,
  page,
  pageSize = BOARD_CARDS_PAGE_SIZE,
  cardsOverride,
}: {
  boardId: BoardId;
  columnId: ColumnId;
  page: number;
  pageSize?: number;
  cardsOverride?: Card[];
}): { cards: Card[]; total: number; hasMore: boolean } => {
  const cards = (cardsOverride ?? getCardsByBoardAndColumn(boardId, columnId))
    .filter((card) => card.boardId === boardId && card.columnId === columnId)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  const endIndex = page * pageSize;
  return {
    cards: cards.slice(0, endIndex),
    total: cards.length,
    hasMore: endIndex < cards.length,
  };
};

export const getCardHistoryByCardId = (cardId: CardId): CardHistoryEntry[] => {
  return cardHistoryFixtures
    .filter((entry) => entry.cardId === cardId)
    .sort((a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? ""));
};

const normalizePositions = (cards: Card[], columnId: ColumnId) => {
  const sorted = cards
    .filter((card) => card.columnId === columnId)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  return cards.map((card) => {
    if (card.columnId !== columnId) {
      return card;
    }
    const index = sorted.findIndex((item) => item.id === card.id);
    return {
      ...card,
      // TODO(POA-005): Ajustar campo de ordenação do card quando definido pelo PO.
      position: index >= 0 ? index + 1 : card.position ?? null,
    };
  });
};

export const moveCardToColumn = ({
  cards,
  cardId,
  destinationColumnId,
}: {
  cards: Card[];
  cardId: CardId;
  destinationColumnId: ColumnId;
}): Card[] => {
  const targetCard = cards.find((card) => card.id === cardId);
  if (!targetCard) {
    return cards;
  }

  const destinationCards = cards.filter((card) => card.columnId === destinationColumnId);
  const nextPosition =
    destinationCards.reduce((max, card) => Math.max(max, card.position ?? 0), 0) + 1;

  const updatedCards = cards.map((card) => {
    if (card.id !== cardId) {
      return card;
    }
    return {
      ...card,
      columnId: destinationColumnId,
      // TODO(POA-005): Ajustar campo de ordenação do card quando definido pelo PO.
      position: nextPosition,
    };
  });

  const normalizedSource = targetCard.columnId
    ? normalizePositions(updatedCards, targetCard.columnId)
    : updatedCards;
  return normalizePositions(normalizedSource, destinationColumnId);
};

export const createManualCard = ({
  boardId,
  columnId,
  title,
  description,
  sequence,
}: {
  boardId: BoardId;
  columnId: ColumnId;
  title: string;
  description?: string;
  sequence: number;
}): Card => {
  return {
    id: `card-manual-${sequence}` as CardId,
    boardId,
    columnId,
    // TODO(POA-005): Ajustar campo de ordenação do card quando definido pelo PO.
    position: null,
    sourceData: {
      origem: "manual",
    },
    cardData: {
      inputs: {
        titulo: title,
        impacto: description ?? "Card criado manualmente.",
      },
      outputs: {},
    },
    props: {
      prioridade: "P3",
      sla: "a definir",
    },
    pluginData: {},
    cardTypeId: null,
    idempotencyKey: null,
  };
};
