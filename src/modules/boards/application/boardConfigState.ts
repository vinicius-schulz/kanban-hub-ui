import type {
  BoardId,
  CardType,
  Column,
  IngressSource,
  Label,
  Webhook,
} from "@/modules/_shared/domain/domain.contracts";
import { getColumnsByBoardId } from "@/modules/boards/application/kanbanState";
import {
  getCardTypeByBoardId,
  getIngressSourcesByBoardId,
  getLabelsByBoardId,
} from "@/modules/boards/infra/boardConfig.fixtures";
import { getWebhooksByBoardId } from "@/modules/boards/infra/boardWebhooks.fixtures";

export type BoardConfig = {
  columns: Column[];
  labels: Label[];
  cardType: CardType | null;
  ingressSources: IngressSource[];
  webhooks: Webhook[];
};

const cloneJson = <T>(value: T): T => {
  return value ? (JSON.parse(JSON.stringify(value)) as T) : value;
};

const cloneBoardConfig = (config: BoardConfig): BoardConfig => {
  return {
    columns: config.columns.map((column) => ({ ...column })),
    labels: config.labels.map((label) => ({ ...label })),
    cardType: config.cardType
      ? {
          ...config.cardType,
          fields: config.cardType.fields?.map((field) => ({ ...field })),
        }
      : null,
    ingressSources: config.ingressSources.map((source) => ({
      ...source,
      schema: cloneJson(source.schema),
      mapping: cloneJson(source.mapping),
    })),
    webhooks: config.webhooks.map((webhook) => ({
      ...webhook,
      headers: cloneJson(webhook.headers),
      auth: cloneJson(webhook.auth),
      bodyTemplate: cloneJson(webhook.bodyTemplate),
    })),
  };
};

const boardConfigState = new Map<BoardId, BoardConfig>();

const buildInitialConfig = (boardId: BoardId): BoardConfig => {
  return {
    columns: getColumnsByBoardId(boardId),
    labels: getLabelsByBoardId(boardId),
    cardType: getCardTypeByBoardId(boardId),
    ingressSources: getIngressSourcesByBoardId(boardId),
    webhooks: getWebhooksByBoardId(boardId),
  };
};

export const getBoardConfig = (boardId: BoardId): BoardConfig => {
  if (!boardConfigState.has(boardId)) {
    boardConfigState.set(boardId, buildInitialConfig(boardId));
  }
  return cloneBoardConfig(boardConfigState.get(boardId)!);
};

export const saveBoardConfig = (boardId: BoardId, config: BoardConfig): BoardConfig => {
  boardConfigState.set(boardId, cloneBoardConfig(config));
  return getBoardConfig(boardId);
};
