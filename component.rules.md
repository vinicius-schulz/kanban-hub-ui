# Component Rules — Design System

## Fontes
- Heading: **Sora** e Body: **Source Sans 3**.
- Carregar fontes no `index.css` (ou equivalente):
  ```css
  @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap");
  ```
- Se fontes externas não estiverem disponíveis, usar o fallback definido nos tokens.

## Hierarquia de botões
- **Primary**: ação principal por tela (ex.: “Salvar”, “Criar”).
- **Secondary**: ações alternativas importantes (ex.: “Cancelar”, “Voltar”).
- **Tertiary**: ações menos críticas (texto/ghost), como “Ver detalhes”.
- Use no máximo 1 Primary por área; evite múltiplos primários concorrentes.

## Card vs Paper vs Box
- **Card**: conteúdo agrupado e contextual (kanban card, painel de detalhes). Use quando houver título, ações e agrupamento visual.
- **Paper**: superfícies de suporte (listas, tabelas, blocos de formulário). Use para elevar conteúdo sem “branding” de card.
- **Box**: layout e espaçamento. Não usar Box para simular elevação.

## Tabelas e listas
- **Densidade**: padrão confortável (padding vertical ≥ 12px). Use densidade compacta apenas em tabelas administrativas extensas.
- **Zebra**: usar fundo alternado sutil (neutral 50) apenas em tabelas grandes.
- **Hover**: indicar linha ativa com leve highlight (bg elevated) e borda sutil.

## Formulários
- **Label** acima do campo, com helper text logo abaixo.
- **Erro**: mostrar mensagem curta e específica, preferindo `error` do tema.
- **Estados**: exibir foco visível e manter espaçamento consistente (spacing.md entre campos agrupados).

## Navegação
- **Drawer**: principal para módulos/administrativo; versão mini no desktop opcional, drawer no mobile.
- **Tabs**: apenas quando há 2–6 seções no mesmo contexto.
- **Breadcrumb**: usar em páginas internas (módulo > board > item).

## Empty / Loading / Error
- **Empty**: mensagem objetiva + CTA contextual (ex.: “Criar módulo”).
- **Loading**: skeleton ou shimmer, mantendo estrutura da página.
- **Error**: alert/banner com ação clara (ex.: “Tentar novamente”).

## Iconografia
- Tamanho padrão 20–24px.
- Alinhar ícones ao centro vertical do texto.
- Ícones em botões devem ter espaçamento de 8px do texto.

## Espaçamento padrão
- Entre blocos principais: `spacing.lg`.
- Entre subseções internas: `spacing.md`.
- Entre campos de formulário: `spacing.md`.
- Para listas/linhas: `spacing.sm`.

## Uso dos tokens
- Use `color.primary` para ações primárias e estados de foco.
- Use `color.bg.surface` para superfícies principais e `color.bg.elevated` para destaque.
- Use `radius.md`/`radius.lg` para cards e `radius.sm` para botões e inputs.
- Use `shadow.sm` para cards e `shadow.md` apenas em modais.
