import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "@/modules/auth/application/authSlice";
import { healthApi } from "@/modules/healthcheck/presentation/state/healthApi";
import { healthSlice } from "@/modules/healthcheck/presentation/state/healthSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  health: healthSlice.reducer,
  [healthApi.reducerPath]: healthApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
