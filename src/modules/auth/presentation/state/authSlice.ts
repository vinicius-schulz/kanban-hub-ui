import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthCredentials, AuthSession } from "@/modules/auth/domain/auth.contracts";
import { authSessionFixture } from "@/modules/auth/infra/auth.fixtures";
import { authStorage } from "@/modules/auth/infra/authStorage";

interface AuthState {
  session: AuthSession | null;
}

const initialState: AuthState = {
  session: authStorage.getSession(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginMock(state, _action: PayloadAction<AuthCredentials>) {
      state.session = authSessionFixture;
      authStorage.setSession(authSessionFixture);
    },
    logout(state) {
      state.session = null;
      authStorage.clearSession();
    },
  },
});

export const { loginMock, logout } = authSlice.actions;
