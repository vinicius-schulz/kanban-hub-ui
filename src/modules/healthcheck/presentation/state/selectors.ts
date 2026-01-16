import type { RootState } from "@/app/store";

export const selectHealthStatus = (state: RootState) => state.health.lastStatus;
