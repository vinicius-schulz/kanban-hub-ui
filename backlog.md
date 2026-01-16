# Backlog — Kanban Hub UI (MVP)

## EP-001 — Autenticação e acesso
**Objetivo:** Permitir entrada no sistema e início de sessão para acesso às áreas do produto.
**Rastreabilidade:** RF-001

### ST-001 — Login com sessão provisória (mock)
**Descrição:** Implementar tela de login com validação mínima e criação de sessão mockada enquanto POA-003 não é resolvido.
**Rastreabilidade:** RF-001, POA-003
**Incremento:** INC-001
**Critérios de Aceitação (Given/When/Then):**
- Given que estou na rota /login
 When informo credenciais válidas (mock)
 Then sou redirecionado para /modules com sessão ativa em memória.
- Given credenciais inválidas
 When tento autenticar
 Then vejo erro de autenticação e permaneço na tela de login.
- Given sessão mock ativa
 When recarrego a aplicação
 Then permaneço autenticado até sair explicitamente (mock).
**Definition of Done:**
- Tela de login renderiza sem erros.
- Estado de sessão mock é persistido (ex.: storage local).
- Redirecionamento para /modules ocorre com sucesso.
**Tasks:**
- TSK-001 — UI de login e validações básicas
- TSK-002 — Adapter de autenticação mock e estado de sessão

#### TSK-001 — UI de login e validações básicas
- **Objetivo:** Criar formulário de login com mensagens de erro.
- **Arquivos-alvo prováveis:** `src/modules/auth/presentation`, `src/app/routes`
- **Dependências:** INC-000
- **Notas de implementação:** Usar componentes MUI já presentes no boilerplate.

#### TSK-002 — Adapter de autenticação mock e estado de sessão
- **Objetivo:** Implementar fluxo de sessão mock com persistência local.
- **Arquivos-alvo prováveis:** `src/modules/auth/infra`, `src/modules/auth/presentation/state`
- **Dependências:** INC-000
- **Notas de implementação:** Marcar como PROVISÓRIO até POA-003.

## EP-002 — Navegação de módulos e seleção de board
**Objetivo:** Permitir listagem de módulos e navegação até um board via árvore.
**Rastreabilidade:** RF-002, RF-003

### ST-002 — Listagem de módulos permitidos
**Descrição:** Exibir módulos disponíveis ao usuário autenticado.
**Rastreabilidade:** RF-002
**Incremento:** INC-001
**Critérios de Aceitação (Given/When/Then):**
- Given usuário autenticado
 When acesso /modules
 Then visualizo lista de módulos permitidos (mock).
- Given que um módulo não é permitido
 When acesso /modules
 Then ele não aparece na lista.
**Definition of Done:**
- Lista de módulos renderiza com dados mockados.
- Clique em módulo navega para /modules/:moduleId.
**Tasks:**
- TSK-003 — Página de módulos e navegação para detalhe

#### TSK-003 — Página de módulos e navegação para detalhe
- **Objetivo:** Implementar lista de módulos e link para detalhe.
- **Arquivos-alvo prováveis:** `src/modules/modules/presentation`, `src/app/routes`
- **Dependências:** INC-000
- **Notas de implementação:** Dados mockados via fixtures do domínio.

### ST-003 — Árvore do módulo e seleção de board
**Descrição:** Renderizar árvore hierárquica e carregar board ao selecionar uma folha.
**Rastreabilidade:** RF-003
**Incremento:** INC-002
**Critérios de Aceitação (Given/When/Then):**
- Given módulo selecionado
 When acesso /modules/:moduleId
 Then visualizo árvore com nós e folhas.
- Given seleciono uma folha/board
 When clico no item
 Then navego para /boards/:boardId?view=kanban.
**Definition of Done:**
- Árvore renderiza com dados mock.
- Seleção de folha dispara navegação correta.
**Tasks:**
- TSK-004 — Componente de árvore e navegação para board

#### TSK-004 — Componente de árvore e navegação para board
- **Objetivo:** Exibir árvore de navegação do módulo e interação de seleção.
- **Arquivos-alvo prováveis:** `src/modules/modules/presentation`, `src/modules/modules/presentation/components`
- **Dependências:** INC-000
- **Notas de implementação:** Reutilizar componentes MUI TreeView se disponíveis.

## EP-003 — Kanban e operação de cards
**Objetivo:** Visualizar board, manipular cards e consultar histórico.
**Rastreabilidade:** RF-004, RF-005, RF-006

### ST-004 — Kanban com colunas e cards
**Descrição:** Mostrar board com colunas e cards carregados do state mockado.
**Rastreabilidade:** RF-003, RF-004
**Incremento:** INC-002
**Critérios de Aceitação (Given/When/Then):**
- Given board selecionado
 When acesso /boards/:boardId?view=kanban
 Then vejo colunas e cards distribuídos.
- Given board vazio
 When acesso a tela
 Then vejo estado empty com CTA (se permitido).
**Definition of Done:**
- Colunas e cards renderizam com dados mock.
- Estados de loading/empty implementados.
**Tasks:**
- TSK-005 — Layout Kanban e renderização de colunas/cards

#### TSK-005 — Layout Kanban e renderização de colunas/cards
- **Objetivo:** Implementar layout do board e cartões.
- **Arquivos-alvo prováveis:** `src/modules/board/presentation`, `src/modules/board/presentation/components`
- **Dependências:** INC-000
- **Notas de implementação:** Layout conforme ux.blueprint.md.

### ST-005 — Drag & drop e persistência local da posição
**Descrição:** Permitir mover cards entre colunas e atualizar estado local.
**Rastreabilidade:** RF-004
**Incremento:** INC-003
**Critérios de Aceitação (Given/When/Then):**
- Given card em coluna A
 When arrasto para coluna B
 Then a UI reflete a nova coluna e posição.
- Given movimento concluído
 When recarrego a tela (mock)
 Then vejo a posição persistida localmente.
**Definition of Done:**
- DnD funcional em colunas.
- State local atualizado e persistido (mock).
**Tasks:**
- TSK-006 — Implementar drag & drop e atualização de estado

#### TSK-006 — Implementar drag & drop e atualização de estado
- **Objetivo:** Adicionar DnD e persistência local de posição.
- **Arquivos-alvo prováveis:** `src/modules/board/presentation`, `src/modules/board/presentation/state`
- **Dependências:** ST-004
- **Notas de implementação:** Usar lib DnD padrão do projeto (ver package.json).

### ST-006 — Modal do card com edição básica
**Descrição:** Abrir card em modal e permitir edição de inputs/props conforme permissões.
**Rastreabilidade:** RF-005
**Incremento:** INC-003
**Critérios de Aceitação (Given/When/Then):**
- Given card visível
 When clico no card
 Then modal abre com dados principais e campos editáveis.
- Given usuário sem permissão de edição
 When abre modal
 Then campos ficam readonly.
**Definition of Done:**
- Modal renderiza dados do card.
- Edição/readonly respeita permissões mock.
**Tasks:**
- TSK-007 — Modal do card e form de campos

#### TSK-007 — Modal do card e form de campos
- **Objetivo:** Criar modal com campos do CardType.
- **Arquivos-alvo prováveis:** `src/modules/card/presentation`, `src/modules/card/presentation/components`
- **Dependências:** INC-000
- **Notas de implementação:** Modelar campos com base em CardTypeField.

### ST-007 — Histórico estruturado de eventos
**Descrição:** Registrar e exibir histórico de eventos do card.
**Rastreabilidade:** RF-006
**Incremento:** INC-003
**Critérios de Aceitação (Given/When/Then):**
- Given movimentação ou edição
 When ação é concluída
 Then evento aparece no histórico do card.
- Given evento warning (mock)
 When visualizo histórico
 Then vejo tipo/nível do evento.
**Definition of Done:**
- Histórico renderiza em formato de lista temporal.
- Eventos são adicionados ao estado ao editar/mover cards.
**Tasks:**
- TSK-008 — Registro e renderização do histórico

#### TSK-008 — Registro e renderização do histórico
- **Objetivo:** Implementar store do histórico e UI de listagem.
- **Arquivos-alvo prováveis:** `src/modules/card/presentation`, `src/modules/card/presentation/state`
- **Dependências:** ST-006
- **Notas de implementação:** Mapear eventos com severidade.

## EP-004 — Configuração de board
**Objetivo:** Permitir ajustar colunas, labels e associações do board.
**Rastreabilidade:** RF-007

### ST-008 — Tela de configurações do board (engrenagem)
**Descrição:** Exibir tela/abas de configuração com campos básicos.
**Rastreabilidade:** RF-007
**Incremento:** INC-004
**Critérios de Aceitação (Given/When/Then):**
- Given usuário admin em um board
 When acessa engrenagem
 Then pode editar colunas, labels e associações.
- Given alterações realizadas
 When salva
 Then mudanças aparecem no board (mock).
**Definition of Done:**
- UI de configuração renderiza sem erro.
- Alterações refletem no state local.
**Tasks:**
- TSK-009 — UI de configurações do board e persistência local

#### TSK-009 — UI de configurações do board e persistência local
- **Objetivo:** Implementar tela de config e atualização do state.
- **Arquivos-alvo prováveis:** `src/modules/board/presentation`, `src/modules/board/presentation/state`
- **Dependências:** INC-000
- **Notas de implementação:** Incluir CardType, IngressSource e webhook habilitado.

## EP-005 — Administração de cadastros técnicos
**Objetivo:** Gerenciar CardTypes, IngressSources e conectores webhook no MVP.
**Rastreabilidade:** RF-008, RF-009, RF-011

### ST-009 — CRUD de CardTypes e Fields
**Descrição:** Tela administrativa para criar/editar/remover CardTypes e Fields.
**Rastreabilidade:** RF-008
**Incremento:** INC-005
**Critérios de Aceitação (Given/When/Then):**
- Given admin autenticado
 When acessa /admin/card-types
 Then consegue criar, editar e remover CardTypes.
- Given CardType com fields
 When edito fields
 Then mudanças persistem no state mock.
**Definition of Done:**
- CRUD local funcional com dados mock.
- Campos suportam type/mode/flags.
**Tasks:**
- TSK-010 — UI e state de CardTypes/Fields

#### TSK-010 — UI e state de CardTypes/Fields
- **Objetivo:** Implementar telas e store para CardTypes.
- **Arquivos-alvo prováveis:** `src/modules/admin/card-types`, `src/modules/admin/shared`
- **Dependências:** INC-000
- **Notas de implementação:** Campos baseados em CardTypeField enums.

### ST-010 — CRUD de IngressSources
**Descrição:** Tela administrativa de IngressSources com schema/mapping/externalObjectIdPath.
**Rastreabilidade:** RF-009
**Incremento:** INC-005
**Critérios de Aceitação (Given/When/Then):**
- Given admin autenticado
 When acessa /admin/ingress-sources
 Then consegue criar, editar e remover IngressSources.
- Given externalObjectIdPath vazio
 When salvo
 Then registro fica com campo opcional.
**Definition of Done:**
- CRUD local funcional com dados mock.
- Campos de mapping/scheme presentes.
**Tasks:**
- TSK-011 — UI e state de IngressSources

#### TSK-011 — UI e state de IngressSources
- **Objetivo:** Implementar telas e store para IngressSources.
- **Arquivos-alvo prováveis:** `src/modules/admin/ingress-sources`, `src/modules/admin/shared`
- **Dependências:** INC-000
- **Notas de implementação:** ExternalObjectIdPath opcional.

### ST-011 — CRUD de conectores webhook
**Descrição:** Tela administrativa para configurar conectores (URL, método, headers, auth).
**Rastreabilidade:** RF-011
**Incremento:** INC-005
**Critérios de Aceitação (Given/When/Then):**
- Given admin autenticado
 When acessa /admin/connectors
 Then consegue criar e editar conectores webhook.
- Given conector criado
 When salvo
 Then aparece na lista e fica disponível para uso manual.
**Definition of Done:**
- CRUD local funcional com dados mock.
- Campos suportam método e body-template.
**Tasks:**
- TSK-012 — UI e state de conectores webhook

#### TSK-012 — UI e state de conectores webhook
- **Objetivo:** Implementar telas e store para conectores.
- **Arquivos-alvo prováveis:** `src/modules/admin/connectors`, `src/modules/admin/shared`
- **Dependências:** INC-000
- **Notas de implementação:** Validar método com enum WebhookConnector.method.

## EP-006 — Ingestão de eventos
**Objetivo:** Criar/atualizar cards com base em eventos de IngressSource.
**Rastreabilidade:** RF-010

### ST-012 — Processamento mock de ingestão
**Descrição:** Adapter mock que simula ingestão e aplica regras de externalObjectIdPath.
**Rastreabilidade:** RF-010, POA-002
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given evento com externalObjectIdPath válido
 When processado
 Then card é criado ou atualizado.
- Given evento sem externalObjectIdPath
 When processado
 Then evento warning é registrado no histórico (PROVISÓRIO).
**Definition of Done:**
- Serviço mock cria/atualiza cards.
- Warning registrado no histórico em caso de ausência do campo.
**Tasks:**
- TSK-013 — Adapter mock de ingestão e regra de matching

#### TSK-013 — Adapter mock de ingestão e regra de matching
- **Objetivo:** Implementar regra de matching create/update.
- **Arquivos-alvo prováveis:** `src/modules/ingress/infra`, `src/modules/ingress/application`
- **Dependências:** INC-000, ST-007
- **Notas de implementação:** Marcar como PROVISÓRIO até POA-002.

## EP-007 — Execução manual de webhook no card
**Objetivo:** Permitir disparo manual de webhook a partir do card.
**Rastreabilidade:** RF-012

### ST-013 — Disparo manual de webhook
**Descrição:** Ação no modal do card para executar um conector webhook com template de variáveis.
**Rastreabilidade:** RF-012
**Incremento:** INC-007
**Critérios de Aceitação (Given/When/Then):**
- Given card aberto
 When seleciono conector e executo
 Then ação é registrada no histórico.
- Given falha no envio (mock)
 When executo
 Then vejo erro e histórico registra falha.
**Definition of Done:**
- UI permite selecionar conector e disparar ação.
- Histórico registra sucesso/erro.
**Tasks:**
- TSK-014 — Ação de webhook no modal do card

#### TSK-014 — Ação de webhook no modal do card
- **Objetivo:** Implementar botão/ação e integração com connectors mock.
- **Arquivos-alvo prováveis:** `src/modules/card/presentation`, `src/modules/admin/connectors`
- **Dependências:** ST-011, ST-007
- **Notas de implementação:** Usar adapter mock e template básico.
