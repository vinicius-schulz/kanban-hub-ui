import type {
  BoardId,
  Card,
  CardHistoryEntry,
  CardHistoryEntryId,
  CardId,
  CardTypeId,
  Column,
  ColumnId,
} from "@/modules/_shared/domain/domain.contracts";

const alertasBoardId = "board-telemetria-alertas" as BoardId;
const incidentesBoardId = "board-telemetria-incidentes" as BoardId;
const slaBoardId = "board-sla-operacoes" as BoardId;
const fraudesBoardId = "board-fraudes-monitor" as BoardId;

const alertasCardTypeId = "card-type-alerta" as CardTypeId;
const incidentesCardTypeId = "card-type-incidente" as CardTypeId;
const slaCardTypeId = "card-type-sla" as CardTypeId;
const fraudesCardTypeId = "card-type-fraude" as CardTypeId;

const alertasBacklogId = "column-alertas-backlog" as ColumnId;
const alertasInvestigacaoId = "column-alertas-investigacao" as ColumnId;
const alertasMitigacaoId = "column-alertas-mitigacao" as ColumnId;
const alertasResolvidoId = "column-alertas-resolvido" as ColumnId;

const incidentesBacklogId = "column-incidentes-backlog" as ColumnId;
const incidentesAnaliseId = "column-incidentes-analise" as ColumnId;
const incidentesComunicacaoId = "column-incidentes-comunicacao" as ColumnId;
const incidentesResolvidoId = "column-incidentes-resolvido" as ColumnId;

const slaFilaId = "column-sla-fila" as ColumnId;
const slaEmExecucaoId = "column-sla-em-execucao" as ColumnId;
const slaAguardandoId = "column-sla-aguardando" as ColumnId;
const slaConcluidoId = "column-sla-concluido" as ColumnId;

const fraudesEntradaId = "column-fraudes-entrada" as ColumnId;
const fraudesValidacaoId = "column-fraudes-validacao" as ColumnId;
const fraudesInvestigacaoId = "column-fraudes-investigacao" as ColumnId;
const fraudesEncerradoId = "column-fraudes-encerrado" as ColumnId;

export const boardColumnFixtures: Column[] = [
  {
    id: alertasBacklogId,
    name: "Backlog",
    // TODO(POA-005): Confirmar campo de ordenação de colunas/cards.
    position: 1,
    boardId: alertasBoardId,
  },
  {
    id: alertasInvestigacaoId,
    name: "Investigação",
    position: 2,
    boardId: alertasBoardId,
  },
  {
    id: alertasMitigacaoId,
    name: "Mitigação",
    position: 3,
    boardId: alertasBoardId,
  },
  {
    id: alertasResolvidoId,
    name: "Resolvido",
    position: 4,
    boardId: alertasBoardId,
  },
  {
    id: incidentesBacklogId,
    name: "Backlog",
    position: 1,
    boardId: incidentesBoardId,
  },
  {
    id: incidentesAnaliseId,
    name: "Análise",
    position: 2,
    boardId: incidentesBoardId,
  },
  {
    id: incidentesComunicacaoId,
    name: "Comunicação",
    position: 3,
    boardId: incidentesBoardId,
  },
  {
    id: incidentesResolvidoId,
    name: "Resolvido",
    position: 4,
    boardId: incidentesBoardId,
  },
  {
    id: slaFilaId,
    name: "Fila",
    position: 1,
    boardId: slaBoardId,
  },
  {
    id: slaEmExecucaoId,
    name: "Em execução",
    position: 2,
    boardId: slaBoardId,
  },
  {
    id: slaAguardandoId,
    name: "Aguardando",
    position: 3,
    boardId: slaBoardId,
  },
  {
    id: slaConcluidoId,
    name: "Concluído",
    position: 4,
    boardId: slaBoardId,
  },
  {
    id: fraudesEntradaId,
    name: "Entrada",
    position: 1,
    boardId: fraudesBoardId,
  },
  {
    id: fraudesValidacaoId,
    name: "Validação",
    position: 2,
    boardId: fraudesBoardId,
  },
  {
    id: fraudesInvestigacaoId,
    name: "Investigação",
    position: 3,
    boardId: fraudesBoardId,
  },
  {
    id: fraudesEncerradoId,
    name: "Encerrado",
    position: 4,
    boardId: fraudesBoardId,
  },
];

export const boardCardFixtures: Card[] = [
  {
    id: "card-alerta-001" as CardId,
    boardId: alertasBoardId,
    columnId: alertasBacklogId,
    cardTypeId: alertasCardTypeId,
    position: 1,
    sourceData: {
      origem: "monitoramento",
      alerta: "Gateway sem resposta",
      severidade: "alta",
    },
    cardData: {
      inputs: {
        titulo: "Gateway indisponível",
        impacto: "Checkout indisponível para região sul",
      },
      outputs: {
        acao: "Acionar plantonista",
      },
    },
    props: {
      prioridade: "P1",
      sla: "30min",
    },
    pluginData: {
      observabilidade: {
        status: "degradado",
        uptime: "82%",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-alerta-002" as CardId,
    boardId: alertasBoardId,
    columnId: alertasBacklogId,
    cardTypeId: alertasCardTypeId,
    position: 2,
    sourceData: {
      origem: "monitoramento",
      alerta: "Fila de eventos acumulada",
      severidade: "média",
    },
    cardData: {
      inputs: {
        titulo: "Fila acumulada",
        impacto: "Processamento com atraso",
      },
      outputs: {
        acao: "Ajustar workers",
      },
    },
    props: {
      prioridade: "P2",
      sla: "2h",
    },
    pluginData: {
      observabilidade: {
        status: "alerta",
        backlog: "12k eventos",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-alerta-003" as CardId,
    boardId: alertasBoardId,
    columnId: alertasInvestigacaoId,
    cardTypeId: alertasCardTypeId,
    position: 1,
    sourceData: {
      origem: "monitoramento",
      alerta: "Erro de autenticação",
      severidade: "alta",
    },
    cardData: {
      inputs: {
        titulo: "Token inválido",
        impacto: "Clientes sem login",
      },
      outputs: {
        acao: "Revalidar chaves",
      },
    },
    props: {
      prioridade: "P1",
      sla: "1h",
    },
    pluginData: {
      observabilidade: {
        status: "critico",
        erros: "62%",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-alerta-004" as CardId,
    boardId: alertasBoardId,
    columnId: alertasInvestigacaoId,
    cardTypeId: alertasCardTypeId,
    position: 2,
    sourceData: {
      origem: "monitoramento",
      alerta: "Disco quase cheio",
      severidade: "baixa",
    },
    cardData: {
      inputs: {
        titulo: "Volume 93%",
        impacto: "Sem risco imediato",
      },
      outputs: {
        acao: "Planejar limpeza",
      },
    },
    props: {
      prioridade: "P3",
      sla: "24h",
    },
    pluginData: {
      observabilidade: {
        status: "observacao",
        detalhe: "Aumentar volume",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-alerta-005" as CardId,
    boardId: alertasBoardId,
    columnId: alertasMitigacaoId,
    cardTypeId: alertasCardTypeId,
    position: 1,
    sourceData: {
      origem: "monitoramento",
      alerta: "Alto tempo de resposta",
      severidade: "média",
    },
    cardData: {
      inputs: {
        titulo: "Latência acima do SLA",
        impacto: "Clientes com lentidão",
      },
      outputs: {
        acao: "Aplicar cache",
      },
    },
    props: {
      prioridade: "P2",
      sla: "4h",
    },
    pluginData: {
      observabilidade: {
        status: "mitigando",
        detalhe: "CDN ativada",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-alerta-006" as CardId,
    boardId: alertasBoardId,
    columnId: alertasResolvidoId,
    cardTypeId: alertasCardTypeId,
    position: 1,
    sourceData: {
      origem: "monitoramento",
      alerta: "Pico de CPU",
      severidade: "baixa",
    },
    cardData: {
      inputs: {
        titulo: "CPU normalizada",
        impacto: "Sem impacto",
      },
      outputs: {
        acao: "Registro encerrado",
      },
    },
    props: {
      prioridade: "P3",
      sla: "72h",
    },
    pluginData: {
      observabilidade: {
        status: "ok",
        detalhe: "Autoscaling aplicado",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-incidente-001" as CardId,
    boardId: incidentesBoardId,
    columnId: incidentesBacklogId,
    cardTypeId: incidentesCardTypeId,
    position: 1,
    sourceData: {
      origem: "suporte",
      chamado: "INC-4592",
    },
    cardData: {
      inputs: {
        titulo: "Falha na conciliação",
        impacto: "Pagamentos pendentes",
      },
      outputs: {
        acao: "Abrir war room",
      },
    },
    props: {
      prioridade: "P1",
      sla: "2h",
    },
    pluginData: {
      observabilidade: {
        status: "aberto",
        owner: "Operações",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-incidente-002" as CardId,
    boardId: incidentesBoardId,
    columnId: incidentesAnaliseId,
    cardTypeId: incidentesCardTypeId,
    position: 1,
    sourceData: {
      origem: "suporte",
      chamado: "INC-4633",
    },
    cardData: {
      inputs: {
        titulo: "Erro no motor antifraude",
        impacto: "Transações bloqueadas",
      },
      outputs: {
        acao: "Reverter release",
      },
    },
    props: {
      prioridade: "P1",
      sla: "1h",
    },
    pluginData: {
      observabilidade: {
        status: "analise",
        owner: "Risco",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-incidente-003" as CardId,
    boardId: incidentesBoardId,
    columnId: incidentesComunicacaoId,
    cardTypeId: incidentesCardTypeId,
    position: 1,
    sourceData: {
      origem: "suporte",
      chamado: "INC-4701",
    },
    cardData: {
      inputs: {
        titulo: "API externa instável",
        impacto: "Integrações falhando",
      },
      outputs: {
        acao: "Notificar parceiros",
      },
    },
    props: {
      prioridade: "P2",
      sla: "6h",
    },
    pluginData: {
      observabilidade: {
        status: "comunicacao",
        owner: "Suporte",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-incidente-004" as CardId,
    boardId: incidentesBoardId,
    columnId: incidentesResolvidoId,
    cardTypeId: incidentesCardTypeId,
    position: 1,
    sourceData: {
      origem: "suporte",
      chamado: "INC-4450",
    },
    cardData: {
      inputs: {
        titulo: "Reprocessamento finalizado",
        impacto: "Carteiras regularizadas",
      },
      outputs: {
        acao: "Encerrar incidente",
      },
    },
    props: {
      prioridade: "P3",
      sla: "12h",
    },
    pluginData: {
      observabilidade: {
        status: "encerrado",
        owner: "Operações",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-sla-001" as CardId,
    boardId: slaBoardId,
    columnId: slaFilaId,
    cardTypeId: slaCardTypeId,
    position: 1,
    sourceData: {
      origem: "sla",
      cliente: "Banco Atlântico",
    },
    cardData: {
      inputs: {
        titulo: "Prioridade alta",
        impacto: "Fatura vence em 4h",
      },
      outputs: {
        acao: "Alocar time dedicado",
      },
    },
    props: {
      prioridade: "P1",
      sla: "4h",
    },
    pluginData: {
      observabilidade: {
        status: "fila",
        owner: "SLA",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-sla-002" as CardId,
    boardId: slaBoardId,
    columnId: slaEmExecucaoId,
    cardTypeId: slaCardTypeId,
    position: 1,
    sourceData: {
      origem: "sla",
      cliente: "Loja Norte",
    },
    cardData: {
      inputs: {
        titulo: "Rollback emergencial",
        impacto: "Fluxo de notas instável",
      },
      outputs: {
        acao: "Aplicar patch",
      },
    },
    props: {
      prioridade: "P2",
      sla: "8h",
    },
    pluginData: {
      observabilidade: {
        status: "execucao",
        owner: "SRE",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-sla-003" as CardId,
    boardId: slaBoardId,
    columnId: slaAguardandoId,
    cardTypeId: slaCardTypeId,
    position: 1,
    sourceData: {
      origem: "sla",
      cliente: "Hospital Central",
    },
    cardData: {
      inputs: {
        titulo: "Aguardar aprovação",
        impacto: "Atualização pendente",
      },
      outputs: {
        acao: "Revisão com gestão",
      },
    },
    props: {
      prioridade: "P2",
      sla: "12h",
    },
    pluginData: {
      observabilidade: {
        status: "aguardando",
        owner: "Gestão",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-sla-004" as CardId,
    boardId: slaBoardId,
    columnId: slaConcluidoId,
    cardTypeId: slaCardTypeId,
    position: 1,
    sourceData: {
      origem: "sla",
      cliente: "Operação Sul",
    },
    cardData: {
      inputs: {
        titulo: "Processo encerrado",
        impacto: "Sem pendências",
      },
      outputs: {
        acao: "Documentar lições",
      },
    },
    props: {
      prioridade: "P3",
      sla: "24h",
    },
    pluginData: {
      observabilidade: {
        status: "concluido",
        owner: "SLA",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-fraude-001" as CardId,
    boardId: fraudesBoardId,
    columnId: fraudesEntradaId,
    cardTypeId: fraudesCardTypeId,
    position: 1,
    sourceData: {
      origem: "ingress",
      caso: "FR-9012",
    },
    cardData: {
      inputs: {
        titulo: "Tentativa de fraude",
        impacto: "Transação bloqueada",
      },
      outputs: {
        acao: "Analisar perfil",
      },
    },
    props: {
      prioridade: "P1",
      sla: "1h",
    },
    pluginData: {
      observabilidade: {
        status: "novo",
        owner: "Risco",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-fraude-002" as CardId,
    boardId: fraudesBoardId,
    columnId: fraudesValidacaoId,
    cardTypeId: fraudesCardTypeId,
    position: 1,
    sourceData: {
      origem: "ingress",
      caso: "FR-9150",
    },
    cardData: {
      inputs: {
        titulo: "Documento divergente",
        impacto: "Conta bloqueada",
      },
      outputs: {
        acao: "Solicitar evidências",
      },
    },
    props: {
      prioridade: "P2",
      sla: "8h",
    },
    pluginData: {
      observabilidade: {
        status: "validacao",
        owner: "Compliance",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-fraude-003" as CardId,
    boardId: fraudesBoardId,
    columnId: fraudesInvestigacaoId,
    cardTypeId: fraudesCardTypeId,
    position: 1,
    sourceData: {
      origem: "ingress",
      caso: "FR-9088",
    },
    cardData: {
      inputs: {
        titulo: "Dispositivo suspeito",
        impacto: "Aguardar análise",
      },
      outputs: {
        acao: "Monitorar sessão",
      },
    },
    props: {
      prioridade: "P2",
      sla: "6h",
    },
    pluginData: {
      observabilidade: {
        status: "investigacao",
        owner: "Fraude",
      },
    },
    idempotencyKey: null,
  },
  {
    id: "card-fraude-004" as CardId,
    boardId: fraudesBoardId,
    columnId: fraudesEncerradoId,
    cardTypeId: fraudesCardTypeId,
    position: 1,
    sourceData: {
      origem: "ingress",
      caso: "FR-8901",
    },
    cardData: {
      inputs: {
        titulo: "Caso resolvido",
        impacto: "Sem risco",
      },
      outputs: {
        acao: "Encerrar investigação",
      },
    },
    props: {
      prioridade: "P3",
      sla: "24h",
    },
    pluginData: {
      observabilidade: {
        status: "encerrado",
        owner: "Fraude",
      },
    },
    idempotencyKey: null,
  },
];

export const cardHistoryFixtures: CardHistoryEntry[] = [
  {
    id: "history-alerta-001" as CardHistoryEntryId,
    cardId: "card-alerta-001" as CardId,
    type: "alert.created",
    summary: "Alerta criado pelo monitoramento",
    payload: {
      origem: "monitoramento",
      regra: "gateway.latency",
    },
    createdAt: "2024-05-04T10:12:00Z",
    createdBy: "system",
  },
  {
    id: "history-alerta-002" as CardHistoryEntryId,
    cardId: "card-alerta-001" as CardId,
    type: "alert.escalated",
    summary: "Escalonado para plantão",
    payload: {
      destino: "SRE",
      canal: "Slack",
    },
    createdAt: "2024-05-04T10:25:00Z",
    createdBy: "user-plantao",
  },
  {
    id: "history-alerta-003" as CardHistoryEntryId,
    cardId: "card-alerta-003" as CardId,
    type: "analysis.started",
    summary: "Investigação iniciada",
    payload: {
      owner: "Observabilidade",
    },
    createdAt: "2024-05-03T14:10:00Z",
    createdBy: "user-analista",
  },
  {
    id: "history-incidente-001" as CardHistoryEntryId,
    cardId: "card-incidente-001" as CardId,
    type: "incident.created",
    summary: "Incidente registrado",
    payload: {
      severity: "P1",
    },
    createdAt: "2024-05-02T08:40:00Z",
    createdBy: "user-suporte",
  },
  {
    id: "history-incidente-002" as CardHistoryEntryId,
    cardId: "card-incidente-002" as CardId,
    type: "incident.analysis",
    summary: "Análise em andamento",
    payload: {
      area: "Risco",
    },
    createdAt: "2024-05-02T09:15:00Z",
    createdBy: "user-analista",
  },
  {
    id: "history-sla-001" as CardHistoryEntryId,
    cardId: "card-sla-002" as CardId,
    type: "sla.escalated",
    summary: "Escalonado para SRE",
    payload: {
      motivo: "Latência crítica",
    },
    createdAt: "2024-05-01T12:45:00Z",
    createdBy: "user-sla",
  },
  {
    id: "history-fraude-001" as CardHistoryEntryId,
    cardId: "card-fraude-002" as CardId,
    type: "fraud.validation",
    summary: "Validação em andamento",
    payload: {
      documento: "RG",
    },
    createdAt: "2024-05-05T11:05:00Z",
    createdBy: "user-compliance",
  },
];

