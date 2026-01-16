[1] REGISTRO DE FONTES
- SRC-001
  - tipo: doc
  - nome/descrição curta: “Documentação Consolidada Final — Hub Kanban Configurável e Integrável (MVP)”
  - data: null
  - metadados de código: repo: null | branch: null | commit: null
  - observações de qualidade: documento textual consolidado (sem paginação/linhas)

[2] SUMÁRIO EXECUTIVO (máx 15 linhas)
- O sistema propõe um hub central de gestão de atividades em Kanban, transformando eventos de sistemas externos em cards e permitindo operação e gestão visual por colunas. Fontes descrevem um MVP com ingestão via IngressSource, cards configuráveis por CardType, histórico estruturado e webhook manual. [SRC-001: Seções 1, 5, 7, 9, 10, 16]
- Usuários principais: Operacional, Gestor/Líder e Administrador (com um usuário root de bootstrap). [SRC-001: Seções 2, 14]
- Módulos centrais: módulos/árvore/boards/colunas/cards; CardType/fields; IngressSource; plugins; conectores webhook; usuários/permissões; histórico; labels. [SRC-001: Seções 3, 5, 7, 8, 9, 10, 12, 13, 14]
- Riscos/ambigüidades: definição do perfil “Gestor” vs apenas Operacional/Admin (POA-001); comportamento exato do registro de warning quando não há externalObjectIdPath/valor (POA-002); detalhes do mecanismo de autenticação/sessão (POA-003). [SRC-001: Seções 2, 9.4, 14.1]

[3] CONTEXTO DO DOMÍNIO E LÉXICO (Ubiquitous Language)
3.1 Glossário (canonizado)
- Kanban -> quadro visual com colunas e cards para fluxo de trabalho -> sinônimos: quadro -> fonte: SRC-001 (Seções 1, 3.3, 4.4, 11)
- Módulo -> grande área/processo do negócio que agrupa uma árvore de navegação e boards -> sinônimos: área -> fonte: SRC-001 (Seção 3.1)
- Árvore do módulo -> estrutura hierárquica navegável que organiza o trabalho e aponta folhas/boards -> sinônimos: árvore de navegação -> fonte: SRC-001 (Seção 3.2)
- Board -> quadro Kanban associado a um processo específico com colunas e cards -> sinônimos: quadro -> fonte: SRC-001 (Seções 3.3, 4.4)
- Card -> unidade de trabalho do board, com dados estruturados e histórico -> sinônimos: cartão -> fonte: SRC-001 (Seções 1, 5)
- CardType -> “contrato” que define campos e UI do card -> sinônimos: tipo de card -> fonte: SRC-001 (Seção 7)
- IngressSource -> fonte de entrada configurável para ingestão de objetos externos -> sinônimos: fonte de entrada -> fonte: SRC-001 (Seção 9)
- Webhook (conector) -> integração de saída configurável disparada manualmente no MVP -> sinônimos: conector webhook -> fonte: SRC-001 (Seção 10)
- Plugin -> componente visual hardcoded no código e registrado no banco -> sinônimos: plugin do card -> fonte: SRC-001 (Seção 8)
- Label -> etiqueta do board aplicada aos cards -> sinônimos: tag -> fonte: SRC-001 (Seção 12)
- Histórico -> registro estruturado de eventos do card -> sinônimos: histórico de eventos -> fonte: SRC-001 (Seção 6)

3.2 Entidades candidatas (somente quando houver evidência)
- Módulo: área de processo que contém árvore e boards; atributos conhecidos: nome/descrição (implícito em CRUD). Fonte: SRC-001 (Seções 3.1, 13.1).
- Nó de Árvore: nó hierárquico que pode ter filhos e folhas que apontam para boards. Fonte: SRC-001 (Seções 3.2, 13.1).
- Board: quadro Kanban com colunas e card type associado. Fonte: SRC-001 (Seções 3.3, 13.1).
- Coluna: coluna do board, configurável e ordenável. Fonte: SRC-001 (Seções 3.3, 13.1).
- Card: unidade de trabalho com buckets de dados, labels e histórico. Fonte: SRC-001 (Seções 5, 6, 12).
- CardType: define campos e exibição do card. Fonte: SRC-001 (Seção 7).
- CardTypeField: definição de campo (label, type, mode, bindingRef, flags). Fonte: SRC-001 (Seção 7.2).
- IngressSource: configuração de ingestão (alias, schema, mapping, externalObjectIdPath). Fonte: SRC-001 (Seção 9.2-9.3).
- Plugin (registro): pluginKey, displayName, description, version, status, capabilities. Fonte: SRC-001 (Seção 8.3).
- WebhookConnector: URL, método, headers, autenticação, body template. Fonte: SRC-001 (Seção 10.2-10.3).
- Usuário: entidade para login e permissões. Fonte: SRC-001 (Seções 14.1-14.3).

3.3 Eventos do negócio (se houver evidência)
- Evento de ingestão: chegada de payload externo gera criação/atualização de card e registro de histórico. Fonte: SRC-001 (Seção 9.4).
- Evento de movimentação de card: move card entre colunas e registra histórico. Fonte: SRC-001 (Seções 4.4, 6.1).
- Evento de execução de webhook manual: registra histórico. Fonte: SRC-001 (Seções 6.1, 10.1, 10.5).
- Evento de warning: variável inexistente no template ou ausência de ID externo gera histórico. Fonte: SRC-001 (Seções 6.2, 9.4, 10.5).

[4] ESCOPO
4.1 Objetivos do produto
- Centralizar atividades em boards Kanban com cards configuráveis e histórico estruturado. [SRC-001: Seções 1, 3, 5, 6]
- Permitir ingestão de eventos externos via IngressSource para criação/atualização de cards. [SRC-001: Seção 9]
- Permitir operação manual e gestão visual: mover cards, editar inputs, aplicar labels. [SRC-001: Seções 2.1, 4.4, 12]
- Oferecer configuração administrativa completa (módulos/árvore/boards/colunas/labels/CardTypes/IngressSources/plugins/conectores/usuários). [SRC-001: Seção 13]
- Disponibilizar webhook genérico com template de variáveis para integração de saída manual. [SRC-001: Seção 10]

4.2 Fora de escopo explícito
- Motor completo de automações, schedules e conectores avançados (WhatsApp/Email). [SRC-001: Seção 16]

4.3 PONTOS_EM_ABERTO relevantes ao escopo
- POA-001, POA-002, POA-003.

[5] PERSONAS E PERMISSÕES
- ACT-001 Operacional
  - Responsabilidades: operar cards no dia a dia (ver dados, preencher inputs, mover cards, aplicar labels, ver histórico). [SRC-001: Seções 2.1, 14.4]
  - Permissões: acessar módulos/boards permitidos; editar inputs; mover cards; aplicar labels; ver histórico. [SRC-001: Seção 14.4]
- ACT-002 Gestor/Líder
  - Responsabilidades: acompanhar volume/andamento; ajudar a ajustar processos; operar cards e revisar histórico. [SRC-001: Seção 2.2]
  - Permissões: não explicitadas; possível similar ao Operacional com extras. [SRC-001: Seção 2.2] -> POA-001
- ACT-003 Administrador
  - Responsabilidades: cadastros/configurações do sistema (módulos/árvore/boards/colunas/labels/CardTypes/IngressSources/plugins/conectores/usuários/permissões). [SRC-001: Seções 2.3, 13, 14.4]
  - Permissões: tudo do Operacional + CRUDs administrativos listados. [SRC-001: Seção 14.4]
- ACT-004 Root (bootstrap)
  - Responsabilidades: primeiro acesso para configurar sistema. [SRC-001: Seção 14.2]
  - Permissões: implícitas de administrador; não detalhadas. [SRC-001: Seção 14.2] -> POA-003

[6] CASOS DE USO (NÍVEL ALTO) + JORNADAS
- UC-001 Autenticar e acessar o sistema
  - Ator primário: ACT-001/ACT-003/ACT-004
  - Objetivo: iniciar sessão para acessar módulos/boards/admin.
  - Pré-condições: usuário cadastrado; root configurado para primeiro acesso.
  - Pós-condições: sessão/token ativo.
  - Fluxo principal: (1) usuário acessa tela de login; (2) informa credenciais; (3) sistema autentica e redireciona para listagem de módulos.
  - Fluxos alternativos/exceções: credenciais inválidas -> negar acesso.
  - Tela principal: SCR-001
  - Rota principal: RTE-001
  - Fonte: SRC-001 (Seções 4.1, 14.1-14.2, 15)

- UC-002 Navegar módulos e abrir um board
  - Ator primário: ACT-001
  - Objetivo: visualizar módulos, abrir árvore e selecionar board para operar.
  - Pré-condições: usuário com permissão de acesso ao módulo.
  - Pós-condições: Kanban do board carregado.
  - Fluxo principal: (1) usuário acessa listagem de módulos; (2) seleciona módulo; (3) visualiza árvore; (4) clica na folha do board; (5) sistema carrega Kanban.
  - Tela principal: SCR-002/SCR-003/SCR-004
  - Rota principal: RTE-002/RTE-003/RTE-004
  - Fonte: SRC-001 (Seções 4.1-4.3, 15)

- UC-003 Operar cards no kanban
  - Ator primário: ACT-001
  - Objetivo: visualizar cards, abrir modal, editar inputs/props, mover entre colunas.
  - Pré-condições: board carregado.
  - Pós-condições: alterações persistidas e histórico atualizado.
  - Fluxo principal: (1) usuário vê cards no kanban; (2) abre card; (3) edita inputs/props; (4) move card entre colunas; (5) sistema registra histórico.
  - Tela principal: SCR-004/SCR-005
  - Rota principal: RTE-004/RTE-005
  - Fonte: SRC-001 (Seções 4.4, 5, 6, 12, 15)

- UC-004 Configurar board (engrenagem)
  - Ator primário: ACT-003
  - Objetivo: configurar colunas, labels, CardType, IngressSource e webhook habilitado.
  - Pré-condições: usuário com permissão administrativa; board existente.
  - Pós-condições: configurações atualizadas.
  - Fluxo principal: (1) usuário abre board; (2) acessa engrenagem; (3) edita configurações; (4) salva.
  - Tela principal: SCR-004
  - Rota principal: RTE-004
  - Fonte: SRC-001 (Seção 4.5)

- UC-005 Administrar cadastros estruturais (módulos/árvore/boards/colunas/labels)
  - Ator primário: ACT-003
  - Objetivo: manter estruturas de navegação e boards.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: cadastros atualizados.
  - Fluxo principal: CRUD conforme itens 13.1.
  - Tela principal: SCR-006/SCR-007
  - Rota principal: RTE-006/RTE-007
  - Fonte: SRC-001 (Seção 13.1, 15)

- UC-006 Administrar CardTypes e Fields
  - Ator primário: ACT-003
  - Objetivo: criar/editar/excluir CardTypes e configurar fields.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: CardTypes disponíveis para associação ao board.
  - Fluxo principal: CRUD de CardTypes e Fields; associação Board→CardType.
  - Tela principal: SCR-008
  - Rota principal: RTE-008
  - Fonte: SRC-001 (Seção 13.2, 15)

- UC-007 Administrar IngressSources
  - Ator primário: ACT-003
  - Objetivo: configurar alias, schema, mapping e externalObjectIdPath.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: fontes de entrada prontas para ingestão.
  - Tela principal: SCR-009
  - Rota principal: RTE-009
  - Fonte: SRC-001 (Seção 13.3, 15)

- UC-008 Administrar Plugins (registro)
  - Ator primário: ACT-003
  - Objetivo: registrar/ativar/desativar plugins.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: catálogo de plugins atualizado.
  - Tela principal: SCR-010
  - Rota principal: RTE-010
  - Fonte: SRC-001 (Seção 13.4, 15)

- UC-009 Administrar Conectores Webhook
  - Ator primário: ACT-003
  - Objetivo: configurar URL/método/auth/headers/body-template.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: conectores prontos para uso.
  - Tela principal: SCR-011
  - Rota principal: RTE-011
  - Fonte: SRC-001 (Seção 13.5, 15)

- UC-010 Administrar Usuários e Permissões
  - Ator primário: ACT-003
  - Objetivo: criar/editar/desativar usuários e atribuir papéis.
  - Pré-condições: usuário admin autenticado.
  - Pós-condições: usuários/permissões atualizados.
  - Tela principal: SCR-012
  - Rota principal: RTE-012
  - Fonte: SRC-001 (Seção 14.3-14.4, 15)

- UC-011 Executar webhook manual no card
  - Ator primário: ACT-001/ACT-003
  - Objetivo: disparar conector webhook manualmente no card.
  - Pré-condições: usuário com permissão; conector configurado; card aberto.
  - Pós-condições: execução registrada no histórico, com warnings se variáveis faltarem.
  - Fluxo principal: (1) usuário abre card; (2) seleciona conector; (3) executa; (4) sistema envia webhook; (5) registra histórico.
  - Tela principal: SCR-005
  - Rota principal: RTE-005
  - Fonte: SRC-001 (Seções 10.1, 10.5)

[7] REQUISITOS FUNCIONAIS (RF) — ATÔMICOS E TESTÁVEIS
- RF-001 O sistema deve permitir autenticação via tela de login e iniciar sessão para usuários válidos. Prioridade: Must. Critério mínimo: Trigger=login; Entrada=credenciais; Saída=sessão/token ativo; Erro=credenciais inválidas negam acesso. UC-001. Fonte: SRC-001 (Seção 14.1).
- RF-002 O sistema deve listar módulos permitidos ao usuário na tela inicial e permitir acesso ao módulo selecionado. Prioridade: Must. Critério mínimo: Trigger=acesso à tela inicial; Entrada=permissões do usuário; Saída=listagem de módulos; Erro=sem permissão não exibe módulo. UC-002. Fonte: SRC-001 (Seções 4.1, 14.4).
- RF-003 O sistema deve exibir árvore do módulo e carregar o kanban do board ao selecionar uma folha. Prioridade: Must. Critério mínimo: Trigger=clique em folha; Entrada=id do nó; Saída=kanban carregado. UC-002. Fonte: SRC-001 (Seções 3.2, 4.3).
- RF-004 O sistema deve permitir mover cards entre colunas com drag & drop e persistir a posição. Prioridade: Must. Critério mínimo: Trigger=drag & drop; Entrada=cardId + coluna destino + posição; Saída=card reposicionado. UC-003. Fonte: SRC-001 (Seções 4.4, 11.2).
- RF-005 O sistema deve permitir abrir card em modal e editar inputs/props conforme permissões. Prioridade: Must. Critério mínimo: Trigger=abrir card; Entrada=alterações de inputs/props; Saída=card atualizado; Erro=sem permissão bloqueia edição. UC-003. Fonte: SRC-001 (Seções 5.2, 5.3, 14.4).
- RF-006 O sistema deve registrar histórico estruturado para eventos de criação, atualização, movimentação e warnings. Prioridade: Must. Critério mínimo: Trigger=evento de card; Entrada=tipo+summary+payload; Saída=evento persistido com createdAt/createdBy. UC-003. Fonte: SRC-001 (Seção 6.1).
- RF-007 O sistema deve permitir configurar board via engrenagem (colunas, labels, CardType, IngressSource, webhook habilitado). Prioridade: Must. Critério mínimo: Trigger=salvar configurações; Entrada=dados do board; Saída=board atualizado. UC-004. Fonte: SRC-001 (Seção 4.5).
- RF-008 O sistema deve permitir CRUD de CardTypes e Fields, incluindo bindingRef, tipo, mode e flags de exibição. Prioridade: Must. Critério mínimo: Trigger=criar/editar field; Entrada=label/type/mode/bindingRef/flags; Saída=field persistido. UC-006. Fonte: SRC-001 (Seção 13.2, 7.2).
- RF-009 O sistema deve permitir CRUD de IngressSources com alias, schema, mapping e externalObjectIdPath opcional. Prioridade: Must. Critério mínimo: Trigger=salvar IngressSource; Entrada=alias/schema/mapping/externalObjectIdPath; Saída=IngressSource persistido. UC-007. Fonte: SRC-001 (Seção 13.3, 9.2-9.3).
- RF-010 O sistema deve criar ou atualizar cards a partir de eventos de IngressSource seguindo a regra de externalObjectIdPath. Prioridade: Must. Critério mínimo: Trigger=evento externo; Entrada=payload; Saída=card criado/atualizado; Erro=sem externalObjectIdPath deve criar card e registrar warning/informativo. UC-003. Fonte: SRC-001 (Seção 9.4).
- RF-011 O sistema deve permitir configurar conectores webhook (URL, método, headers, auth, body-template). Prioridade: Must. Critério mínimo: Trigger=salvar conector; Entrada=configuração; Saída=conector persistido. UC-009. Fonte: SRC-001 (Seção 10.2, 13.5).
- RF-012 O sistema deve permitir executar webhook manual no card, com template de variáveis. Prioridade: Must. Critério mínimo: Trigger=ação manual; Entrada=conector+card; Saída=requisição enviada; Erro=variável inexistente => null + warning. UC-011. Fonte: SRC-001 (Seções 10.1, 10.3-10.5).

[8] REGRAS DE NEGÓCIO (RN) — FORMATO COMPUTÁVEL
- RN-001 Card sempre possui CardType associado.
  - Condição: GIVEN card existe
  - Ação: THEN card deve referenciar um CardType
  - Exceções: UNLESS não especificado
  - Exemplo válido: card criado em board com CardType X -> card.cardTypeId = X
  - Exemplo inválido: card criado sem CardType -> rejeitar/criar inconsistência
  - Campos envolvidos: ENT-005.cardTypeId
  - Fonte: SRC-001 (Seção 3.3, 17.1)

- RN-002 Board sempre possui exatamente 1 CardType associado.
  - Condição: GIVEN board existe
  - Ação: THEN board deve ter 1 CardType
  - Exceções: UNLESS não especificado
  - Exemplo válido: board B usa CardType CT1
  - Exemplo inválido: board sem CardType
  - Campos envolvidos: ENT-003.cardTypeId
  - Fonte: SRC-001 (Seção 3.3, 17.1)

- RN-003 `sourceData` é somente leitura e só IngressSource escreve.
  - Condição: GIVEN alteração de card
  - Ação: THEN apenas ingestão pode atualizar sourceData
  - Exceções: UNLESS não especificado
  - Exemplo válido: evento de ingress atualiza sourceData
  - Exemplo inválido: usuário tenta editar sourceData
  - Campos envolvidos: ENT-005.sourceData
  - Fonte: SRC-001 (Seção 5.3, 17.2)

- RN-004 Inputs e props são editáveis pelo usuário; outputs são readonly no MVP.
  - Condição: GIVEN edição de card
  - Ação: THEN permitir editar inputs/props; outputs readonly
  - Exceções: UNLESS plugin escreve outputs
  - Exemplo válido: usuário atualiza cardData.inputs; outputs permanece imutável
  - Exemplo inválido: usuário editando cardData.outputs
  - Campos envolvidos: ENT-005.cardData.inputs; ENT-005.cardData.outputs; ENT-005.props
  - Fonte: SRC-001 (Seção 5.3, 17.3)

- RN-005 Histórico deve registrar todos os eventos relevantes do card, incluindo warnings.
  - Condição: GIVEN evento de card
  - Ação: THEN criar evento de histórico com type/summary/payload/createdAt/createdBy
  - Exceções: UNLESS não especificado
  - Exemplo válido: mover card gera evento “card moved”
  - Exemplo inválido: mover card sem registro de histórico
  - Campos envolvidos: ENT-006.*
  - Fonte: SRC-001 (Seção 6.1, 17.4)

- RN-006 IngressSource: se externalObjectIdPath configurado e valor presente, atualizar card existente por chave idempotente; se não, criar novo card.
  - Condição: GIVEN evento externo com payload
  - Ação: THEN aplicar regra de criação/atualização conforme externalObjectIdPath
  - Exceções: UNLESS não especificado
  - Exemplo válido: externalObjectIdPath=“$.id” com valor “123” atualiza card existente
  - Exemplo inválido: evento sem externalObjectIdPath tentar atualizar card inexistente
  - Campos envolvidos: ENT-008.externalObjectIdPath; ENT-005.sourceData
  - Fonte: SRC-001 (Seção 9.4, 17.5)

- RN-007 Webhook com variável inexistente deve substituir por null e registrar warning no histórico, sem bloquear fluxo.
  - Condição: GIVEN execução de webhook com template
  - Ação: THEN substituir variável inexistente por null e registrar warning
  - Exceções: UNLESS não especificado
  - Exemplo válido: {{$input.decisao}} inexistente -> null + warning
  - Exemplo inválido: execução bloqueada por variável inexistente
  - Campos envolvidos: ENT-010.bodyTemplate; ENT-006.*
  - Fonte: SRC-001 (Seção 10.5, 6.2, 17.6)

- RN-008 Paginação por coluna deve carregar cards de forma independente (lazy load).
  - Condição: GIVEN abertura de board
  - Ação: THEN cada coluna carrega cards independentemente
  - Exceções: UNLESS não especificado
  - Exemplo válido: coluna A carrega mais cards sem afetar coluna B
  - Exemplo inválido: paginação global bloqueando outras colunas
  - Campos envolvidos: ENT-004.columns
  - Fonte: SRC-001 (Seção 11.1)

[9] MODELO DE DADOS (SCHEMAS PARA UI/API) — SOMENTE O QUE É EVIDÊNCIA
9.1 Entidades canônicas (ENT-xxx)
- ENT-001 Módulo
  - Campos: name (string, obrigatório? null), description (string, obrigatório? null)
  - Fonte: SRC-001 (Seções 3.1, 13.1)

- ENT-002 Nó de Árvore
  - Campos: name (string, obrigatório? null), parentId (string, obrigatório? null), boardId (string, obrigatório? null)
  - Fonte: SRC-001 (Seções 3.2, 13.1)

- ENT-003 Board
  - Campos: name (string, obrigatório? null), description (string, obrigatório? null), cardTypeId (string, obrigatório? true), ingressSourceId (string, obrigatório? null)
  - Fonte: SRC-001 (Seções 3.3, 4.5)

- ENT-004 Coluna
  - Campos: name (string, obrigatório? null), order (number, obrigatório? null)
  - Fonte: SRC-001 (Seções 3.3, 13.1)

- ENT-005 Card
  - Campos: sourceData (object, obrigatório? null), cardData.inputs (object, obrigatório? null), cardData.outputs (object, obrigatório? null), props (object, obrigatório? null), pluginData (object, obrigatório? null), labels (array, obrigatório? null)
  - Fonte: SRC-001 (Seções 5.2-5.3, 12)

- ENT-006 CardHistoryEvent
  - Campos: type (string, obrigatório? true), summary (string, obrigatório? true), payload (object, obrigatório? null), createdAt (datetime, obrigatório? true), createdBy (string, obrigatório? true)
  - Fonte: SRC-001 (Seção 6.1)

- ENT-007 CardType
  - Campos: name (string, obrigatório? null), description (string, obrigatório? null)
  - Fonte: SRC-001 (Seção 7.1, 13.2)

- ENT-008 CardTypeField
  - Campos: label (string, obrigatório? true), type (enum, obrigatório? true), mode (enum, obrigatório? true), bindingRef (string, obrigatório? true), format (string, obrigatório? null), showInPreview (boolean, obrigatório? null), showInModal (boolean, obrigatório? null)
  - Fonte: SRC-001 (Seção 7.2)

- ENT-009 IngressSource
  - Campos: boardId (string, obrigatório? null), alias (string, obrigatório? true), payloadSchema (object, obrigatório? null), mapping (object, obrigatório? null), externalObjectIdPath (string, obrigatório? null)
  - Fonte: SRC-001 (Seção 9.2-9.3, 13.3)

- ENT-010 WebhookConnector
  - Campos: url (string, obrigatório? true), method (enum, obrigatório? true), headers (object, obrigatório? null), auth (object, obrigatório? null), bodyTemplate (object|string, obrigatório? null)
  - Fonte: SRC-001 (Seção 10.2-10.3, 13.5)

- ENT-011 PluginRegistry
  - Campos: pluginKey (string, obrigatório? true), displayName (string, obrigatório? true), description (string, obrigatório? null), version (string, obrigatório? null), status (enum, obrigatório? true), capabilities (object, obrigatório? null)
  - Fonte: SRC-001 (Seção 8.3)

- ENT-012 User
  - Campos: username (string, obrigatório? null), status (string, obrigatório? null), roles (array, obrigatório? null)
  - Fonte: SRC-001 (Seções 14.1-14.3)

9.2 Enumeradores (enums) e tabelas de referência
- ENUM-001 CardTypeField.type = [string, number, date, boolean, enum, object, array]
  - Fonte: SRC-001 (Seção 7.2)
- ENUM-002 CardTypeField.mode = [editable, readonly]
  - Fonte: SRC-001 (Seção 7.2)
- ENUM-003 PluginRegistry.status = [active, inactive]
  - Fonte: SRC-001 (Seção 8.3)
- ENUM-004 WebhookConnector.method = [GET, POST, PUT, PATCH, DELETE]
  - Fonte: SRC-001 (Seção 10.2)

9.3 Regras de validação de formulário (VAL-xxx)
- Não há evidência suficiente nas fontes fornecidas.

9.4 MAPA DE UX (Opcional; SOMENTE se houver evidencia)
- Telas (SCR-xxx)
  - SCR-001 Login: autenticação do usuário. Atores: ACT-001/ACT-003/ACT-004. UC: UC-001. Fonte: SRC-001 (Seções 4.1, 14.1, 15)
  - SCR-002 Listagem de módulos: selecionar módulo permitido. Atores: ACT-001. UC: UC-002. Fonte: SRC-001 (Seções 4.1, 15)
  - SCR-003 Detalhe do módulo (árvore + conteúdo): navegar árvore e selecionar board. Atores: ACT-001. UC: UC-002. Fonte: SRC-001 (Seções 4.2-4.3, 15)
  - SCR-004 Board Kanban: visualizar colunas/cards e engrenagem de configuração. Atores: ACT-001/ACT-003. UC: UC-003/UC-004. Fonte: SRC-001 (Seções 4.4-4.5, 15)
  - SCR-005 Modal do card: visualizar dados, inputs/outputs, plugins, histórico e ações. Atores: ACT-001/ACT-003. UC: UC-003/UC-011. Fonte: SRC-001 (Seções 5.2, 10.1, 15)
  - SCR-006 Admin Módulos: CRUD de módulos/árvore. Atores: ACT-003. UC: UC-005. Fonte: SRC-001 (Seção 13.1, 15)
  - SCR-007 Admin Boards: CRUD de boards/colunas/labels. Atores: ACT-003. UC: UC-005. Fonte: SRC-001 (Seção 13.1, 15)
  - SCR-008 Admin CardTypes: CRUD de CardTypes/Fields. Atores: ACT-003. UC: UC-006. Fonte: SRC-001 (Seção 13.2, 15)
  - SCR-009 Admin IngressSources: CRUD de IngressSources. Atores: ACT-003. UC: UC-007. Fonte: SRC-001 (Seção 13.3, 15)
  - SCR-010 Admin Plugins: registrar/ativar/desativar plugins. Atores: ACT-003. UC: UC-008. Fonte: SRC-001 (Seção 13.4, 15)
  - SCR-011 Admin Conectores: CRUD de conectores webhook. Atores: ACT-003. UC: UC-009. Fonte: SRC-001 (Seção 13.5, 15)
  - SCR-012 Admin Usuários: CRUD de usuários e permissões. Atores: ACT-003. UC: UC-010. Fonte: SRC-001 (Seção 14.3, 15)

- Rotas (RTE-xxx)
  - RTE-001 /login -> SCR-001 (guards: null). Fonte: SRC-001 (Seção 15)
  - RTE-002 /modules -> SCR-002 (guards: null). Fonte: SRC-001 (Seção 15)
  - RTE-003 /modules/:moduleId -> SCR-003 (guards: null). Fonte: SRC-001 (Seção 15)
  - RTE-004 /boards/:boardId?view=kanban -> SCR-004 (guards: null). Fonte: SRC-001 (Seção 15)
  - RTE-005 /boards/:boardId?card=:cardId -> SCR-005 (guards: null). Fonte: SRC-001 (Seção 15)
  - RTE-006 /admin/modules -> SCR-006 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-007 /admin/boards -> SCR-007 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-008 /admin/card-types -> SCR-008 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-009 /admin/ingress-sources -> SCR-009 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-010 /admin/plugins -> SCR-010 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-011 /admin/connectors -> SCR-011 (guards: Admin). Fonte: SRC-001 (Seção 15)
  - RTE-012 /admin/users -> SCR-012 (guards: Admin). Fonte: SRC-001 (Seção 15)

[10] REQUISITOS NÃO FUNCIONAIS (RNF)
- Não há evidência suficiente nas fontes fornecidas.

[11] INTEGRAÇÕES E DEPENDÊNCIAS EXTERNAS
- INT-001 IngressSource (entrada de eventos externos)
  - Tipo: api
  - Dados trocados: payload externo mapeado para sourceData
  - Frequência/latência: não especificado
  - Fonte: SRC-001 (Seção 9)
- INT-002 Webhook genérico (saída)
  - Tipo: webhook
  - Dados trocados: payload com template e variáveis
  - Frequência/latência: execução manual
  - Fonte: SRC-001 (Seção 10)

[12] CRITÉRIOS DE ACEITAÇÃO (Opcional; recomendado quando houver detalhamento)
- UC-003 Operar cards no kanban
  - Deve abrir card em modal e exibir source/inputs/outputs/props/plugins/histórico.
  - Deve permitir editar inputs/props com permissão.
  - Deve registrar histórico ao mover cards.
  - Fonte: derivado de RF-005/RF-006 (SRC-001 Seções 5.2-6.1).
- UC-011 Executar webhook manual no card
  - Deve executar webhook com template de variáveis.
  - Deve substituir variável inexistente por null e registrar warning.
  - Fonte: derivado de RF-012/RN-007 (SRC-001 Seção 10.5).

[13] MATRIZ DE RASTREABILIDADE (DERIVADA)
| Item | Fonte(s) | Referência |
| --- | --- | --- |
| UC-001 | SRC-001 | Seções 4.1, 14.1-14.2, 15 |
| UC-002 | SRC-001 | Seções 4.1-4.3, 15 |
| UC-003 | SRC-001 | Seções 4.4, 5, 6, 12, 15 |
| UC-004 | SRC-001 | Seção 4.5 |
| UC-005 | SRC-001 | Seção 13.1, 15 |
| UC-006 | SRC-001 | Seção 13.2, 15 |
| UC-007 | SRC-001 | Seção 13.3, 15 |
| UC-008 | SRC-001 | Seção 13.4, 15 |
| UC-009 | SRC-001 | Seção 13.5, 15 |
| UC-010 | SRC-001 | Seção 14.3-14.4, 15 |
| UC-011 | SRC-001 | Seções 10.1, 10.5 |
| RF-001 | SRC-001 | Seção 14.1 |
| RF-002 | SRC-001 | Seções 4.1, 14.4 |
| RF-003 | SRC-001 | Seções 3.2, 4.3 |
| RF-004 | SRC-001 | Seções 4.4, 11.2 |
| RF-005 | SRC-001 | Seções 5.2-5.3, 14.4 |
| RF-006 | SRC-001 | Seção 6.1 |
| RF-007 | SRC-001 | Seção 4.5 |
| RF-008 | SRC-001 | Seções 13.2, 7.2 |
| RF-009 | SRC-001 | Seções 13.3, 9.2-9.3 |
| RF-010 | SRC-001 | Seção 9.4 |
| RF-011 | SRC-001 | Seções 10.2, 13.5 |
| RF-012 | SRC-001 | Seções 10.1, 10.3-10.5 |
| RN-001 | SRC-001 | Seções 3.3, 17.1 |
| RN-002 | SRC-001 | Seções 3.3, 17.1 |
| RN-003 | SRC-001 | Seções 5.3, 17.2 |
| RN-004 | SRC-001 | Seções 5.3, 17.3 |
| RN-005 | SRC-001 | Seções 6.1, 17.4 |
| RN-006 | SRC-001 | Seção 9.4, 17.5 |
| RN-007 | SRC-001 | Seções 10.5, 6.2, 17.6 |
| RN-008 | SRC-001 | Seção 11.1 |
| ENT-001 | SRC-001 | Seções 3.1, 13.1 |
| ENT-002 | SRC-001 | Seções 3.2, 13.1 |
| ENT-003 | SRC-001 | Seções 3.3, 4.5 |
| ENT-004 | SRC-001 | Seções 3.3, 13.1 |
| ENT-005 | SRC-001 | Seções 5.2-5.3, 12 |
| ENT-006 | SRC-001 | Seção 6.1 |
| ENT-007 | SRC-001 | Seções 7.1, 13.2 |
| ENT-008 | SRC-001 | Seção 7.2 |
| ENT-009 | SRC-001 | Seções 9.2-9.3, 13.3 |
| ENT-010 | SRC-001 | Seções 10.2-10.3, 13.5 |
| ENT-011 | SRC-001 | Seção 8.3 |
| ENT-012 | SRC-001 | Seções 14.1-14.3 |
| INT-001 | SRC-001 | Seção 9 |
| INT-002 | SRC-001 | Seção 10 |
| SCR-001 | SRC-001 | Seções 4.1, 14.1, 15 |
| SCR-002 | SRC-001 | Seções 4.1, 15 |
| SCR-003 | SRC-001 | Seções 4.2-4.3, 15 |
| SCR-004 | SRC-001 | Seções 4.4-4.5, 15 |
| SCR-005 | SRC-001 | Seções 5.2, 10.1, 15 |
| SCR-006 | SRC-001 | Seção 13.1, 15 |
| SCR-007 | SRC-001 | Seção 13.1, 15 |
| SCR-008 | SRC-001 | Seção 13.2, 15 |
| SCR-009 | SRC-001 | Seção 13.3, 15 |
| SCR-010 | SRC-001 | Seção 13.4, 15 |
| SCR-011 | SRC-001 | Seção 13.5, 15 |
| SCR-012 | SRC-001 | Seção 14.3, 15 |
| RTE-001 | SRC-001 | Seção 15 |
| RTE-002 | SRC-001 | Seção 15 |
| RTE-003 | SRC-001 | Seção 15 |
| RTE-004 | SRC-001 | Seção 15 |
| RTE-005 | SRC-001 | Seção 15 |
| RTE-006 | SRC-001 | Seção 15 |
| RTE-007 | SRC-001 | Seção 15 |
| RTE-008 | SRC-001 | Seção 15 |
| RTE-009 | SRC-001 | Seção 15 |
| RTE-010 | SRC-001 | Seção 15 |
| RTE-011 | SRC-001 | Seção 15 |
| RTE-012 | SRC-001 | Seção 15 |

[14] PONTOS EM ABERTO + HIPÓTESES (POA)
- POA-001
  - Pergunta: O perfil “Gestor” é obrigatório no MVP ou pode ser omitido (somente Operacional/Admin)?
  - Severidade: MEDIUM
  - Blocking: false
  - Hipóteses:
    - H1: Gestor existe e tem permissões intermediárias entre Operacional e Admin (impacto: regras de permissão adicionais).
    - H2: Gestor é equivalente a Operacional (impacto: simplifica RBAC).
    - H3: Gestor não é necessário no MVP (impacto: remover perfil e telas associadas).
  - Impacto na implementação: definição de RBAC e telas/rotas administrativas.
  - Fontes: SRC-001 (Seções 2.2, 14.4)

- POA-002
  - Pergunta: Quando não houver externalObjectIdPath/valor no payload, o sistema deve registrar warning ou apenas informativo no histórico?
  - Severidade: LOW
  - Blocking: false
  - Hipóteses:
    - H1: Registrar warning sempre (impacto: histórico com nível de severidade).
    - H2: Registrar evento informativo (impacto: menos ruído no histórico).
    - H3: Não registrar evento específico (impacto: reduz rastreabilidade; não recomendado).
  - Impacto na implementação: definição de eventos e visibilidade no histórico.
  - Fontes: SRC-001 (Seção 9.4)

- POA-003
  - Pergunta: Qual é o mecanismo de autenticação/sessão (tipo de token, expiração, recuperação de senha)?
  - Severidade: HIGH
  - Blocking: true
  - Hipóteses:
    - H1: Sessão com token JWT e expiração configurável (impacto: API e frontend precisam lidar com expiração).
    - H2: Sessão baseada em cookie (impacto: backend deve gerenciar sessão server-side).
    - H3: SSO externo (impacto: integrações adicionais e maior esforço).
  - Impacto na implementação: desenho de autenticação e APIs.
  - Fontes: SRC-001 (Seção 14.1)
