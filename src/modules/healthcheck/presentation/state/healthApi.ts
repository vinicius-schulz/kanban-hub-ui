import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { apiClient } from "@/infra/http/apiClient";
import { AppError } from "@/core/errors/AppError";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

interface RequestArgs {
  path: string;
  method?: string;
}

const baseQuery: BaseQueryFn<RequestArgs, unknown, AppError> = async ({
  path,
  method = "GET",
}) => {
  try {
    const data = await apiClient.request<HealthStatus>(path, { method });
    return { data };
  } catch (error) {
    return { error: error as AppError };
  }
};

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery,
  endpoints: (builder) => ({
    getHealthStatus: builder.query<HealthStatus, void>({
      query: () => ({ path: "/health" }),
    }),
  }),
});

export const { useGetHealthStatusQuery } = healthApi;
