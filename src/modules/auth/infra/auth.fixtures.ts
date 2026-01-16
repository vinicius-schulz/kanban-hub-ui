import type { AuthSession } from "@/modules/auth/domain/auth.contracts";
import { userFixture } from "@/modules/_shared/domain/domain.fixtures";

// TODO(REQ-RF-001): Substituir sessão mock por integração real de autenticação.
export const authSessionFixture: AuthSession = {
  token: "mock-token-telemetria",
  user: userFixture,
  createdAt: "2024-05-01T08:00:00Z",
};
