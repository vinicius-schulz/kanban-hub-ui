# Change Log

- Implementadas telas de login e listagem de módulos com sessão mockada.
- Adicionadas rotas, guard de autenticação e redirecionamento inicial.
- Estado redux criado para autenticação e módulos mock.

## Arquivos criados/alterados
- src/app/routes/index.tsx
- src/app/routes/routePaths.ts
- src/app/store/rootReducer.ts
- src/modules/auth/presentation/components/AuthGuard.tsx
- src/modules/auth/presentation/components/AuthRedirect.tsx
- src/modules/auth/presentation/pages/LoginPage.tsx
- src/modules/auth/presentation/state/authSlice.ts
- src/modules/auth/presentation/state/selectors.ts
- src/modules/modules/presentation/pages/ModulesPage.tsx
- src/modules/modules/presentation/state/modulesSlice.ts
- src/modules/modules/presentation/state/selectors.ts
- code.patch.diff
- increment.selected.json
- progress.md
- trace.delta.json

## Gates para rodar (sem testes)
- npm run typecheck
- npm run lint
- npm run build

## SAFE_DEFAULTs
- Nenhum.
