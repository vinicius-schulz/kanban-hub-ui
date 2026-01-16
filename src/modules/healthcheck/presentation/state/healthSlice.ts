import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

type HealthState = {
  lastStatus: HealthStatus | null;
};

const initialState: HealthState = {
  lastStatus: null
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    setHealthStatus(state, action: PayloadAction<HealthStatus>) {
      state.lastStatus = action.payload;
    }
  }
});

export const { setHealthStatus } = healthSlice.actions;
export const healthReducer = healthSlice.reducer;
