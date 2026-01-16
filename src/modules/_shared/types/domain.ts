export type FieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "enum"
  | "object"
  | "array";

export type FieldMode = "editable" | "readonly";

export type PluginStatus = "active" | "inactive";

export type WebhookMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface User {
  id: string;
  name: string;
  role?: string;
  status?: string;
}

export interface Module {
  id: string;
  name: string;
  description?: string;
  boards: Board[];
}

export interface Board {
  id: string;
  moduleId: string;
  name: string;
  description?: string;
  columns: Column[];
  cardTypes: CardType[];
}

export interface Column {
  id: string;
  boardId: string;
  name: string;
  description?: string;
}

export interface Label {
  id: string;
  boardId: string;
  name: string;
  color?: string;
}

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  mode: FieldMode;
  required?: boolean;
  options?: string[];
  defaultValue?: unknown;
}

export interface CardType {
  id: string;
  boardId: string;
  name: string;
  description?: string;
  // TODO(POA-003): Ajustar modelo definitivo de fields/preview quando decisão do PO.
  fields: Field[];
  previewFields?: string[];
}

export interface IngressSource {
  id: string;
  boardId: string;
  name: string;
  description?: string;
  externalObjectIdPath?: string;
}

export interface Plugin {
  id: string;
  name: string;
  status: PluginStatus;
  description?: string;
}

export interface Webhook {
  id: string;
  boardId: string;
  name: string;
  url: string;
  method: WebhookMethod;
  headers?: Record<string, string>;
  auth?: Record<string, string>;
  bodyTemplate?: Record<string, unknown>;
}

export interface CardHistory {
  id: string;
  cardId: string;
  type: string;
  summary: string;
  payload: Record<string, unknown>;
  createdAt: string;
  createdBy: string;
}

export interface CardData {
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
}

export interface Card {
  id: string;
  boardId: string;
  columnId: string;
  cardTypeId: string;
  title: string;
  sourceData: Record<string, unknown>;
  cardData: CardData;
  props: Record<string, unknown>;
  pluginData: Record<string, unknown>;
  labels: Label[];
  history: CardHistory[];
}
