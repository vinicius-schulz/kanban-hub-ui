import type { RootState } from "@/app/store/rootReducer";

export const selectAuthSession = (state: RootState) => state.auth.session;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session);

export const selectAuthStatus = (state: RootState) => state.auth.status;
