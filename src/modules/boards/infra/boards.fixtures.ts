import type { Board, BoardId, ModuleId } from "@/modules/_shared/domain/domain.contracts";

export const boardsFixture: Array<Board & { moduleId: ModuleId }> = [
  {
    id: "board-telemetria-alertas" as BoardId,
    moduleId: "module-telemetria" as ModuleId,
    name: "Alertas críticos",
    description: "Acompanhe alertas críticos e ações de resposta.",
    cardTypeId: null,
  },
  {
    id: "board-telemetria-incidentes" as BoardId,
    moduleId: "module-telemetria" as ModuleId,
    name: "Incidentes de serviço",
    description: "Gestão de incidentes com impacto operacional.",
    cardTypeId: null,
  },
  {
    id: "board-sla-operacoes" as BoardId,
    moduleId: "module-sla" as ModuleId,
    name: "Operações críticas",
    description: "SLA em andamento e pontos de atenção.",
    cardTypeId: null,
  },
  {
    id: "board-fraudes-monitor" as BoardId,
    moduleId: "module-fraudes" as ModuleId,
    name: "Monitoramento de fraudes",
    description: "Fila de investigação e revisão manual.",
    cardTypeId: null,
  },
];

export const getBoardById = (boardId: BoardId) => {
  return boardsFixture.find((board) => board.id === boardId) ?? null;
};
