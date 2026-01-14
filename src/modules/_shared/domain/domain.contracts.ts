export type Brand<K, T> = K & { __brand: T };

export type ISODateString = string;

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

export type ModuleId = Brand<string, "ModuleId">;
export type TreeNodeId = Brand<string, "TreeNodeId">;
export type BoardId = Brand<string, "BoardId">;
export type ColumnId = Brand<string, "ColumnId">;
export type CardId = Brand<string, "CardId">;
export type CardTypeId = Brand<string, "CardTypeId">;
export type IngressSourceId = Brand<string, "IngressSourceId">;
export type PluginId = Brand<string, "PluginId">;
export type WebhookId = Brand<string, "WebhookId">;
export type LabelId = Brand<string, "LabelId">;
export type UserId = Brand<string, "UserId">;
export type CardHistoryEntryId = Brand<string, "CardHistoryEntryId">;

export type CardTypeFieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "enum"
  | "object"
  | "array";

export type CardTypeFieldMode = "editable" | "readonly";

export type PluginStatus = "active" | "inactive";

export type WebhookMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Module {
  id: ModuleId;
  name?: string;
}

export interface TreeNode {
  id: TreeNodeId;
  name?: string;
  parentId?: TreeNodeId | null;
  boardId?: BoardId | null;
}

export interface Board {
  id: BoardId;
  name?: string;
  description?: string;
  cardTypeId?: CardTypeId | null;
}

export interface Column {
  id: ColumnId;
  name?: string;
  position?: number | null;
  boardId?: BoardId | null;
}

export interface CardData {
  inputs?: Record<string, JSONValue>;
  outputs?: Record<string, JSONValue>;
}

export interface Card {
  id: CardId;
  sourceData?: Record<string, JSONValue>;
  cardData?: CardData;
  props?: Record<string, JSONValue>;
  pluginData?: Record<string, JSONValue>;
  cardTypeId?: CardTypeId | null;
  boardId?: BoardId | null;
  columnId?: ColumnId | null;
  position?: number | null;
  idempotencyKey?: string | null;
}

export interface CardTypeField {
  label?: string;
  type?: CardTypeFieldType;
  mode?: CardTypeFieldMode;
  bindingRef?: string;
  preview?: boolean;
  modal?: boolean;
}

export interface CardType {
  id: CardTypeId;
  name?: string;
  fields?: CardTypeField[];
}

export interface IngressSource {
  id: IngressSourceId;
  boardId?: BoardId | null;
  alias?: string;
  schema?: Record<string, JSONValue>;
  mapping?: Record<string, JSONValue>;
  externalObjectIdPath?: string;
}

export interface Plugin {
  id: PluginId;
  pluginKey?: string;
  displayName?: string;
  description?: string;
  version?: string;
  status?: PluginStatus;
}

export interface Webhook {
  id: WebhookId;
  url?: string;
  method?: WebhookMethod;
  headers?: Record<string, JSONValue>;
  auth?: Record<string, JSONValue>;
  bodyTemplate?: Record<string, JSONValue>;
}

export interface Label {
  id: LabelId;
  name?: string;
  boardId?: BoardId | null;
}

export interface User {
  id: UserId;
  role?: string;
  status?: string;
}

export interface CardHistoryEntry {
  id: CardHistoryEntryId;
  type?: string;
  summary?: string;
  payload?: Record<string, JSONValue>;
  createdAt?: ISODateString;
  createdBy?: string;
  cardId?: CardId | null;
}

export type ModuleCreateInput = Pick<Module, "name">;
export type ModuleUpdateInput = Partial<Pick<Module, "name">>;
export type ModuleQuery = Record<string, never>;

export type TreeNodeCreateInput = Omit<TreeNode, "id">;
export type TreeNodeUpdateInput = Partial<Omit<TreeNode, "id">>;
export type TreeNodeQuery = {
  boardId?: BoardId | null;
  parentId?: TreeNodeId | null;
};

export type BoardCreateInput = Omit<Board, "id">;
export type BoardUpdateInput = Partial<Omit<Board, "id">>;
export type BoardQuery = {
  cardTypeId?: CardTypeId | null;
};

export type ColumnCreateInput = Omit<Column, "id">;
export type ColumnUpdateInput = Partial<Omit<Column, "id">>;
export type ColumnQuery = {
  boardId?: BoardId | null;
};

export type CardCreateInput = Omit<Card, "id">;
export type CardUpdateInput = Partial<Omit<Card, "id">>;
export type CardQuery = {
  boardId?: BoardId | null;
  columnId?: ColumnId | null;
  cardTypeId?: CardTypeId | null;
};

export type CardTypeCreateInput = Omit<CardType, "id">;
export type CardTypeUpdateInput = Partial<Omit<CardType, "id">>;
export type CardTypeQuery = Record<string, never>;

export type IngressSourceCreateInput = Omit<IngressSource, "id">;
export type IngressSourceUpdateInput = Partial<Omit<IngressSource, "id">>;
export type IngressSourceQuery = {
  boardId?: BoardId | null;
};

export type PluginCreateInput = Omit<Plugin, "id">;
export type PluginUpdateInput = Partial<Omit<Plugin, "id">>;
export type PluginQuery = {
  status?: PluginStatus;
};

export type WebhookCreateInput = Omit<Webhook, "id">;
export type WebhookUpdateInput = Partial<Omit<Webhook, "id">>;
export type WebhookQuery = Record<string, never>;

export type LabelCreateInput = Omit<Label, "id">;
export type LabelUpdateInput = Partial<Omit<Label, "id">>;
export type LabelQuery = {
  boardId?: BoardId | null;
};

export type UserCreateInput = Omit<User, "id">;
export type UserUpdateInput = Partial<Omit<User, "id">>;
export type UserQuery = {
  status?: string;
  role?: string;
};

export type CardHistoryEntryCreateInput = Omit<CardHistoryEntry, "id">;
export type CardHistoryEntryUpdateInput = Partial<Omit<CardHistoryEntry, "id">>;
export type CardHistoryEntryQuery = {
  cardId?: CardId | null;
};
