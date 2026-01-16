[1] REGISTRO DE FONTES
- SRC-001 (Documentação Consolidada Final — Hub Kanban Configurável e Integrável (MVP))
- SRC-002 (Gerado pelo AGENT_3 (SAFE_DEFAULT/normalização), baseado em validation.md)

[2] SUMARIO DE IA (ARQUITETURA DA INFORMACAO)
- Objetivo do produto: Centralizar atividades em boards Kanban com cards configuráveis, histórico e integrações de entrada/saída no MVP. (SRC-001)
- Usuarios/atores principais: Operacional, Gestor/Líder, Administrador, Root (bootstrap). (SRC-001)
- Modulos ou areas principais (somente se evidenciados): Módulos/Árvore/Boards; Cards (Kanban e modal); Administração (Módulos/Boards/CardTypes/IngressSources/Plugins/Conectores/Usuários). (SRC-001)

[3] MODELO DE NAVEGACAO
- Navegacao primaria (estrutura e ordem)
  1) Login (entrada) -> Lista de módulos -> Detalhe do módulo (árvore) -> Board Kanban. (SRC-001)
  2) Administração (área dedicada) com acesso a cadastros estruturais e configurações. (SRC-001)
- Navegacao secundaria (tabs/submenus) se houver evidencia
  - Não há evidência explícita de tabs/submenus; o detalhamento deve seguir a estrutura das telas administrativas listadas. (SRC-001)
- Regras de visibilidade por perfil (se evidenciadas)
  - Rotas /admin* guardadas por perfil Admin; demais acessos por permissões de módulo/board. (SRC-001)

[4] INVENTARIO DE TELAS (SOMENTE SE HOUVER EVIDENCIA)
- SCR-001
  - Nome: Login
  - Objetivo: Autenticar usuário.
  - Atores: ACT-001, ACT-003, ACT-004
  - UCs/RFs ligados: UC-001, RF-001
  - Evidencia: SRC-001 (Seções 4.1, 14.1, 15)

- SCR-002
  - Nome: Listagem de módulos
  - Objetivo: Selecionar módulo permitido.
  - Atores: ACT-001
  - UCs/RFs ligados: UC-002, RF-002
  - Evidencia: SRC-001 (Seções 4.1, 15)

- SCR-003
  - Nome: Detalhe do módulo (árvore + conteúdo)
  - Objetivo: Navegar árvore e selecionar board.
  - Atores: ACT-001
  - UCs/RFs ligados: UC-002, RF-003
  - Evidencia: SRC-001 (Seções 4.2-4.3, 15)

- SCR-004
  - Nome: Board Kanban
  - Objetivo: Visualizar colunas/cards e configurar board.
  - Atores: ACT-001, ACT-003
  - UCs/RFs ligados: UC-003, UC-004, RF-003, RF-004, RF-007
  - Evidencia: SRC-001 (Seções 4.4-4.5, 15)

- SCR-005
  - Nome: Modal do card
  - Objetivo: Visualizar dados, inputs/outputs, plugins, histórico e ações.
  - Atores: ACT-001, ACT-003
  - UCs/RFs ligados: UC-003, UC-011, RF-005, RF-006, RF-012
  - Evidencia: SRC-001 (Seções 5.2, 10.1, 15)

- SCR-006
  - Nome: Admin Módulos
  - Objetivo: CRUD de módulos/árvore.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-005
  - Evidencia: SRC-001 (Seção 13.1, 15)

- SCR-007
  - Nome: Admin Boards
  - Objetivo: CRUD de boards/colunas/labels.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-005
  - Evidencia: SRC-001 (Seção 13.1, 15)

- SCR-008
  - Nome: Admin CardTypes
  - Objetivo: CRUD de CardTypes e Fields.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-006, RF-008
  - Evidencia: SRC-001 (Seção 13.2, 15)

- SCR-009
  - Nome: Admin IngressSources
  - Objetivo: CRUD de IngressSources.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-007, RF-009
  - Evidencia: SRC-001 (Seção 13.3, 15)

- SCR-010
  - Nome: Admin Plugins
  - Objetivo: Registrar/ativar/desativar plugins.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-008
  - Evidencia: SRC-001 (Seção 13.4, 15)

- SCR-011
  - Nome: Admin Conectores
  - Objetivo: CRUD de conectores webhook.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-009, RF-011
  - Evidencia: SRC-001 (Seção 13.5, 15)

- SCR-012
  - Nome: Admin Usuários
  - Objetivo: CRUD de usuários e permissões.
  - Atores: ACT-003
  - UCs/RFs ligados: UC-010
  - Evidencia: SRC-001 (Seção 14.3, 15)

[5] MAPA DE ROTAS (SOMENTE SE HOUVER EVIDENCIA)
- RTE-001
  - Path: /login
  - Tela vinculada: SCR-001
  - Guardas/permissoes: não evidenciado
  - Evidencia: SRC-001 (Seção 15)

- RTE-002
  - Path: /modules
  - Tela vinculada: SCR-002
  - Guardas/permissoes: não evidenciado
  - Evidencia: SRC-001 (Seção 15)

- RTE-003
  - Path: /modules/:moduleId
  - Tela vinculada: SCR-003
  - Guardas/permissoes: não evidenciado
  - Evidencia: SRC-001 (Seção 15)

- RTE-004
  - Path: /boards/:boardId?view=kanban
  - Tela vinculada: SCR-004
  - Guardas/permissoes: não evidenciado
  - Evidencia: SRC-001 (Seção 15)

- RTE-005
  - Path: /boards/:boardId?card=:cardId
  - Tela vinculada: SCR-005
  - Guardas/permissoes: não evidenciado
  - Evidencia: SRC-001 (Seção 15)

- RTE-006
  - Path: /admin/modules
  - Tela vinculada: SCR-006
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-007
  - Path: /admin/boards
  - Tela vinculada: SCR-007
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-008
  - Path: /admin/card-types
  - Tela vinculada: SCR-008
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-009
  - Path: /admin/ingress-sources
  - Tela vinculada: SCR-009
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-010
  - Path: /admin/plugins
  - Tela vinculada: SCR-010
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-011
  - Path: /admin/connectors
  - Tela vinculada: SCR-011
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

- RTE-012
  - Path: /admin/users
  - Tela vinculada: SCR-012
  - Guardas/permissoes: Admin
  - Evidencia: SRC-001 (Seção 15)

[6] LAYOUT BASE (OBRIGATORIO)
- Regioes
  - Header: brand + busca global (se aplicável) + ações globais + menu do usuário.
  - Primary Nav: acesso a módulos/boards e área administrativa (quando permitido).
  - Content: Page Header + conteúdo principal (board, listas, formulários).
  - Optional Right Rail: contexto/insights rápidos (ex.: resumo do board/histórico curto), quando aplicável.
  - Footer: compacto, links auxiliares.
- Responsabilidades por regiao
  - Header: identidade, sessão e ações globais.
  - Primary Nav: troca de área (módulos/administrativo).
  - Content: experiência principal da tarefa.
  - Right Rail: informações auxiliares não críticas.
  - Footer: informação institucional/versão.
- Layout grid
  - Desktop: 12 colunas, max-width 1200px para conteúdo; nav 280–320px; gutters 24px.
  - Tablet: 8–12 colunas fluídas; nav colapsa.
  - Mobile: 4 colunas, 16px gutters; conteúdo em 1 coluna.
- Comportamento responsivo
  - Desktop: nav fixa lateral; right rail opcional.
  - Tablet: nav colapsa para drawer/ícones; right rail abaixo do conteúdo.
  - Mobile: header compacto com hamburger; nav em drawer; conteúdo full width; footer opcional.
- Diagrama ASCII
  Desktop:
  +--------------------------------------------------------------+
  | Header: brand | global search | primary actions | user menu  |
  +--------------------------------------------------------------+
  | Primary Nav | Page Header + Content | Optional Right Rail    |
  | (280-320px) | (fluid, max 1200px)  | (280-320px, optional)   |
  |             |                                                  |
  +--------------------------------------------------------------+
  | Footer (compact)                                              |
  +--------------------------------------------------------------+

  Tablet:
  +--------------------------------------------------------------+
  | Header (fixed)                                                |
  +--------------------------------------------------------------+
  | Content (nav via drawer / icons)                              |
  +--------------------------------------------------------------+
  | Right Rail (abaixo do conteúdo, opcional)                     |
  +--------------------------------------------------------------+

  Mobile:
  +------------------------------+
  | Header: ☰ | Title | Actions  |
  +------------------------------+
  | Content (1 coluna, full)     |
  +------------------------------+
  | Footer (opcional)            |
  +------------------------------+

[7] ARQUETIPOS DE PAGINA (PADROES GENERICOS)
- Lista
  - Estrutura: Page Header + toolbar + lista (cards/tabela) + paginação.
  - Componentes MUI: AppBar/Toolbar, Table ou Card, Pagination.
- Detalhe
  - Estrutura: Page Header + seção de dados + ações contextuais.
  - Componentes MUI: Card, Typography, Button, Stack.
- Formulario
  - Estrutura: Page Header + campos agrupados + ações primárias/secundárias.
  - Componentes MUI: TextField, Select, Checkbox, DatePicker, Button.
- Dashboard (Kanban)
  - Estrutura: colunas com cards, actions por coluna, drag & drop.
  - Componentes MUI: Grid/Box, Card, Chip, Menu.
- Reader (Histórico)
  - Estrutura: lista temporal de eventos.
  - Componentes MUI: List, ListItem, Timeline (se disponível).

[8] ANATOMIA DE PAGINA (PADRAO)
- Page Header
  - Título + breadcrumb (quando aplicável) + ações principais.
- Barra de filtros/toolbar
  - Filtros, busca, ordenação, ações de batch (quando houver listas).
- Conteudo principal
  - Cards/tabelas/forms conforme arquetipo.
- Area de ajuda/insights (opcional)
  - Ajuda contextual, tips e estado do sistema.

[9] ESTADOS E FEEDBACK
- Loading: skeleton/spinner + placeholder de colunas/cards.
- Empty: mensagem objetiva + CTA para criar/configurar (quando permitido).
- Error: banner/alert com ação de retry.
- Success: toast/snackbar confirmando ação.
- Disabled: campos/botões desabilitados por permissão.

[10] ACESSIBILIDADE (BASELINE)
- Contraste: mínimo AA para texto e controles.
- Foco: estados de foco visíveis em inputs e navegação.
- Teclado: navegação por tab e ações principais acessíveis.
- Tamanho mínimo: 44x44px para alvos de toque; tipografia legível.

[11] PONTOS EM ABERTO (POA)
- Nenhum novo POA de UX identificado nesta rodada.
