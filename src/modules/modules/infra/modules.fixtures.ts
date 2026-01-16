import type { Module, ModuleId } from "@/modules/_shared/domain/domain.contracts";

export const modulesFixture: Module[] = [
  {
    id: "module-telemetria" as ModuleId,
    name: "Telemetria",
  },
  {
    id: "module-sla" as ModuleId,
    name: "Gestão de SLA",
  },
  {
    id: "module-fraudes" as ModuleId,
    name: "Prevenção a Fraudes",
  },
];
