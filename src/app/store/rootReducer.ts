import { combineReducers } from "@reduxjs/toolkit";
import { healthApi } from "@/modules/healthcheck/presentation/state/healthApi";
import { healthSlice } from "@/modules/healthcheck/presentation/state/healthSlice";
import { authSlice } from "@/modules/auth/presentation/state/authSlice";
import { modulesSlice } from "@/modules/modules/presentation/state/modulesSlice";

export const rootReducer = combineReducers({
  health: healthSlice.reducer,
  auth: authSlice.reducer,
  modules: modulesSlice.reducer,
  [healthApi.reducerPath]: healthApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
