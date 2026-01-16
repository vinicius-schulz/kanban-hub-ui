import {
  Board,
  BoardId,
  Card,
  CardHistoryEvent,
  CardId,
  CardType,
  CardTypeField,
  CardTypeFieldId,
  CardTypeId,
  Column,
  ColumnId,
  HistoryEventId,
  IngressSource,
  IngressSourceId,
  Label,
  LabelId,
  LoginResult,
  Module,
  ModuleId,
  ModuleNode,
  ModuleNodeId,
  PluginRegistry,
  PluginRegistryId,
  Session,
  SessionId,
  User,
  UserId,
  WebhookConnector,
  WebhookConnectorId,
} from "./domain.contracts";

const asId = <T>(value: string) => value as T;

export const moduleA: Module = {
  id: asId<ModuleId>("mod-001"),
  name: "Operações",
  description: "Fluxo principal do time operacional.",
};

export const moduleB: Module = {
  id: asId<ModuleId>("mod-002"),
  name: "Projetos",
  description: null,
};

export const moduleTreeRoot: ModuleNode = {
  id: asId<ModuleNodeId>("node-001"),
  moduleId: moduleA.id,
  name: "Processos",
  parentId: null,
  boardId: null,
};

export const moduleTreeBoardNode: ModuleNode = {
  id: asId<ModuleNodeId>("node-002"),
  moduleId: moduleA.id,
  name: "Onboarding",
  parentId: moduleTreeRoot.id,
  boardId: asId<BoardId>("board-001"),
};

export const cardTypeA: CardType = {
  id: asId<CardTypeId>("ct-001"),
  name: "Solicitação",
  description: "Card para solicitações internas.",
};

export const cardTypeFieldA: CardTypeField = {
  id: asId<CardTypeFieldId>("ctf-001"),
  cardTypeId: cardTypeA.id,
  label: "Solicitante",
  type: "string",
  mode: "editable",
  bindingRef: "inputs.requester",
  format: null,
  showInPreview: true,
  showInModal: true,
};

export const ingressSourceA: IngressSource = {
  id: asId<IngressSourceId>("ing-001"),
  boardId: asId<BoardId>("board-001"),
  alias: "crm-webhook",
  payloadSchema: { type: "object" },
  mapping: { "inputs.requester": "$.user.name" },
  externalObjectIdPath: "$.id",
};

export const boardA: Board = {
  id: asId<BoardId>("board-001"),
  name: "Onboarding",
  description: "Fluxo de entrada de colaboradores.",
  cardTypeId: cardTypeA.id,
  ingressSourceId: ingressSourceA.id,
};

export const columnTodo: Column = {
  id: asId<ColumnId>("col-001"),
  boardId: boardA.id,
  name: "A fazer",
  order: 1,
};

export const columnDoing: Column = {
  id: asId<ColumnId>("col-002"),
  boardId: boardA.id,
  name: "Em andamento",
  order: 2,
};

export const labelUrgent: Label = {
  id: asId<LabelId>("label-urgent"),
  boardId: boardA.id,
  name: "Urgente",
};

export const labelReview: Label = {
  id: asId<LabelId>("label-review"),
  boardId: boardA.id,
  name: "Revisão",
};

export const cardHappyPath: Card = {
  id: asId<CardId>("card-001"),
  boardId: boardA.id,
  columnId: columnTodo.id,
  cardTypeId: cardTypeA.id,
  sourceData: { externalId: "crm-778" },
  cardData: {
    inputs: { requester: "Ana Silva", department: "RH" },
    outputs: { approved: false },
  },
  props: { priority: "high" },
  pluginData: { timeline: { steps: 3 } },
  labels: [labelUrgent.id, labelReview.id],
};

export const cardOptionalFields: Card = {
  id: asId<CardId>("card-002"),
  boardId: boardA.id,
  columnId: columnDoing.id,
  cardTypeId: null,
  sourceData: null,
  cardData: null,
  props: null,
  pluginData: null,
  labels: null,
};

export const historyEventMove: CardHistoryEvent = {
  id: asId<HistoryEventId>("evt-001"),
  cardId: cardHappyPath.id,
  type: "card.moved",
  summary: "Card movido para Em andamento",
  payload: { from: columnTodo.id, to: columnDoing.id },
  createdAt: "2024-05-10T10:15:00.000Z",
  createdBy: asId<UserId>("user-001"),
};

export const webhookConnectorA: WebhookConnector = {
  id: asId<WebhookConnectorId>("wh-001"),
  url: "https://example.com/webhook",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  auth: { type: "basic", username: "user" },
  bodyTemplate: { cardId: "{{$card.id}}" },
};

export const pluginRegistryA: PluginRegistry = {
  id: asId<PluginRegistryId>("plugin-001"),
  pluginKey: "timeline",
  displayName: "Timeline",
  description: "Visualiza etapas do processo.",
  version: "1.0.0",
  status: "active",
  capabilities: { supportsOutputs: true },
};

export const userAdmin: User = {
  id: asId<UserId>("user-001"),
  username: "admin",
  status: "active",
  roles: ["admin"],
};

export const sessionMock: Session = {
  id: asId<SessionId>("sess-001"),
  userId: userAdmin.id,
  token: "mock-token-123",
};

export const loginHappyPath: LoginResult = {
  session: sessionMock,
  user: userAdmin,
};

export const fixtures = {
  modules: [moduleA, moduleB],
  moduleNodes: [moduleTreeRoot, moduleTreeBoardNode],
  boards: [boardA],
  columns: [columnTodo, columnDoing],
  labels: [labelUrgent, labelReview],
  cardTypes: [cardTypeA],
  cardTypeFields: [cardTypeFieldA],
  ingressSources: [ingressSourceA],
  cards: [cardHappyPath, cardOptionalFields],
  historyEvents: [historyEventMove],
  webhookConnectors: [webhookConnectorA],
  pluginRegistry: [pluginRegistryA],
  users: [userAdmin],
  sessions: [sessionMock],
};
