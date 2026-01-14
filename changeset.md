# Changeset

## Files created
- src/modules/auth/domain/authSession.ts
- src/modules/auth/infra/authStorage.ts
- src/modules/auth/infra/authMock.ts
- src/modules/auth/application/authSlice.ts
- src/modules/auth/application/selectors.ts
- src/modules/auth/presentation/components/RequireAuth.tsx
- src/modules/auth/presentation/pages/LoginPage.tsx
- src/modules/modules/infra/modulesMock.ts
- src/modules/modules/presentation/pages/ModulesPage.tsx
- selection.json
- state.json
- changeset.md

## Files updated
- src/app/routes/routePaths.ts
- src/app/routes/index.tsx
- src/app/store/rootReducer.ts

## Files deleted
- 

## Notes
- Implementado login mock com sessão persistida e guard para acesso a /modules.
- Criada listagem inicial de módulos mockados.
- Runner deve executar: npm run lint, npm run typecheck, npm run build.
