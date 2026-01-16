import { LoginInput, LoginResult, Session, User } from "@/core/domain/domain.contracts";
import { loginHappyPath, userAdmin } from "@/core/domain/domain.fixtures";

const SESSION_KEY = "kanbanhub.session";
const USER_KEY = "kanbanhub.user";

const parseJson = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const canUseStorage = () => typeof window !== "undefined" && "localStorage" in window;

export const mockAuthenticate = async (input: LoginInput): Promise<LoginResult> => {
  if (!input.username.trim() || !input.password.trim()) {
    throw new Error("Informe usuário e senha.");
  }

  if (input.username.trim().toLowerCase() !== userAdmin.username) {
    throw new Error("Credenciais inválidas.");
  }

  // TODO(POA-003): substituir mock por autenticação real quando o mecanismo for definido.
  return loginHappyPath;
};

export const persistSession = (result: LoginResult): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(result.session));
  window.localStorage.setItem(USER_KEY, JSON.stringify(result.user));
};

export const clearSession = (): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(USER_KEY);
};

export const getStoredSession = (): { session: Session; user: User } | null => {
  if (!canUseStorage()) {
    return null;
  }

  const session = parseJson<Session>(window.localStorage.getItem(SESSION_KEY));
  const user = parseJson<User>(window.localStorage.getItem(USER_KEY));

  if (!session || !user) {
    return null;
  }

  return { session, user };
};
