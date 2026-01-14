import type { RootState } from "@/app/store/rootReducer";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectCurrentUser = (state: RootState) => state.auth.user;
