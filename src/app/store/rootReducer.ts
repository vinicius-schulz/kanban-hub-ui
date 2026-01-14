import { combineReducers } from "@reduxjs/toolkit";
import { healthApi } from "@/modules/healthcheck/presentation/state/healthApi";
import { healthSlice } from "@/modules/healthcheck/presentation/state/healthSlice";

export const rootReducer = combineReducers({
  health: healthSlice.reducer,
  [healthApi.reducerPath]: healthApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
