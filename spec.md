[1] REGISTRO DE FONTES
- SRC-001 | tipo: doc | nome: "Documentação Consolidada Final — Hub Kanban Configurável e Integrável (MVP)" | data: null | repo/branch/commit: null | observações: texto estruturado com seções numeradas.

[2] SUMÁRIO EXECUTIVO (máx 15 linhas)
- O sistema é um hub central de gestão de atividades em Kanban para transformar ocorrências de sistemas externos em cards de boards específicos, com dados estruturados e histórico completo.【F:artefatos/requisitos preliminares.txt†L1-L77】
- Usuários-alvo incluem Operacional (dia a dia), Gestor/Líder (acompanhamento) e Administrador (cadastros e configurações).【F:artefatos/requisitos preliminares.txt†L24-L66】
- Módulos principais incluem: módulos/árvore/boards/colunas/cards, CardTypes configuráveis, histórico, plugins, ingressão de eventos externos, webhooks de saída e permissões RBAC simples.【F:artefatos/requisitos preliminares.txt†L8-L407】
- Riscos/ambigüidades: rotas e telas são apresentadas como “sugeridas” e podem requerer confirmação (POA-001).【F:artefatos/requisitos preliminares.txt†L492-L513】
- O papel “Gestor” é opcional no MVP e precisa de decisão de escopo (POA-002).【F:artefatos/requisitos preliminares.txt†L456-L467】
- Persistência/forma de implementação do CardType (ex.: JSON Schema) é mencionada como alternativa, mas não definida (POA-003).【F:artefatos/requisitos preliminares.txt†L194-L203】

[3] CONTEXTO DO DOMÍNIO E LÉXICO (Ubiquitous Language)
3.1 Glossário (canonizado)
- Kanban/Board -> quadro Kanban onde o trabalho acontece, com colunas configuráveis e cards movidos manualmente -> sinônimos: board, quadro -> fontes: SRC-001 §3.3, §11.【F:artefatos/requisitos preliminares.txt†L83-L360】
- Card -> unidade de trabalho criada manualmente ou por ingress; contém dados estruturados em buckets e histórico -> sinônimos: cartão -> fontes: SRC-001 §5, §9.【F:artefatos/requisitos preliminares.txt†L146-L299】
- CardType -> contrato de exibição/campos de um card, com fields dinâmicos e preview -> sinônimos: tipo de card -> fontes: SRC-001 §3.3, §7.【F:artefatos/requisitos preliminares.txt†L73-L224】
- IngressSource -> configuração de entrada de objetos externos que criam/atualizam cards -> sinônimos: fonte de entrada -> fontes: SRC-001 §9.【F:artefatos/requisitos preliminares.txt†L236-L299】
- Plugin -> componente visual do card, hardcoded no código e registrado no banco -> sinônimos: componente -> fontes: SRC-001 §8.【F:artefatos/requisitos preliminares.txt†L214-L235】
- Webhook -> conector de saída configurável com template de variáveis e execução manual -> sinônimos: conector -> fontes: SRC-001 §10.【F:artefatos/requisitos preliminares.txt†L301-L360】
- Label -> etiqueta aplicada a cards, segregada por board -> sinônimos: tag, etiqueta -> fontes: SRC-001 §12.【F:artefatos/requisitos preliminares.txt†L372-L376】
- Módulo -> grande área/processo do negócio contendo árvore de navegação -> sinônimos: módulo -> fontes: SRC-001 §3.1-3.2.【F:artefatos/requisitos preliminares.txt†L67-L99】
- Árvore do módulo -> estrutura hierárquica de nós, onde folhas apontam para boards -> sinônimos: árvore -> fontes: SRC-001 §3.2.【F:artefatos/requisitos preliminares.txt†L70-L99】

3.2 Entidades candidatas (somente quando houver evidência)
- Módulo: representa área/processo do negócio e contém uma árvore de nós; exemplo: Telemetria, Cobrança.【F:artefatos/requisitos preliminares.txt†L67-L79】
- Nó de Árvore: nó hierárquico com filhos; folhas associam-se a um Board.【F:artefatos/requisitos preliminares.txt†L70-L99】
- Board: quadro Kanban com colunas configuráveis e associado a exatamente um CardType.【F:artefatos/requisitos preliminares.txt†L83-L99】
- Coluna: parte configurável do board; cards movem-se entre colunas com drag & drop.【F:artefatos/requisitos preliminares.txt†L83-L360】
- Card: unidade de trabalho com buckets `sourceData`, `cardData.inputs`, `cardData.outputs`, `props`, `pluginData` e histórico.【F:artefatos/requisitos preliminares.txt†L146-L214】
- CardType: define campos, preview e modal do card; fields com bindingRef, tipo e modo de edição.【F:artefatos/requisitos preliminares.txt†L194-L233】
- Field do CardType: campo com label, type, mode, bindingRef e flags de exibição.【F:artefatos/requisitos preliminares.txt†L205-L233】
- IngressSource: configuração de entrada com alias, schema, mapping e externalObjectIdPath opcional.【F:artefatos/requisitos preliminares.txt†L236-L299】
- Plugin (registro): entidade com pluginKey, displayName, description, version, status e capabilities (opcional).【F:artefatos/requisitos preliminares.txt†L214-L233】
- Conector Webhook: configuração de URL, método, headers, auth e body template.【F:artefatos/requisitos preliminares.txt†L317-L334】
- Label: etiqueta de board aplicada a cards, segregada por board.【F:artefatos/requisitos preliminares.txt†L372-L376】
- Histórico de Card: eventos com type, summary, payload, createdAt, createdBy.【F:artefatos/requisitos preliminares.txt†L178-L214】
- Usuário: entidade gerida por admin com papéis/perfis e permissões (RBAC).【F:artefatos/requisitos preliminares.txt†L421-L467】

3.3 Eventos do negócio (se houver evidência)
- Evento de ingressão recebido: sistema registra histórico/log quando evento externo chega.【F:artefatos/requisitos preliminares.txt†L278-L291】
- Card criado: manualmente ou via ingress; gera histórico correspondente.【F:artefatos/requisitos preliminares.txt†L178-L291】
- Card movido de coluna: registra histórico com evento de mudança de coluna.【F:artefatos/requisitos preliminares.txt†L178-L214】
- Plugin executado: registra evento no histórico.【F:artefatos/requisitos preliminares.txt†L178-L235】
- Webhook executado: registra evento no histórico, inclusive warnings.【F:artefatos/requisitos preliminares.txt†L178-L360】
- Warning registrado: variável inexistente no template ou ausência de ID externo gera warning no histórico sem bloquear fluxo.【F:artefatos/requisitos preliminares.txt†L178-L299】

[4] ESCOPO
4.1 Objetivos do produto
- Centralizar trabalho operacional e gerencial em um hub Kanban com cards provenientes de sistemas externos e operação manual.【F:artefatos/requisitos preliminares.txt†L3-L18】
- Permitir configuração de CardTypes e campos dinâmicos sem build por variação de formato.【F:artefatos/requisitos preliminares.txt†L11-L203】
- Manter histórico estruturado de eventos do card e registrar warnings sem bloquear fluxo.【F:artefatos/requisitos preliminares.txt†L15-L214】
- Suportar ingestão de eventos externos via IngressSource e integração de saída por webhook manual configurável.【F:artefatos/requisitos preliminares.txt†L236-L360】

4.2 Fora de escopo explícito
- Motor completo de automações (gatilho/condição/ação), schedules e conectores avançados além do webhook ficam para MVP2.【F:artefatos/requisitos preliminares.txt†L514-L532】

4.3 PONTOS_EM_ABERTO relevantes ao escopo
- POA-001, POA-002, POA-003.【F:artefatos/requisitos preliminares.txt†L194-L513】

[5] PERSONAS E PERMISSÕES
- ACT-001 Operacional: opera cards, edita inputs, move cards, aplica labels, consulta histórico; acesso a módulos/boards permitidos.【F:artefatos/requisitos preliminares.txt†L24-L66】
- ACT-002 Gestor/Líder: acompanha volume/andamento e pode operar cards e revisar histórico (perfil opcional no MVP).【F:artefatos/requisitos preliminares.txt†L42-L467】
- ACT-003 Administrador: realiza cadastros e configurações (módulos, árvore, boards, colunas, labels, CardTypes, IngressSources, plugins, conectores, usuários e permissões).【F:artefatos/requisitos preliminares.txt†L49-L453】
- ACT-004 Sistema Externo: envia eventos/objetos para IngressSource (ator não-humano).【F:artefatos/requisitos preliminares.txt†L3-L299】

[6] CASOS DE USO (NÍVEL ALTO) + JORNADAS
- UC-001 Login e acesso inicial
  - Ator primário: ACT-001
  - Objetivo: autenticar e acessar listagem de módulos
  - Pré-condições: usuário existente
  - Pós-condições: sessão/token ativo
  - Fluxo principal: (1) usuário faz login; (2) sistema exibe listagem de módulos permitidos.
  - Exceções: credenciais inválidas (não especificado).
  - Tela principal: SCR-001
  - Rota principal: RTE-001
  - Fontes: SRC-001 §4.1, §14.【F:artefatos/requisitos preliminares.txt†L101-L421】

- UC-002 Navegar módulos e abrir board
  - Ator primário: ACT-001
  - Objetivo: navegar árvore de módulo e abrir board (kanban)
  - Pré-condições: usuário autenticado; módulos permitidos
  - Pós-condições: board aberto na área principal
  - Fluxo principal: (1) usuário abre módulo; (2) visualiza árvore à esquerda; (3) clica em folha; (4) kanban do board carrega.
  - Exceções: módulo sem permissão (não especificado).
  - Tela principal: SCR-003
  - Rota principal: RTE-003
  - Fontes: SRC-001 §4.2-4.4, §15.【F:artefatos/requisitos preliminares.txt†L104-L512】

- UC-003 Operar Kanban (cards)
  - Ator primário: ACT-001
  - Objetivo: mover cards, editar inputs/props e consultar histórico
  - Pré-condições: board aberto
  - Pós-condições: card atualizado e histórico registrado
  - Fluxo principal: (1) usuário visualiza cards; (2) abre card em modal; (3) edita inputs/props; (4) move card entre colunas; (5) histórico registra eventos.
  - Exceções: permissões insuficientes (não detalhado).
  - Tela principal: SCR-004
  - Rota principal: RTE-004
  - Fontes: SRC-001 §4.4-6, §11, §13.6.【F:artefatos/requisitos preliminares.txt†L116-L407】

- UC-004 Configurar board (engrenagem)
  - Ator primário: ACT-003
  - Objetivo: configurar board no contexto correto
  - Pré-condições: usuário com permissão; board aberto
  - Pós-condições: configurações salvas
  - Fluxo principal: (1) usuário acessa engrenagem; (2) configura nome/descrição, colunas, labels, CardType, IngressSource e conector webhook.
  - Exceções: não tem permissão (não detalhado).
  - Tela principal: SCR-004
  - Rota principal: RTE-004
  - Fontes: SRC-001 §4.5, §13.1-13.5.【F:artefatos/requisitos preliminares.txt†L124-L453】

- UC-005 Administrar cadastros (admin)
  - Ator primário: ACT-003
  - Objetivo: manter cadastros estruturais e de configuração do sistema
  - Pré-condições: usuário admin autenticado
  - Pós-condições: dados cadastrais atualizados
  - Fluxo principal: (1) admin acessa telas de administração; (2) executa CRUD de módulos, boards, CardTypes, IngressSources, plugins, conectores, usuários.
  - Exceções: não especificadas.
  - Tela principal: SCR-005
  - Rota principal: RTE-006
  - Fontes: SRC-001 §13, §15.【F:artefatos/requisitos preliminares.txt†L377-L513】

- UC-006 Ingestão de evento externo
  - Ator primário: ACT-004
  - Objetivo: criar/atualizar card via IngressSource
  - Pré-condições: IngressSource configurado
  - Pós-condições: card criado/atualizado e histórico/log registrado
  - Fluxo principal: (1) evento chega; (2) sistema verifica externalObjectIdPath; (3) se id existe, atualiza card; senão cria novo; (4) registra histórico/warning.
  - Exceções: variável/ID ausente não bloqueia; registra warning.
  - Tela principal: null
  - Rota principal: null
  - Fontes: SRC-001 §9.【F:artefatos/requisitos preliminares.txt†L236-L299】

- UC-007 Executar webhook manual
  - Ator primário: ACT-001
  - Objetivo: acionar conector webhook manualmente no card
  - Pré-condições: conector configurado e permissão
  - Pós-condições: requisição enviada e histórico registrado
  - Fluxo principal: (1) usuário abre card; (2) seleciona conector; (3) executa ação manual; (4) sistema registra histórico/warnings.
  - Exceções: variáveis inexistentes geram warning sem bloquear.
  - Tela principal: SCR-004
  - Rota principal: RTE-004
  - Fontes: SRC-001 §10.【F:artefatos/requisitos preliminares.txt†L301-L360】

[7] REQUISITOS FUNCIONAIS (RF) — ATÔMICOS E TESTÁVEIS
- RF-001: O sistema deve permitir login e manter sessão/token ativo para acesso ao sistema. Prioridade: Must. Critério mínimo: trigger=usuário submete credenciais; output=sessão/token criado; erro=credenciais inválidas (não detalhado). UC: UC-001. Fontes: SRC-001 §14.【F:artefatos/requisitos preliminares.txt†L421-L429】
- RF-002: O sistema deve listar módulos permitidos na tela inicial após login. Prioridade: Must. Critério mínimo: trigger=login concluído; output=listagem de módulos por permissão. UC: UC-001. Fontes: SRC-001 §4.1.【F:artefatos/requisitos preliminares.txt†L101-L109】
- RF-003: O sistema deve exibir a árvore do módulo à esquerda e área principal à direita ao abrir um módulo. Prioridade: Must. UC: UC-002. Fontes: SRC-001 §4.2.【F:artefatos/requisitos preliminares.txt†L104-L113】
- RF-004: O sistema deve carregar o kanban do board ao selecionar uma folha da árvore. Prioridade: Must. UC: UC-002. Fontes: SRC-001 §4.3.【F:artefatos/requisitos preliminares.txt†L111-L115】
- RF-005: O sistema deve permitir mover cards entre colunas via drag & drop e persistir a posição. Prioridade: Must. UC: UC-003. RN: RN-006. Fontes: SRC-001 §4.4, §11.【F:artefatos/requisitos preliminares.txt†L116-L365】
- RF-006: O card aberto deve exibir seções de Dados de Origem, Inputs, Outputs, Props, Plugins e Histórico. Prioridade: Must. UC: UC-003. Fontes: SRC-001 §5.2.【F:artefatos/requisitos preliminares.txt†L154-L168】
- RF-007: O sistema deve separar dados do card em buckets `sourceData`, `cardData.inputs`, `cardData.outputs`, `props` e `pluginData`. Prioridade: Must. UC: UC-003. RN: RN-002. Fontes: SRC-001 §5.3.【F:artefatos/requisitos preliminares.txt†L169-L214】
- RF-008: O sistema deve manter histórico estruturado para eventos do card com type, summary, payload, createdAt e createdBy. Prioridade: Must. UC: UC-003. RN: RN-004. Fontes: SRC-001 §6.1.【F:artefatos/requisitos preliminares.txt†L178-L214】
- RF-009: O sistema deve permitir configurar um board via engrenagem com colunas, labels, CardType, IngressSource e conector webhook. Prioridade: Must. UC: UC-004. Fontes: SRC-001 §4.5.【F:artefatos/requisitos preliminares.txt†L124-L140】
- RF-010: O sistema deve permitir CRUD de módulos, árvore, boards, colunas e labels. Prioridade: Must. UC: UC-005. Fontes: SRC-001 §13.1.【F:artefatos/requisitos preliminares.txt†L377-L409】
- RF-011: O sistema deve permitir CRUD de CardTypes e Fields com configuração de bindingRef, tipo, modo e flags de exibição. Prioridade: Must. UC: UC-005. Fontes: SRC-001 §7.2, §13.2.【F:artefatos/requisitos preliminares.txt†L205-L409】
- RF-012: O sistema deve permitir CRUD de IngressSources com alias, schema, mapping e externalObjectIdPath opcional. Prioridade: Must. UC: UC-005. Fontes: SRC-001 §9.2, §13.3.【F:artefatos/requisitos preliminares.txt†L240-L425】
- RF-013: O sistema deve permitir registrar plugins no banco com key, nome, versão e status. Prioridade: Should. UC: UC-005. Fontes: SRC-001 §8.3, §13.4.【F:artefatos/requisitos preliminares.txt†L221-L439】
- RF-014: O sistema deve permitir CRUD de conectores webhook e configuração de URL/método/auth/headers/body-template. Prioridade: Must. UC: UC-005. Fontes: SRC-001 §10.2, §13.5.【F:artefatos/requisitos preliminares.txt†L317-L449】
- RF-015: O sistema deve permitir criar card manualmente dentro do board (se permitido). Prioridade: Should. UC: UC-003. Fontes: SRC-001 §13.6.【F:artefatos/requisitos preliminares.txt†L451-L458】
- RF-016: O sistema deve permitir execução manual de webhook por usuário com permissão dentro do card. Prioridade: Must. UC: UC-007. RN: RN-008. Fontes: SRC-001 §10.1, §13.6.【F:artefatos/requisitos preliminares.txt†L303-L458】
- RF-017: O sistema deve suportar paginação lazy load por coluna e contadores de total/carregados. Prioridade: Must. UC: UC-003. Fontes: SRC-001 §11.1.【F:artefatos/requisitos preliminares.txt†L362-L366】

[8] REGRAS DE NEGÓCIO (RN) — FORMATO COMPUTÁVEL
- RN-001: Board sempre tem exatamente 1 CardType; todo card pertence a um CardType.
  - GIVEN um board em operação
  - THEN ele deve estar associado a um CardType; todo card deve ter CardType
  - UNLESS: não há
  - Precedência: n/a
  - Exemplos: válido=board com CardType definido; inválido=card sem CardType
  - Campos envolvidos: ENT-003.CardTypeId; ENT-005.CardTypeId
  - Fonte: SRC-001 §3.3, §17.1.【F:artefatos/requisitos preliminares.txt†L83-L539】

- RN-002: Separação de buckets e permissões de escrita.
  - GIVEN dados do card
  - THEN `sourceData` é escrito apenas por ingress; `inputs` e `props` por usuário; `outputs` e `pluginData` por sistema/plugin
  - UNLESS: não há
  - Exemplos: válido=usuário edita inputs; inválido=usuário alterando sourceData
  - Campos envolvidos: ENT-005.sourceData, cardData.inputs, cardData.outputs, props, pluginData
  - Fonte: SRC-001 §5.3.【F:artefatos/requisitos preliminares.txt†L169-L214】

- RN-003: Histórico obrigatório e estruturado.
  - GIVEN qualquer ação relevante no card
  - THEN deve gerar evento com type, summary, payload, createdAt e createdBy
  - Exemplos: válido=card movido gera evento; inválido=ação sem registro no histórico
  - Campos envolvidos: ENT-013.type, summary, payload, createdAt, createdBy
  - Fonte: SRC-001 §6.1.【F:artefatos/requisitos preliminares.txt†L178-L214】

- RN-004: Warnings não bloqueiam e inserem null em variáveis inexistentes.
  - GIVEN variável inexistente em template ou ausência de ID externo
  - THEN o sistema insere null, registra warning no histórico e não bloqueia o fluxo
  - Exemplos: válido=template com variável ausente gera warning; inválido=execução bloqueada
  - Campos envolvidos: ENT-013.payload (warning)
  - Fonte: SRC-001 §6.2, §9.4, §10.5.【F:artefatos/requisitos preliminares.txt†L210-L360】

- RN-005: Ingress com externalObjectIdPath define comportamento create/update.
  - GIVEN IngressSource com externalObjectIdPath configurado e valor presente
  - THEN atualizar card existente por idempotencyKey; senão criar novo card
  - UNLESS externalObjectIdPath ausente ou valor inexistente (criar novo)
  - Exemplos: válido=evento com externalId atualiza card; inválido=evento sem externalId rejeitado
  - Campos envolvidos: ENT-009.externalObjectIdPath, ENT-005.idempotencyKey (implícito)
  - Fonte: SRC-001 §9.3-9.4.【F:artefatos/requisitos preliminares.txt†L252-L299】

- RN-006: Ordenação de cards segue posição definida por drag & drop.
  - GIVEN usuário move card para posição específica
  - THEN o sistema persiste a posição definida
  - Exemplos: válido=card inserido entre dois cards mantém posição; inválido=reordenar automaticamente
  - Campos envolvidos: ENT-005.position (implícito)
  - Fonte: SRC-001 §11.2.【F:artefatos/requisitos preliminares.txt†L368-L371】

- RN-007: Plugins registrados mas ausentes no código não quebram o card.
  - GIVEN plugin registrado no banco sem componente no código
  - THEN exibir placeholder e registrar evento de histórico
  - Exemplos: válido=placeholder exibido; inválido=modal quebrado
  - Campos envolvidos: ENT-010.status; ENT-013.type
  - Fonte: SRC-001 §8.4.【F:artefatos/requisitos preliminares.txt†L231-L235】

- RN-008: Templates de webhook aceitam variáveis de ingress e do card.
  - GIVEN body template de webhook
  - THEN aceitar `{{$alias.json...}}`, `{{$input...}}`, `{{$output...}}`, `{{$props...}}`, `{{$system...}}`
  - UNLESS variável inexistente (RN-004)
  - Exemplos: válido=template com {{$input.nome}}; inválido=variáveis fora do padrão
  - Campos envolvidos: ENT-011.bodyTemplate
  - Fonte: SRC-001 §10.3-10.4.【F:artefatos/requisitos preliminares.txt†L333-L357】

[9] MODELO DE DADOS (SCHEMAS PARA UI/API) — SOMENTE O QUE É EVIDÊNCIA
9.1 Entidades canônicas (ENT-xxx)
- ENT-001 Módulo: campos evidentes: name (exemplos: Telemetria, Cobrança).【F:artefatos/requisitos preliminares.txt†L67-L79】
- ENT-002 Nó de Árvore: campos evidentes: name, parentId (implícito), boardId quando folha (implícito).【F:artefatos/requisitos preliminares.txt†L70-L99】
- ENT-003 Board: campos evidentes: name, description, cardTypeId, columns, labels.【F:artefatos/requisitos preliminares.txt†L83-L140】
- ENT-004 Coluna: campos evidentes: name, order/position (implícito).【F:artefatos/requisitos preliminares.txt†L83-L371】
- ENT-005 Card: campos evidentes: sourceData, cardData.inputs, cardData.outputs, props, pluginData, history; cardTypeId (implícito).【F:artefatos/requisitos preliminares.txt†L146-L214】
- ENT-006 CardType: campos evidentes: name (implícito), fields, previewConfig (implícito), pluginRefs (implícito).【F:artefatos/requisitos preliminares.txt†L194-L235】
- ENT-007 Field de CardType: campos evidentes: label, type, mode, bindingRef, preview, modal, formatting (opcional).【F:artefatos/requisitos preliminares.txt†L205-L233】
- ENT-008 IngressSource: campos evidentes: boardId, alias, schema, mapping, externalObjectIdPath (opcional).【F:artefatos/requisitos preliminares.txt†L236-L299】
- ENT-009 Plugin (registro): campos evidentes: pluginKey, displayName, description, version, status, capabilities (opcional).【F:artefatos/requisitos preliminares.txt†L221-L233】
- ENT-010 Conector Webhook: campos evidentes: url, method, headers, auth, bodyTemplate. 【F:artefatos/requisitos preliminares.txt†L317-L334】
- ENT-011 Label: campos evidentes: name (implícito), boardId (segregação).【F:artefatos/requisitos preliminares.txt†L372-L376】
- ENT-012 Usuário: campos evidentes: role/profile, status (ativo/inativo).【F:artefatos/requisitos preliminares.txt†L430-L453】
- ENT-013 Histórico de Card: campos evidentes: type, summary, payload, createdAt, createdBy.【F:artefatos/requisitos preliminares.txt†L178-L214】

9.2 Enumeradores (enums) e tabelas de referência (se houver evidência)
- CardType.Field.type: string | number | date | boolean | enum | object | array.【F:artefatos/requisitos preliminares.txt†L205-L213】
- CardType.Field.mode: editable | readonly.【F:artefatos/requisitos preliminares.txt†L205-L213】
- Plugin.status: active | inactive.【F:artefatos/requisitos preliminares.txt†L221-L227】
- Webhook.method: GET | POST | PUT | PATCH | DELETE.【F:artefatos/requisitos preliminares.txt†L319-L322】

9.3 Regras de validação de formulário (VAL-xxx)
- Não há evidência suficiente nas fontes fornecidas.

9.4 MAPA DE UX (Opcional; SOMENTE se houver evidência)
- SCR-001 Tela de login: autenticação do usuário.【F:artefatos/requisitos preliminares.txt†L421-L499】
- SCR-002 Tela de módulos: listagem de módulos permitidos.【F:artefatos/requisitos preliminares.txt†L101-L109】
- SCR-003 Tela de módulo com árvore e área principal: navegação por nó/board.【F:artefatos/requisitos preliminares.txt†L104-L513】
- SCR-004 Tela de board/kanban + modal do card: operação do kanban e card.【F:artefatos/requisitos preliminares.txt†L111-L360】
- SCR-005 Telas de administração: módulos, boards, card-types, ingress-sources, plugins, connectors, users.【F:artefatos/requisitos preliminares.txt†L377-L513】

- RTE-001 /login -> SCR-001.【F:artefatos/requisitos preliminares.txt†L492-L499】
- RTE-002 /modules -> SCR-002.【F:artefatos/requisitos preliminares.txt†L492-L500】
- RTE-003 /modules/:moduleId -> SCR-003.【F:artefatos/requisitos preliminares.txt†L492-L501】
- RTE-004 /boards/:boardId?view=kanban -> SCR-004.【F:artefatos/requisitos preliminares.txt†L499-L503】
- RTE-005 /boards/:boardId?card=:cardId -> SCR-004 (modal do card).【F:artefatos/requisitos preliminares.txt†L499-L504】
- RTE-006 /admin/modules -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-007 /admin/boards -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-008 /admin/card-types -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-009 /admin/ingress-sources -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-010 /admin/plugins -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-011 /admin/connectors -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】
- RTE-012 /admin/users -> SCR-005.【F:artefatos/requisitos preliminares.txt†L505-L512】

[10] REQUISITOS NÃO FUNCIONAIS (RNF)
- Não há evidência suficiente nas fontes fornecidas.

[11] INTEGRAÇÕES E DEPENDÊNCIAS EXTERNAS
- INT-001 Ingress de sistemas externos via IngressSource (entrada). Tipo: api/evento. Dados: payload externo mapeado para sourceData. Frequência/latência: não informado.【F:artefatos/requisitos preliminares.txt†L236-L299】
- INT-002 Webhook de saída configurável (ação manual). Tipo: api. Dados: body template com variáveis de ingress e card. Frequência/latência: manual/por ação.【F:artefatos/requisitos preliminares.txt†L301-L360】

[12] CRITÉRIOS DE ACEITAÇÃO (Opcional; recomendado quando houver detalhamento)
- UC-003 Operar Kanban:
  - Deve permitir abrir card em modal e editar inputs e props conforme permissão.【F:artefatos/requisitos preliminares.txt†L116-L214】
  - Deve permitir mover cards entre colunas com persistência da posição.【F:artefatos/requisitos preliminares.txt†L116-L371】
  - Deve registrar histórico para alterações e movimentações.【F:artefatos/requisitos preliminares.txt†L178-L214】
- UC-006 Ingestão de evento externo:
  - Com externalObjectIdPath e valor presente, deve atualizar card existente quando idempotencyKey coincidir.【F:artefatos/requisitos preliminares.txt†L252-L291】
  - Sem externalObjectIdPath ou valor ausente, deve criar novo card e registrar warning sem bloquear.【F:artefatos/requisitos preliminares.txt†L252-L299】
- UC-007 Executar webhook manual:
  - Deve aceitar placeholders em templates conforme especificação e registrar warning quando variável inexistente.【F:artefatos/requisitos preliminares.txt†L333-L360】

[13] MATRIZ DE RASTREABILIDADE (DERIVADA)
- UC-001 <- SRC-001 §4.1, §14
- UC-002 <- SRC-001 §4.2-4.4, §15
- UC-003 <- SRC-001 §4.4-6, §11, §13.6
- UC-004 <- SRC-001 §4.5, §13.1-13.5
- UC-005 <- SRC-001 §13, §15
- UC-006 <- SRC-001 §9
- UC-007 <- SRC-001 §10
- RF-001..RF-017 <- SRC-001 §§4-17
- RN-001..RN-008 <- SRC-001 §§3,5,6,8,9,10,11,17
- ENT-001..ENT-013 <- SRC-001 §§3,5,7,8,9,10,12,14
- INT-001..INT-002 <- SRC-001 §§9-10
- SCR-001..SCR-005, RTE-001..RTE-012 <- SRC-001 §15

[14] PONTOS EM ABERTO + HIPÓTESES (POA)
- POA-001: As rotas e telas listadas são “sugeridas” e precisam de confirmação como definitivas?
  - Severidade: MEDIUM | Blocking: false
  - Hipóteses: H1=manter rotas como listadas; H2=ajustar rotas conforme arquitetura existente; H3=definir rotas por discovery com UI.
  - Impacto: UI, API (navegação, links, permissões).
  - Recomendação conservadora: undecided.
  - Fonte: SRC-001 §15.【F:artefatos/requisitos preliminares.txt†L492-L513】

- POA-002: O perfil “Gestor/Líder” será mantido no MVP ou apenas Operacional/Admin?
  - Severidade: MEDIUM | Blocking: false
  - Hipóteses: H1=manter Gestor como perfil separado; H2=eliminar Gestor no MVP; H3=mapear Gestor para Admin parcial.
  - Impacto: Segurança, UI, State (permissões e telas).
  - Recomendação conservadora: undecided.
  - Fonte: SRC-001 §2.2, §14.4.【F:artefatos/requisitos preliminares.txt†L40-L467】

- POA-003: O CardType será persistido como JSON Schema (ou equivalente) ou outro formato de definição?
  - Severidade: MEDIUM | Blocking: false
  - Hipóteses: H1=JSON Schema; H2=modelo próprio simplificado; H3=armazenar definição em campos normalizados.
  - Impacto: Persistência, API, State.
  - Recomendação conservadora: undecided.
  - Fonte: SRC-001 §7.1.【F:artefatos/requisitos preliminares.txt†L194-L203】
