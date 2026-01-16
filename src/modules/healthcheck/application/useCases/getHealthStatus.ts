import type { HealthRepository } from "@/modules/healthcheck/domain/ports/HealthRepository";

export const getHealthStatus = (repository: HealthRepository) => {
  return repository.getStatus();
};
