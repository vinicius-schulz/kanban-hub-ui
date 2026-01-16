import type { User } from "@/modules/_shared/domain/domain.contracts";

export interface AuthSession {
  token: string;
  user: User;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
