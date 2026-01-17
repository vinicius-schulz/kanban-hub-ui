import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";
import { getStoredSession } from "@/modules/auth/infra/mockAuth";

type ModulesNavProps = {
  activePath?: string;
};

export const ModulesNav = ({ activePath }: ModulesNavProps) => {
  const sessionSnapshot = useMemo(() => getStoredSession(), []);
  const isAdmin = Boolean(sessionSnapshot?.user.roles?.includes("admin"));

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Navegação
        </Typography>
        <List dense disablePadding>
          <ListItemButton
            component={Link}
            to={routePaths.modules}
            selected={activePath === routePaths.modules}
          >
            <ListItemText primary="Módulos" />
          </ListItemButton>
        </List>
      </Box>
      <Divider />
      <Box>
        <Typography variant="overline" color="text.secondary">
          Administração
        </Typography>
        <List dense disablePadding>
          {isAdmin ? (
            <>
              <ListItemButton
                component={Link}
                to={routePaths.adminCardTypes}
                selected={activePath === routePaths.adminCardTypes}
              >
                <ListItemText primary="CardTypes" secondary="Tipos e campos" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to={routePaths.adminIngressSources}
                selected={activePath === routePaths.adminIngressSources}
              >
                <ListItemText primary="IngressSources" secondary="Fontes de entrada" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to={routePaths.adminConnectors}
                selected={activePath === routePaths.adminConnectors}
              >
                <ListItemText primary="Conectores" secondary="Webhooks" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton disabled>
              <ListItemText primary="Cadastros" secondary="Disponível para Admin" />
            </ListItemButton>
          )}
        </List>
      </Box>
    </Box>
  );
};
