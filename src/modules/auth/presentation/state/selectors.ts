import type { RootState } from "@/app/store/rootReducer";

export const selectAuthSession = (state: RootState) => state.auth.session;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.session);
