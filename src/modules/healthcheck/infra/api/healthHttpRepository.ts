import { apiClient } from "@/infra/http/apiClient";
import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";
import type { HealthRepository } from "@/modules/healthcheck/domain/ports/HealthRepository";

export const healthHttpRepository: HealthRepository = {
  async getStatus() {
    return apiClient.get<HealthStatus>("/health");
  },
};
