import { createSlice } from "@reduxjs/toolkit";
import type { Module, ModuleId } from "@/modules/_shared/domain/domain.contracts";
import { moduleFixture } from "@/modules/_shared/domain/domain.fixtures";

interface ModulesState {
  modules: Module[];
}

const extraModule: Module = {
  id: "module-compliance" as ModuleId,
  name: "Compliance",
};

const initialState: ModulesState = {
  modules: [moduleFixture, extraModule],
};

export const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {},
});
