import type {
  Board,
  BoardId,
  Card,
  CardHistoryEntry,
  CardHistoryEntryId,
  CardId,
  CardType,
  CardTypeId,
  Column,
  ColumnId,
  IngressSource,
  IngressSourceId,
  Label,
  LabelId,
  Module,
  ModuleId,
  Plugin,
  PluginId,
  TreeNode,
  TreeNodeId,
  User,
  UserId,
  Webhook,
  WebhookId,
} from "./domain.contracts";

const moduleId = "module-telemetria" as ModuleId;
const boardId = "board-telemetria" as BoardId;
const cardTypeId = "card-type-telemetria" as CardTypeId;
const columnTodoId = "column-todo" as ColumnId;
const cardId = "card-001" as CardId;
const treeNodeId = "node-telemetria" as TreeNodeId;
const ingressSourceId = "ingress-telemetria" as IngressSourceId;
const pluginId = "plugin-status" as PluginId;
const webhookId = "webhook-alert" as WebhookId;
const labelId = "label-urgente" as LabelId;
const userId = "user-admin" as UserId;
const historyId = "history-001" as CardHistoryEntryId;

export const moduleFixture: Module = {
  id: moduleId,
  name: "Telemetria",
};

export const treeNodeFixture: TreeNode = {
  id: treeNodeId,
  name: "Alertas",
  parentId: null,
  boardId,
};

export const boardFixture: Board = {
  id: boardId,
  name: "Kanban de Alertas",
  description: "Fluxo de tratamento de alertas",
  cardTypeId,
};

export const columnFixture: Column = {
  id: columnTodoId,
  name: "A fazer",
  position: 1,
  boardId,
};

export const cardTypeFixture: CardType = {
  id: cardTypeId,
  name: "Alerta",
  fields: [
    {
      label: "Origem",
      type: "string",
      mode: "readonly",
      bindingRef: "sourceData.origem",
      preview: true,
      modal: true,
    },
    {
      label: "Descrição",
      type: "string",
      mode: "editable",
      bindingRef: "cardData.inputs.descricao",
      preview: true,
      modal: true,
    },
  ],
};

export const cardFixture: Card = {
  id: cardId,
  sourceData: {
    origem: "monitoramento",
    severity: "alta",
  },
  cardData: {
    inputs: {
      descricao: "Falha intermitente",
    },
    outputs: {
      resolucao: "Reiniciar serviço",
    },
  },
  props: {
    prioridade: "P1",
  },
  pluginData: {
    statusWidget: {
      ok: false,
    },
  },
  cardTypeId,
  boardId,
  columnId: columnTodoId,
  position: 1,
  idempotencyKey: null,
};

export const ingressSourceFixture: IngressSource = {
  id: ingressSourceId,
  boardId,
  alias: "telemetria",
  schema: {
    type: "object",
  },
  mapping: {
    "sourceData.origem": "$.source",
  },
  externalObjectIdPath: "$.id",
};

export const pluginFixture: Plugin = {
  id: pluginId,
  pluginKey: "status-indicator",
  displayName: "Indicador de Status",
  description: "Mostra o status atual do alerta",
  version: "1.0.0",
  status: "active",
};

export const webhookFixture: Webhook = {
  id: webhookId,
  url: "https://hooks.example.com/alert",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    type: "bearer",
  },
  bodyTemplate: {
    message: "Alerta {{cardData.inputs.descricao}}",
  },
};

export const labelFixture: Label = {
  id: labelId,
  name: "Urgente",
  boardId,
};

export const userFixture: User = {
  id: userId,
  role: "Admin",
  status: "ativo",
};

export const cardHistoryFixture: CardHistoryEntry = {
  id: historyId,
  type: "card.moved",
  summary: "Card movido para A fazer",
  payload: {
    from: "backlog",
    to: "A fazer",
  },
  createdAt: "2024-05-01T10:00:00Z",
  createdBy: "user-admin",
  cardId,
};

export const optionalFieldsFixture: Card = {
  id: "card-optional" as CardId,
  sourceData: {},
  cardData: {
    inputs: {},
    outputs: {},
  },
  props: {},
  pluginData: {},
  cardTypeId: null,
  boardId: null,
  columnId: null,
  position: null,
  idempotencyKey: null,
};

export const fixtures = {
  module: moduleFixture,
  treeNode: treeNodeFixture,
  board: boardFixture,
  column: columnFixture,
  cardType: cardTypeFixture,
  card: cardFixture,
  ingressSource: ingressSourceFixture,
  plugin: pluginFixture,
  webhook: webhookFixture,
  label: labelFixture,
  user: userFixture,
  cardHistory: cardHistoryFixture,
  optionalCard: optionalFieldsFixture,
};
