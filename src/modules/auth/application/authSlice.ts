import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession } from "@/modules/auth/domain/authSession";
import {
  clearSession as clearStorageSession,
  loadSession,
  saveSession,
} from "@/modules/auth/infra/authStorage";

interface AuthState {
  session: AuthSession | null;
  status: "idle" | "authenticated";
}

const initialSession = loadSession();

const initialState: AuthState = {
  session: initialSession,
  status: initialSession ? "authenticated" : "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.session = action.payload;
      state.status = "authenticated";
      saveSession(action.payload);
    },
    clearSession: (state) => {
      state.session = null;
      state.status = "idle";
      clearStorageSession();
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
