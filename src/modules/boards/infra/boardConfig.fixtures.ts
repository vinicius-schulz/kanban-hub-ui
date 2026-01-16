import type {
  BoardId,
  CardType,
  CardTypeField,
  CardTypeId,
  IngressSource,
  IngressSourceId,
  Label,
  LabelId,
} from "@/modules/_shared/domain/domain.contracts";

export type BoardCardTypeConfig = {
  boardId: BoardId;
  cardType: CardType;
};

const alertasBoardId = "board-telemetria-alertas" as BoardId;
const incidentesBoardId = "board-telemetria-incidentes" as BoardId;
const slaBoardId = "board-sla-operacoes" as BoardId;
const fraudesBoardId = "board-fraudes-monitor" as BoardId;

const alertasCardTypeId = "card-type-alerta" as CardTypeId;
const incidentesCardTypeId = "card-type-incidente" as CardTypeId;
const slaCardTypeId = "card-type-sla" as CardTypeId;
const fraudesCardTypeId = "card-type-fraude" as CardTypeId;

const sharedFields: CardTypeField[] = [
  {
    label: "Título",
    type: "string",
    mode: "editable",
    bindingRef: "cardData.inputs.titulo",
    preview: true,
    modal: true,
  },
  {
    label: "Impacto",
    type: "string",
    mode: "editable",
    bindingRef: "cardData.inputs.impacto",
    preview: false,
    modal: true,
  },
];

export const boardCardTypeFixtures: BoardCardTypeConfig[] = [
  {
    boardId: alertasBoardId,
    cardType: {
      id: alertasCardTypeId,
      name: "Alerta crítico",
      fields: [
        ...sharedFields,
        {
          label: "Severidade",
          type: "enum",
          mode: "readonly",
          bindingRef: "sourceData.severidade",
          preview: true,
          modal: true,
        },
      ],
    },
  },
  {
    boardId: incidentesBoardId,
    cardType: {
      id: incidentesCardTypeId,
      name: "Incidente",
      fields: [
        ...sharedFields,
        {
          label: "Equipe",
          type: "string",
          mode: "editable",
          bindingRef: "cardData.inputs.equipe",
          preview: true,
          modal: true,
        },
      ],
    },
  },
  {
    boardId: slaBoardId,
    cardType: {
      id: slaCardTypeId,
      name: "SLA",
      fields: [
        ...sharedFields,
        {
          label: "SLA alvo",
          type: "string",
          mode: "readonly",
          bindingRef: "props.sla",
          preview: true,
          modal: true,
        },
      ],
    },
  },
  {
    boardId: fraudesBoardId,
    cardType: {
      id: fraudesCardTypeId,
      name: "Fraude",
      fields: [
        ...sharedFields,
        {
          label: "Canal",
          type: "string",
          mode: "readonly",
          bindingRef: "sourceData.origem",
          preview: true,
          modal: true,
        },
      ],
    },
  },
];

export const boardLabelFixtures: Label[] = [
  {
    id: "label-urgente" as LabelId,
    name: "Urgente",
    boardId: alertasBoardId,
  },
  {
    id: "label-monitoramento" as LabelId,
    name: "Monitoramento",
    boardId: alertasBoardId,
  },
  {
    id: "label-comunicacao" as LabelId,
    name: "Comunicação",
    boardId: incidentesBoardId,
  },
  {
    id: "label-critico" as LabelId,
    name: "Crítico",
    boardId: incidentesBoardId,
  },
  {
    id: "label-sla-alto" as LabelId,
    name: "SLA alto",
    boardId: slaBoardId,
  },
  {
    id: "label-prioridade" as LabelId,
    name: "Prioridade",
    boardId: slaBoardId,
  },
  {
    id: "label-fraude" as LabelId,
    name: "Fraude",
    boardId: fraudesBoardId,
  },
  {
    id: "label-revisao" as LabelId,
    name: "Revisão",
    boardId: fraudesBoardId,
  },
];

export const boardIngressSourceFixtures: IngressSource[] = [
  {
    id: "ingress-alertas" as IngressSourceId,
    boardId: alertasBoardId,
    alias: "monitoramento",
    schema: {
      type: "object",
      properties: {
        severity: { type: "string" },
        title: { type: "string" },
      },
    },
    mapping: {
      "sourceData.severidade": "$.severity",
      "cardData.inputs.titulo": "$.title",
    },
    externalObjectIdPath: "$.id",
  },
  {
    id: "ingress-incidentes" as IngressSourceId,
    boardId: incidentesBoardId,
    alias: "incidentes",
    schema: {
      type: "object",
      properties: {
        titulo: { type: "string" },
        equipe: { type: "string" },
      },
    },
    mapping: {
      "cardData.inputs.titulo": "$.titulo",
      "cardData.inputs.equipe": "$.equipe",
    },
    externalObjectIdPath: "$.ticketId",
  },
  {
    id: "ingress-sla" as IngressSourceId,
    boardId: slaBoardId,
    alias: "sla",
    schema: {
      type: "object",
      properties: {
        descricao: { type: "string" },
        prazo: { type: "string" },
      },
    },
    mapping: {
      "cardData.inputs.titulo": "$.descricao",
      "props.sla": "$.prazo",
    },
    externalObjectIdPath: "$.id",
  },
  {
    id: "ingress-fraudes" as IngressSourceId,
    boardId: fraudesBoardId,
    alias: "antifraude",
    schema: {
      type: "object",
      properties: {
        alerta: { type: "string" },
        canal: { type: "string" },
      },
    },
    mapping: {
      "cardData.inputs.titulo": "$.alerta",
      "sourceData.origem": "$.canal",
    },
    externalObjectIdPath: "$.eventoId",
  },
];

export const getCardTypeByBoardId = (boardId: BoardId) => {
  return boardCardTypeFixtures.find((item) => item.boardId === boardId)?.cardType ?? null;
};

export const getLabelsByBoardId = (boardId: BoardId) => {
  return boardLabelFixtures.filter((label) => label.boardId === boardId);
};

export const getIngressSourcesByBoardId = (boardId: BoardId) => {
  return boardIngressSourceFixtures.filter((source) => source.boardId === boardId);
};
