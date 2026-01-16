import type {
  Board,
  Card,
  CardHistory,
  CardType,
  Column,
  IngressSource,
  Label,
  Module,
  Plugin,
  User,
  Webhook,
} from "../types";

export const fixtureUsers: User[] = [
  {
    id: "user-1",
    name: "Patrícia Operadora",
    role: "Operacional",
    status: "ativo",
  },
  {
    id: "user-2",
    name: "Alex Admin",
    role: "Administrador",
    status: "ativo",
  },
];

export const fixtureLabels: Label[] = [
  { id: "label-1", boardId: "board-1", name: "Urgente", color: "#e11d48" },
  { id: "label-2", boardId: "board-1", name: "Financeiro", color: "#0ea5e9" },
];

export const fixtureColumns: Column[] = [
  { id: "col-1", boardId: "board-1", name: "A Fazer" },
  { id: "col-2", boardId: "board-1", name: "Em Progresso" },
  { id: "col-3", boardId: "board-1", name: "Concluído" },
];

export const fixtureCardTypes: CardType[] = [
  {
    id: "card-type-1",
    boardId: "board-1",
    name: "Solicitação",
    description: "Fluxo padrão de solicitação",
    fields: [
      {
        id: "field-1",
        name: "cliente",
        type: "string",
        mode: "editable",
        required: true,
      },
      {
        id: "field-2",
        name: "valor",
        type: "number",
        mode: "editable",
      },
    ],
    previewFields: ["cliente", "valor"],
  },
];

export const fixtureBoards: Board[] = [
  {
    id: "board-1",
    moduleId: "module-1",
    name: "Kanban Financeiro",
    description: "Solicitações de pagamento",
    columns: fixtureColumns,
    cardTypes: fixtureCardTypes,
  },
];

export const fixtureModules: Module[] = [
  {
    id: "module-1",
    name: "Financeiro",
    description: "Processos financeiros",
    boards: fixtureBoards,
  },
  {
    id: "module-2",
    name: "Operações",
    description: "Processos operacionais",
    boards: [],
  },
];

export const fixtureIngressSources: IngressSource[] = [
  {
    id: "ingress-1",
    boardId: "board-1",
    name: "Webhook ERP",
    description: "Entrada de dados do ERP",
    externalObjectIdPath: "payload.id",
  },
];

export const fixturePlugins: Plugin[] = [
  {
    id: "plugin-1",
    name: "Resumo Financeiro",
    status: "active",
    description: "Mostra resumo do pedido",
  },
];

export const fixtureWebhooks: Webhook[] = [
  {
    id: "webhook-1",
    boardId: "board-1",
    name: "Notificar SLA",
    url: "https://hooks.example.com/notify",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyTemplate: {
      cardId: "{{card.id}}",
      status: "{{card.columnId}}",
    },
  },
];

export const fixtureCardHistory: CardHistory[] = [
  {
    id: "history-1",
    cardId: "card-1",
    type: "created",
    summary: "Card criado",
    payload: { columnId: "col-1" },
    createdAt: "2024-01-10T10:00:00.000Z",
    createdBy: "user-1",
  },
  {
    id: "history-2",
    cardId: "card-1",
    type: "moved",
    summary: "Card movido para Em Progresso",
    payload: { from: "col-1", to: "col-2" },
    createdAt: "2024-01-11T09:30:00.000Z",
    createdBy: "user-2",
  },
];

export const fixtureCards: Card[] = [
  {
    id: "card-1",
    boardId: "board-1",
    columnId: "col-1",
    cardTypeId: "card-type-1",
    title: "Pagamento fornecedor ACME",
    sourceData: {
      origem: "ERP",
      protocolo: "ERP-2024-01",
    },
    cardData: {
      inputs: {
        cliente: "ACME",
        valor: 4500,
      },
      outputs: {
        autorizado: true,
      },
    },
    props: {
      prioridade: "alta",
    },
    pluginData: {
      resumo: "Pedido aprovado",
    },
    labels: fixtureLabels,
    history: fixtureCardHistory,
  },
];
