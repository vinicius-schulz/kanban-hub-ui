import { apiClient } from "@/infra/http/apiClient";
import type { HealthRepository } from "@/modules/healthcheck/domain/ports/HealthRepository";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

export const healthHttpRepository: HealthRepository = {
  getStatus: () => apiClient.request<HealthStatus>({ path: "/health" })
};
