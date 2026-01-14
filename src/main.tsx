import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRoutes } from "@/app/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </React.StrictMode>,
);
