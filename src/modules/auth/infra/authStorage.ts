import type { AuthSession } from "@/modules/auth/domain/auth.contracts";

const STORAGE_KEY = "kanban-hub-auth-session";

export const authStorage = {
  getSession(): AuthSession | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored) as AuthSession;
    } catch {
      return null;
    }
  },
  setSession(session: AuthSession) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
