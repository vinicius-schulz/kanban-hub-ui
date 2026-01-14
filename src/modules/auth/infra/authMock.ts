import type { AuthSession } from "@/modules/auth/domain/authSession";
import type { UserId } from "@/modules/_shared/domain/domain.contracts";

const getDisplayName = (email: string) => {
  const [namePart] = email.split("@");
  if (!namePart) {
    return "Usuário";
  }
  return namePart
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const mockLogin = async (
  email: string,
  _password: string,
): Promise<AuthSession> => {
  const session: AuthSession = {
    user: {
      id: "user-mock" as UserId,
      name: getDisplayName(email),
      email,
      role: "Operador",
    },
    token: "mock-token",
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(session), 400);
  });
};
