import { createApi } from "@reduxjs/toolkit/query/react";
import { apiClient } from "@/infra/http/apiClient";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

type QueryArgs = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

const baseQuery = async ({ url, method = "GET" }: QueryArgs) => {
  try {
    const data = await apiClient.request<HealthStatus>({ path: url, method });
    return { data };
  } catch (error) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        data: error instanceof Error ? error.message : "Erro desconhecido"
      }
    };
  }
};

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery,
  endpoints: (builder) => ({
    getHealth: builder.query<HealthStatus, void>({
      query: () => ({ url: "/health" })
    })
  })
});

export const { useGetHealthQuery } = healthApi;
