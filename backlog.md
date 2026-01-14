# Backlog — Kanban Hub UI (MVP)

## EP-001 — Acesso e navegação inicial
**Objetivo:** Permitir login, visualizar módulos permitidos e navegar para um board via árvore do módulo.
**Rastreabilidade:** RF-001, RF-002, RF-003, RF-004

### ST-001 — Login e sessão
**Descrição:** Usuário autentica e inicia sessão para acessar o sistema.
**Rastreabilidade:** RF-001
**Incremento:** INC-001
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário está na rota /login
  When submete credenciais válidas
  Then o sistema registra sessão mockada e redireciona para a listagem de módulos.
- Given que o usuário submete credenciais inválidas
  When a autenticação falha
  Then o sistema exibe erro de acesso negado (mock).
- Given que existe sessão ativa
  When o usuário acessa /login
  Then o sistema redireciona para /modules.
**Definition of Done:**
- Tela de login renderiza, aceita input e aciona fluxo de sessão mockada.
- Rotas /login e /modules estão navegáveis com guards simples.
- Critérios Given/When/Then atendidos com dados mock.
**Tasks:**
- TSK-001 — Definir estado de sessão e contrato de credenciais.
- TSK-002 — Implementar tela de login com formulário e ação mockada.
- TSK-003 — Configurar rotas base e redirecionamento pós-login.

#### TSK-001 — Definir estado de sessão e contrato de credenciais
- **Objetivo:** Criar tipos e store para sessão e login.
- **Arquivos-alvo prováveis:** `src/modules/auth/domain`, `src/modules/auth/presentation`, `src/app/store`
- **Dependências:** INC-000
- **Notas de implementação:** Usar mock de token e usuário.

#### TSK-002 — Implementar tela de login com formulário e ação mockada
- **Objetivo:** Permitir submeter credenciais e simular autenticação.
- **Arquivos-alvo prováveis:** `src/modules/auth/presentation`
- **Dependências:** TSK-001
- **Notas de implementação:** UI simples com validação mínima.

#### TSK-003 — Configurar rotas base e redirecionamento pós-login
- **Objetivo:** Garantir navegação entre /login e /modules.
- **Arquivos-alvo prováveis:** `src/app/routes`, `src/app/providers`, `src/main.tsx`
- **Dependências:** TSK-002
- **Notas de implementação:** Guard simplificado baseado em store.

### ST-002 — Listagem de módulos permitidos
**Descrição:** Exibir módulos disponíveis ao usuário após login.
**Rastreabilidade:** RF-002
**Incremento:** INC-001
**Critérios de Aceitação (Given/When/Then):**
- Given que a sessão está ativa
  When o usuário acessa /modules
  Then o sistema mostra a listagem de módulos permitidos.
- Given que não há módulos
  When a listagem é carregada
  Then o sistema exibe estado vazio.
**Definition of Done:**
- Página de módulos exibe cards/lista com dados mockados.
- Estado de carregamento/empty presente.
**Tasks:**
- TSK-004 — Criar modelo de módulo e fixture de módulos permitidos.
- TSK-005 — Implementar página de listagem de módulos.

#### TSK-004 — Criar modelo de módulo e fixture de módulos permitidos
- **Objetivo:** Disponibilizar dados mock para UI.
- **Arquivos-alvo prováveis:** `src/modules/modules/domain`, `src/modules/modules/infra`, `src/modules/_shared/types`
- **Dependências:** INC-000
- **Notas de implementação:** Fixture alinhada aos tipos de domínio.

#### TSK-005 — Implementar página de listagem de módulos
- **Objetivo:** Renderizar módulos e navegação para módulo.
- **Arquivos-alvo prováveis:** `src/modules/modules/presentation`, `src/app/routes`
- **Dependências:** TSK-004
- **Notas de implementação:** Links para /modules/:moduleId.

### ST-003 — Navegação da árvore do módulo e abertura de board
**Descrição:** Exibir árvore à esquerda e área principal à direita com carregamento de board.
**Rastreabilidade:** RF-003, RF-004
**Incremento:** INC-002
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário abre um módulo
  When a tela carrega
  Then a árvore do módulo aparece à esquerda e a área principal à direita.
- Given que o usuário seleciona uma folha da árvore
  When a seleção acontece
  Then o sistema carrega o kanban do board correspondente.
**Definition of Done:**
- Layout de módulo com árvore funcional.
- Seleção de nó dispara carregamento do board mock.
**Tasks:**
- TSK-006 — Implementar layout de módulo com painel esquerdo/direito.
- TSK-007 — Implementar árvore de navegação com dados mock.
- TSK-008 — Criar carregamento do board ao selecionar folha.

#### TSK-006 — Implementar layout de módulo com painel esquerdo/direito
- **Objetivo:** Estruturar layout base da tela do módulo.
- **Arquivos-alvo prováveis:** `src/modules/modules/presentation`, `src/modules/_shared/ui`
- **Dependências:** INC-001
- **Notas de implementação:** Reaproveitar PageLayout se existir.

#### TSK-007 — Implementar árvore de navegação com dados mock
- **Objetivo:** Navegar por itens do módulo.
- **Arquivos-alvo prováveis:** `src/modules/modules/presentation`, `src/modules/modules/domain`
- **Dependências:** TSK-006
- **Notas de implementação:** Mock com folhas/níveis do módulo.

#### TSK-008 — Criar carregamento do board ao selecionar folha
- **Objetivo:** Acionar seleção de board e renderizar área principal.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`, `src/modules/boards/application`
- **Dependências:** TSK-007
- **Notas de implementação:** Placeholder de board até INC-003.

## EP-002 — Operação do Kanban
**Objetivo:** Permitir visualizar o board, abrir cards, ver histórico e executar operações essenciais.
**Rastreabilidade:** RF-005, RF-006, RF-007, RF-008, RF-015, RF-016, RF-017

### ST-004 — Renderização do board e paginação lazy por coluna
**Descrição:** Exibir colunas, cards e contadores com carregamento incremental.
**Rastreabilidade:** RF-017
**Incremento:** INC-003
**Critérios de Aceitação (Given/When/Then):**
- Given que um board foi aberto
  When a tela carrega
  Then as colunas e cards são exibidos com contadores total/carregados.
- Given que o usuário rola uma coluna
  When atinge o fim da lista
  Then o sistema carrega mais cards (mock).
**Definition of Done:**
- Colunas e cards renderizam com dados mockados.
- Lazy load simulado com contadores atualizados.
**Tasks:**
- TSK-009 — Definir modelos de coluna/card com paginação e fixtures.
- TSK-010 — Implementar UI de colunas e cards com contadores.
- TSK-011 — Implementar comportamento de lazy load mock.

#### TSK-009 — Definir modelos de coluna/card com paginação e fixtures
- **Objetivo:** Modelar dados necessários para a UI do board.
- **Arquivos-alvo prováveis:** `src/modules/boards/domain`, `src/modules/boards/infra`
- **Dependências:** INC-000
- **Notas de implementação:** Incluir totalCount e loadedCount por coluna.

#### TSK-010 — Implementar UI de colunas e cards com contadores
- **Objetivo:** Renderizar kanban com cards e badges.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-009
- **Notas de implementação:** Card preview básico.

#### TSK-011 — Implementar comportamento de lazy load mock
- **Objetivo:** Simular carregamento incremental por coluna.
- **Arquivos-alvo prováveis:** `src/modules/boards/application`, `src/modules/boards/presentation`
- **Dependências:** TSK-010
- **Notas de implementação:** Pode usar botão/scroll trigger simplificado.

### ST-005 — Modal do card com buckets e histórico
**Descrição:** Abrir card e exibir seções com dados estruturados e histórico.
**Rastreabilidade:** RF-006, RF-007, RF-008
**Incremento:** INC-003
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário clica em um card
  When o modal abre
  Then as seções Source, Inputs, Outputs, Props, Plugins e Histórico são exibidas.
- Given que existem eventos no histórico
  When o modal é aberto
  Then eventos mostram type, summary, payload, createdAt e createdBy.
**Definition of Done:**
- Modal renderiza todas as seções obrigatórias com dados mock.
- Estrutura de buckets respeitada na UI.
**Tasks:**
- TSK-012 — Criar contratos de buckets do card e histórico.
- TSK-013 — Implementar modal do card com seções.
- TSK-014 — Exibir histórico estruturado.

#### TSK-012 — Criar contratos de buckets do card e histórico
- **Objetivo:** Definir tipos para sourceData, inputs, outputs, props e pluginData.
- **Arquivos-alvo prováveis:** `src/modules/boards/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Alinhar aos campos de ENT-005 e ENT-013.

#### TSK-013 — Implementar modal do card com seções
- **Objetivo:** Permitir abrir card e visualizar dados.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-010, TSK-012
- **Notas de implementação:** Modal com tabs/accordion.

#### TSK-014 — Exibir histórico estruturado
- **Objetivo:** Renderizar eventos do card.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-012
- **Notas de implementação:** Formatar data e autor.

### ST-006 — Movimentação de cards (drag & drop)
**Descrição:** Permitir mover cards entre colunas e persistir posição no estado.
**Rastreabilidade:** RF-005
**Incremento:** INC-004
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário arrasta um card
  When solta em outra coluna
  Then a posição do card é atualizada no estado.
- Given que a posição é alterada
  When o board é re-renderizado
  Then o card aparece na nova coluna e posição.
**Definition of Done:**
- Drag & drop funcional com persistência em store mockada.
- Atualização de posição refletida no UI.
**Tasks:**
- TSK-015 — Implementar estado de posicionamento de cards.
- TSK-016 — Implementar drag & drop e persistir posição.

#### TSK-015 — Implementar estado de posicionamento de cards
- **Objetivo:** Definir modelo de ordenação por coluna.
- **Arquivos-alvo prováveis:** `src/modules/boards/domain`, `src/modules/boards/application`
- **Dependências:** TSK-009
- **Notas de implementação:** Provisório até decisão POA-005.

#### TSK-016 — Implementar drag & drop e persistir posição
- **Objetivo:** Permitir mover cards na UI.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-015
- **Notas de implementação:** Pode usar lib leve ou implementação simples.

### ST-007 — Criação manual de card
**Descrição:** Permitir criar card manualmente no board quando autorizado.
**Rastreabilidade:** RF-015
**Incremento:** INC-004
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário possui permissão
  When clica em “Novo card”
  Then um card é criado na coluna padrão.
- Given que o usuário não possui permissão
  When tenta criar card
  Then o sistema bloqueia a ação com mensagem.
**Definition of Done:**
- Botão de criação manual disponível.
- Card criado com dados mínimos mockados.
**Tasks:**
- TSK-017 — Implementar ação de criação de card no estado.
- TSK-018 — Implementar UI do botão “Novo card”.

#### TSK-017 — Implementar ação de criação de card no estado
- **Objetivo:** Criar card com cardType e coluna padrão.
- **Arquivos-alvo prováveis:** `src/modules/boards/application`
- **Dependências:** TSK-009
- **Notas de implementação:** Respeitar RN-001 com cardType.

#### TSK-018 — Implementar UI do botão “Novo card”
- **Objetivo:** Expor ação de criação manual na UI.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-017
- **Notas de implementação:** Exibir feedback de permissão.

### ST-008 — Execução manual de webhook no card
**Descrição:** Permitir execução manual de conector webhook dentro do card.
**Rastreabilidade:** RF-016
**Incremento:** INC-004
**Critérios de Aceitação (Given/When/Then):**
- Given que existe conector configurado
  When o usuário executa a ação manual
  Then o sistema registra requisição mock e adiciona histórico.
- Given que variável não existe
  When a execução ocorre
  Then o sistema substitui por null e registra warning.
**Definition of Done:**
- Ação manual disponível no modal do card.
- Histórico mostra execução e warnings.
**Tasks:**
- TSK-019 — Definir modelo de execução de webhook e warning.
- TSK-020 — Implementar UI de execução manual no modal.

#### TSK-019 — Definir modelo de execução de webhook e warning
- **Objetivo:** Representar execução manual e resultados.
- **Arquivos-alvo prováveis:** `src/modules/boards/domain`, `src/modules/boards/application`
- **Dependências:** INC-000
- **Notas de implementação:** Mock de resposta e erros de template.

#### TSK-020 — Implementar UI de execução manual no modal
- **Objetivo:** Expor ação de webhook no card.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-019, TSK-013
- **Notas de implementação:** Registro no histórico do card.

## EP-003 — Configuração e Administração
**Objetivo:** Permitir configurar boards e administrar cadastros do sistema.
**Rastreabilidade:** RF-009, RF-010, RF-011, RF-012, RF-013, RF-014

### ST-009 — Configuração do board via engrenagem
**Descrição:** Usuário configura colunas, labels, CardType, IngressSource e webhook no contexto do board.
**Rastreabilidade:** RF-009
**Incremento:** INC-005
**Critérios de Aceitação (Given/When/Then):**
- Given que o usuário abre a engrenagem do board
  When acessa a tela
  Then pode editar colunas, labels, CardType, IngressSource e webhook.
- Given que o usuário salva alterações
  When confirma
  Then os dados são persistidos no estado mock.
**Definition of Done:**
- Tela de configuração do board disponível a partir do board.
- Formulários para cada seção com persistência mock.
**Tasks:**
- TSK-021 — Criar modelo de configuração do board.
- TSK-022 — Implementar UI da engrenagem com seções.
- TSK-023 — Implementar persistência mock das configurações.

#### TSK-021 — Criar modelo de configuração do board
- **Objetivo:** Definir tipos para colunas, labels, cardType e connectors.
- **Arquivos-alvo prováveis:** `src/modules/boards/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Alinhar com ENT-003, ENT-004, ENT-006, ENT-009, ENT-010.

#### TSK-022 — Implementar UI da engrenagem com seções
- **Objetivo:** Expor formulário de configuração no contexto do board.
- **Arquivos-alvo prováveis:** `src/modules/boards/presentation`
- **Dependências:** TSK-021
- **Notas de implementação:** Pode usar tabs para seções.

#### TSK-023 — Implementar persistência mock das configurações
- **Objetivo:** Salvar configuração no store mock.
- **Arquivos-alvo prováveis:** `src/modules/boards/application`
- **Dependências:** TSK-022
- **Notas de implementação:** Estado local até integração real.

### ST-010 — CRUD de módulos, árvore, boards, colunas e labels
**Descrição:** Admin mantém estrutura de módulos e boards.
**Rastreabilidade:** RF-010
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given que o admin acessa /admin/modules
  When carrega a tela
  Then consegue criar/editar/remover módulos.
- Given que o admin acessa /admin/boards
  When carrega a tela
  Then consegue CRUD de boards, colunas e labels.
**Definition of Done:**
- Telas admin listam itens com ações de CRUD mock.
- Fluxos de criação/edição removem/atualizam estado local.
**Tasks:**
- TSK-024 — Definir contratos admin para módulos e boards.
- TSK-025 — Implementar UI admin de módulos.
- TSK-026 — Implementar UI admin de boards/colunas/labels.

#### TSK-024 — Definir contratos admin para módulos e boards
- **Objetivo:** Tipos e fixtures para cadastros estruturais.
- **Arquivos-alvo prováveis:** `src/modules/admin/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Reuso de tipos compartilhados.

#### TSK-025 — Implementar UI admin de módulos
- **Objetivo:** CRUD de módulos e árvore.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-024
- **Notas de implementação:** Formulário simples e tabela.

#### TSK-026 — Implementar UI admin de boards/colunas/labels
- **Objetivo:** CRUD de boards e estrutura.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-024
- **Notas de implementação:** Separar seção de colunas/labels.

### ST-011 — CRUD de CardTypes e Fields
**Descrição:** Admin mantém CardTypes e campos configuráveis.
**Rastreabilidade:** RF-011
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given que o admin acessa /admin/card-types
  When carrega a tela
  Then consegue criar/editar/remover CardTypes.
- Given que o admin edita um CardType
  When adiciona campos
  Then pode definir bindingRef, tipo, modo e flags.
**Definition of Done:**
- Tela de CardTypes com CRUD mockado.
- Edição de fields suportada na UI.
**Tasks:**
- TSK-027 — Definir modelo de CardType/Field para admin.
- TSK-028 — Implementar UI de CardTypes e Fields.

#### TSK-027 — Definir modelo de CardType/Field para admin
- **Objetivo:** Contratos para cadastro de CardTypes.
- **Arquivos-alvo prováveis:** `src/modules/admin/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Provisório até decisão POA-003.

#### TSK-028 — Implementar UI de CardTypes e Fields
- **Objetivo:** CRUD com tabela e formulário de fields.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-027
- **Notas de implementação:** Edição inline simples.

### ST-012 — CRUD de IngressSources
**Descrição:** Admin configura fontes de entrada com schema e mapping.
**Rastreabilidade:** RF-012
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given que o admin acessa /admin/ingress-sources
  When carrega a tela
  Then consegue criar/editar/remover IngressSources.
- Given que o admin define externalObjectIdPath
  When salva
  Then o valor é persistido no estado mock.
**Definition of Done:**
- Tela de IngressSources com CRUD mockado.
- Campos para alias, schema, mapping e externalObjectIdPath.
**Tasks:**
- TSK-029 — Definir modelo de IngressSource para admin.
- TSK-030 — Implementar UI de IngressSources.

#### TSK-029 — Definir modelo de IngressSource para admin
- **Objetivo:** Contratos para cadastro de fontes de entrada.
- **Arquivos-alvo prováveis:** `src/modules/admin/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Considerar POA-004 para idempotência.

#### TSK-030 — Implementar UI de IngressSources
- **Objetivo:** CRUD com formulário e tabela.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-029
- **Notas de implementação:** Campos de schema/mapping como JSON.

### ST-013 — Registro de plugins
**Descrição:** Admin registra plugins com key, nome, versão e status.
**Rastreabilidade:** RF-013
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given que o admin acessa /admin/plugins
  When carrega a tela
  Then consegue cadastrar plugins com key, nome, versão e status.
**Definition of Done:**
- Tela de plugins com CRUD mockado.
**Tasks:**
- TSK-031 — Definir modelo de plugin para admin.
- TSK-032 — Implementar UI de plugins.

#### TSK-031 — Definir modelo de plugin para admin
- **Objetivo:** Contratos para cadastro de plugins.
- **Arquivos-alvo prováveis:** `src/modules/admin/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Status enum active/inactive.

#### TSK-032 — Implementar UI de plugins
- **Objetivo:** CRUD de plugins.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-031
- **Notas de implementação:** Formulário simples.

### ST-014 — CRUD de conectores webhook
**Descrição:** Admin configura conectores webhook com URL, método e body template.
**Rastreabilidade:** RF-014
**Incremento:** INC-006
**Critérios de Aceitação (Given/When/Then):**
- Given que o admin acessa /admin/connectors
  When carrega a tela
  Then consegue criar/editar/remover conectores webhook.
- Given que o admin define headers/auth/body-template
  When salva
  Then os dados ficam persistidos no estado mock.
**Definition of Done:**
- Tela de conectores com CRUD mockado.
- Campos de URL/método/auth/headers/body-template disponíveis.
**Tasks:**
- TSK-033 — Definir modelo de webhook connector para admin.
- TSK-034 — Implementar UI de conectores.

#### TSK-033 — Definir modelo de webhook connector para admin
- **Objetivo:** Contratos para cadastro de conectores.
- **Arquivos-alvo prováveis:** `src/modules/admin/domain`
- **Dependências:** INC-000
- **Notas de implementação:** Métodos enumerados conforme RF-014.

#### TSK-034 — Implementar UI de conectores
- **Objetivo:** CRUD de conectores webhook.
- **Arquivos-alvo prováveis:** `src/modules/admin/presentation`
- **Dependências:** TSK-033
- **Notas de implementação:** Expor campos de template.
