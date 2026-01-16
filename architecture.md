# Kanban Hub UI — Arquitetura e Boilerplate

## Visão geral
Este repositório contém o boilerplate React + TypeScript + Vite com Material UI, Redux Toolkit, RTK Query e React Router, seguindo camadas inspiradas em Clean Architecture. O módulo **healthcheck** está implementado como smoke sample end-to-end. Os demais módulos do spec foram **apenas scaffolded** conforme instruções.

> Status: **READY_FOR_IMPLEMENTATION=false** (assumptions.md). Portanto, módulos além do healthcheck permanecem como **stubs**.

## Como rodar
```bash
npm install
npm run dev
```

### Mock da API
- Para mock local do endpoint `/health`, use:
```bash
VITE_API_MOCK=true npm run dev
```
- Para chamar API real, defina `VITE_API_BASE_URL` (ex.: `http://localhost:3000`).

## Estrutura de camadas
- **domain**: entidades e ports (sem React/Redux/HTTP).
- **application**: use cases.
- **presentation**: páginas/components/hooks/state (React).
- **infra**: adapters concretos (HTTP/DI).
- **app**: bootstrap, providers, rotas, store, config.

## Módulos
### Implementados
- **healthcheck**
  - RTK Query chama `GET /health`
  - Page mostra status + timestamp

### Scaffolded (stubs)
- **auth** (UC-001)
- **modules** (UC-002)
- **board** (UC-003/UC-004)
- **card** (UC-003/UC-011)
- **admin** (UC-005 a UC-010)

> Nenhum comportamento real foi implementado nesses módulos devido aos POAs e READY_FOR_IMPLEMENTATION=false.

## Pontos em aberto (POAs bloqueantes)
- **POA-004**: definição de cardTypeId no Card vs derivação pelo Board.
- **POA-003**: mecanismo de autenticação/sessão.

Esses itens bloqueiam implementação real de autenticação, modelo de dados de Card e fluxos críticos.

## Ferramentas e scripts
- `npm run lint` — ESLint (mínimo)
- `npm run format` — Prettier
- `npm run typecheck` — `tsc --noEmit`

## Quality Gates (Gate 2)
- Gate 2A: `npm run dev` sobe sem erros (healthcheck renderiza)
- Gate 2B: `npm run build` executa (TypeScript + Vite)
- Gate 2C: `npm run typecheck` existe e passa
- Gate 2E: `npm run lint` e `npm run format` existem (mínimos), ou BLOCKED_TOOLING documentado
