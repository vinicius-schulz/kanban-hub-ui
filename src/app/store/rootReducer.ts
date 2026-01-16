import { combineReducers } from "@reduxjs/toolkit";
import { healthApi } from "@/modules/healthcheck/presentation/state/healthApi";
import { healthReducer } from "@/modules/healthcheck/presentation/state/healthSlice";

export const rootReducer = combineReducers({
  [healthApi.reducerPath]: healthApi.reducer,
  health: healthReducer
});

export type RootState = ReturnType<typeof rootReducer>;
