# [1] REGISTRO DE FONTES
| source_id | tipo | nome/descrição curta | data | repo/branch/commit | observações de qualidade |
| --- | --- | --- | --- | --- | --- |
| SRC-001 | doc (texto) | artefatos/requisitos preliminares.txt | null | null | Consolidado textual detalhado; sem cabeçalho formal. |

# [2] SUMÁRIO EXECUTIVO
- O sistema é um Hub Central de Gestão de Atividades com Kanban configurável para transformar eventos externos em trabalho executável e rastreável em cards. (SRC-001: seção 1)
- Usuários principais: operador/analista, líder/coordenador/gerente e admin/configurador. (SRC-001: seção 2 “Quem usa e para quê”)
- Módulos principais: organização por módulos e árvore de contexto; boards Kanban com colunas e cards; CardType/Fields com binding; automações (gatilho/condição/ação); integrações de entrada e saída; histórico estruturado por card. (SRC-001: seções 2–8)
- Principais riscos/ambigüidades: comportamento quando evento chega sem externalEventId (POA-001), significado de “BOR” no webhook (POA-002), conjunto mínimo de ações internas de automação (POA-003), e formato do body do webhook (snapshot vs template) no MVP (POA-004). (SRC-001: seção 13 e seção 12 “Pontos ainda abertos”)

# [3] CONTEXTO DO DOMÍNIO E LÉXICO (Ubiquitous Language)
## 3.1 Glossário (canonizado)
- **Módulo** -> agrupador macro de domínio/área do negócio (ex.: Vistoria, Telemetria, Financeiro) -> sinônimos: módulo -> fontes: SRC-001 (seções 2.1 e 3.1)
- **Árvore de contexto (Tree/TreeNode)** -> hierarquia de navegação dentro de um módulo, com folhas apontando para boards -> sinônimos: árvore, hierarquia -> fontes: SRC-001 (seções 2.2 e 3.2)
- **Board (Kanban)** -> quadro com colunas/raias e cards onde o trabalho acontece -> sinônimos: quadro, board -> fontes: SRC-001 (seções 2.3 e 3.3)
- **Coluna** -> etapa do fluxo no board -> sinônimos: coluna -> fontes: SRC-001 (seção 4 Etapa A)
- **Card** -> unidade de trabalho representando atividade/ocorrência/solicitação -> sinônimos: card -> fontes: SRC-001 (seção 3.1)
- **CardType** -> definição de campos do card (Fields), modos e exibição -> sinônimos: tipo de card -> fontes: SRC-001 (seção 5)
- **Field (Campo)** -> item de UI do card com bindingRef, modo e tipo -> sinônimos: campo -> fontes: SRC-001 (seção 5 e seção 9)
- **bindingRef** -> referência do local de origem/destino do dado do Field (source/inputs/outputs/props/system/pluginData) -> sinônimos: binding -> fontes: SRC-001 (seção 5.2 e seção 9)
- **Fonte de Entrada (IngressSource)** -> origem de dados que envia eventos e cria/atualiza cards -> sinônimos: ingress, fonte de entrada -> fontes: SRC-001 (seção 4.1 e seção 6.3)
- **Integração de Saída (ActionConnector)** -> conector de ações externas usado por automação (webhook/WhatsApp/email/BI) -> sinônimos: conector -> fontes: SRC-001 (seção 4.2)
- **Automação (AutomationRule)** -> regra configurável com gatilho/condição/ação -> sinônimos: automação, regra -> fontes: SRC-001 (seção 8)
- **Plugin (UI)** -> componente visual dentro do modal do card associado ao CardType -> sinônimos: plugin -> fontes: SRC-001 (seção 4.3)
- **Histórico do Card (CardEvent)** -> timeline estruturada de eventos do card (criação, movimento, edição, automação, integrações) -> sinônimos: histórico, timeline -> fontes: SRC-001 (seção 3.4)
- **externalEventId** -> identificador do evento externo usado para idempotência (criar vs atualizar card) -> sinônimos: id externo -> fontes: SRC-001 (seção 7)
- **Buckets do Card** -> separação de dados: sourceData, inputs, outputs, props, pluginData -> sinônimos: buckets -> fontes: SRC-001 (seção 6)
- **Label (Etiqueta)** -> etiqueta associada a card, segregada por board -> sinônimos: etiqueta -> fontes: SRC-001 (seção 11)

## 3.2 Entidades candidatas
- **Module**: agrupador macro de contexto do negócio. (SRC-001: seções 2.1, 3.1, 8.1)
- **Tree/TreeNode**: estrutura hierárquica de navegação por contexto; folhas apontam para Board. (SRC-001: seções 2.2, 3.2, 8.1)
- **Board**: quadro Kanban com colunas e cards; associado a um CardType e a uma IngressSource no MVP. (SRC-001: seções 2.3, 3.3, 6.1)
- **Column**: etapa do fluxo do board. (SRC-001: seção 4 Etapa A)
- **Card**: unidade de trabalho com buckets de dados (sourceData/inputs/outputs/props/pluginData) e histórico. (SRC-001: seções 3, 6)
- **CardEvent**: evento de histórico/auditoria do card. (SRC-001: seções 3.4, 4 Etapa C/D)
- **CardType**: lista de Fields e regras de exibição/edição do card. (SRC-001: seção 5)
- **Field**: item do card com bindingRef, mode e type. (SRC-001: seção 5.1)
- **IngressSource**: fonte de entrada com schema, mapping e externalEventId. (SRC-001: seções 4.1, 6.3, 7)
- **AutomationRule**: regra com gatilho, condição e ação. (SRC-001: seção 8)
- **ActionConnector**: conector de saída (webhook etc.) usado em automações. (SRC-001: seções 4.2, 9)
- **Plugin**: componente UI associado ao CardType. (SRC-001: seção 4.3)
- **BoardLabel**: etiqueta segregada por board. (SRC-001: seção 11)

## 3.3 Eventos do negócio
- **INGRESS_RECEIVED**: registro de recebimento de evento externo e criação/atualização de card no histórico. (SRC-001: seção 4 Etapa C)
- **CARD_MOVED**: card movido entre colunas. (SRC-001: seções 3.4 e 4 Etapa D)
- **FIELD_CHANGED**: alteração de campo do card. (SRC-001: seções 3.4 e 4 Etapa D)
- **AUTOMATION_EXECUTED**: execução de automação e ação (incluindo integrações). (SRC-001: seções 3.4 e 4 Etapa E)

# [4] ESCOPO
## 4.1 Objetivos do produto
- Centralizar trabalho operacional em boards Kanban configuráveis por módulo/árvore. (SRC-001: seção 1 e 2)
- Converter eventos externos em cards rastreáveis com histórico estruturado. (SRC-001: seções 1, 3.4 e 4)
- Permitir execução do trabalho no card (preencher campos, mover colunas, aplicar labels). (SRC-001: seções 1, 4 Etapa D, 11)
- Oferecer automações configuráveis por UI (gatilho/condição/ação) com integrações de saída. (SRC-001: seções 1, 8, 9)

## 4.2 Fora de escopo explícito
- Não há evidência suficiente nas fontes fornecidas.

## 4.3 PONTOS_EM_ABERTO relevantes ao escopo
- POA-001, POA-002, POA-003, POA-004. (SRC-001: seções 13 e 12)

# [5] PERSONAS E PERMISSÕES
- **ACT-001 Operador/Analista**: opera cards, abre modal, preenche inputs, move colunas, aplica labels. Permissões: atualizar campos editáveis, mover card, aplicar etiquetas. (SRC-001: seção 2 “Operador / Analista” e seção 4 Etapa D)
- **ACT-002 Líder/Coordenador/Gerente**: acompanha volume e gargalos, ajusta fluxo, cria regras simples e acompanha KPIs. Permissões: visualizar métricas e ajustar fluxo/ regras simples (nível definido de forma geral). (SRC-001: seção 2 “Líder / Coordenador / Gerente”)
- **ACT-003 Admin/Configurador**: cria boards, CardTypes, IngressSource, conectores e automações. Permissões: configurar módulos, árvores, boards, labels, CardType, fontes de entrada e automações. (SRC-001: seção 2 “Admin/Configurador” e seção 12.1)

Pontos em aberto:
- POA-003 para definir o conjunto mínimo de ações internas de automação no MVP. (SRC-001: seção 13)

# [6] CASOS DE USO (NÍVEL ALTO) + JORNADAS
## UC-001 Configurar board e estrutura
- **Ator primário:** ACT-003
- **Objetivo:** criar módulo/árvore e board com colunas/fluxo.
- **Pré-condições:** acesso de admin.
- **Pós-condições:** board criado e navegável na árvore.
- **Fluxo principal:**
  1. Admin cria módulo (quando necessário).
  2. Admin monta árvore e associa folhas a boards.
  3. Admin cria board e define colunas/fluxo.
- **Fluxos alternativos/exceções:** não há evidência.
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 12.1 e 6.1)

## UC-002 Configurar CardType e preview
- **Ator primário:** ACT-003
- **Objetivo:** definir Fields com bindingRef, modos e exibição no card/modal.
- **Pré-condições:** board criado.
- **Pós-condições:** CardType definido para o board.
- **Fluxo principal:**
  1. Admin cria CardType do board com Fields e bindings.
  2. Admin configura quais fields aparecem no card fechado (preview).
  3. Admin associa plugins de UI (se existirem).
- **Fluxos alternativos/exceções:** não há evidência.
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 5, 12.1, 6.2)

## UC-003 Configurar fonte de entrada (IngressSource)
- **Ator primário:** ACT-003
- **Objetivo:** mapear payload externo para sourceData e definir externalEventId.
- **Pré-condições:** board criado.
- **Pós-condições:** fonte de entrada habilitada para criar/atualizar cards.
- **Fluxo principal:**
  1. Admin configura schema do payload e mapeamento.
  2. Admin define onde está o externalEventId.
  3. Admin associa a IngressSource ao board.
- **Fluxos alternativos/exceções:** não há evidência.
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 4.1, 6.3, 12.1)

## UC-004 Receber evento externo e criar/atualizar card
- **Ator primário:** ACT-003 (sistema externo)
- **Objetivo:** transformar evento externo em card novo ou atualização.
- **Pré-condições:** IngressSource configurada.
- **Pós-condições:** card criado/atualizado e histórico registrado.
- **Fluxo principal:**
  1. Sistema externo envia evento com externalEventId e payload.
  2. Hub verifica idempotência por externalEventId.
  3. Hub cria novo card ou atualiza o existente.
  4. Hub grava INGRESS_RECEIVED no histórico.
- **Fluxos alternativos/exceções:** comportamento sem externalEventId é indefinido (POA-001).
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 4 Etapa B/C, 7)

## UC-005 Operar card no Kanban
- **Ator primário:** ACT-001
- **Objetivo:** executar o trabalho no card.
- **Pré-condições:** card existente.
- **Pós-condições:** card atualizado e histórico registrado.
- **Fluxo principal:**
  1. Operador visualiza card na coluna inicial.
  2. Abre modal do card e consulta dados da origem (readonly).
  3. Preenche inputs editáveis e aplica labels.
  4. Move card entre colunas (drag & drop).
  5. Histórico registra ações.
- **Fluxos alternativos/exceções:** não há evidência.
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 3, 4 Etapa D)

## UC-006 Configurar automações e integrações de saída
- **Ator primário:** ACT-003
- **Objetivo:** configurar regras com gatilho/condição/ação e habilitar conectores.
- **Pré-condições:** board e conectores disponíveis.
- **Pós-condições:** automações prontas para execução.
- **Fluxo principal:**
  1. Admin habilita conector de saída (webhook genérico no MVP).
  2. Admin define gatilhos, condições e ações na UI.
- **Fluxos alternativos/exceções:** não há evidência.
- **Tela principal:** null
- **Rota principal:** null
- **Fontes:** SRC-001 (seções 8, 9, 12.1)

# [7] REQUISITOS FUNCIONAIS (RF)
- **RF-001** O sistema deve permitir organizar atividades em boards Kanban com colunas e cards. Prioridade: Must. Critério mínimo: Trigger=criação de board; Entrada=definição de colunas; Saída=board com fluxo definido. UC: UC-001. Fontes: SRC-001 (seções 1, 2.3, 3.3).
- **RF-002** O sistema deve permitir que módulos contenham uma árvore de contexto com folhas apontando para boards. Prioridade: Must. Critério mínimo: Trigger=admin cria árvore; Entrada=nós/hierarquia; Saída=folhas associadas a boards. UC: UC-001. Fontes: SRC-001 (seção 2.2).
- **RF-003** O sistema deve permitir configurar um CardType por board com Fields, bindingRef, modo e tipo. Prioridade: Must. Critério mínimo: Trigger=admin cria CardType; Entrada=lista de Fields; Saída=CardType associado ao board. UC: UC-002. Fontes: SRC-001 (seções 5.1, 6.1).
- **RF-004** O sistema deve permitir configurar quais informações aparecem no card fechado (preview) com base no CardType. Prioridade: Must. Critério mínimo: Trigger=admin define preview; Entrada=fields marcados; Saída=card exibe preview. UC: UC-002. Fontes: SRC-001 (seção 3.2).
- **RF-005** O sistema deve abrir um modal de card contendo dados exibidos (readonly/editáveis), histórico e plugins associados ao CardType quando o card for clicado. Prioridade: Must. Critério mínimo: Trigger=clique no card; Entrada=cardId; Saída=modal com dados/histórico/plugins. UC: UC-005. Fontes: SRC-001 (seção 3.3).
- **RF-006** O sistema deve manter histórico estruturado por card, registrando criação, movimentos, alterações de campos, automações e integrações. Prioridade: Must. Critério mínimo: Trigger=evento de card; Entrada=evento; Saída=registro no histórico. UC: UC-005, UC-004. Fontes: SRC-001 (seção 3.4).
- **RF-007** O sistema deve permitir configurar IngressSource com schema de payload, mapping e externalEventId. Prioridade: Must. Critério mínimo: Trigger=admin configura ingress; Entrada=schema/mapping/externalEventId; Saída=ingress ativo. UC: UC-003. Fontes: SRC-001 (seções 4.1, 6.3).
- **RF-008** O sistema deve criar ou atualizar cards com base no externalEventId enviado por uma fonte de entrada. Prioridade: Must. Critério mínimo: Trigger=evento externo; Entrada=externalEventId+payload; Saída=card criado ou atualizado. UC: UC-004. RN: RN-001. Fontes: SRC-001 (seção 7).
- **RF-009** O sistema deve separar os dados do card em buckets: sourceData, inputs, outputs, props e pluginData. Prioridade: Must. Critério mínimo: Trigger=criação/atualização de card; Entrada=dados do evento/usuário/sistema; Saída=dados segregados por bucket. UC: UC-004, UC-005. RN: RN-003. Fontes: SRC-001 (seção 6).
- **RF-010** O sistema deve aplicar regras de escrita por bucket (sourceData/inputs/outputs/props/pluginData). Prioridade: Must. Critério mínimo: Trigger=tentativa de escrita; Entrada=origem da escrita; Saída=escrita permitida ou bloqueada conforme bucket. UC: UC-004, UC-005. RN: RN-004. Fontes: SRC-001 (seção 6.2).
- **RF-011** O sistema deve suportar automações configuráveis por UI com gatilho/condição/ação. Prioridade: Must. Critério mínimo: Trigger=admin cria automação; Entrada=gatilho/condição/ação; Saída=automação registrada. UC: UC-006. Fontes: SRC-001 (seção 8.3).
- **RF-012** O sistema deve disponibilizar ao menos um conector de saída Webhook genérico selecionável como ação de automação no MVP. Prioridade: Must. Critério mínimo: Trigger=admin configura automação; Entrada=ação webhook; Saída=webhook disponível. UC: UC-006. Fontes: SRC-001 (seção 9).
- **RF-013** O sistema deve permitir labels em cards com catálogo segregado por board. Prioridade: Must. Critério mínimo: Trigger=admin cria labels; Entrada=labels do board; Saída=labels aplicáveis aos cards do board. UC: UC-005. Fontes: SRC-001 (seção 11).
- **RF-014** O sistema deve permitir mover cards manualmente entre colunas (drag & drop). Prioridade: Must. Critério mínimo: Trigger=drag & drop; Entrada=cardId+coluna destino; Saída=card movido. UC: UC-005. Fontes: SRC-001 (seção 3.1).
- **RF-015** O sistema deve paginar por coluna com lazy load/scroll infinito e exibir carregados/total no header. Prioridade: Must. Critério mínimo: Trigger=abertura do board/scroll; Entrada=página/coluna; Saída=cards carregados por coluna. UC: UC-005. Fontes: SRC-001 (seção 10).

# [8] REGRAS DE NEGÓCIO (RN)
- **RN-001 Idempotência por externalEventId**
  - **Condição (GIVEN/IF):** evento externo chega com externalEventId.
  - **Ação (THEN):** se externalEventId já existe na mesma fonte, atualizar card existente; se for novo, criar card novo.
  - **Exceções (UNLESS):** comportamento sem externalEventId é indefinido (POA-001).
  - **Precedência:** aplica-se a eventos de ingress antes de criação de card.
  - **Exemplos:**
    - Válido: evento com externalEventId=123 já registrado → atualizar card do evento 123.
    - Inválido/erro: evento sem externalEventId → resultado indefinido (POA-001).
  - **Campos envolvidos:** ENT-009.externalEventId.
  - **Fontes:** SRC-001 (seção 7).

- **RN-002 Board trata um tipo específico de CardType**
  - **Condição (GIVEN/IF):** board definido no MVP.
  - **Ação (THEN):** board trabalha com um único tipo de card (CardType) para manter integridade.
  - **Exceções (UNLESS):** não há evidência.
  - **Precedência:** definição de board.
  - **Exemplos:**
    - Válido: board “Telemetria — Alta velocidade” usa um CardType específico.
    - Inválido/erro: board com CardTypes mistos sem definição (não permitido no MVP).
  - **Campos envolvidos:** ENT-003.cardTypeId.
  - **Fontes:** SRC-001 (seção 2.3).

- **RN-003 Buckets do card**
  - **Condição (GIVEN/IF):** card criado/atualizado.
  - **Ação (THEN):** armazenar dados em sourceData, inputs, outputs, props e pluginData.
  - **Exceções (UNLESS):** não há evidência.
  - **Precedência:** gravação de dados do card.
  - **Exemplos:**
    - Válido: payload externo vai para sourceData; observação do operador vai para inputs.
    - Inválido/erro: gravar dado da origem em inputs (não conforme).
  - **Campos envolvidos:** ENT-005.sourceData/inputs/outputs/props/pluginData.
  - **Fontes:** SRC-001 (seção 6).

- **RN-004 Regra de escrita por bucket**
  - **Condição (GIVEN/IF):** tentativa de gravação em bucket do card.
  - **Ação (THEN):** sourceData somente IngressSource; inputs pelo usuário (e automação se necessário); outputs somente sistema/automação; props por usuário e automação; pluginData pelo plugin.
  - **Exceções (UNLESS):** não há evidência.
  - **Precedência:** validação de escrita por bucket.
  - **Exemplos:**
    - Válido: automação escreve outputs; usuário escreve inputs.
    - Inválido/erro: usuário tenta editar sourceData.
  - **Campos envolvidos:** ENT-005.sourceData/inputs/outputs/props/pluginData.
  - **Fontes:** SRC-001 (seção 6.2).

- **RN-005 Namespaces de bindingRef**
  - **Condição (GIVEN/IF):** Field definido no CardType.
  - **Ação (THEN):** bindingRef deve apontar para um dos namespaces: source.*, inputs.*, outputs.*, props.*, system.*, pluginData.<pluginKey>.*.
  - **Exceções (UNLESS):** não há evidência.
  - **Precedência:** validação de Field.
  - **Exemplos:**
    - Válido: inputs.observacao, source.vehicle.plate.
    - Inválido/erro: bindingRef fora dos namespaces definidos.
  - **Campos envolvidos:** ENT-007.bindingRef.
  - **Fontes:** SRC-001 (seção 5.2).

- **RN-006 Exibição de object/array**
  - **Condição (GIVEN/IF):** Field de tipo object ou array marcado para exibição.
  - **Ação (THEN):** exibir conteúdo com indentação e permitir leitura; edição avançada fica fora do MVP.
  - **Exceções (UNLESS):** não há evidência.
  - **Precedência:** renderização do card/modal.
  - **Exemplos:**
    - Válido: object exibido com subpropriedades indentadas.
    - Inválido/erro: ocultar object marcado para exibição.
  - **Campos envolvidos:** ENT-007.type.
  - **Fontes:** SRC-001 (seção 5.3).

# [9] MODELO DE DADOS (SCHEMAS PARA UI/API)
## 9.1 Entidades canônicas
- **ENT-001 Module**: agrupador macro. Campos: name (string) [evidência de nome não explícita]. Fontes: SRC-001 (seções 2.1, 3.1). Confiança: low (campos não especificados).
- **ENT-002 TreeNode**: nó da árvore de contexto. Campos: parentId (referência), boardId (nas folhas) [campos não especificados]. Fontes: SRC-001 (seções 2.2, 3.2). Confiança: low.
- **ENT-003 Board**: quadro Kanban. Campos: columns (array), cardTypeId (referência), ingressSourceId (MVP) [campos não especificados]. Fontes: SRC-001 (seções 2.3, 6.1). Confiança: low.
- **ENT-004 Column**: etapa do fluxo. Campos: name (string) [campo não especificado]. Fontes: SRC-001 (seção 4 Etapa A). Confiança: low.
- **ENT-005 Card**: unidade de trabalho. Campos: sourceData (object), inputs (object), outputs (object), props (object), pluginData (object), labels (array) [labels explícito], history (array). Fontes: SRC-001 (seções 3, 6, 11). Confiança: medium.
- **ENT-006 CardEvent**: evento do histórico. Campos: type, payload, createdAt [não especificados]. Fontes: SRC-001 (seção 3.4). Confiança: low.
- **ENT-007 CardType**: definição do card. Campos: fields (array). Fontes: SRC-001 (seção 5). Confiança: medium.
- **ENT-008 Field**: item de UI do card. Campos: bindingRef (string), mode (editable/readonly), type (string|number|date|boolean|enum|array|object), displayRules (não detalhadas), showInCardPreview (boolean), showInModal (boolean). Fontes: SRC-001 (seções 5.1 e 5.3). Confiança: medium.
- **ENT-009 IngressSource**: fonte de entrada. Campos: sourceKey, externalEventId (referência no payload), schema, mapping. Fontes: SRC-001 (seções 4.1, 6.3, 7). Confiança: medium.
- **ENT-010 AutomationRule**: regra de automação. Campos: trigger, condition, action. Fontes: SRC-001 (seção 8). Confiança: medium.
- **ENT-011 ActionConnector**: integração de saída. Campos: url, method, headers, auth, body, timeout [alguns campos em POA]. Fontes: SRC-001 (seções 9 e 7). Confiança: medium.
- **ENT-012 Plugin**: componente UI do card. Campos: pluginKey, data (pluginData.*). Fontes: SRC-001 (seção 4.3). Confiança: low.
- **ENT-013 BoardLabel**: etiqueta por board. Campos: name, color [não especificado]. Fontes: SRC-001 (seção 11). Confiança: low.

## 9.2 Enumeradores e tabelas de referência
- **FieldType**: string, number, date, boolean, enum, array, object. Fontes: SRC-001 (seção 5.1). Confiança: high.
- **FieldMode**: editable, readonly. Fontes: SRC-001 (seção 5.1). Confiança: high.

## 9.3 Regras de validação de formulário (VAL)
- Não há evidência suficiente nas fontes fornecidas.

## 9.4 MAPA DE UX
- Não há evidência suficiente nas fontes fornecidas para SCR-xxx ou RTE-xxx explícitos.

# [10] REQUISITOS NÃO FUNCIONAIS (RNF)
- **RNF-001 Performance**: o Kanban deve suportar paginação por coluna com lazy load/scroll infinito, exibindo “carregados/total” no header. Métrica: paginação por coluna ativa. Fontes: SRC-001 (seção 10).

# [11] INTEGRAÇÕES E DEPENDÊNCIAS EXTERNAS
- **INT-001 Webhook genérico**: integração de saída via API configurável usada em automações. Dados: URL, método, body, credencial básica. Fontes: SRC-001 (seção 9). Confiança: high.
- **INT-002 WhatsApp**: integração de saída citada como exemplo. Dados: não especificados. Fontes: SRC-001 (seção 1 e 8.2). Confiança: low.
- **INT-003 E-mail**: integração de saída citada como exemplo. Dados: não especificados. Fontes: SRC-001 (seção 1 e 8.2). Confiança: low.
- **INT-004 BI**: integração de saída citada como exemplo. Dados: não especificados. Fontes: SRC-001 (seção 1 e 8.2). Confiança: low.
- **INT-005 Sistemas de origem (telemetria/cobrança/contato/educação)**: integrações de entrada (ingress) que enviam eventos. Dados: externalEventId + payload. Fontes: SRC-001 (seções 1 e 4 Etapa B). Confiança: medium.

# [12] CRITÉRIOS DE ACEITAÇÃO
- **UC-004**
  - Dado um evento com externalEventId já existente, quando o evento chega, então o card correspondente é atualizado e não duplicado. (SRC-001: seção 7)
  - Dado um evento com externalEventId novo, quando o evento chega, então um novo card é criado. (SRC-001: seção 7)
  - Dado um evento sem externalEventId, quando o evento chega, então o comportamento é indefinido e deve seguir decisão do POA-001. (SRC-001: seção 7)
- **UC-005**
  - Dado um card em uma coluna, quando o operador move o card, então o card muda de coluna e o histórico registra a ação. (SRC-001: seção 4 Etapa D)
  - Dado um card com campos editáveis, quando o operador altera um field, então o valor é salvo em inputs e o histórico registra a alteração. (SRC-001: seções 6.2 e 4 Etapa D)

# [13] MATRIZ DE RASTREABILIDADE (DERIVADA)
| Item | Fonte(s) | Referência |
| --- | --- | --- |
| UC-001 | SRC-001 | seções 12.1, 6.1 |
| UC-002 | SRC-001 | seções 5, 12.1, 6.2 |
| UC-003 | SRC-001 | seções 4.1, 6.3, 12.1 |
| UC-004 | SRC-001 | seções 4 Etapa B/C, 7 |
| UC-005 | SRC-001 | seções 3, 4 Etapa D |
| UC-006 | SRC-001 | seções 8, 9, 12.1 |
| RF-001 | SRC-001 | seções 1, 2.3, 3.3 |
| RF-002 | SRC-001 | seção 2.2 |
| RF-003 | SRC-001 | seções 5.1, 6.1 |
| RF-004 | SRC-001 | seção 3.2 |
| RF-005 | SRC-001 | seção 3.3 |
| RF-006 | SRC-001 | seção 3.4 |
| RF-007 | SRC-001 | seções 4.1, 6.3 |
| RF-008 | SRC-001 | seção 7 |
| RF-009 | SRC-001 | seção 6 |
| RF-010 | SRC-001 | seção 6.2 |
| RF-011 | SRC-001 | seção 8.3 |
| RF-012 | SRC-001 | seção 9 |
| RF-013 | SRC-001 | seção 11 |
| RF-014 | SRC-001 | seção 3.1 |
| RF-015 | SRC-001 | seção 10 |
| RN-001 | SRC-001 | seção 7 |
| RN-002 | SRC-001 | seção 2.3 |
| RN-003 | SRC-001 | seção 6 |
| RN-004 | SRC-001 | seção 6.2 |
| RN-005 | SRC-001 | seção 5.2 |
| RN-006 | SRC-001 | seção 5.3 |
| ENT-001 | SRC-001 | seções 2.1, 3.1 |
| ENT-002 | SRC-001 | seções 2.2, 3.2 |
| ENT-003 | SRC-001 | seções 2.3, 6.1 |
| ENT-004 | SRC-001 | seção 4 Etapa A |
| ENT-005 | SRC-001 | seções 3, 6, 11 |
| ENT-006 | SRC-001 | seção 3.4 |
| ENT-007 | SRC-001 | seção 5 |
| ENT-008 | SRC-001 | seções 5.1, 5.3 |
| ENT-009 | SRC-001 | seções 4.1, 6.3, 7 |
| ENT-010 | SRC-001 | seção 8 |
| ENT-011 | SRC-001 | seção 9 |
| ENT-012 | SRC-001 | seção 4.3 |
| ENT-013 | SRC-001 | seção 11 |
| RNF-001 | SRC-001 | seção 10 |
| INT-001 | SRC-001 | seção 9 |
| INT-002 | SRC-001 | seções 1, 8.2 |
| INT-003 | SRC-001 | seções 1, 8.2 |
| INT-004 | SRC-001 | seções 1, 8.2 |
| INT-005 | SRC-001 | seções 1, 4 Etapa B |
| POA-001 | SRC-001 | seção 13 |
| POA-002 | SRC-001 | seção 13 |
| POA-003 | SRC-001 | seção 13 |
| POA-004 | SRC-001 | seção 12 “Pontos ainda abertos” |

# [14] PONTOS EM ABERTO + HIPÓTESES (POA)
1. **POA-001**
   - **Pergunta:** Qual o comportamento quando um evento chega sem externalEventId?
   - **Severidade:** HIGH
   - **Blocking:** true
   - **Hipóteses:**
     - H1: Rejeitar evento sem externalEventId. Impacto: evita duplicidade, exige validação de entrada.
     - H2: Criar card sempre sem idempotência. Impacto: risco de duplicatas em volume.
     - H3: Gerar externalEventId interno. Impacto: exige regra de geração e rastreabilidade.
   - **Impacto na implementação:** ingestão de eventos, idempotência, UX de erros.
   - **Recomendação conservadora padrão:** undecided.
   - **Fontes:** SRC-001 (seção 7/13).

2. **POA-002**
   - **Pergunta:** O que significa “BOR” na configuração do webhook?
   - **Severidade:** MEDIUM
   - **Blocking:** false
   - **Hipóteses:**
     - H1: “BOR” significa “Body”. Impacto: apenas nomenclatura.
     - H2: “BOR” significa outro campo específico. Impacto: altera UI e contrato do conector.
     - H3: “BOR” é um erro e deve ser ignorado. Impacto: nenhuma mudança.
   - **Impacto na implementação:** UI do conector e documentação.
   - **Recomendação conservadora padrão:** undecided.
   - **Fontes:** SRC-001 (seção 9/13).

3. **POA-003**
   - **Pergunta:** Quais ações internas mínimas (além de webhook) devem compor o MVP de automações?
   - **Severidade:** MEDIUM
   - **Blocking:** false
   - **Hipóteses:**
     - H1: Apenas mover card e atualizar campos. Impacto: motor simples.
     - H2: Incluir também registrar histórico explícito. Impacto: auditabilidade maior.
     - H3: Permitir ações futuras sem definir no MVP. Impacto: backlog aberto.
   - **Impacto na implementação:** catálogo de ações da automação e UI.
   - **Recomendação conservadora padrão:** undecided.
   - **Fontes:** SRC-001 (seção 8.2 e 13).

4. **POA-004**
   - **Pergunta:** O body do webhook no MVP deve ser apenas “snapshot” do card ou permitir template de variáveis?
   - **Severidade:** MEDIUM
   - **Blocking:** false
   - **Hipóteses:**
     - H1: Snapshot padrão (cardId, boardId, columnId, sourceData, inputs, outputs, props, contexto do evento). Impacto: implementação rápida.
     - H2: Template com variáveis já no MVP. Impacto: mais complexidade em UI/execução.
     - H3: Suportar ambos. Impacto: maior esforço e validações.
   - **Impacto na implementação:** contrato do conector e UI de automação.
   - **Recomendação conservadora padrão:** undecided.
   - **Fontes:** SRC-001 (seção 7 “Webhook genérico” e seção 12 “Pontos ainda abertos”).
