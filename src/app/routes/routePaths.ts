export const routePaths = {
  health: "/health",
  login: "/login",
  modules: "/modules",
  moduleDetail: "/modules/:moduleId",
  moduleById: (moduleId: string) => `/modules/${moduleId}`,
};
