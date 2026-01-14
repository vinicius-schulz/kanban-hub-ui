import type { UserId } from "@/modules/_shared/domain/domain.contracts";

export interface AuthUser {
  id: UserId;
  name: string;
  email: string;
  role: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}
