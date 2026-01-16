export type Brand<K, T> = K & { __brand: T };

export type ISODateString = string;
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type ModuleId = Brand<string, "ModuleId">;
export type ModuleNodeId = Brand<string, "ModuleNodeId">;
export type BoardId = Brand<string, "BoardId">;
export type ColumnId = Brand<string, "ColumnId">;
export type CardId = Brand<string, "CardId">;
export type CardTypeId = Brand<string, "CardTypeId">;
export type CardTypeFieldId = Brand<string, "CardTypeFieldId">;
export type LabelId = Brand<string, "LabelId">;
export type HistoryEventId = Brand<string, "HistoryEventId">;
export type IngressSourceId = Brand<string, "IngressSourceId">;
export type WebhookConnectorId = Brand<string, "WebhookConnectorId">;
export type PluginRegistryId = Brand<string, "PluginRegistryId">;
export type UserId = Brand<string, "UserId">;
export type SessionId = Brand<string, "SessionId">;

export type CardTypeFieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "enum"
  | "object"
  | "array";

export type CardTypeFieldMode = "editable" | "readonly";

export type PluginRegistryStatus = "active" | "inactive";

export type WebhookConnectorMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Module {
  id: ModuleId;
  name: string;
  description?: string | null;
}

export interface ModuleCreateInput {
  name: string;
  description?: string | null;
}

export interface ModuleUpdateInput {
  id: ModuleId;
  name?: string;
  description?: string | null;
}

export interface ModuleSummary {
  id: ModuleId;
  name: string;
  description?: string | null;
}

export type ModuleQuery = Record<string, never>;

export interface ModuleNode {
  id: ModuleNodeId;
  moduleId: ModuleId;
  name: string;
  parentId?: ModuleNodeId | null;
  boardId?: BoardId | null;
}

export interface ModuleNodeCreateInput {
  moduleId: ModuleId;
  name: string;
  parentId?: ModuleNodeId | null;
  boardId?: BoardId | null;
}

export interface ModuleNodeUpdateInput {
  id: ModuleNodeId;
  name?: string;
  parentId?: ModuleNodeId | null;
  boardId?: BoardId | null;
}

export interface ModuleNodeQuery {
  moduleId: ModuleId;
}

export interface Board {
  id: BoardId;
  name: string;
  description?: string | null;
  cardTypeId: CardTypeId;
  ingressSourceId?: IngressSourceId | null;
}

export interface BoardCreateInput {
  name: string;
  description?: string | null;
  cardTypeId: CardTypeId;
  ingressSourceId?: IngressSourceId | null;
}

export interface BoardUpdateInput {
  id: BoardId;
  name?: string;
  description?: string | null;
  cardTypeId?: CardTypeId;
  ingressSourceId?: IngressSourceId | null;
}

export interface BoardSummary {
  id: BoardId;
  name: string;
  description?: string | null;
}

export type BoardQuery = Record<string, never>;

export interface Column {
  id: ColumnId;
  boardId: BoardId;
  name: string;
  order?: number | null;
}

export interface ColumnCreateInput {
  boardId: BoardId;
  name: string;
  order?: number | null;
}

export interface ColumnUpdateInput {
  id: ColumnId;
  name?: string;
  order?: number | null;
}

export interface ColumnQuery {
  boardId: BoardId;
}

export interface Label {
  id: LabelId;
  boardId: BoardId;
  name: string;
}

export interface LabelCreateInput {
  boardId: BoardId;
  name: string;
}

export interface LabelUpdateInput {
  id: LabelId;
  name?: string;
}

export interface LabelQuery {
  boardId: BoardId;
}

export interface CardData {
  inputs?: JsonValue | null;
  outputs?: JsonValue | null;
}

export interface Card {
  id: CardId;
  boardId: BoardId;
  columnId: ColumnId;
  cardTypeId?: CardTypeId | null;
  sourceData?: JsonValue | null;
  cardData?: CardData | null;
  props?: JsonValue | null;
  pluginData?: JsonValue | null;
  labels?: LabelId[] | null;
}

export interface CardCreateInput {
  boardId: BoardId;
  columnId: ColumnId;
  cardTypeId?: CardTypeId | null;
  sourceData?: JsonValue | null;
  cardData?: CardData | null;
  props?: JsonValue | null;
  pluginData?: JsonValue | null;
  labels?: LabelId[] | null;
}

export interface CardUpdateInput {
  id: CardId;
  columnId?: ColumnId;
  cardData?: { inputs?: JsonValue | null } | null;
  props?: JsonValue | null;
  labels?: LabelId[] | null;
}

export interface CardSummary {
  id: CardId;
  boardId: BoardId;
  columnId: ColumnId;
  cardTypeId?: CardTypeId | null;
  labels?: LabelId[] | null;
}

export interface CardQuery {
  boardId: BoardId;
}

export interface CardHistoryEvent {
  id: HistoryEventId;
  cardId: CardId;
  type: string;
  summary: string;
  payload?: JsonValue | null;
  createdAt: ISODateString;
  createdBy: UserId;
}

export interface CardHistoryEventCreateInput {
  cardId: CardId;
  type: string;
  summary: string;
  payload?: JsonValue | null;
  createdAt: ISODateString;
  createdBy: UserId;
}

export interface CardHistoryEventQuery {
  cardId: CardId;
}

export interface CardType {
  id: CardTypeId;
  name: string;
  description?: string | null;
}

export interface CardTypeCreateInput {
  name: string;
  description?: string | null;
}

export interface CardTypeUpdateInput {
  id: CardTypeId;
  name?: string;
  description?: string | null;
}

export type CardTypeQuery = Record<string, never>;

export interface CardTypeField {
  id: CardTypeFieldId;
  cardTypeId: CardTypeId;
  label: string;
  type: CardTypeFieldType;
  mode: CardTypeFieldMode;
  bindingRef: string;
  format?: string | null;
  showInPreview?: boolean | null;
  showInModal?: boolean | null;
}

export interface CardTypeFieldCreateInput {
  cardTypeId: CardTypeId;
  label: string;
  type: CardTypeFieldType;
  mode: CardTypeFieldMode;
  bindingRef: string;
  format?: string | null;
  showInPreview?: boolean | null;
  showInModal?: boolean | null;
}

export interface CardTypeFieldUpdateInput {
  id: CardTypeFieldId;
  label?: string;
  type?: CardTypeFieldType;
  mode?: CardTypeFieldMode;
  bindingRef?: string;
  format?: string | null;
  showInPreview?: boolean | null;
  showInModal?: boolean | null;
}

export interface CardTypeFieldQuery {
  cardTypeId: CardTypeId;
}

export interface IngressSource {
  id: IngressSourceId;
  boardId?: BoardId | null;
  alias: string;
  payloadSchema?: JsonValue | null;
  mapping?: JsonValue | null;
  externalObjectIdPath?: string | null;
}

export interface IngressSourceCreateInput {
  boardId?: BoardId | null;
  alias: string;
  payloadSchema?: JsonValue | null;
  mapping?: JsonValue | null;
  externalObjectIdPath?: string | null;
}

export interface IngressSourceUpdateInput {
  id: IngressSourceId;
  boardId?: BoardId | null;
  alias?: string;
  payloadSchema?: JsonValue | null;
  mapping?: JsonValue | null;
  externalObjectIdPath?: string | null;
}

export type IngressSourceQuery = Record<string, never>;

export interface WebhookConnector {
  id: WebhookConnectorId;
  url: string;
  method: WebhookConnectorMethod;
  headers?: JsonValue | null;
  auth?: JsonValue | null;
  bodyTemplate?: JsonValue | null;
}

export interface WebhookConnectorCreateInput {
  url: string;
  method: WebhookConnectorMethod;
  headers?: JsonValue | null;
  auth?: JsonValue | null;
  bodyTemplate?: JsonValue | null;
}

export interface WebhookConnectorUpdateInput {
  id: WebhookConnectorId;
  url?: string;
  method?: WebhookConnectorMethod;
  headers?: JsonValue | null;
  auth?: JsonValue | null;
  bodyTemplate?: JsonValue | null;
}

export type WebhookConnectorQuery = Record<string, never>;

export interface PluginRegistry {
  id: PluginRegistryId;
  pluginKey: string;
  displayName: string;
  description?: string | null;
  version?: string | null;
  status: PluginRegistryStatus;
  capabilities?: JsonValue | null;
}

export interface PluginRegistryCreateInput {
  pluginKey: string;
  displayName: string;
  description?: string | null;
  version?: string | null;
  status: PluginRegistryStatus;
  capabilities?: JsonValue | null;
}

export interface PluginRegistryUpdateInput {
  id: PluginRegistryId;
  pluginKey?: string;
  displayName?: string;
  description?: string | null;
  version?: string | null;
  status?: PluginRegistryStatus;
  capabilities?: JsonValue | null;
}

export type PluginRegistryQuery = Record<string, never>;

export type UserRoleKey = string;

export interface User {
  id: UserId;
  username: string;
  status?: string | null;
  roles?: UserRoleKey[] | null;
}

export interface UserCreateInput {
  username: string;
  status?: string | null;
  roles?: UserRoleKey[] | null;
}

export interface UserUpdateInput {
  id: UserId;
  username?: string;
  status?: string | null;
  roles?: UserRoleKey[] | null;
}

export type UserQuery = Record<string, never>;

export interface Session {
  id: SessionId;
  userId: UserId;
  token: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResult {
  session: Session;
  user: User;
}
