import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/store/rootReducer";
import { healthApi } from "@/modules/healthcheck/presentation/state/healthApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(healthApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
