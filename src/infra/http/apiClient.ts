import { env } from "@/app/config/env";
import { AppError } from "@/core/errors/AppError";

const buildUrl = (path: string) => {
  if (!env.apiBaseUrl) {
    return path;
  }
  return `${env.apiBaseUrl}${path}`;
};

const getMockResponse = (path: string) => {
  if (path === "/health") {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
  return null;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }
  return (await response.text()) as T;
};

export const apiClient = {
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (env.apiMock) {
      const mock = getMockResponse(path);
      if (mock) {
        return mock as T;
      }
    }

    const response = await fetch(buildUrl(path), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new AppError(
        `Erro ao acessar ${path} (status ${response.status})`,
        response.status,
      );
    }

    return parseResponse<T>(response);
  },
  get<T>(path: string) {
    return this.request<T>(path, { method: "GET" });
  },
};
