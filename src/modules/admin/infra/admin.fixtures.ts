import type { Plugin, PluginId } from "@/modules/_shared/domain/domain.contracts";
import { boardCardTypeFixtures, boardIngressSourceFixtures, boardLabelFixtures } from "@/modules/boards/infra/boardConfig.fixtures";
import { boardsFixture } from "@/modules/boards/infra/boards.fixtures";
import { boardWebhookFixtures } from "@/modules/boards/infra/boardWebhooks.fixtures";
import { boardColumnFixtures } from "@/modules/boards/infra/kanban.fixtures";
import { modulesFixture } from "@/modules/modules/infra/modules.fixtures";

export const adminModuleFixtures = modulesFixture;
export const adminBoardFixtures = boardsFixture;
export const adminColumnFixtures = boardColumnFixtures;
export const adminLabelFixtures = boardLabelFixtures;
export const adminCardTypeFixtures = boardCardTypeFixtures;
export const adminIngressSourceFixtures = boardIngressSourceFixtures;
export const adminWebhookFixtures = boardWebhookFixtures;

export const adminPluginFixtures: Plugin[] = [
  {
    id: "plugin-observabilidade" as PluginId,
    pluginKey: "observability",
    displayName: "Observabilidade",
    description: "Cards com métricas de uptime e alertas.",
    version: "1.2.0",
    status: "active",
  },
  {
    id: "plugin-sla" as PluginId,
    pluginKey: "sla-summary",
    displayName: "Resumo de SLA",
    description: "Componente de status do SLA do fluxo.",
    version: "0.8.1",
    status: "active",
  },
  {
    id: "plugin-risk" as PluginId,
    pluginKey: "risk-score",
    displayName: "Score de risco",
    description: "Exibe score e fatores de risco do card.",
    version: "0.4.3",
    status: "inactive",
  },
];
