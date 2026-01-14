[1] RESUMO (até 10 linhas)
- Total de POAs: 5
- Severidade: 2 BLOCKER (POA-004, POA-005) | 3 MEDIUM (POA-001..POA-003)
- Temas principais: contrato de dados do Card (idempotência e ordenação), definição de papéis/perfis, decisão de formato de CardType, validação de rotas/telas.
- Dependências externas: decisão de PO/Tech Lead sobre modelo de dados do Card e regras de idempotência/ordenação.

[2] BACKLOG DE POAs PRIORIZADO

POA-004
- severity: BLOCKER | category: Dados | impact: API, Persistência
- affected_ids: RN-005, ENT-005, UC-006, RF-012
- Pergunta principal: O Card deve possuir campo idempotencyKey (ou equivalente) para suportar atualização idempotente no ingress?
- Follow-ups:
  1) Qual o nome final do campo (idempotencyKey, externalObjectId, outro)?
  2) Tipo e constraints (string, tamanho, unicidade por board)?
  3) Onde esse campo é persistido e em quais eventos é atualizado?
  4) Como tratar colisões/duplicidades?
  5) Isso afeta o payload do IngressSource?
- Quem responde: PO + Tech Lead
- Evidência ideal: decisão de modelagem ou documentação de integração do evento externo
- Critério de encerramento: campo definido no ENT-005 e RN-005 alinhada ao campo escolhido

POA-005
- severity: BLOCKER | category: Dados | impact: UI, Persistência
- affected_ids: RN-006, ENT-005, RF-005, UC-003
- Pergunta principal: Qual é o campo de ordenação de card (ex.: position, orderIndex) e seu tipo/semântica?
- Follow-ups:
  1) Ordenação é global ou por coluna?
  2) O campo deve ser inteiro, float ou outro formato?
  3) Como atualizar o campo em drag & drop (reindex completo ou ajuste local)?
  4) Existem constraints de ordenação estável entre colunas?
  5) Deve existir compatibilidade com ordenação de backend atual?
- Quem responde: PO + Tech Lead
- Evidência ideal: documento de regra de ordenação/UX do kanban ou decisão de modelagem
- Critério de encerramento: campo definido no ENT-005 com regra RN-006 atualizada

POA-001
- severity: MEDIUM | category: UX | impact: UI, API
- affected_ids: SCR-001, SCR-002, SCR-003, SCR-004, SCR-005, RTE-001, RTE-012
- Pergunta principal: As rotas e telas listadas são definitivas ou apenas sugestivas?
- Follow-ups:
  1) Existe padrão de rotas já aprovado para o produto?
  2) Precisamos suportar aliases ou redirecionamentos?
  3) Há telas/rotas que devem ser removidas ou renomeadas no MVP?
  4) A navegação considera módulos com múltiplas árvores?
  5) As rotas precisam de guards específicos?
- Quem responde: PO + UX
- Evidência ideal: mapa de UX aprovado ou especificação de rotas
- Critério de encerramento: lista final de telas/rotas e guardas confirmada

POA-002
- severity: MEDIUM | category: Permissões | impact: Segurança, UI, State
- affected_ids: ACT-002, RF-010
- Pergunta principal: O perfil Gestor/Líder será mantido no MVP ou apenas Operacional/Admin?
- Follow-ups:
  1) Se existir Gestor, quais permissões exclusivas ele terá?
  2) Gestor pode acessar telas de admin parcial?
  3) Como diferenciar Gestor de Operacional nas permissões de board?
  4) Há necessidade de auditoria específica para ações do Gestor?
  5) Quais telas visíveis para Gestor no MVP?
- Quem responde: PO + Segurança
- Evidência ideal: matriz de permissões ou documento de perfis
- Critério de encerramento: decisão de perfis + matriz de permissões alinhada ao MVP

POA-003
- severity: MEDIUM | category: Dados | impact: Persistência, API, State
- affected_ids: ENT-006, ENT-007, RF-011
- Pergunta principal: Como será persistida a definição de CardType (JSON Schema ou outro modelo)?
- Follow-ups:
  1) Qual o formato canônico e exemplos de payload?
  2) Precisamos de validação em runtime?
  3) Existe migração de modelos já existentes?
  4) Quais campos são obrigatórios no schema?
  5) Há limites de tamanho/complexidade?
- Quem responde: Tech Lead + PO
- Evidência ideal: proposta de modelagem ou exemplo real de CardType
- Critério de encerramento: formato definido e refletido no modelo de dados

[3] PERGUNTAS AGRUPADAS POR SESSÃO (Roteiro)

Sessão 1 (alta prioridade / blockers)
1) POA-004 — Campo idempotencyKey para atualização idempotente no ingress?
2) POA-005 — Campo de ordenação de card (position/orderIndex) e semântica?

Sessão 2 (regras e dados)
1) POA-003 — Persistência do CardType (JSON Schema ou outro)?
2) POA-002 — Manter perfil Gestor/Líder no MVP?

Sessão 3 (integrações e RNFs)
1) POA-001 — Rotas/telas definitivas ou sugestivas?
