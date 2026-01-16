export const routePaths = {
  root: "/",
  login: "/login",
  modules: "/modules",
  moduleDetail: "/modules/:moduleId",
  boardKanban: "/boards/:boardId",
  adminModules: "/admin/modules",
  adminBoards: "/admin/boards",
  adminCardTypes: "/admin/card-types",
  adminIngressSources: "/admin/ingress-sources",
  adminPlugins: "/admin/plugins",
  adminConnectors: "/admin/connectors",
  adminUsers: "/admin/users"
} as const;
