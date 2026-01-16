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
}: {
  boardId: BoardId;
  columnId: ColumnId;
  page: number;
  pageSize?: number;
}): { cards: Card[]; total: number; hasMore: boolean } => {
  const cards = getCardsByBoardAndColumn(boardId, columnId);
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
