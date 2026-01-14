[1] READY_FOR_IMPLEMENTATION (VEREDITO FINAL)
- READY_FOR_IMPLEMENTATION: false
- INPUT_1_1_READY: false
- Blockers ativos:
  - POA-004: ausência de definição do campo idempotencyKey no ENT-005 para RN-005 (idempotência de ingestão).
  - POA-005: ausência de definição do campo position/orderIndex no ENT-005 para RN-006 (ordenação de cards).
- Motivo: FIND-001 e FIND-002 do validation.md não foram resolvidos por patch.json e permanecem sem modo seguro formalizado no spec.

[2] DEFAULTS CONSERVADORES PROPOSTOS (não-aplicados automaticamente)

POA-001
- H1: Manter rotas como listadas
- H2: Ajustar rotas conforme arquitetura existente
- H3: Definir rotas após discovery com UI
- Default conservador recomendado: manter rotas atuais apenas como sugestivas e adiar contrato definitivo
- Rationale: evita fixar URLs que podem conflitar com a arquitetura existente
- Risks: retrabalho em navegação e links se rotas mudarem
- Mitigations: feature flag de rotas + redirects temporários
- SAFE_DEFAULT: false

POA-002
- H1: Manter Gestor como perfil separado
- H2: Remover Gestor no MVP
- H3: Mapear Gestor para Admin parcial
- Default conservador recomendado: operar apenas com Operacional/Admin até definição de Gestor
- Rationale: reduz risco de permissões excessivas sem matriz definida
- Risks: Gestores podem ficar sem acesso a dashboards desejados
- Mitigations: criar perfil temporário com permissões mínimas e registrar auditoria
- SAFE_DEFAULT: false

POA-003
- H1: JSON Schema
- H2: Modelo próprio simplificado
- H3: Definição normalizada em tabelas
- Default conservador recomendado: armazenar definição como objeto opaco (sem validação automática) até decisão final
- Rationale: evita bloqueio de persistência enquanto formato não é definido
- Risks: validações inconsistentes e mudanças futuras de modelagem
- Mitigations: versionar CardType e registrar exemplos reais
- SAFE_DEFAULT: false

POA-004
- H1: Definir idempotencyKey (string) em ENT-005
- H2: Usar externalObjectId persistido no card como chave
- H3: Definir chave composta (boardId+externalId)
- Default conservador recomendado: negar atualização automática e tratar como create-only até chave definida
- Rationale: evita inconsistências de idempotência sem contrato de dados
- Risks: duplicação de cards por eventos repetidos
- Mitigations: registrar warnings e permitir revisão manual
- SAFE_DEFAULT: false

POA-005
- H1: Definir position (number) em ENT-005 por coluna
- H2: Definir orderIndex (number) + columnId
- H3: Ordenar por timestamp de movimento
- Default conservador recomendado: persistir movimentos sem reordenar automaticamente até campo definido
- Rationale: evita aplicar ordenação errada e inconsistências de UI
- Risks: UX degradada com ordenação inconsistente
- Mitigations: exibir ordem atual sem reordenação e logar eventos
- SAFE_DEFAULT: false

[3] DEFAULTS APLICÁVEIS AUTOMATICAMENTE (SAFE_DEFAULT=true)
- Nenhum POA com SAFE_DEFAULT=true no momento.

[4] MAPA DE RISCOS RESIDUAIS
1) Falta de contrato de idempotência pode gerar duplicidade de cards na ingestão.
2) Ausência de campo de ordenação pode quebrar drag & drop e persistência.
3) Incerteza no formato de CardType pode causar retrabalho de modelagem e validação.
4) Indefinição do perfil Gestor pode gerar lacunas de permissão ou excesso de acesso.
5) Rotas sugeridas podem divergir da arquitetura final e exigir migração de URLs.

[5] CHANGELOG DO spec.resolved.json (OBRIGATÓRIO)
- /sources/1 | manual_fix | N/A -> {"source_id":"SRC-002",...} | trace: AGENT_3
- /open_points/1/category | manual_fix | "Produto" -> "Permissões" | trace: AGENT_3
- /open_points/1/sources/- | manual_fix | N/A -> {"source_id":"SRC-002","reference":"validation.md (normalização de categoria)"} | trace: AGENT_3
- /open_points/3 | manual_fix | N/A -> POA-004 (novo) | trace: AGENT_3
- /open_points/4 | manual_fix | N/A -> POA-005 (novo) | trace: AGENT_3

Resumo do patch.json (Agente 2):
- Operações aplicadas com sucesso: 0
- Operações com falha: 0
- Falhas: nenhuma
