[1] READY_FOR_IMPLEMENTATION (VEREDITO FINAL)
- READY_FOR_IMPLEMENTATION: false
- INPUT_1_1_READY (referência do Agente 2): false
- Regra canônica (conservadora): Há BLOCKER aberto (POA-004) e FIND-001 não resolvido.
- Blockers ativos:
  - POA-004: definição de cardTypeId no Card vs derivação do Board impede validar RN-001 e consolidar modelo de dados.

[2] DEFAULTS CONSERVADORES PROPOSTOS (não-aplicados automaticamente)
- POA-004
  - H1/H2/H3: Card com cardTypeId próprio | CardType derivado do Board | cardTypeId opcional
  - Default conservador recomendado: manter derivação via Board até decisão formal (evitar adicionar campo novo sem consenso).
  - rationale: evita alteração de schema sem validação do negócio.
  - risks: RN-001 permanece sem validação explícita no Card.
  - mitigations: registrar decisão no spec; adicionar validação no Board enquanto Card não tiver campo.
  - SAFE_DEFAULT: false

- POA-003
  - H1/H2/H3: JWT | Cookie server-side | SSO externo
  - Default conservador recomendado: bloquear implementação até decisão de autenticação.
  - rationale: decisão impacta segurança e arquitetura.
  - risks: implementação insegura ou retrabalho.
  - mitigations: alinhar com equipe de segurança antes de iniciar.
  - SAFE_DEFAULT: false

- POA-005
  - H1/H2/H3: Criar RFs | Retirar UCs do MVP | RFs mínimos
  - Default conservador recomendado: retirar do MVP até RFs definidos.
  - rationale: evita implementação sem requisitos testáveis.
  - risks: perda de funcionalidade administrativa no MVP.
  - mitigations: roadmap para reinserir após definição de RFs.
  - SAFE_DEFAULT: false

- POA-001
  - H1/H2/H3: Gestor intermediário | Gestor = Operacional | Gestor omitido
  - Default conservador recomendado: tratar Gestor como Operacional (sem permissões extras) até decisão final.
  - rationale: princípio de menor privilégio.
  - risks: stakeholder pode esperar permissões adicionais.
  - mitigations: deixar papel configurável; documentar limitação.
  - SAFE_DEFAULT: false

- POA-006
  - H1/H2/H3: múltiplas telas/rotas por UC | manter somente principal | dividir UCs
  - Default conservador recomendado: manter apenas tela/rota principal no spec.json até decisão (sem mudança automática).
  - rationale: evita alterações de schema sem alinhamento.
  - risks: rastreabilidade parcial de UX.
  - mitigations: completar mapeamento após decisão formal.
  - SAFE_DEFAULT: false

- POA-002
  - H1/H2/H3: warning | informativo | sem evento
  - Default conservador recomendado: registrar warning (maior visibilidade).
  - rationale: observabilidade conservadora.
  - risks: ruído no histórico.
  - mitigations: permitir filtro de warnings na UI.
  - SAFE_DEFAULT: false

[3] DEFAULTS APLICÁVEIS AUTOMATICAMENTE (SAFE_DEFAULT=true)
- Nenhum POA elegível nesta rodada.

[4] MAPA DE RISCOS RESIDUAIS
- Modelo de dados inconsistente (CardType no Card) pode gerar retrabalho em API e UI.
- Autenticação indefinida pode bloquear integração e front-end.
- UCs administrativos sem RFs aumentam risco de escopo divergente.
- Rastreamento UX incompleto pode causar falhas de navegação não testadas.
- Semântica de warnings indefinida reduz previsibilidade do histórico.

[5] CHANGELOG DO spec.resolved.json (OBRIGATÓRIO)
- /sources/- | manual_fix | null -> SRC-002 | trace: AGENT_3
- /open_points/3 | manual_fix | null -> POA-004 | trace: AGENT_3
- /open_points/4 | manual_fix | null -> POA-005 | trace: AGENT_3
- /open_points/5 | manual_fix | null -> POA-006 | trace: AGENT_3
- Resumo patch.json: 0 aplicadas com sucesso, 0 falharam
