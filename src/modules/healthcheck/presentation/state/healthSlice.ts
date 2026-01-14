import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HealthState {
  lastCheckedAt: string | null;
}

const initialState: HealthState = {
  lastCheckedAt: null,
};

export const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    setLastCheckedAt(state, action: PayloadAction<string>) {
      state.lastCheckedAt = action.payload;
    },
  },
});

export const { setLastCheckedAt } = healthSlice.actions;
