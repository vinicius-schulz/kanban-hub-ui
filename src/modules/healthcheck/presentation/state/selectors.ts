import type { RootState } from "@/app/store/rootReducer";

export const selectHealthLastCheckedAt = (state: RootState) =>
  state.health.lastCheckedAt;
