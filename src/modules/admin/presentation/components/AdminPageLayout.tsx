import { Button, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { PageLayout } from "@/modules/_shared/ui/PageLayout";

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const adminLinks = [
  { label: "Módulos", path: routePaths.adminModules },
  { label: "Boards", path: routePaths.adminBoards },
  { label: "Card Types", path: routePaths.adminCardTypes },
  { label: "Ingress Sources", path: routePaths.adminIngressSources },
  { label: "Plugins", path: routePaths.adminPlugins },
  { label: "Conectores", path: routePaths.adminConnectors },
];

export const AdminPageLayout = ({ title, subtitle, children }: AdminPageLayoutProps) => {
  const location = useLocation();

  return (
    <PageLayout title={title} subtitle={subtitle}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
          {adminLinks.map((link) => (
            <Button
              key={link.path}
              component={RouterLink}
              to={link.path}
              size="small"
              variant={location.pathname === link.path ? "contained" : "outlined"}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
        {children}
      </Stack>
    </PageLayout>
  );
};
