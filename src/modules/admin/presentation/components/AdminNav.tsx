import { Box, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routePaths } from "@/app/routes/routePaths";

type AdminNavProps = {
  activePath?: string;
};

export const AdminNav = ({ activePath }: AdminNavProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography variant="overline" color="text.secondary">
          Administração
        </Typography>
        <List dense disablePadding>
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
        </List>
      </Box>
      <Divider />
      <Box>
        <Typography variant="overline" color="text.secondary">
          Outros cadastros
        </Typography>
        <List dense disablePadding>
          <ListItemButton disabled>
            <ListItemText primary="Módulos" secondary="Fora do escopo" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemText primary="Boards" secondary="Fora do escopo" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemText primary="Plugins" secondary="Fora do escopo" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemText primary="Usuários" secondary="Fora do escopo" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};
