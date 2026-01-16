import type { BoardId, Webhook, WebhookId } from "@/modules/_shared/domain/domain.contracts";

export type BoardWebhook = Webhook & {
  boardId: BoardId;
  name: string;
};

const alertasBoardId = "board-telemetria-alertas" as BoardId;
const incidentesBoardId = "board-telemetria-incidentes" as BoardId;
const slaBoardId = "board-sla-operacoes" as BoardId;
const fraudesBoardId = "board-fraudes-monitor" as BoardId;

export const boardWebhookFixtures: BoardWebhook[] = [
  {
    id: "webhook-alerta" as WebhookId,
    boardId: alertasBoardId,
    name: "Notificar ChatOps",
    url: "https://hooks.example.com/chatops",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyTemplate: {
      mensagem: "Alerta {{cardData.inputs.titulo}}",
    },
  },
  {
    id: "webhook-incidente" as WebhookId,
    boardId: incidentesBoardId,
    name: "Abrir incidente",
    url: "https://hooks.example.com/incidentes",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyTemplate: {
      incidente: "{{cardData.inputs.titulo}}",
    },
  },
  {
    id: "webhook-sla" as WebhookId,
    boardId: slaBoardId,
    name: "Reportar SLA",
    url: "https://hooks.example.com/sla",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyTemplate: {
      sla: "{{cardData.inputs.titulo}}",
    },
  },
  {
    id: "webhook-fraude" as WebhookId,
    boardId: fraudesBoardId,
    name: "Acionar antifraude",
    url: "https://hooks.example.com/fraudes",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyTemplate: {
      alerta: "{{cardData.inputs.titulo}}",
    },
  },
];

export const getWebhooksByBoardId = (boardId: BoardId) => {
  return boardWebhookFixtures.filter((webhook) => webhook.boardId === boardId);
};
