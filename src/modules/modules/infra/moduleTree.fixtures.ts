import type { BoardId, ModuleId, TreeNode, TreeNodeId } from "@/modules/_shared/domain/domain.contracts";

const telemetriaRootId = "node-telemetria-root" as TreeNodeId;
const telemetriaAlertasId = "node-telemetria-alertas" as TreeNodeId;
const telemetriaIncidentesId = "node-telemetria-incidentes" as TreeNodeId;

const slaRootId = "node-sla-root" as TreeNodeId;
const slaSlaId = "node-sla-operacoes" as TreeNodeId;

const fraudesRootId = "node-fraudes-root" as TreeNodeId;
const fraudesMonitorId = "node-fraudes-monitor" as TreeNodeId;

const boardAlertasId = "board-telemetria-alertas" as BoardId;
const boardIncidentesId = "board-telemetria-incidentes" as BoardId;
const boardSlaId = "board-sla-operacoes" as BoardId;
const boardFraudesId = "board-fraudes-monitor" as BoardId;

export const moduleTreeFixtures: Array<{ moduleId: ModuleId; nodes: TreeNode[] }> = [
  {
    moduleId: "module-telemetria" as ModuleId,
    nodes: [
      {
        id: telemetriaRootId,
        name: "Telemetria",
        parentId: null,
        boardId: null,
      },
      {
        id: telemetriaAlertasId,
        name: "Alertas",
        parentId: telemetriaRootId,
        boardId: boardAlertasId,
      },
      {
        id: telemetriaIncidentesId,
        name: "Incidentes",
        parentId: telemetriaRootId,
        boardId: boardIncidentesId,
      },
    ],
  },
  {
    moduleId: "module-sla" as ModuleId,
    nodes: [
      {
        id: slaRootId,
        name: "Gestão de SLA",
        parentId: null,
        boardId: null,
      },
      {
        id: slaSlaId,
        name: "Operações críticas",
        parentId: slaRootId,
        boardId: boardSlaId,
      },
    ],
  },
  {
    moduleId: "module-fraudes" as ModuleId,
    nodes: [
      {
        id: fraudesRootId,
        name: "Fraudes",
        parentId: null,
        boardId: null,
      },
      {
        id: fraudesMonitorId,
        name: "Monitoramento",
        parentId: fraudesRootId,
        boardId: boardFraudesId,
      },
    ],
  },
];

export const getModuleTreeByModuleId = (moduleId: ModuleId) => {
  return moduleTreeFixtures.find((tree) => tree.moduleId === moduleId)?.nodes ?? [];
};
