import { env } from "@/app/config/env";
import { AppError } from "@/core/errors/AppError";

export type RequestOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

const buildUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!env.apiBaseUrl) {
    return normalized;
  }
  return `${env.apiBaseUrl}${normalized}`;
};

export const apiClient = {
  async request<T>({ path, method = "GET", body, headers }: RequestOptions): Promise<T> {
    if (env.apiMock && path === "/health") {
      return {
        status: "ok",
        timestamp: new Date().toISOString()
      } as T;
    }

    const response = await fetch(buildUrl(path), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new AppError("Erro na requisição", "HTTP_ERROR", response.status);
    }

    return (await response.json()) as T;
  }
};
