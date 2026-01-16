import type { HealthStatus } from "@/modules/healthcheck/domain/entities/HealthStatus";

export interface HealthRepository {
  getStatus(): Promise<HealthStatus>;
}
