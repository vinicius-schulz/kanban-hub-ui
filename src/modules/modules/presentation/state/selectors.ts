import type { RootState } from "@/app/store/rootReducer";

export const selectModules = (state: RootState) => state.modules.modules;
