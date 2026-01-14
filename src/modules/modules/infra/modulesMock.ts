import type { Module, ModuleId } from "@/modules/_shared/domain/domain.contracts";
import { moduleFixture } from "@/modules/_shared/domain/domain.fixtures";

const onboardingModuleId = "module-onboarding" as ModuleId;
const operacoesModuleId = "module-operacoes" as ModuleId;

export const modulesMock: Module[] = [
  moduleFixture,
  {
    id: onboardingModuleId,
    name: "Onboarding de Clientes",
  },
  {
    id: operacoesModuleId,
    name: "Operações Críticas",
  },
];
