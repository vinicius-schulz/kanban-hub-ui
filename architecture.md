# Architecture

## Stack
- React 19 + TypeScript + Vite
- Material UI (MUI)
- Redux Toolkit + RTK Query
- React Router DOM

## Estrutura (Clean Architecture)
- **domain**: entidades e contratos puros.
- **application**: casos de uso e orquestração.
- **presentation**: React (pages/components/hooks/state).
- **infra**: adaptadores concretos (HTTP, storage, analytics).
- **app**: bootstrap, providers, routes, store, config.

Restrições de dependência:
- domain não importa app/infra/presentation.
- application pode importar domain, mas não presentation.
- presentation pode importar application/domain e usar infra via DI.
- infra não importa presentation.

## Módulos
### Implementados
- **healthcheck**: fluxo end-to-end com RTK Query, UI e mock opcional.

### Scaffolded (stubs)
- **auth**: login e sessão (UC-001, RF-001).
- **modules**: listagem de módulos (UC-001, RF-002).
- **boards**: navegação/kanban e operações (UC-002, UC-003, UC-004, UC-007).
- **admin**: administração de cadastros (UC-005).

> Esses módulos estão com estrutura base e **sem implementação**, aguardando definições de produto e contratos API.

## Healthcheck (smoke sample)
- RTK Query chama `GET /health`.
- Página renderiza status e timestamp.
- Mock simples via `VITE_API_MOCK=true`.

## Configuração de ambiente
Variáveis suportadas:
- `VITE_API_BASE_URL`: base URL da API (ex.: `http://localhost:3000`).
- `VITE_API_MOCK`: quando `true`, retorna mock para `/health`.

Exemplo:
```bash
VITE_API_MOCK=true npm run dev
```

## Mock HTTP
- Implementado em `src/infra/http/apiClient.ts`.
- Com `VITE_API_MOCK=true`, retorna mock para `/health`.
- Caso contrário, faz request para `${VITE_API_BASE_URL}/health`.

## Pendências (READY_FOR_IMPLEMENTATION=false)
Partes que ficam **stub/mock** até decisão de POA:
- **UC-006 / RF-012** (idempotência de ingestão): bloqueado por **POA-004**.
- **RF-005 / RN-006** (ordenação/posição de cards): bloqueado por **POA-005**.

Outras POAs (não bloqueantes):
- **POA-001**: rotas definitivas.
- **POA-002**: perfil Gestor/Líder.
- **POA-003**: formato de persistência de CardType.

## Como rodar
```bash
npm install
npm run dev
```

## Como adicionar módulos
1) Criar pasta em `src/modules/<nome>` com `domain`, `application`, `presentation`, `infra`.
2) Registrar rotas em `src/app/routes` quando houver páginas.
3) Injetar adaptadores em `src/infra/di/container.ts`.
4) Incluir reducers/RTK Query em `src/app/store/rootReducer.ts`.

## Gate 2 Checklist
- [ ] Gate 2A: `npm run dev` sobe sem erros (healthcheck renderiza)
- [ ] Gate 2B: `npm run build` executa (TypeScript + Vite)
- [ ] Gate 2C: `npm run typecheck` existe e passa
- [ ] Gate 2E: `npm run lint` e `npm run format` existem (mínimos), ou BLOCKED_TOOLING documentado
