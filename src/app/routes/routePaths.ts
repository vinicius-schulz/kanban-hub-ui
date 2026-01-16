export const routePaths = {
  health: "/health",
  login: "/login",
  modules: "/modules",
  moduleDetail: "/modules/:moduleId",
  moduleById: (moduleId: string) => `/modules/${moduleId}`,
  adminModules: "/admin/modules",
  adminBoards: "/admin/boards",
  adminCardTypes: "/admin/card-types",
  adminIngressSources: "/admin/ingress-sources",
  adminPlugins: "/admin/plugins",
  adminConnectors: "/admin/connectors",
};
